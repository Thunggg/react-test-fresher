import { InboxOutlined } from "@ant-design/icons";
import { message, Modal, Table, UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import Exceljs from 'exceljs';
import { Buffer } from 'buffer';
import { useState } from "react";
import templateFile from "assets/templates/user.xlsx?url"

type IProps = {
    openModalImport: boolean,
    setOpenModalImport: (v: boolean) => void,
    refreshTable: () => void
}

interface IDataImport {
    fullName: string;
    email: string;
    phone: string;
}

const ImportUser = (props: IProps) => {

    const [dataImport, setDataImport] = useState<IDataImport[]>([]);
    const [fileList, setFileList] = useState<any[]>([]); // Quản lý danh sách file

    const propsUpload: UploadProps = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        action: undefined,

        // https://stackoverflow.com/questions/11832930/html-input-file-accept-attribute-file-type-csv
        accept: ".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

        // https://stackoverflow.com/questions/51514757/action-function-is-required-with-antd-upload-control-but-i-dont-need-it
        customRequest({ file, onSuccess }) {
            setTimeout(() => {
                if (onSuccess) onSuccess("ok");
            }, 1000);
        },

        async onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                console.log(info)
                if (info.fileList && info.fileList.length > 0) {
                    const file = info.fileList[0].originFileObj!;

                    //load file to buffer
                    const workbook = new Exceljs.Workbook();
                    const arrayBuffer = await file.arrayBuffer()
                    const buffer = Buffer.from(arrayBuffer);
                    await workbook.xlsx.load(buffer);

                    //convert file to json
                    let jsonData: IDataImport[] = [];
                    workbook.worksheets.forEach(function (sheet) {
                        // read first row as data keys
                        let firstRow = sheet.getRow(1);
                        if (!firstRow.cellCount) return;

                        let keys = firstRow.values as any[];

                        sheet.eachRow((row, rowNumber) => {
                            if (rowNumber == 1) return;
                            let values = row.values as any;
                            let obj: any = {};
                            for (let i = 1; i < keys.length; i++) {
                                obj[keys[i]] = values[i];
                            }
                            jsonData.push(obj);
                        })

                    });
                    jsonData = jsonData.map((item, index) => {
                        return { ...item, id: index + 1 }
                    })
                    setDataImport(jsonData);
                    console.log(jsonData);

                }
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
            setFileList(info.fileList); // Cập nhật danh sách file
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        fileList, // Gắn danh sách file từ state
    };


    const { openModalImport, setOpenModalImport, refreshTable } = props;



    const handleOk = () => {
        setOpenModalImport(false);
        setDataImport([]); // Xóa dữ liệu trong bảng
        setFileList([]);
        refreshTable();
    };

    const handleCancel = () => {
        setOpenModalImport(false);
        setDataImport([]); // Xóa dữ liệu trong bảng
        setFileList([]);
        refreshTable();
    };

    return (
        <>
            <Modal
                title="Basic Modal"
                open={openModalImport}
                onOk={handleOk}
                onCancel={handleCancel}
                width={"50vw"}
                okText={"Import data"}
                okButtonProps={{
                    disabled: dataImport.length > 0 ? false : true
                }}
            >

                <Dragger {...propsUpload}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single upload. Only accept .csv, .xls, .xlsx . or
                        &nbsp;
                        <a
                            onClick={e => e.stopPropagation()}
                            href={templateFile}
                            download
                        >
                            Download sample file
                        </a>
                    </p>
                </Dragger>

                <div style={{ paddingTop: 20 }}>
                    <Table
                        rowKey={"id"}
                        title={() => <span>Dữ liệu upload:</span>}
                        dataSource={dataImport}
                        columns={[
                            { dataIndex: 'fullName', title: 'Tên hiển thị' },
                            { dataIndex: 'email', title: 'Email' },
                            { dataIndex: 'phone', title: 'Số điện thoại' },
                        ]}
                    />
                </div>
            </Modal>
        </>
    )
}

export default ImportUser