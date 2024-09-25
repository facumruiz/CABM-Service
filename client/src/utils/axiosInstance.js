// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Usa la variable de entorno con el prefijo REACT_APP_
});

// Interceptor para agregar el token en el header si está disponible
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // O donde estés almacenando el token
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
