import React from 'react';
import { Skeleton, Space } from 'antd';
import { Paragraph } from 'src/components/Paragraph';
import { PageLayout } from 'src/containers/PageLayout';
import { useReports } from 'src/pages/Task/useReports';
import { useTask } from 'src/pages/Task/useTask';
import { styled } from 'styled-components';
import { THEME } from 'src/theme';
import { List } from 'src/pages/Task/containers/List';
import { AddReport } from 'src/pages/Task/containers/AddReport';
import { Assignees } from 'src/pages/Task/containers/Assignees';
import { useSession } from 'src/hooks/useSession';
import { Status } from 'src/pages/Task/containers/Status';
import { taskStatus } from 'src/constants/task';

const Description = styled.div`
  padding: 24px;
  border: 1px solid ${THEME.color.neutral.line};
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Task = () => {
  const { profile } = useSession();
  const { task, loading: taskLoading, contextHolder: taskContextHolder, updateAssignedTo, updateStatus } = useTask();
  const { reports, loading: reportsLoading, contextHolder: reportsContextHolder, refetchReports } = useReports();

  return (
    <PageLayout>
      <>{taskContextHolder}</>
      {taskLoading || !task ? (
        <Skeleton active />
      ) : (
        <>
          <Header>
            <Paragraph.XXL $heavy style={{ marginBottom: 24 }}>
              Task - {task.title}
            </Paragraph.XXL>
            <Space size={16}>
              {profile?.role === 'director' || profile?.role === 'manager' || !!task.assignedTo.find((user) => user._id === profile?.userId) ? (
                <Status status={task.status} updateStatus={updateStatus} />
              ) : (
                <Paragraph.L $heavy style={{ color: taskStatus[task.status].color }}>
                  {taskStatus[task.status].title}
                </Paragraph.L>
              )}
              <Assignees assignedTo={task.assignedTo} updateAssignedTo={updateAssignedTo} status={task.status} />
            </Space>
          </Header>
          <Description style={{ marginBottom: 24 }}>
            <Paragraph.XL $heavy style={{ marginBottom: 12 }}>
              Description:
            </Paragraph.XL>
            <div dangerouslySetInnerHTML={{ __html: task.description }} />
          </Description>
        </>
      )}
      <AddReport onAdd={refetchReports} />
      <>{reportsContextHolder}</>
      <List reports={reports} loading={reportsLoading} />
    </PageLayout>
  );
};
