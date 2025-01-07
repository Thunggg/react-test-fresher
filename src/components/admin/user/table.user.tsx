import { getUserAPI } from '@/services/api';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Divider } from 'antd';
import { useRef, useState } from 'react';


const columns: ProColumns<IUserTable>[] = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: 'Id',
        dataIndex: '_id',
        hideInSearch: true,
        render(dom, entity, index, action, schema) {
            return (
                <>
                    <a href="">{entity._id}</a>
                </>
            )
        },
    },
    {
        title: 'Full Name',
        dataIndex: 'fullName',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        copyable: true,
    },
    {
        title: 'Create At',
        dataIndex: 'createdAt',
    },
    {
        title: 'Action',
        render(dom, entity, index, action, schema) {
            return (
                <>
                    <EditOutlined
                        style={{ cursor: 'pointer', marginRight: 15, color: '#f57800' }}
                    />
                    <DeleteOutlined
                        style={{ cursor: 'pointer', marginRight: 15, color: '#ff4d4f' }}
                    />
                </>
            );
        },
    },

];

const TableUser = () => {
    const actionRef = useRef<ActionType>();

    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0,
    });

    return (
        <ProTable<IUserTable>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            request={async (params, sort, filter) => {
                console.log(params, sort, filter);
                const res = await getUserAPI(params?.current ?? 1, params?.pageSize ?? 5);
                if (res.data) {
                    setMeta(res.data.meta);
                }
                return {
                    data: res.data?.result,
                    page: 1,
                    success: true,
                    total: res.data?.meta.total
                }
            }}
            rowKey="_id"
            pagination={
                {
                    current: meta.current,
                    pageSize: meta.pageSize,
                    showSizeChanger: true,
                    total: meta.total,
                    showTotal: (total, range) => { return (<div>{range[0]} - {range[1]} trên {total} rows</div>) },
                    pageSizeOptions: ['5', '10', '20', '50', '100'], // Các tùy chọn số lượng
                }
            }
            headerTitle="Table user"
            toolBarRender={() => [
                <Button
                    key="button"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        actionRef.current?.reload();
                    }}
                    type="primary"
                >
                    Add new
                </Button>
            ]}
        />
    );
};

export default TableUser