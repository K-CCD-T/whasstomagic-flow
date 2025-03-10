
import { ChatMessage as AdminChatMessage } from "@/components/admin/chat/types";

// Export the ChatMessage type from admin/chat/types.ts to reuse it
export type ChatMessage = AdminChatMessage;

// Chat filter type specific to the advisor context
export type ChatFilter = "all" | "active" | "resolved";

// Add Supabase database types for chat messages
export interface DBChatMessage {
  id: string;
  chat_id: string;
  sender_id: string;
  message: string;
  is_read: boolean;
  attachment_url?: string;
  created_at: string;
  // User data joined from profiles table
  profiles?: {
    nombre: string;
    apellidos: string;
    tipo: string;
  };
}

// Add Supabase database types for chats
export interface DBChat {
  id: string;
  title: string;
  created_at: string;
  user_id: string;
  status: 'active' | 'resolved';
  assigned_to?: string;
  is_bot_conversation: boolean;
  // User data joined from profiles table
  profiles?: {
    nombre: string;
    apellidos: string;
    tipo: string;
  };
}
