import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
},
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');

    if (token) {
      if (config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },
  
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Token expirado. Redirecionando para login...');
        
        localStorage.removeItem('token');
        localStorage.removeItem('login');
        window.location.href = '/sign-in';
      }
    }
    return Promise.reject(error);
  }
);
