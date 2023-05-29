import 'react-quill/dist/quill.snow.css';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Checkbox, Modal, message } from 'antd';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import httpService from 'src/services/httpService';
import styled from 'styled-components';
import { User } from 'src/types/User';
import { Spinner } from 'src/components/Spinner';
import { Paragraph } from 'src/components/Paragraph';
import { roles } from 'src/constants/user';
import { Task, TaskStatus } from 'src/types/Task';
import { taskStatus } from 'src/constants/task';
import { useSession } from 'src/hooks/useSession';

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledAvatar = styled(Avatar)`
  cursor: pointer;

  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
`;

interface Props {
  assignedTo: User[];
  updateAssignedTo: (assignedTo: User[]) => void;
  status: TaskStatus;
}

export const Assignees = ({ assignedTo, updateAssignedTo, status }: Props) => {
  const { profile } = useSession();
  const { taskId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [users, setUsers] = useState<User[]>([]);

  const handleCheck = async (userId: string, action: 'add' | 'remove') => {
    try {
      if (action === 'add') {
        const res = await httpService.post<Task>(`/tasks/${taskId}/assignee`, { userId });
        updateAssignedTo(res.data.assignedTo);
      } else if (action === 'remove') {
        const res = await httpService.delete<Task>(`/tasks/${taskId}/assignee?userId=${userId}`);
        updateAssignedTo(res.data.assignedTo);
      }
    } catch (error) {
      isAxiosError(error) &&
        messageApi.open({
          type: 'error',
          content: error.response?.data?.message
        });
    }
  };

  useEffect(() => {
    if (profile?.role === 'worker') {
      setUsers(assignedTo);
      return;
    }

    setLoading(true);
    httpService
      .get('/users')
      .then((res) => {
        setUsers(res.data);
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
  }, [profile]);

  const statusColor = taskStatus[status].color;

  return (
    <>
      <Badge count={assignedTo.length} showZero color={statusColor} size="default">
        <StyledAvatar
          onClick={() => setIsModalOpen(true)}
          size={28}
          shape="square"
          icon={<UserOutlined />}
          style={{ backgroundColor: statusColor }}
        />
      </Badge>
      {contextHolder}
      <Modal destroyOnClose title="Assignees" centered open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
        {loading || !users ? (
          <Spinner />
        ) : (
          <Wrapper>
            {users.map((user) => (
              <Item key={user._id}>
                {(profile?.role === 'director' || profile?.role === 'manager') && (
                  <Checkbox
                    checked={!!assignedTo.find((assigned) => assigned._id === user._id)}
                    onChange={(e) => {
                      handleCheck(user._id, e.target.checked ? 'add' : 'remove');
                    }}
                  />
                )}

                <Paragraph.L>
                  {user.name}&nbsp;
                  <Paragraph.M color="secondary" as="span">
                    {roles[user.role]}
                  </Paragraph.M>
                </Paragraph.L>
              </Item>
            ))}
          </Wrapper>
        )}
      </Modal>
    </>
  );
};
