import { message } from 'antd';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import httpService from 'src/services/httpService';
import { Task, TaskStatus } from 'src/types/Task';
import { User } from 'src/types/User';

export const useTask = () => {
  const { taskId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState<Task>();
  const [triggerFetch, setTriggerFetch] = useState(false);

  useEffect(() => {
    setLoading(true);
    httpService
      .get(`/tasks/${taskId}`)
      .then((res) => {
        setTask(res.data);
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
  }, [triggerFetch]);

  const updateAssignedTo = (assignedTo: User[]) => {
    if (!task) return;
    setTask({ ...task, assignedTo });
  };

  const updateStatus = (status: TaskStatus) => {
    if (!task) return;
    setTask({ ...task, status });
  };

  return {
    contextHolder,
    loading,
    task,
    updateAssignedTo,
    updateStatus,
    refetchTasks: () => setTriggerFetch((prev) => !prev)
  };
};
