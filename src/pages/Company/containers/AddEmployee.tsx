import { Button, Form, Input, Modal, message } from 'antd';
import React, { useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import httpService from 'src/services/httpService';
import { isAxiosError } from 'axios';

interface Props {
  onAdd: () => void;
}

export const AddEmployee = ({ onAdd }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = useForm();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      await httpService.post(`/users`, values);
      setIsModalOpen(false);
      onAdd();
    } catch (error) {
      isAxiosError(error) &&
        messageApi.open({
          type: 'error',
          content: error.response?.data?.message
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" size="large" onClick={() => setIsModalOpen(true)}>
        Add new user
      </Button>
      <Modal
        destroyOnClose
        title="Create an account for your new employee"
        centered
        open={isModalOpen}
        onOk={handleSubmit}
        okText="Create"
        confirmLoading={loading}
        onCancel={() => setIsModalOpen(false)}>
        <Form form={form} requiredMark={false} preserve={false}>
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
        </Form>
      </Modal>
    </>
  );
};
