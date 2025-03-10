
import { useState } from 'react';
import { Bot, UserRound, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LoginForm from '@/components/LoginForm';

interface ChatBoxProps {
  isLoggedIn: boolean;
}

interface Message {
  sender: 'user' | 'agent' | 'bot';
  text: string;
  timestamp: Date;
}

const ChatBox = ({ isLoggedIn }: ChatBoxProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState<'agent' | 'bot' | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Initial welcome message based on login status
  const welcomeMessage = isLoggedIn
    ? "¿Cómo podemos ayudarte hoy? Escoge una opción:"
    : "Bienvenido al chat de soporte. Para continuar, necesitas iniciar sesión:";

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      sender: 'user',
      text: currentMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    
    // Simulate response
    setTimeout(() => {
      let responseText = '';
      
      if (selectedOption === 'agent') {
        responseText = "Gracias por tu mensaje. Un asesor lo revisará y te responderá pronto.";
      } else {
        responseText = "Soy el asistente virtual de CCD. Estoy aquí para ayudarte con preguntas frecuentes sobre trámites académicos.";
      }
      
      const responseMessage: Message = {
        sender: selectedOption || 'bot',
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOptionSelect = (option: 'agent' | 'bot') => {
    setSelectedOption(option);
    
    // Add system message based on selection
    const systemMessage: Message = {
      sender: option,
      text: option === 'agent' 
        ? "Has seleccionado chatear con un asesor en vivo. ¿En qué podemos ayudarte?"
        : "Has seleccionado el asistente virtual. ¿Qué información necesitas?",
      timestamp: new Date()
    };
    
    setMessages([systemMessage]);
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
