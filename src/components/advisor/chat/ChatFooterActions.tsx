
import { Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "./types";

interface ChatFooterActionsProps {
  chat: ChatMessage;
  handleResolveChat: (chatId: string) => void;
}

const ChatFooterActions = ({ chat, handleResolveChat }: ChatFooterActionsProps) => {
  if (!chat) return null;
  
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex space-x-2">
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          Agendar llamada
        </Button>
        <Button variant="outline" size="sm">
          <Tag className="mr-2 h-4 w-4" />
          Etiquetar conversación
        </Button>
      </div>
      {chat.status === "active" && (
        <Button variant="outline" onClick={() => handleResolveChat(chat.id)}>
          Marcar como resuelto
        </Button>
      )}
    </div>
  );
};

export default ChatFooterActions;
