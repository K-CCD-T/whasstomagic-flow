
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import ChatList from "./chat/ChatList";
import ChatDetail from "./chat/ChatDetail";
import ChatEmptyState from "./chat/ChatEmptyState";
import { ChatMessage, ChatFilter, DBChatMessage } from "./chat/types";
import { chatService } from "@/services/chatService";
import { supabase } from "@/integrations/supabase/client";

const AdvisorChats = () => {
  const [assignedChats, setAssignedChats] = useState<ChatMessage[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chatFilter, setChatFilter] = useState<ChatFilter>("all");
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState<DBChatMessage[]>([]);

  // Fetch assigned chats from Supabase
  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      
      const userProfile = JSON.parse(localStorage.getItem('user') || '{}');
      if (!userProfile.id) {
        toast.error('No se pudo identificar al asesor');
        setLoading(false);
        return;
      }
      
      const chatsData = await chatService.getAssignedChats(
        userProfile.id, 
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
          status: chat.status,
          type: chat.is_bot_conversation ? "bot" : "agent",
          unreadCount: 0,
          chat_id: chat.id,
          user_id: chat.user_id
        } as ChatMessage;
      });
      
      setAssignedChats(formattedChats);
      setLoading(false);
    };
    
    fetchChats();
  }, [chatFilter]);

  // Subscribe to changes in chat messages
  useEffect(() => {
    if (selectedChat) {
      // Load initial messages
      loadMessages(selectedChat);
      
      // Subscribe to new messages - now returns channel directly, not a promise
      const channel = chatService.subscribeToMessages(
        selectedChat,
        () => {
          // When a new message arrives, reload all messages
          loadMessages(selectedChat);
        }
      );
      
      return () => {
        supabase.removeChannel(channel);
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
      setAssignedChats(prev => prev.map(chat => 
        chat.id === chatId ? { 
          ...chat, 
          lastMessage: lastMessage.message,
          unreadCount: 0
        } : chat
      ));
    }
  };

  const handleResolveChat = async (chatId: string) => {
    const success = await chatService.markChatAsResolved(chatId);
    
    if (success) {
      setAssignedChats(prev => prev.map(chat => 
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
      
      setAssignedChats(prev => prev.map(chat => 
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      ));
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedChat) return;
    
    const userProfile = JSON.parse(localStorage.getItem('user') || '{}');
    if (!userProfile.id) {
      toast.error('No se pudo identificar al asesor');
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
    }
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
              loading={loading}
            />

            {/* Chat Detail */}
            <div className="lg:col-span-2">
              {selectedChat && getSelectedChat() ? (
                <ChatDetail 
                  chat={getSelectedChat()!}
                  messages={chatMessages}
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
