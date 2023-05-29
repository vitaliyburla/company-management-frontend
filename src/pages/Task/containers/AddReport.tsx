import 'react-quill/dist/quill.snow.css';
import { Button, Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { isAxiosError } from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import httpService from 'src/services/httpService';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import { Paragraph } from 'src/components/Paragraph';

const RichTextEditor = styled(ReactQuill)`
  .ql-editor {
    min-height: 100px;
    background-color: white;
  }
`;

const StyledForm = styled(Form)`
  .ant-form-item {
    margin: 0;
  }

  .ant-input {
    border-radius: 8px 8px 0 0;
  }
`;

interface Props {
  onAdd: () => void;
}

export const AddReport = ({ onAdd }: Props) => {
  const { taskId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = useForm();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      await httpService.post(`/reports`, { ...values, taskId });
      setIsModalOpen(false);
      onAdd();
      form.resetFields();
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
      <Paragraph.XL $heavy style={{ marginBottom: 4 }}>
        Add new report
      </Paragraph.XL>
      <StyledForm form={form} requiredMark={false} preserve={false}>
        {contextHolder}
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: 'Please enter title for report!'
            }
          ]}>
          <Input placeholder="Report title" size="large" />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: 'Please enter description for report!'
            }
          ]}>
          <RichTextEditor theme="snow" placeholder="Report description" />
        </Form.Item>
      </StyledForm>
      <Button onClick={handleSubmit} size="large" type="primary" style={{ width: '100%', borderRadius: '0 0 8px 8px' }} loading={loading}>
        Send report
      </Button>
    </>
  );
};
