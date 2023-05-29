import { message } from 'antd';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import httpService from 'src/services/httpService';
import { Report } from 'src/types/Report';

export const useReports = () => {
  const { taskId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<Report[]>([]);
  const [triggerFetch, setTriggerFetch] = useState(false);

  useEffect(() => {
    setLoading(true);
    httpService
      .get(`/reports?taskId=${taskId}`)
      .then((res) => {
        setReports(res.data);
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
    reports,
    refetchReports: () => setTriggerFetch((prev) => !prev)
  };
};
