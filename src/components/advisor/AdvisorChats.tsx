
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import ChatList from "./chat/ChatList";
import ChatDetail from "./chat/ChatDetail";
import ChatEmptyState from "./chat/ChatEmptyState";
import { ChatMessage, ChatFilter } from "./chat/types";
import { mockChats } from "./chat/mockData";

const AdvisorChats = () => {
  const [assignedChats, setAssignedChats] = useState<ChatMessage[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chatFilter, setChatFilter] = useState<ChatFilter>("all");
  const [messageInput, setMessageInput] = useState("");

  // Simulate fetching assigned chats
  useEffect(() => {
    // This would normally be an API call
    setAssignedChats(mockChats);
  }, []);

  const handleResolveChat = (chatId: string) => {
    setAssignedChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, status: "resolved" } : chat
    ));
    toast.success("Chat marcado como resuelto");
  };

  const handleSelectChat = (chatId: string) => {
    setSelectedChat(chatId);
    // Mark as read when selected
    setAssignedChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
    ));
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    // In a real app, this would send the message to the API
    toast.success("Mensaje enviado al estudiante");
    setMessageInput("");
  };

  const getSelectedChat = () => {
    return assignedChats.find(chat => chat.id === selectedChat);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Chats Asignados</h1>
        <p className="text-gray-600 mt-1">Gestiona tus conversaciones con estudiantes.</p>
      </div>

      <Tabs defaultValue="all" onValueChange={(value) => setChatFilter(value as ChatFilter)} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="active">Activos</TabsTrigger>
          <TabsTrigger value="resolved">Resueltos</TabsTrigger>
        </TabsList>

        <TabsContent value={chatFilter} className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat List */}
            <ChatList 
              chats={assignedChats}
              selectedChat={selectedChat}
              onSelectChat={handleSelectChat}
              filter={chatFilter}
            />

            {/* Chat Detail */}
            <div className="lg:col-span-2">
              {selectedChat && getSelectedChat() ? (
                <ChatDetail 
                  chat={getSelectedChat()!}
                  messageInput={messageInput}
                  setMessageInput={setMessageInput}
                  handleSendMessage={handleSendMessage}
                  handleResolveChat={handleResolveChat}
                />
              ) : (
                <ChatEmptyState />
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvisorChats;
