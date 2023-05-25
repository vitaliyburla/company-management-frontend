import { Profile } from 'src/types/Profile';

export function parseJwt(token: string): Profile | null {
  if (!token) {
    return null;
  }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');

  const parsedToken = JSON.parse(window.atob(base64));
  return {
    login: parsedToken.login,
    userId: parsedToken.sub,
    company: parsedToken.company,
    role: parsedToken.role,
    name: parsedToken.name
  };
}
