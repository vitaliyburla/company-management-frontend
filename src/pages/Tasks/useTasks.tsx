import { message } from 'antd';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import httpService from 'src/services/httpService';
import { Task } from 'src/types/Task';

export const useTasks = () => {
  const { groupId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [triggerFetch, setTriggerFetch] = useState(false);

  useEffect(() => {
    setLoading(true);
    httpService
      .get(`/tasks?groupId=${groupId}`)
      .then((res) => {
        setTasks(res.data);
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

  return {
    contextHolder,
    loading,
    tasks,
    refetchTasks: () => setTriggerFetch((prev) => !prev)
  };
};
