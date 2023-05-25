import 'react-quill/dist/quill.snow.css';
import { PlusOutlined } from '@ant-design/icons';
import { FloatButton, Form, Input, Modal, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { isAxiosError } from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import httpService from 'src/services/httpService';
import { THEME } from 'src/theme';
import styled from 'styled-components';
import ReactQuill from 'react-quill';

const AddButton = styled(FloatButton)`
  .ant-float-btn-body {
    transition: all 0.2s ease-in-out;
    background-color: ${THEME.color.success.default};
    .anticon {
      color: white;
    }
  }
  &:hover {
    .ant-float-btn-body {
      background-color: ${THEME.color.success.hover};
    }
  }
`;

const RichTextEditor = styled(ReactQuill)`
  .ql-editor {
    min-height: 200px;
  }
`;

interface Props {
  onAdd: () => void;
}

export const AddTask = ({ onAdd }: Props) => {
  const { groupId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = useForm();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      await httpService.post(`/tasks`, { ...values, groupId });
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
      <AddButton icon={<PlusOutlined />} type="default" onClick={() => setIsModalOpen(true)} />

      <Modal
        destroyOnClose
        width={800}
        title="Create new task"
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
                message: 'Please enter title for task!'
              }
            ]}>
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: 'Please enter description for task!'
              }
            ]}>
            <RichTextEditor theme="snow" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
