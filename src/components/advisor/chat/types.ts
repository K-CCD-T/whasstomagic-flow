
import { ChatMessage as AdminChatMessage } from "@/components/admin/chat/types";

// Export the ChatMessage type from admin/chat/types.ts to reuse it
export type ChatMessage = AdminChatMessage;

// Chat filter type specific to the advisor context
export type ChatFilter = "all" | "active" | "resolved";
