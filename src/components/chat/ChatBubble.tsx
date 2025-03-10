
import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { authService } from '@/services/authService';
import { chatService } from '@/services/chatService';
import { supabase } from '@/integrations/supabase/client';
import ChatBox from './ChatBox';

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [queueLength, setQueueLength] = useState(0);
  const [estimatedResponseTime, setEstimatedResponseTime] = useState(0);
  const isLoggedIn = authService.isAuthenticated();
  const [activeChats, setActiveChats] = useState<any[]>([]);

  // Fetch user chats on login
  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserChats = async () => {
        const userProfile = JSON.parse(localStorage.getItem('user') || '{}');
        if (userProfile.id) {
          const userChats = await chatService.getChatsForUser(userProfile.id, 'active');
          setActiveChats(userChats);
          
          // Calculate unread messages
          const chatIds = userChats.map(chat => chat.id);
          let totalUnread = 0;
          
          for (const chatId of chatIds) {
            const messages = await chatService.getChatMessages(chatId);
            const unread = messages.filter(msg => 
              !msg.is_read && msg.sender_id !== userProfile.id
            ).length;
            totalUnread += unread;
          }
          
          setUnreadMessages(totalUnread);
        }
      };
      
      fetchUserChats();
      
      // Subscribe to new messages
      const subscribeToAllChats = async () => {
        const userProfile = JSON.parse(localStorage.getItem('user') || '{}');
        if (userProfile.id) {
          const userChats = await chatService.getChatsForUser(userProfile.id);
          
          // Subscribe to each chat
          const subscriptions = userChats.map(chat => 
            chatService.subscribeToMessages(
              chat.id,
              () => {
                // Increment unread count when chat is closed
                if (!isOpen) {
                  setUnreadMessages(prev => prev + 1);
                }
              }
            )
          );
          
          return () => {
            // Clean up subscriptions
            subscriptions.forEach(subscription => {
              supabase.removeChannel(subscription);
            });
          };
        }
      };
      
      const unsubscribe = subscribeToAllChats();
      
      return () => {
        if (unsubscribe) {
          unsubscribe.then(cleanup => {
            if (cleanup) cleanup();
          });
        }
      };
    }
  }, [isLoggedIn]);

  // Simulate queue metrics - in a real app this would come from an API
  useEffect(() => {
    if (isLoggedIn) {
      // Mock data for queue length (1-5 people) and response time (3-15 minutes)
      setQueueLength(Math.floor(Math.random() * 5) + 1);
      setEstimatedResponseTime(Math.floor(Math.random() * 12) + 3);
    }
  }, [isLoggedIn]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setUnreadMessages(0); // Reset unread messages when opening chat
    
    // Mark messages as read
    const markAllAsRead = async () => {
      const userProfile = JSON.parse(localStorage.getItem('user') || '{}');
      if (userProfile.id) {
        for (const chat of activeChats) {
          await chatService.markMessagesAsRead(chat.id, userProfile.id);
        }
      }
    };
    
    markAllAsRead();
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Chat Bubble - now positioned on the right */}
      <div 
        className="fixed bottom-6 right-6 z-40 shadow-lg rounded-full cursor-pointer transition-transform hover:scale-110 group"
        onClick={handleOpenChat}
      >
        <div className="relative bg-ccd-600 text-white p-3 rounded-full flex items-center justify-center">
          <MessageCircle size={28} />
          
          {/* Notification Badge */}
          {unreadMessages > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0"
            >
              {unreadMessages}
            </Badge>
          )}
        </div>
        
        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bottom-full right-0 mb-2 w-48 bg-white text-gray-700 p-2 rounded-lg shadow-md text-xs">
          {isLoggedIn ? "Iniciar una conversación" : "Iniciar sesión para chatear con un asesor"}
        </div>
      </div>
      
      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md h-[500px] p-0 flex flex-col">
          <div className="bg-ccd-600 text-white p-4 flex justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Soporte CCD</h3>
              {isLoggedIn && (
                <span className="text-xs text-ccd-50">
                  {queueLength} en cola • ~{estimatedResponseTime} min de espera
                </span>
              )}
            </div>
            <button onClick={handleCloseChat} className="text-white hover:text-gray-200">
              <X size={20} />
            </button>
          </div>
          
          <ChatBox isLoggedIn={isLoggedIn} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatBubble;
