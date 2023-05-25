import axios, { AxiosResponse } from 'axios';
import authService from './authService';

const httpService = axios.create({
  baseURL: 'http://localhost:3030',
  headers: {
    'Content-Type': 'application/json'
  }
});

httpService.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

httpService.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      authService.removeToken();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default {
  get: <T = any>(url: string, params?: object) => httpService.get<T>(url, { params }),
  post: <T = any>(url: string, data?: object) => httpService.post<T>(url, data),
  patch: <T = any>(url: string, data?: object) => httpService.patch<T>(url, data),
  delete: <T = any>(url: string) => httpService.delete<T>(url)
};
