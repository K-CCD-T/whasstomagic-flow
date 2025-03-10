
import React, { useState } from 'react';
import { QrCode, Scan, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface QRCodeScannerProps {
  onScanComplete?: (deviceId: string) => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScanComplete }) => {
  const [scanning, setScanning] = useState(false);
  const [connected, setConnected] = useState(false);
  const { toast } = useToast();

  const handleStartScan = () => {
    setScanning(true);
    
    // Simulamos el proceso de escaneo
    toast({
      title: "Escaneando",
      description: "Abre WhatsApp en tu teléfono, ve a Ajustes > WhatsApp Web y escanea este código",
    });
    
    // Simulamos una conexión exitosa después de 3 segundos
    setTimeout(() => {
      setScanning(false);
      setConnected(true);
      toast({
        title: "¡Conectado!",
        description: "Tu dispositivo WhatsApp se ha conectado correctamente",
      });
      
      if (onScanComplete) {
        // Generamos un ID ficticio para el dispositivo
        const deviceId = `device-${Date.now()}`;
        onScanComplete(deviceId);
      }
    }, 3000);
  };

  return (
    <Card className="p-6 flex flex-col items-center justify-center">
      {!connected ? (
        <>
          <div className="mb-4 bg-gray-100 p-8 rounded-lg flex items-center justify-center">
            {scanning ? (
              <Scan className="w-32 h-32 text-[#25D366] animate-pulse" />
            ) : (
              <QrCode className="w-32 h-32 text-[#25D366]" />
            )}
          </div>
          <p className="text-center mb-4 text-gray-600">
            {scanning 
              ? "Escanea el código QR con tu teléfono" 
              : "Haz clic en escanear para conectar tu WhatsApp"
            }
          </p>
          <Button 
            onClick={handleStartScan} 
            disabled={scanning}
            className="bg-[#25D366] hover:bg-[#128C7E]"
          >
            {scanning ? "Escaneando..." : "Comenzar escaneo"}
          </Button>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <Check className="w-16 h-16 text-[#25D366]" />
          </div>
          <p className="text-center mb-4 font-medium">¡Dispositivo conectado correctamente!</p>
        </div>
      )}
    </Card>
  );
};

export default QRCodeScanner;
