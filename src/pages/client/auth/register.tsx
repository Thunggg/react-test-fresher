import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import './register.scss'
import { Link } from 'react-router-dom';
import { useState } from 'react';

type FieldType = {
    username?: string;
    password?: string;
    email?: string;
    phone?: string;
};


const RegisterPage = () => {

    const [isSubmit, setIsSubmit] = useState(false);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Họ tên"
                        name="username"
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