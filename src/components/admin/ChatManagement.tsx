
import { useState, useEffect } from "react";
import { Clock, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ChatFilter, ChatMessage } from "./chat/types";
import { mockChats, advisors } from "./chat/chatData";
import ChatList from "./chat/ChatList";
import ChatDetail from "./chat/ChatDetail";
import ChatEmptyState from "./chat/ChatEmptyState";

const ChatManagement = () => {
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chatFilter, setChatFilter] = useState<ChatFilter>("all");
  const [messageInput, setMessageInput] = useState("");
  const [internalMessageInput, setInternalMessageInput] = useState("");
  const [selectedAdvisor, setSelectedAdvisor] = useState<string>("");

  // Simulate fetching chat data
  useEffect(() => {
    setChats(mockChats);
  }, []);

  const handleAssignChat = (chatId: string) => {
    if (!selectedAdvisor) {
      toast.error("Selecciona un asesor para asignar el chat");
      return;
    }
    
    const advisorName = advisors.find(a => a.id === selectedAdvisor)?.name || "Asesor sin nombre";
    
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, status: "active", assignedTo: advisorName } : chat
    ));
    
    toast.success(`Chat asignado a ${advisorName}`);
    setSelectedAdvisor("");
  };

  const handleResolveChat = (chatId: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, status: "resolved" } : chat
    ));
    toast.success("Chat marcado como resuelto");
  };

  const handleSelectChat = (chatId: string) => {
    setSelectedChat(chatId);
    // Mark as read when selected
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
    ));
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    // In a real app, this would send the message to the API
    toast.success("Mensaje enviado al estudiante");
    setMessageInput("");
  };

  const handleSendInternalMessage = () => {
    if (!internalMessageInput.trim()) return;
    
    // In a real app, this would send the internal message to the advisor
    const currentChat = chats.find(c => c.id === selectedChat);
    if (currentChat && currentChat.assignedTo) {
      toast.success(`Mensaje interno enviado a ${currentChat.assignedTo}`);
      setInternalMessageInput("");
    } else {
      toast.error("Este chat no tiene un asesor asignado");
    }
  };

  const filteredChats = chats.filter(chat => {
    if (chatFilter === "all") return true;
    return chat.status === chatFilter;
  });

  const currentChat = selectedChat ? chats.find(c => c.id === selectedChat) : null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Chats</h2>
        <div className="flex space-x-2">
          <Badge variant="outline" className="px-3 py-1">
            <Clock className="w-4 h-4 mr-1" />
            <span>En Espera: {chats.filter(c => c.status === "waiting").length}</span>
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            <MessageCircle className="w-4 h-4 mr-1" />
            <span>Activos: {chats.filter(c => c.status === "active").length}</span>
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={(value) => setChatFilter(value as ChatFilter)} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="waiting">En Espera</TabsTrigger>
          <TabsTrigger value="active">Activos</TabsTrigger>
          <TabsTrigger value="resolved">Resueltos</TabsTrigger>
        </TabsList>

        <TabsContent value={chatFilter} className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat List */}
            <ChatList 
              chats={filteredChats}
              selectedChat={selectedChat}
              onSelectChat={handleSelectChat}
            />

            {/* Chat Detail */}
            <div className="lg:col-span-2">
              {selectedChat && currentChat ? (
                <ChatDetail
                  chat={currentChat}
                  advisors={advisors}
                  selectedAdvisor={selectedAdvisor}
                  setSelectedAdvisor={setSelectedAdvisor}
                  messageInput={messageInput}
                  setMessageInput={setMessageInput}
                  internalMessageInput={internalMessageInput}
                  setInternalMessageInput={setInternalMessageInput}
                  handleSendMessage={handleSendMessage}
                  handleSendInternalMessage={handleSendInternalMessage}
                  handleAssignChat={handleAssignChat}
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

export default ChatManagement;
