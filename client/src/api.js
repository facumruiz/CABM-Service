// src/api.js

// Otras importaciones
import axios from 'axios';
import axiosInstance from './utils/axiosInstance';

// Obtiene la URL de la API desde las variables de entorno
const API_URL = process.env.REACT_APP_API_URL; // Cambia esto a tu URL de API

const token = localStorage.getItem('token'); // Suponiendo que el token se guarda en localStorage

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'x-access-token': token,  // Usando el encabezado x-access-token
  },
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
  return api.delete(`/api/user/${id}`);
};

export const updateUserRole = (_id, role) => {
  return api.patch(`/user/${_id}`, { role });
};

export const requestPasswordReset = (data) => {
  return api.post('/user/request-password-reset', data);
};

export const fetchBebidas = () => {
  return api.get('/bebidas');
};

// Nueva función para crear una bebida
export const createBebida = (bebidaData) => {
  return api.post('/bebidas', bebidaData);
};

// Nueva función para actualizar una bebida
export const updateBebida = (id, bebidaData) => {
  return api.patch(`/bebidas/${id}`, bebidaData);
};

// Nueva función para eliminar una bebida
export const deleteBebida = (id) => {
  return api.delete(`/bebidas/${id}`);
};

// Nuevas funciones para manejar los menu items

export const fetchMenuItems = () => {
  return api.get('/menu-items'); // Ajusta la ruta según tu API
};

export const createMenuItem = (menuItemData) => {
  return api.post('/menu-items', menuItemData); // Ajusta la ruta según tu API
};

export const updateMenuItem = (id, menuItemData) => {
  return api.patch(`/menu-items/${id}`, menuItemData); // Ajusta la ruta según tu API
};

export const deleteMenuItem = (id) => {
  return api.delete(`/menu-items/${id}`); // Ajusta la ruta según tu API
};
