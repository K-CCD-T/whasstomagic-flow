
import { File, Tag, Calendar, PhoneCall, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatMessageInputProps {
  messageInput: string;
  setMessageInput: (message: string) => void;
  handleSendMessage: () => void;
}

const ChatMessageInput = ({ messageInput, setMessageInput, handleSendMessage }: ChatMessageInputProps) => {
  return (
    <div className="flex items-end space-x-2">
      <div className="flex-grow relative">
        <Textarea 
          placeholder="Escribe un mensaje..." 
          className="resize-none min-h-[80px]"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <div className="absolute bottom-2 right-2 flex space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <File className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Tag className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <PhoneCall className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Button onClick={handleSendMessage}>
        <Send className="mr-2 h-4 w-4" />
        Enviar
      </Button>
    </div>
  );
};

export default ChatMessageInput;
