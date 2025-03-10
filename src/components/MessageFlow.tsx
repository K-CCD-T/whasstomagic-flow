
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Image, FileText } from 'lucide-react';

const MessageFlow = () => {
  // Simulación de flujos de mensaje
  const flows = [
    {
      id: 1,
      name: "Campaña Bienvenida",
      content: [
        { type: "text", content: "¡Bienvenido a nuestro servicio!" },
        { type: "image", content: "welcome.jpg" },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {flows.map((flow) => (
        <Card key={flow.id} className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">{flow.name}</h3>
            <Button variant="default" size="sm">
              <Send className="w-4 h-4 mr-2" />
              Enviar
            </Button>
          </div>
          <div className="space-y-2">
            {flow.content.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-gray-50 rounded"
              >
                {item.type === "image" ? (
                  <Image className="w-4 h-4 text-blue-500" />
                ) : item.type === "file" ? (
                  <FileText className="w-4 h-4 text-red-500" />
                ) : (
                  <Send className="w-4 h-4 text-green-500" />
                )}
                <span className="text-sm">{item.content}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MessageFlow;
