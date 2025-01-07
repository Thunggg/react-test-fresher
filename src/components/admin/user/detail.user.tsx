import { Avatar, Badge, Descriptions, Drawer } from 'antd';
import dayjs from 'dayjs';

type IProps = {
    openViewDetail: boolean;
    setOpenViewDetail: (v: boolean) => void;
    dataViewDetail: IUserTable | null;
    setDataViewDetail: (v: IUserTable | null) => void;
}

const DetailUser = (props: IProps) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;
    const imageURL = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataViewDetail?.avatar}`;


    const items = [
        {
            key: '1',
            label: 'User ID',
            children: dataViewDetail?._id || 'N/A',
        },
        {
            key: '2',
            label: 'Full Name',
            children: dataViewDetail?.fullName || 'N/A',
        },
        {
            key: '3',
            label: 'Email',
            children: dataViewDetail?.email || 'N/A',
        },
        {
            key: '4',
            label: 'Phone',
            children: dataViewDetail?.phone || 'N/A',
        },
        {
            key: '5',
            label: 'Role',
            children: (
                <Badge
                    status={dataViewDetail?.role === 'ADMIN' ? 'success' : 'processing'}
                    text={dataViewDetail?.role || 'N/A'}
                />
            )
        },
        {
            key: '5',
            label: 'Avatar',
            children: <Avatar size={40} src={imageURL}></Avatar>,

        },
        {
            key: '6',
            label: 'Created At',
            children: dayjs(dataViewDetail?.createdAt).format("DD-MM-YYYY") || 'N/A',
        },
        {
            key: '7',
            label: 'Updated At',
            children: dayjs(dataViewDetail?.updatedAt).format("DD-MM-YYYY") || 'N/A',
        }

    ];

    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    }

    return (
        <>
            <Drawer
                open={openViewDetail}
                width={"50vw"}
                onClose={onClose}
            >
                <Descriptions title="User Info" bordered items={items} column={2} />;
            </Drawer>


        </>
    );
};

export default DetailUser;