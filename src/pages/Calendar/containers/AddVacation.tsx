import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Modal, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { isAxiosError } from 'axios';
import React, { useState } from 'react';
import httpService from 'src/services/httpService';

interface Props {
  onAdd?: () => void;
}

export const AddVacation = ({ onAdd }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = useForm();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();

      await httpService.post(`/vacations`, {
        description: values?.description,
        startAt: new Date(values.date[0]).toISOString(),
        endAt: new Date(values.date[1]).toISOString()
      });
      setIsModalOpen(false);
      onAdd?.();
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
      <>{contextHolder}</>
      <Button icon={<PlusOutlined />} type="default" onClick={() => setIsModalOpen(true)}>
        Request vacation
      </Button>

      <Modal
        destroyOnClose
        title="Create new vacation request"
        centered
        open={isModalOpen}
        onOk={handleSubmit}
        okText="Create"
        confirmLoading={loading}
        onCancel={() => setIsModalOpen(false)}>
        <Form form={form} requiredMark={false} preserve={false}>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: 'Please enter vacation description!'
              }
            ]}>
            <Input.TextArea style={{ height: 140, resize: 'none' }} placeholder="Description" />
          </Form.Item>
          <Form.Item
            name="date"
            rules={[
              {
                required: true,
                message: 'Please select date range for your vacation!'
              }
            ]}>
            <DatePicker.RangePicker format={'YYYY-MM-DD'} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
