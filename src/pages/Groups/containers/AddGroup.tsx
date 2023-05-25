import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { isAxiosError } from 'axios';
import React, { useState } from 'react';
import httpService from 'src/services/httpService';
import { THEME } from 'src/theme';
import { styled } from 'styled-components';

const AddButton = styled(Button)`
  border: 1px solid ${THEME.color.neutral.dark};
  color: ${THEME.color.neutral.dark};
  &:hover {
    background-color: ${THEME.color.neutral.dark};
    color: ${THEME.color.neutral.base};
  }
`;

interface Props {
  onAdd: () => void;
}

export const AddGroup = ({ onAdd }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = useForm();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      await httpService.post(`/groups`, values);
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
      <AddButton type="ghost" icon={<PlusCircleOutlined />} onClick={() => setIsModalOpen(true)}>
        Add new
      </AddButton>
      <Modal
        destroyOnClose
        title="Enter name of new group"
        centered
        open={isModalOpen}
        onOk={handleSubmit}
        okText="Create"
        confirmLoading={loading}
        onCancel={() => setIsModalOpen(false)}>
        <Form form={form} requiredMark={false} preserve={false}>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: 'Please enter name of group!'
              }
            ]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
