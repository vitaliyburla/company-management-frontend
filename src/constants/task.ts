import { CheckCircleOutlined, PauseCircleOutlined, ScheduleOutlined, SyncOutlined } from '@ant-design/icons';
import { THEME } from 'src/theme';
import { TaskStatus } from 'src/types/Task';

export const taskStatus: Record<TaskStatus, { icon: React.ElementType; title: string; color: string }> = {
  todo: { icon: ScheduleOutlined, title: 'To do', color: THEME.color.neutral.dark },
  inprogress: { icon: SyncOutlined, title: 'In progress', color: THEME.color.primary.default },
  done: { icon: CheckCircleOutlined, title: 'Done', color: THEME.color.success.default },
  paused: { icon: PauseCircleOutlined, title: 'Paused', color: THEME.color.danger.default }
};
