
import React from 'react';
import { Phone, Check, X } from 'lucide-react';

const DeviceList = () => {
  // Simulación de dispositivos conectados
  const devices = [
    { id: 1, name: "WhatsApp Business 1", status: "connected" },
    { id: 2, name: "WhatsApp Personal", status: "disconnected" },
  ];

  return (
    <div className="space-y-4">
      {devices.map((device) => (
        <div
          key={device.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg border"
        >
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-600" />
            <span className="font-medium">{device.name}</span>
          </div>
          {device.status === "connected" ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <X className="w-5 h-5 text-red-500" />
          )}
        </div>
      ))}
    </div>
  );
};

export default DeviceList;
