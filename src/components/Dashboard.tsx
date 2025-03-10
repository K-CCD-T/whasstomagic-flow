
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Plus, Send, QrCode } from "lucide-react";
import DeviceList from './DeviceList';
import MessageFlow from './MessageFlow';
import QRCodeScanner from './QRCodeScanner';

const Dashboard = () => {
  const [showQRScanner, setShowQRScanner] = useState(false);
  
  const handleConnectNewDevice = () => {
    setShowQRScanner(true);
  };
  
  const handleScanComplete = (deviceId: string) => {
    console.log(`Dispositivo conectado con ID: ${deviceId}`);
    setShowQRScanner(false);
    // Aquí se podría actualizar el estado para añadir el nuevo dispositivo a la lista
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#25D366] p-4">
        <div className="container mx-auto">
          <h1 className="text-white text-2xl font-bold">WhatsFlow</h1>
        </div>
      </nav>
      
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dispositivos conectados */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Dispositivos</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleConnectNewDevice}
              >
                <Plus className="w-4 h-4 mr-2" />
                Conectar nuevo
              </Button>
            </div>
            
            {showQRScanner ? (
              <QRCodeScanner onScanComplete={handleScanComplete} />
            ) : (
              <DeviceList />
            )}
          </Card>

          {/* Flujos de mensaje */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Flujos de Mensaje</h2>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo flujo
              </Button>
            </div>
            <MessageFlow />
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
