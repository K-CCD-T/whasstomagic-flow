
import api from './api';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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
      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Fallback to mock data if no session
        return [
          {
            id: 1,
            usuario_id: 123,
            tipo: 'Solicitud de constancia',
            descripcion: 'Necesito una constancia de estudios para trámites laborales',
            estado: 'pendiente',
            fecha_creacion: new Date().toISOString()
          },
          {
            id: 2,
            usuario_id: 123,
            tipo: 'Rectificación de notas',
            descripcion: 'Solicito revisión de calificación del curso de Matemáticas',
            estado: 'en_proceso',
            fecha_creacion: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];
      }
      
      const role = JSON.parse(localStorage.getItem('user') || '{}').rol;
      
      let query = supabase.from('tickets').select('*');
      
      // Filter based on user role
      if (role === 'student') {
        query = query.eq('usuario_id', session.user.id);
      } else if (role === 'advisor') {
        query = query.or(`asesor_id.eq.${session.user.id},asesor_id.is.null`);
      }
      // No filter for admin - they see all tickets
      
      const { data, error } = await query.order('fecha_creacion', { ascending: false });
      
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error('Error al obtener tickets:', error);
      toast.error('No se pudieron cargar los trámites');
      return [];
    }
  },
  
  async createTicket(ticketData: CreateTicketData): Promise<Ticket | null> {
    try {
      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Usuario no autenticado');
      }
      
      const { data, error } = await supabase
        .from('tickets')
        .insert({
          usuario_id: session.user.id,
          tipo: ticketData.tipo,
          descripcion: ticketData.descripcion,
          estado: 'pendiente'
        })
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success('Trámite creado correctamente');
      return data;
    } catch (error) {
      console.error('Error al crear ticket:', error);
      toast.error('No se pudo crear el trámite');
      return null;
    }
  }
};
