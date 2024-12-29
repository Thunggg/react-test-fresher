import type { FormProps } from 'antd';
import { Button, Form, Input, notification } from 'antd';
import './register.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginPage } from '@/services/api';
import { useCurrentApp } from '@/components/context/app.context';

type FieldType = {
    username: string;
    password: string;
};


const LoginPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);
    const { setIsAuthenticated, setUser } = useCurrentApp();


    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setIsSubmit(true);
        const { username, password } = values;

        const res = await loginPage(username, password);
        setIsSubmit(false);

        if (res && res.data) {
            setIsAuthenticated(true);
            setUser(res.data.user);
            localStorage.setItem('access_token', res.data.access_token);
            notification.success({
                message: 'success',
                description: 'Đăng nhập thành công!',
            });
            navigate("/book");
        } else {
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 5
            });
        }
    };

    // const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = async (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    //     // console.log(import.meta.env.VITE_BACKEND_URL);
    // };



    return (
        <>
            <div className='container'>
                <h2>Đăng nhập</h2>
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
                        label="Email"
                        name="username"
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

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" loading={isSubmit}>
                            Submit
                        </Button>
                    </Form.Item>

                    <hr />
                    <br />
                    <span>Bạn chưa có tài Khoản ? </span>
                    <Link to="/register" className="login-link">Đăng ký</Link>
                </Form>
            </div>
        </>
    )
}

export default LoginPage