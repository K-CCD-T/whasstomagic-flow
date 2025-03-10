
import api from './api';
import { toast } from 'sonner';

interface User {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

export const userService = {
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await api.get<User[]>('/users');
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      toast.error('No se pudieron cargar los usuarios');
      return [];
    }
  }
};
