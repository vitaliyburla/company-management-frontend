export type UserRole = 'worker' | 'manager' | 'director';

export type User = {
  _id: string;
  name: string;
  createdAt: string;
  login: string;
  company: string;
  role: UserRole;
};
