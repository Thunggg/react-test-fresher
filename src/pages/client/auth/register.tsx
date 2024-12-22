import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import './register.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { registerPage } from '@/services/api';

type FieldType = {
    fullName: string;
    password: string;
    email: string;
    phone: string;
};


const RegisterPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setIsSubmit(true);
        const { email, password, phone, fullName } = values;

        const res = await registerPage(fullName, password, email, phone);
        setIsSubmit(false);

        if (res && res.data) {
            message.success('Đăng ký thành công!');
            navigate("/login");
        } else {
            message.error(res.message);
        }
    };

    // const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = async (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    //     // console.log(import.meta.env.VITE_BACKEND_URL);
    // };



    return (
        <>
            <div className='container'>
                <h2>Đăng Ký Tài Khoản</h2>
                <Form
                    name="basic"
                    className='form'
                    labelCol={{ span: 24 }}
                    // wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Họ tên"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ type: "email", required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item<FieldType>
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your number phone!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" loading={isSubmit}>
                            Submit
                        </Button>
                    </Form.Item>

                    <hr />
                    <br />
                    <span>Bạn đã có tài Khoản ? </span>
                    <Link to="/login" className="login-link">Đăng Nhập</Link>
                </Form>
            </div>
        </>
    )
}

export default RegisterPage