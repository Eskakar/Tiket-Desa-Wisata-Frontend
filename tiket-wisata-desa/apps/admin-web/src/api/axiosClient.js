import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://d-35-489204.uc.r.appspot.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menyisipkan token Admin
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;