import { InboxOutlined } from "@ant-design/icons";
import { message, Modal, Table, UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";

type IProps = {
    openModalImport: boolean,
    setOpenModalImport: (v: boolean) => void
}

const props: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,

    // https://stackoverflow.com/questions/11832930/html-input-file-accept-attribute-file-type-csv
    accept: ".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    // https://stackoverflow.com/questions/51514757/action-function-is-required-with-antd-upload-control-but-i-dont-need-it
    customRequest({ file, onSuccess }) {
        setTimeout(() => {
            if (onSuccess) onSuccess("ok");
        }, 1000);
    },

    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const ImportUser = (props: IProps) => {


    const { openModalImport, setOpenModalImport } = props;

    const showModal = () => {
        setOpenModalImport(true);
    };

    const handleOk = () => {
        setOpenModalImport(false);
    };

    const handleCancel = () => {
        setOpenModalImport(false);
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
                    disabled: true
                }}
            >

                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single upload. Only accept .csv, .xls, .xlsx . or
                    </p>
                </Dragger>

                <div style={{ paddingTop: 20 }}>
                    <Table
                        rowKey={"id"}
                        title={() => <span>Dữ liệu upload:</span>}
                        // dataSource={dataImport}
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