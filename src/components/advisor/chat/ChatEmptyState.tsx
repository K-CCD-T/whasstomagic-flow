
import { MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ChatEmptyState = () => {
  return (
    <Card className="h-full flex items-center justify-center">
      <CardContent className="text-center p-6">
        <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          Selecciona una conversación
        </h3>
        <p className="text-gray-500">
          Haz clic en una de las conversaciones de la lista para ver los detalles
        </p>
      </CardContent>
    </Card>
  );
};

export default ChatEmptyState;
