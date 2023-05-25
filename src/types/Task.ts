import { User } from 'src/types/User';

export type TaskStatus = 'todo' | 'inprogress' | 'done' | 'paused';

export type Task = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  createdBy: User;
  group: string;
  status: TaskStatus;
  assignedTo: User[];
};
