import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Tooltip, Badge, Avatar } from 'antd';
import { format } from 'date-fns';
import { Paragraph } from 'src/components/Paragraph';
import { Spinner } from 'src/components/Spinner';
import { taskStatus } from 'src/constants/task';
import { THEME } from 'src/theme';
import { styled } from 'styled-components';
import { Task } from 'src/types/Task';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'src/constants/routes';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Card = styled.div<{ $accentColor: string }>`
  padding: 24px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.05);
  border: 1px solid ${(props) => props.$accentColor};
  min-width: 220px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${THEME.color.neutral.secondary};
  }
`;

const Status = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

interface Props {
  loading: boolean;
  tasks: Task[];
}

export const List = ({ tasks, loading }: Props) => {
  const navigate = useNavigate();

  if (loading) return <Spinner />;

  return (
    <Wrapper>
      {tasks.map((task) => {
        const StatusIcon = taskStatus[task.status].icon;
        const statusTitle = taskStatus[task.status].title;
        const statusColor = taskStatus[task.status].color;

        return (
          <Card key={task._id} $accentColor={statusColor} onClick={() => navigate(ROUTE.Groups.Task(task.group, task._id))}>
            <div>
              <Paragraph.XXL $heavy style={{ marginBottom: 20, color: statusColor }}>
                {task.title}
              </Paragraph.XXL>
              <Paragraph.L color="secondary">
                {format(new Date(task.createdAt), 'd MMMM yyyy, HH:mm')} created by
                <Paragraph.L color="secondary" as="span" $heavy>
                  &nbsp;{task.createdBy.name}
                </Paragraph.L>
              </Paragraph.L>
            </div>
            <Status>
              <Tooltip
                title={
                  <Paragraph.M style={{ color: statusColor }} $heavy>
                    {statusTitle}
                  </Paragraph.M>
                }>
                <StatusIcon style={{ fontSize: 18, color: statusColor }} />
              </Tooltip>
              <Tooltip
                overlayInnerStyle={{ background: THEME.color.neutral.secondary }}
                title={
                  <div>
                    <Paragraph.M color="secondary" $heavy>
                      {task.assignedTo.length ? 'Assigned to' : 'No assignees'}
                    </Paragraph.M>
                    {task.assignedTo.map((user) => (
                      <Paragraph.M key={user._id}>{user.name}</Paragraph.M>
                    ))}
                  </div>
                }
                placement="leftTop">
                <Badge count={task.assignedTo.length} showZero color={statusColor} size="default">
                  <Avatar size={28} shape="square" icon={<UserOutlined />} style={{ backgroundColor: statusColor }} />
                </Badge>
              </Tooltip>
            </Status>
          </Card>
        );
      })}
    </Wrapper>
  );
};
