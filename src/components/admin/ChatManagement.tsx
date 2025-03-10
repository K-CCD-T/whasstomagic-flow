
import { useState, useEffect } from "react";
import { Clock, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ChatFilter, ChatMessage } from "./chat/types";
import { advisors } from "./chat/chatData";
import ChatList from "./chat/ChatList";
import ChatDetail from "./chat/ChatDetail";
import ChatEmptyState from "./chat/ChatEmptyState";
import { chatService } from "@/services/chatService";
import { supabase } from "@/integrations/supabase/client";
import { DBChatMessage } from "@/components/advisor/chat/types";

const ChatManagement = () => {
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chatFilter, setChatFilter] = useState<ChatFilter>("all");
  const [messageInput, setMessageInput] = useState("");
  const [internalMessageInput, setInternalMessageInput] = useState("");
  const [selectedAdvisor, setSelectedAdvisor] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState<DBChatMessage[]>([]);

  // Fetch all chats from Supabase
  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      
      const chatsData = await chatService.getAllChats(
        chatFilter !== 'all' ? chatFilter : undefined
      );
      
      // Transform Supabase data to ChatMessage format
      const formattedChats = chatsData.map(chat => {
        return {
          id: chat.id,
          userName: `${chat.profiles?.nombre || ''} ${chat.profiles?.apellidos || ''}`.trim() || 'Usuario',
          userEmail: 'usuario@ejemplo.com', // Could fetch from auth.users if needed
          timestamp: new Date(chat.created_at),
          lastMessage: 'Cargando último mensaje...',
          status: chat.status === 'active' 
            ? chat.assigned_to ? 'active' : 'waiting'
            : 'resolved',
          type: chat.is_bot_conversation ? "bot" : "agent",
          assignedTo: chat.assigned_to ? `Asesor ID: ${chat.assigned_to}` : undefined,
          unreadCount: 0,
          chat_id: chat.id,
          user_id: chat.user_id
        } as ChatMessage;
      });
      
      setChats(formattedChats);
      setLoading(false);
    };
    
    fetchChats();
  }, [chatFilter]);

  // Subscribe to changes in chat messages
  useEffect(() => {
    if (selectedChat) {
      // Load initial messages
      loadMessages(selectedChat);
      
      // Subscribe to new messages
      const subscription = chatService.subscribeToMessages(
        selectedChat,
        () => {
          // When a new message arrives, reload all messages
          loadMessages(selectedChat);
        }
      );
      
      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [selectedChat]);

  const loadMessages = async (chatId: string) => {
    const messages = await chatService.getChatMessages(chatId);
    setChatMessages(messages);
    
    // Mark messages as read
    const userProfile = JSON.parse(localStorage.getItem('user') || '{}');
    if (userProfile.id) {
      await chatService.markMessagesAsRead(chatId, userProfile.id);
    }
    
    // Update last message in chat list
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      setChats(prev => prev.map(chat => 
        chat.id === chatId ? { 
          ...chat, 
          lastMessage: lastMessage.message,
          unreadCount: 0
        } : chat
      ));
    }
  };

  const handleAssignChat = async (chatId: string) => {
    if (!selectedAdvisor) {
      toast.error("Selecciona un asesor para asignar el chat");
      return;
    }
    
    const success = await chatService.assignChatToAdvisor(chatId, selectedAdvisor);
    
    if (success) {
      const advisorName = advisors.find(a => a.id === selectedAdvisor)?.name || "Asesor sin nombre";
      
      setChats(prev => prev.map(chat => 
        chat.id === chatId ? { ...chat, status: "active", assignedTo: advisorName } : chat
      ));
      
      toast.success(`Chat asignado a ${advisorName}`);
      setSelectedAdvisor("");
    }
  };

  const handleResolveChat = async (chatId: string) => {
    const success = await chatService.markChatAsResolved(chatId);
    
    if (success) {
      setChats(prev => prev.map(chat => 
        chat.id === chatId ? { ...chat, status: "resolved" } : chat
      ));
      toast.success("Chat marcado como resuelto");
    }
  };

  const handleSelectChat = async (chatId: string) => {
    setSelectedChat(chatId);
    
    // Mark as read when selected
    const userProfile = JSON.parse(localStorage.getItem('user') || '{}');
    if (userProfile.id) {
      await chatService.markMessagesAsRead(chatId, userProfile.id);
      
      setChats(prev => prev.map(chat => 
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      ));
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedChat) return;
    
    const userProfile = JSON.parse(localStorage.getItem('user') || '{}');
    if (!userProfile.id) {
      toast.error('No se pudo identificar al usuario');
      return;
    }
    
    const success = await chatService.sendMessage({
      chatId: selectedChat,
      senderId: userProfile.id,
      message: messageInput
    });
    
    if (success) {
      setMessageInput("");
      // The message will be added to the list via the subscription
      toast.success("Mensaje enviado al estudiante");
    }
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
              loading={loading}
            />

            {/* Chat Detail */}
            <div className="lg:col-span-2">
              {selectedChat && currentChat ? (
                <ChatDetail
                  chat={currentChat}
                  messages={chatMessages}
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
