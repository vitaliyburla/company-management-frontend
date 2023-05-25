import { User } from 'src/types/User';

export type Group = {
  _id: string;
  title: string;
  createdAt: string;
  createdBy: User;
  company: string;
};
