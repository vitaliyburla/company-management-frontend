import { Form, Input } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import React from 'react';

type Props = {
  form: FormInstance;
};

export const SignUp = ({ form }: Props) => {
  return (
    <Form form={form} requiredMark={false}>
      <Form.Item
        label="Login"
        name="login"
        rules={[
          {
            required: true,
            message: 'Please input your login!'
          }
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!'
          }
        ]}
        hasFeedback>
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject();
            }
          })
        ]}>
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your name!'
          }
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Company name"
        name="companyName"
        rules={[
          {
            required: true,
            message: 'Please input name of your company!'
          }
        ]}>
        <Input />
      </Form.Item>
    </Form>
  );
};
