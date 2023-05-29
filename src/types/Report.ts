import { User } from 'src/types/User';

export type Report = {
  _id: string;
  title: string;
  description: string;
  createdBy: User;
  task: string;
  createdAt: string;
};
