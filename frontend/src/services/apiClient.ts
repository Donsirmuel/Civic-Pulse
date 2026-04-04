import axios, { type AxiosInstance, type AxiosResponse, AxiosError, type InternalAxiosRequestConfig } from 'axios';

// Configure the base URL - change this if your backend is on a different port/host
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Handle errors globally
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
