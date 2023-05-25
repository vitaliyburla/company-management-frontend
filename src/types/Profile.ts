import { UserRole } from 'src/types/User';

export type Profile = {
  login: string;
  name: string;
  userId: string;
  company: string;
  role: UserRole;
};
