import { Button, Form, Input, Space } from 'antd';
import { FormInstance, useForm } from 'antd/es/form/Form';
import React from 'react';

type Props = {
    form: FormInstance;
};

export const SignIn = ({ form }: Props) => {
    return (
        <Form form={form} requiredMark={false}>
            <Form.Item
                label="Login"
                name="login"
                rules={[
                    {
                        required: true,
                        message: 'Please input your login!',
                    },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}>
                <Input.Password />
            </Form.Item>
        </Form>
    );
};
