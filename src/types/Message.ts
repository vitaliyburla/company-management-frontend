import { User } from 'src/types/User';

export type MessageType = 'system' | 'info';

export type Message = {
  _id: string;

  content: string;

  type: MessageType;

  createdBy: User;

  sentTo: User[];

  createdAt: string;

  company: string;
};
