import { Skeleton } from 'antd';
import { Paragraph } from 'src/components/Paragraph';
import { PageLayout } from 'src/containers/PageLayout';
import { useSession } from 'src/hooks/useSession';
import { AddTask } from 'src/pages/Tasks/containers/AddTask';
import { List } from 'src/pages/Tasks/containers/List';
import { useGroup } from 'src/pages/Tasks/useGroup';
import { useTasks } from 'src/pages/Tasks/useTasks';

export const Tasks = () => {
  const { contextHolder: groupContextHolder, loading: groupLoading, group } = useGroup();
  const { contextHolder: tasksContextHolder, loading: tasksLoading, tasks, refetchTasks } = useTasks();

  return (
    <PageLayout>
      {groupContextHolder}
      {groupLoading || !group ? (
        <Skeleton.Input />
      ) : (
        <Paragraph.XXL $heavy style={{ marginBottom: 24 }}>
          Tasks in {group?.title}
        </Paragraph.XXL>
      )}
      {tasksContextHolder}
      <List tasks={tasks} loading={tasksLoading} />
      <AddTask onAdd={refetchTasks} />
    </PageLayout>
  );
};
