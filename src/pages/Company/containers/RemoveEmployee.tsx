import { UserDeleteOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { isAxiosError } from 'axios';
import React, { useState } from 'react';
import httpService from 'src/services/httpService';
import { User } from 'src/types/User';

interface Props {
  employeeId: string;
  setEmployees: React.Dispatch<React.SetStateAction<User[]>>;
}

export const RemoveEmployee = ({ employeeId, setEmployees }: Props) => {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleRemoveClick = async () => {
    setLoading(true);

    try {
      await httpService.delete(`/users/${employeeId}`);
      setEmployees((prev) => prev.filter((user) => user._id !== employeeId));
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
      <Button type="ghost" loading={loading} icon={<UserDeleteOutlined />} onClick={handleRemoveClick} />
    </>
  );
};
