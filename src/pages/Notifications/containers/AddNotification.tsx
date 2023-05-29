import { SendOutlined } from '@ant-design/icons';
import { FloatButton, Form, Input, Modal, Select, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import httpService from 'src/services/httpService';
import { THEME } from 'src/theme';
import styled from 'styled-components';
import { User } from 'src/types/User';
import { useSession } from 'src/hooks/useSession';

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

interface Props {
  onAdd: () => void;
}

export const AddNotification = ({ onAdd }: Props) => {
  const { profile } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = useForm();

  const handleSubmit = async () => {
    setSending(true);
    try {
      const values = await form.validateFields();
      await httpService.post(`/messages`, { ...values, type: 'info' });
      onAdd();
      setIsModalOpen(false);
    } catch (error) {
      isAxiosError(error) &&
        messageApi.open({
          type: 'error',
          content: error.response?.data?.message
        });
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    httpService
      .get<User[]>('/users')
      .then((res) => {
        setUsers(res.data.filter((user) => user._id !== profile?.userId));
      })
      .catch((error) => {
        isAxiosError(error) &&
          messageApi.open({
            type: 'error',
            content: error.response?.data?.message
          });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {contextHolder}
      <AddButton icon={<SendOutlined />} type="default" onClick={() => setIsModalOpen(true)} />

      <Modal
        destroyOnClose
        title="Send message to users"
        centered
        open={isModalOpen}
        onOk={handleSubmit}
        okText="Send"
        confirmLoading={sending}
        onCancel={() => setIsModalOpen(false)}>
        <Form form={form} requiredMark={false} preserve={false}>
          <Form.Item name="sentTo">
            <Select
              options={users.map((user) => ({ value: user._id, label: user.name }))}
              loading={loading}
              mode="multiple"
              placeholder="(optional) Select recipients of the message"
            />
          </Form.Item>
          <Form.Item
            name="content"
            rules={[
              {
                required: true,
                message: 'Please enter your message!'
              }
            ]}>
            <Input.TextArea style={{ height: 120, resize: 'none' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
