
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
