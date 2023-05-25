import { message } from 'antd';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import httpService from 'src/services/httpService';
import { Group } from 'src/types/Group';

export const useGroup = () => {
  const { groupId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<Group>();

  useEffect(() => {
    setLoading(true);
    httpService
      .get(`/groups/${groupId}`)
      .then((res) => {
        setGroup(res.data);
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

  return {
    contextHolder,
    loading,
    group
  };
};
