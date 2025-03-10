
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Advisor, ChatMessage } from "./types";
import StudentProfile from "./StudentProfile";
import ChatMessageArea from "./ChatMessageArea";
import ChatActions from "./ChatActions";
import { UserRound, Bot } from "lucide-react";
import { DBChatMessage } from "@/components/advisor/chat/types";

interface ChatDetailProps {
  chat: ChatMessage;
  messages: DBChatMessage[];
  advisors: Advisor[];
  selectedAdvisor: string;
  setSelectedAdvisor: (advisorId: string) => void;
  messageInput: string;
  setMessageInput: (message: string) => void;
  internalMessageInput: string;
  setInternalMessageInput: (message: string) => void;
  handleSendMessage: () => void;
  handleSendInternalMessage: () => void;
  handleAssignChat: (chatId: string) => void;
  handleResolveChat: (chatId: string) => void;
}

const ChatDetail = ({
  chat,
  messages,
  advisors,
  selectedAdvisor,
  setSelectedAdvisor,
  messageInput,
  setMessageInput,
  internalMessageInput,
  setInternalMessageInput,
  handleSendMessage,
  handleSendInternalMessage,
  handleAssignChat,
  handleResolveChat
}: ChatDetailProps) => {
  // Function to determine if a message is from the current user
  const isCurrentUser = (senderId: string) => {
    const userProfile = JSON.parse(localStorage.getItem('user') || '{}');
    return userProfile.id === senderId;
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between">
          <div className="flex items-center">
            <span>{chat.userName}</span>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-2">
                  Ver perfil
                </Button>
              </DialogTrigger>
              <StudentProfile 
                studentInfo={chat.studentInfo} 
                userName={chat.userName} 
                userEmail={chat.userEmail} 
              />
            </Dialog>
          </div>
          <Badge variant="outline">
            {chat.type === "agent" ? "Asesor en vivo" : "Asistente virtual"}
          </Badge>
        </CardTitle>
        <CardDescription>
          {chat.userEmail} • Iniciado: {chat.timestamp.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow bg-gray-50 p-4 rounded-md">
        <div className="h-[400px] flex flex-col">
          <div className="flex-grow border rounded-md p-4 mb-4 overflow-y-auto bg-white">
            {messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${isCurrentUser(message.sender_id) ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        isCurrentUser(message.sender_id)
                          ? 'bg-ccd-600 text-white rounded-br-none' 
                          : message.profiles?.tipo === 'advisor'
                            ? 'bg-orange-100 text-gray-800 rounded-bl-none'
                            : 'bg-blue-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        {isCurrentUser(message.sender_id) ? (
                          <span className="text-xs font-medium">Tú</span>
                        ) : (
                          <div className="flex items-center">
                            {message.profiles?.tipo === 'advisor' ? (
                              <UserRound size={12} className="mr-1" />
                            ) : (
                              <Bot size={12} className="mr-1" />
                            )}
                            <span className="text-xs font-medium">
                              {message.profiles?.tipo === 'advisor' 
                                ? `${message.profiles?.nombre || ''} ${message.profiles?.apellidos || ''}`.trim() || 'Asesor'
                                : 'Estudiante'}
                            </span>
                          </div>
                        )}
                        <span className="text-xs ml-2 opacity-70">
                          {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No hay mensajes en esta conversación</p>
            )}
          </div>
          
          <ChatMessageArea 
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            handleSendMessage={handleSendMessage}
          />
        </div>
      </CardContent>
      <CardFooter className="border-t pt-3 flex flex-col space-y-4">
        <ChatActions 
          chat={chat}
          advisors={advisors}
          selectedAdvisor={selectedAdvisor}
          setSelectedAdvisor={setSelectedAdvisor}
          internalMessageInput={internalMessageInput}
          setInternalMessageInput={setInternalMessageInput}
          handleAssignChat={handleAssignChat}
          handleSendInternalMessage={handleSendInternalMessage}
          handleResolveChat={handleResolveChat}
        />
      </CardFooter>
    </Card>
  );
};

export default ChatDetail;
