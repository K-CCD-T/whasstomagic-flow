
import React from 'react';
import { Phone, Check, X, QrCode } from 'lucide-react';

const DeviceList = () => {
  // Simulación de dispositivos conectados
  const devices = [
    { id: 1, name: "WhatsApp ffffffff44444444 1", status: "connected" },
    { id: 2, name: "WhatsApp Personal", status: "disconnected" },
  ];

  return (
    <div className="space-y-4">
      {devices.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 rounded-lg">
          <QrCode className="mx-auto h-12 w-12 text-gray-400 mb-2" />
          <p className="text-gray-600">No hay dispositivos conectados</p>
          <p className="text-sm text-gray-500 mt-1">
            Haz clic en "Conectar nuevo" para añadir un dispositivo
          </p>
        </div>
      ) : (
        devices.map((device) => (
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
        ))
      )}
    </div>
  );
};

export default DeviceList;
