
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Advisor, ChatMessage } from "./types";

interface ChatActionsProps {
  chat: ChatMessage;
  advisors: Advisor[];
  selectedAdvisor: string;
  setSelectedAdvisor: (advisorId: string) => void;
  internalMessageInput: string;
  setInternalMessageInput: (message: string) => void;
  handleAssignChat: (chatId: string) => void;
  handleSendInternalMessage: () => void;
  handleResolveChat: (chatId: string) => void;
}

const ChatActions = ({
  chat,
  advisors,
  selectedAdvisor,
  setSelectedAdvisor,
  internalMessageInput,
  setInternalMessageInput,
  handleAssignChat,
  handleSendInternalMessage,
  handleResolveChat
}: ChatActionsProps) => {
  if (!chat) return null;

  if (chat.status === "waiting") {
    return (
      <div className="w-full flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <Select value={selectedAdvisor} onValueChange={setSelectedAdvisor}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar asesor" />
            </SelectTrigger>
            <SelectContent>
              {advisors.map(advisor => (
                <SelectItem 
                  key={advisor.id} 
                  value={advisor.id}
                  disabled={!advisor.available}
                >
                  {advisor.name} - {advisor.department} {!advisor.available && "(No disponible)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => handleAssignChat(chat.id)}>
            Asignar chat
          </Button>
        </div>
      </div>
    );
  } else if (chat.status === "active") {
    return (
      <>
        <div className="w-full flex flex-col space-y-2">
          <h4 className="text-sm font-medium">Mensaje interno para {chat.assignedTo}</h4>
          <div className="flex items-center space-x-2">
            <Textarea 
              placeholder="Escribe un mensaje interno para el asesor..." 
              className="resize-none min-h-[60px]"
              value={internalMessageInput}
              onChange={(e) => setInternalMessageInput(e.target.value)}
            />
            <Button onClick={handleSendInternalMessage}>
              Enviar
            </Button>
          </div>
        </div>
        <Button variant="outline" onClick={() => handleResolveChat(chat.id)}>
          Marcar como resuelto
        </Button>
      </>
    );
  } else {
    return (
      <Button variant="outline" disabled>
        Conversación finalizada
      </Button>
    );
  }
};

export default ChatActions;
