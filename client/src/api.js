// src/api.js
import axios from 'axios';
import axiosInstance from './utils/axiosInstance';

// Obtiene la URL de la API desde las variables de entorno
const API_URL = process.env.REACT_APP_API_URL; // Cambia esto a tu URL de API

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

export const deleteUser = (id) => {
  return axios.delete(`/api/user/${id}`);
};

export const updateUserRole = (_id, role) => {
  return api.patch(`/user/${_id}`, { role });
};


export const requestPasswordReset = (data) => {
  return api.post('/user/request-password-reset', data);
};
