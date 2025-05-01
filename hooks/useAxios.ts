import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4444';

export const useAxios = () => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add request interceptor to add tokens to headers
  instance.interceptors.request.use((config) => {
    // Get tokens from localStorage
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // Add tokens to headers if they exist
    if (accessToken) {
      config.headers['x-access-token'] = accessToken;
    }
    if (refreshToken) {
      config.headers['x-refresh-token'] = refreshToken;
    }

    return config;
  });

  return instance;
};

