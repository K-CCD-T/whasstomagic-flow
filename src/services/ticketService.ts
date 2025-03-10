
import api from './api';
import { toast } from 'sonner';

interface Ticket {
  id: number;
  usuario_id: number;
  tipo: string;
  descripcion: string;
  estado: string;
  fecha_creacion: string;
}

interface CreateTicketData {
  tipo: string;
  descripcion: string;
}

export const ticketService = {
  async getMyTickets(): Promise<Ticket[]> {
    try {
      const response = await api.get<Ticket[]>('/tickets');
      return response.data;
    } catch (error) {
      console.error('Error al obtener tickets:', error);
      toast.error('No se pudieron cargar los trámites');
      return [];
    }
  },
  
  async createTicket(ticketData: CreateTicketData): Promise<Ticket | null> {
    try {
      const response = await api.post<Ticket>('/tickets', ticketData);
      toast.success('Trámite creado correctamente');
      return response.data;
    } catch (error) {
      console.error('Error al crear ticket:', error);
      toast.error('No se pudo crear el trámite');
      return null;
    }
  }
};
