
import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatMessage } from "./types";
import StudentProfileDialog from "./StudentProfileDialog";
import ChatMessageInput from "./ChatMessageInput";
import ChatFooterActions from "./ChatFooterActions";

interface ChatDetailProps {
  chat: ChatMessage;
  messageInput: string;
  setMessageInput: (message: string) => void;
  handleSendMessage: () => void;
  handleResolveChat: (chatId: string) => void;
}

const ChatDetail = ({
  chat,
  messageInput,
  setMessageInput,
  handleSendMessage,
  handleResolveChat
}: ChatDetailProps) => {
  const [showStudentProfile, setShowStudentProfile] = useState(false);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between">
          <div className="flex items-center">
            <span>{chat.userName}</span>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-2" 
                  onClick={() => setShowStudentProfile(true)}
                >
                  Ver perfil
                </Button>
              </DialogTrigger>
              <StudentProfileDialog chat={chat} />
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
          
          <ChatMessageInput 
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            handleSendMessage={handleSendMessage}
          />
        </div>
      </CardContent>
      <CardFooter className="border-t pt-3">
        <ChatFooterActions 
          chat={chat} 
          handleResolveChat={handleResolveChat} 
        />
      </CardFooter>
    </Card>
  );
};

export default ChatDetail;
