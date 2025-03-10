
import { useState, useEffect, useRef } from 'react';
import { Bot, UserRound, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LoginForm from '@/components/LoginForm';
import { authService } from '@/services/authService';
import { chatService } from '@/services/chatService';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ChatBoxProps {
  isLoggedIn: boolean;
}

interface Message {
  id: string;
  sender: 'user' | 'agent' | 'bot';
  text: string;
  timestamp: Date;
  is_read: boolean;
}

const ChatBox = ({ isLoggedIn }: ChatBoxProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState<'agent' | 'bot' | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message based on login status
  const welcomeMessage = isLoggedIn
    ? "¿Cómo podemos ayudarte hoy? Escoge una opción:"
    : "Bienvenido al chat de soporte. Para continuar, necesitas iniciar sesión:";

  useEffect(() => {
    if (isLoggedIn && currentChatId) {
      // Load existing messages
      loadMessages();
      
      // Subscribe to new messages
      const subscription = chatService.subscribeToMessages(
        currentChatId,
        (payload) => {
          const newMessage = payload.new;
          if (newMessage) {
            const userProfile = JSON.parse(localStorage.getItem('user') || '{}');
            
            // Don't add messages that are from the current user (already added)
            if (newMessage.sender_id !== userProfile.id) {
              const senderType = newMessage.profiles?.tipo === 'advisor' ? 'agent' : 'bot';
              
              setMessages(prev => [
                ...prev,
                {
                  id: newMessage.id,
                  sender: senderType,
                  text: newMessage.message,
                  timestamp: new Date(newMessage.created_at),
                  is_read: newMessage.is_read
                }
              ]);
            }
          }
        }
      );

      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [isLoggedIn, currentChatId]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMessages = async () => {
    if (!currentChatId) return;
    
    const chatMessages = await chatService.getChatMessages(currentChatId);
    
    const formattedMessages = chatMessages.map(msg => {
      const userProfile = JSON.parse(localStorage.getItem('user') || '{}');
      let senderType: 'user' | 'agent' | 'bot';
      
      if (msg.sender_id === userProfile.id) {
        senderType = 'user';
      } else {
        senderType = msg.profiles?.tipo === 'advisor' ? 'agent' : 'bot';
      }
      
      return {
        id: msg.id,
        sender: senderType,
        text: msg.message,
        timestamp: new Date(msg.created_at),
        is_read: msg.is_read
      };
    });
    
    setMessages(formattedMessages);
    
    // Mark messages as read
    const userProfile = JSON.parse(localStorage.getItem('user') || '{}');
    if (userProfile.id) {
      await chatService.markMessagesAsRead(currentChatId, userProfile.id);
    }
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;
    
    const userProfile = JSON.parse(localStorage.getItem('user') || '{}');
    if (!userProfile.id) {
      toast.error('No se pudo identificar al usuario');
      return;
    }
    
    // Create chat if it doesn't exist
    if (!currentChatId) {
      const chatId = await chatService.createChat({
        title: `Chat de ${userProfile.nombre || 'Usuario'}`,
        userId: userProfile.id,
        isBotConversation: selectedOption === 'bot'
      });
      
      if (chatId) {
        setCurrentChatId(chatId);
        
        // Add user message
        const userMessage: Message = {
          id: Date.now().toString(),
          sender: 'user',
          text: currentMessage,
          timestamp: new Date(),
          is_read: true
        };
        
        setMessages(prev => [...prev, userMessage]);
        
        // Send message to Supabase
        await chatService.sendMessage({
          chatId,
          senderId: userProfile.id,
          message: currentMessage
        });
        
        setCurrentMessage('');
      }
    } else {
      // Add user message to UI immediately
      const userMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text: currentMessage,
        timestamp: new Date(),
        is_read: true
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Send message to Supabase
      await chatService.sendMessage({
        chatId: currentChatId,
        senderId: userProfile.id,
        message: currentMessage
      });
      
      setCurrentMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOptionSelect = async (option: 'agent' | 'bot') => {
    setSelectedOption(option);
    
    const userProfile = JSON.parse(localStorage.getItem('user') || '{}');
    if (!userProfile.id) {
      toast.error('No se pudo identificar al usuario');
      return;
    }
    
    // Create a new chat
    const chatId = await chatService.createChat({
      title: `Chat de ${userProfile.nombre || 'Usuario'}`,
      userId: userProfile.id,
      isBotConversation: option === 'bot'
    });
    
    if (chatId) {
      setCurrentChatId(chatId);
      
      // Add system message based on selection
      const systemMessage: Message = {
        id: Date.now().toString(),
        sender: option,
        text: option === 'agent' 
          ? "Has seleccionado chatear con un asesor en vivo. ¿En qué podemos ayudarte?"
          : "Has seleccionado el asistente virtual. ¿Qué información necesitas?",
        timestamp: new Date(),
        is_read: true
      };
      
      setMessages([systemMessage]);
      
      // Send the system message to Supabase
      const systemSenderId = option === 'bot' ? 'system-bot' : 'system-agent';
      await chatService.sendMessage({
        chatId,
        senderId: systemSenderId,
        message: systemMessage.text
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages Area */}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-600 mb-4">{welcomeMessage}</p>
            
            {isLoggedIn ? (
              <div className="flex justify-center space-x-3">
                <Button 
                  onClick={() => handleOptionSelect('agent')}
                  className="flex items-center space-x-2"
                  variant="outline"
                >
                  <UserRound size={16} />
                  <span>Asesor en vivo</span>
                </Button>
                <Button 
                  onClick={() => handleOptionSelect('bot')}
                  className="flex items-center space-x-2"
                  variant="outline"
                >
                  <Bot size={16} />
                  <span>Asistente virtual</span>
                </Button>
              </div>
            ) : (
              <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="default">Iniciar Sesión</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <LoginForm onSuccessfulLogin={() => setIsLoginModalOpen(false)} />
                </DialogContent>
              </Dialog>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.sender === 'user' 
                      ? 'bg-ccd-600 text-white rounded-br-none' 
                      : msg.sender === 'agent'
                        ? 'bg-orange-100 text-gray-800 rounded-bl-none'
                        : 'bg-blue-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {msg.sender === 'user' ? (
                      <span className="text-xs font-medium">Tú</span>
                    ) : (
                      <div className="flex items-center">
                        {msg.sender === 'agent' ? (
                          <UserRound size={12} className="mr-1" />
                        ) : (
                          <Bot size={12} className="mr-1" />
                        )}
                        <span className="text-xs font-medium">
                          {msg.sender === 'agent' ? 'Asesor' : 'Asistente Virtual'}
                        </span>
                      </div>
                    )}
                    <span className="text-xs ml-2 opacity-70">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* Input Area - Only show when logged in and option selected */}
      {isLoggedIn && selectedOption && (
        <div className="border-t p-3 bg-white">
          <div className="flex items-center">
            <textarea
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              className="flex-grow resize-none border rounded-l-lg p-2 focus:outline-none focus:ring-1 focus:ring-ccd-500"
              rows={2}
            />
            <button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim()}
              className="bg-ccd-600 text-white p-2 rounded-r-lg h-full hover:bg-ccd-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
