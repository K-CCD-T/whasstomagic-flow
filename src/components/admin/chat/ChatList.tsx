
import { UserRound, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ChatMessage } from "./types";

interface ChatListProps {
  chats: ChatMessage[];
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
}

const ChatList = ({ chats, selectedChat, onSelectChat }: ChatListProps) => {
  return (
    <div className="lg:col-span-1 border rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <h3 className="font-medium">Conversaciones</h3>
      </div>
      <div className="overflow-y-auto max-h-[600px]">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div 
              key={chat.id}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                selectedChat === chat.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {chat.type === "agent" ? (
                    <UserRound className="w-5 h-5 mr-2 text-orange-500" />
                  ) : (
                    <Bot className="w-5 h-5 mr-2 text-blue-500" />
                  )}
                  <div>
                    <h4 className="font-medium">{chat.userName}</h4>
                    <p className="text-sm text-gray-500">{chat.userEmail}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500">
                    {chat.timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                  </span>
                  {chat.unreadCount > 0 && (
                    <Badge variant="destructive" className="mt-1">
                      {chat.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
              <p className="mt-2 text-sm truncate">{chat.lastMessage}</p>
              <div className="mt-2 flex justify-between">
                <Badge 
                  variant={
                    chat.status === "waiting" ? "destructive" : 
                    chat.status === "active" ? "default" : "outline"
                  }
                  className="text-xs"
                >
                  {chat.status === "waiting" ? "En Espera" : 
                   chat.status === "active" ? "Activo" : "Resuelto"}
                </Badge>
                {chat.assignedTo && (
                  <span className="text-xs text-gray-500">{chat.assignedTo}</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            No hay conversaciones que mostrar
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
