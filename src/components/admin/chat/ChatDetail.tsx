
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Advisor, ChatMessage } from "./types";
import StudentProfile from "./StudentProfile";
import ChatMessageArea from "./ChatMessageArea";
import ChatActions from "./ChatActions";

interface ChatDetailProps {
  chat: ChatMessage;
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
          <div className="flex-grow border border-dashed rounded-md p-4 mb-4 overflow-y-auto">
            <p className="text-gray-500 text-center">Aquí se mostraría la conversación completa</p>
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
