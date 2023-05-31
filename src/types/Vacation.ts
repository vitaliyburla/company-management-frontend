import { User } from 'src/types/User';

export type VacationStatus = 'pending' | 'approved' | 'declined';

export type Vacation = {
  _id: string;
  description: string;
  startAt: string;
  endAt: string;
  createdBy: User;
  createdAt: string;
  reviewedBy: User;
  status: VacationStatus;
  company: string;
};
