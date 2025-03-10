
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { DBChatMessage } from '@/components/advisor/chat/types';

export interface ChatData {
  id?: string;
  title: string;
  userId: string;
  status?: 'active' | 'resolved';
  assignedTo?: string | null;
  isBotConversation: boolean;
}

export interface MessageData {
  chatId: string;
  senderId: string;
  message: string;
  attachmentUrl?: string;
}

export const chatService = {
  async createChat(chatData: ChatData): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('chats')
        .insert({
          title: chatData.title,
          user_id: chatData.userId,
          status: chatData.status || 'active',
          assigned_to: chatData.assignedTo,
          is_bot_conversation: chatData.isBotConversation
        })
        .select('id')
        .single();

      if (error) throw error;
      return data?.id || null;
    } catch (error) {
      console.error('Error creating chat:', error);
      toast.error('No se pudo crear el chat');
      return null;
    }
  },

  async sendMessage(messageData: MessageData): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          chat_id: messageData.chatId,
          sender_id: messageData.senderId,
          message: messageData.message,
          attachment_url: messageData.attachmentUrl,
          is_read: false
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('No se pudo enviar el mensaje');
      return false;
    }
  },

  async getChatsForUser(userId: string, filter?: 'active' | 'resolved'): Promise<any[]> {
    try {
      let query = supabase
        .from('chats')
        .select(`
          *,
          profiles!chats_user_id_fkey(nombre, apellidos, tipo)
        `)
        .eq('user_id', userId);
      
      if (filter) {
        query = query.eq('status', filter);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching chats:', error);
      toast.error('No se pudieron cargar los chats');
      return [];
    }
  },

  async getAssignedChats(advisorId: string, filter?: 'active' | 'resolved'): Promise<any[]> {
    try {
      let query = supabase
        .from('chats')
        .select(`
          *,
          profiles!chats_user_id_fkey(nombre, apellidos, tipo)
        `)
        .eq('assigned_to', advisorId);
      
      if (filter) {
        query = query.eq('status', filter);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching assigned chats:', error);
      toast.error('No se pudieron cargar los chats asignados');
      return [];
    }
  },

  async getAllChats(filter?: 'active' | 'waiting' | 'resolved'): Promise<any[]> {
    try {
      let query = supabase
        .from('chats')
        .select(`
          *,
          profiles!chats_user_id_fkey(nombre, apellidos, tipo)
        `);
      
      if (filter) {
        if (filter === 'waiting') {
          query = query.is('assigned_to', null).eq('status', 'active');
        } else if (filter === 'active' || filter === 'resolved') {
          query = query.eq('status', filter);
        }
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching all chats:', error);
      toast.error('No se pudieron cargar los chats');
      return [];
    }
  },

  async getChatMessages(chatId: string): Promise<DBChatMessage[]> {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          *,
          profiles(nombre, apellidos, tipo)
        `)
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      toast.error('No se pudieron cargar los mensajes');
      return [];
    }
  },

  async markChatAsResolved(chatId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('chats')
        .update({ status: 'resolved' })
        .eq('id', chatId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error marking chat as resolved:', error);
      toast.error('No se pudo marcar el chat como resuelto');
      return false;
    }
  },

  async assignChatToAdvisor(chatId: string, advisorId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('chats')
        .update({ assigned_to: advisorId })
        .eq('id', chatId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error assigning chat:', error);
      toast.error('No se pudo asignar el chat');
      return false;
    }
  },

  subscribeToMessages(chatId: string, callback: (payload: any) => void) {
    // Return the channel directly, not a promise
    return supabase
      .channel(`chat:${chatId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `chat_id=eq.${chatId}`
        },
        callback
      )
      .subscribe();
  },

  async markMessagesAsRead(chatId: string, userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .update({ is_read: true })
        .eq('chat_id', chatId)
        .neq('sender_id', userId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error marking messages as read:', error);
      return false;
    }
  }
};
