import { Button, Modal, message } from 'antd';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'src/components/Spinner';
import { useSession } from 'src/hooks/useSession';
import { Request } from 'src/pages/Calendar/containers/Request';
import httpService from 'src/services/httpService';
import { Vacation } from 'src/types/Vacation';
import { styled } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Requests = () => {
  const { profile } = useSession();
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isModalOpen) return;

    setLoading(true);
    httpService
      .get<Vacation[]>('/vacations?status=pending')
      .then((res) => {
        setVacations(res.data.filter((v) => v.createdBy._id !== profile?.userId));
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
  }, [triggerFetch, isModalOpen]);

  return (
    <>
      <>{contextHolder}</>
      <Button type="default" onClick={() => setIsModalOpen(true)}>
        Vacation requests
      </Button>

      <Modal destroyOnClose title="Vacation requests" centered open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
        {loading || !vacations ? (
          <Spinner />
        ) : (
          <Wrapper>
            {vacations.map((vacation) => (
              <Request key={vacation._id} vacation={vacation} refetchVacations={() => setTriggerFetch((prev) => !prev)} />
            ))}
          </Wrapper>
        )}
      </Modal>
    </>
  );
};
