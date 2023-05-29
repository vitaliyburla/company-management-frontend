import React, { useState } from 'react';
import { Task, TaskStatus } from 'src/types/Task';
import { taskStatus } from 'src/constants/task';
import { Select, message } from 'antd';
import httpService from 'src/services/httpService';
import { useParams } from 'react-router-dom';
import { isAxiosError } from 'axios';

const options: { value: TaskStatus; label: string }[] = [
  { value: 'done', label: taskStatus.done.title },
  { value: 'inprogress', label: taskStatus.inprogress.title },
  { value: 'paused', label: taskStatus.paused.title },
  { value: 'todo', label: taskStatus.todo.title }
];

interface Props {
  status: TaskStatus;
  updateStatus: (taskStatus: TaskStatus) => void;
}

export const Status = ({ status, updateStatus }: Props) => {
  const { taskId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const handleChange = async (value: TaskStatus) => {
    setLoading(true);
    try {
      const res = await httpService.patch<Task>(`/tasks/${taskId}/status`, { status: value });
      updateStatus(res.data.status);
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

  const Icon = taskStatus[status].icon;

  return (
    <>
      {contextHolder}
      <Select
        suffixIcon={<Icon style={{ color: taskStatus[status].color }} />}
        options={options}
        value={status}
        onChange={handleChange}
        style={{ minWidth: 100 }}
        loading={loading}
      />
    </>
  );
};
