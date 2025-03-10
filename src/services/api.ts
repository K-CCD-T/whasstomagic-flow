
import axios from 'axios';
import { authService } from './authService';
import { useNavigate } from 'react-router-dom';

// Crear instancia de axios
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Habilitar cookies en solicitudes
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para incluir el token JWT en cada solicitud (solo si no usamos cookies)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta (como tokens expirados)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Eliminar token inválido y redirigir al login
      authService.logout();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
