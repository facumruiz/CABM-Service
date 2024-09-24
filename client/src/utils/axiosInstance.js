import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5050', // Cambia esto por la URL de tu API
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
