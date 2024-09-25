// src/api.js
import axios from 'axios';
import axiosInstance from './utils/axiosInstance';

const API_URL = 'http://localhost:5050'; // Cambia esto a tu URL de API

const api = axios.create({
  baseURL: API_URL,
});

// Funciones para manejar las peticiones

export const login = (email, password) => {
  return api.post('/user/login', { email, password });
};

export const signup = (username, email, password) => {
  return api.post('/user', { username, email, password });
};

export const fetchUsers = () => {
  return axiosInstance.get('/user'); // Ruta para obtener todos los usuarios
};

export const requestPasswordReset = (data) => {
  return api.post('/user/request-password-reset', data);
};
