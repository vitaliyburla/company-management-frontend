import { LoadingOutlined } from '@ant-design/icons';
import { Button, Popover, Space, message } from 'antd';
import { isAxiosError } from 'axios';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { Paragraph } from 'src/components/Paragraph';
import httpService from 'src/services/httpService';
import { THEME } from 'src/theme';
import { Vacation, VacationStatus } from 'src/types/Vacation';
import { styled } from 'styled-components';

interface Props {
  vacation: Vacation;
  refetchVacations: () => void;
}

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
  padding: 8px;
  background-color: ${THEME.color.neutral.base};
  border-radius: 4px;

  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${THEME.color.neutral.primary};
  }
`;

const ApproveButton = styled(Button)`
  background-color: ${THEME.color.success.default};
`;

const DeclineButton = styled(Button)`
  background-color: ${THEME.color.danger.default};
`;

export const Request = ({ refetchVacations, vacation }: Props) => {
  const [updating, setUpdating] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleReview = async (vacationId: string, status: VacationStatus) => {
    setUpdating(true);
    try {
      await httpService.patch(`/vacations/${vacationId}`, { status });
      refetchVacations();
    } catch (error) {
      isAxiosError(error) &&
        messageApi.open({
          type: 'error',
          content: error.response?.data?.message
        });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Popover
      content={
        <Space direction="vertical">
          <Paragraph.M>{vacation.description}</Paragraph.M>
          <Paragraph.M>From: {format(new Date(vacation.startAt), 'd MMMM yyyy')}</Paragraph.M>
          <Paragraph.M>To: {format(new Date(vacation.endAt), 'd MMMM yyyy')}</Paragraph.M>
        </Space>
      }
      title={vacation.createdBy.name}
      trigger="hover">
      <Item key={vacation._id}>
        <Paragraph.L>{vacation.createdBy.name}</Paragraph.L>

        <Space>
          {updating && <LoadingOutlined />}
          <DeclineButton
            type="primary"
            onClick={() => {
              handleReview(vacation._id, 'declined');
            }}>
            Decline
          </DeclineButton>
          <ApproveButton
            type="primary"
            onClick={() => {
              handleReview(vacation._id, 'approved');
            }}>
            Approve
          </ApproveButton>
        </Space>
      </Item>
    </Popover>
  );
};
