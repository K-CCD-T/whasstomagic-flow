
import { useState } from "react";
import { Search, Package, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DeliveryStatus = () => {
  const [trackingCode, setTrackingCode] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  
  const deliveryInfo = {
    code: "TR-DEL-2023-002",
    procedure: "Certificado de Estudios",
    status: "En preparación",
    estimatedDate: "20 Nov 2023",
    location: "Oficina Central de Trámites - Pabellón A",
    timeline: [
      { date: "15 Nov 2023", time: "09:30", status: "Solicitud recibida", description: "Trámite iniciado y registrado en el sistema" },
      { date: "16 Nov 2023", time: "11:45", status: "En procesamiento", description: "Documento en proceso de elaboración" },
      { date: "17 Nov 2023", time: "14:20", status: "En revisión", description: "Pendiente de aprobación final" },
      { date: "18 Nov 2023", time: "10:00", status: "En preparación", description: "Preparando documento para entrega" },
    ]
  };

  const handleTrack = (e) => {
    e.preventDefault();
    if (trackingCode.trim()) {
      setIsTracking(true);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Estado de Entregas</h1>
        <p className="text-gray-600 mt-1">Consulta el estado de tus documentos físicos en proceso de entrega</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Seguimiento de Trámite</CardTitle>
          <CardDescription>
            Ingresa el código de seguimiento de tu trámite para ver su estado actual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTrack} className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="pl-10 pr-4 py-3 w-full bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ccd-500 focus:border-transparent"
                  placeholder="Ejemplo: TR-DEL-2023-002"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-ccd-600 text-white rounded-lg text-sm font-medium hover:bg-ccd-700 focus:outline-none focus:ring-2 focus:ring-ccd-500 focus:ring-offset-2"
              >
                Consultar
              </button>
            </div>
          </form>

          {isTracking && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="px-6 py-5 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{deliveryInfo.procedure}</h3>
                      <p className="text-sm text-gray-500">Código de seguimiento: {deliveryInfo.code}</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {deliveryInfo.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Clock className="h-6 w-6 text-ccd-600" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">Fecha estimada de entrega</h4>
                        <p className="text-sm text-gray-500">{deliveryInfo.estimatedDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <MapPin className="h-6 w-6 text-ccd-600" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">Ubicación de recojo</h4>
                        <p className="text-sm text-gray-500">{deliveryInfo.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Historial de movimientos</h3>
                <div className="relative">
                  <div className="absolute top-0 left-5 h-full w-0.5 bg-gray-200"></div>
                  <div className="space-y-8">
                    {deliveryInfo.timeline.map((event, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-1 mt-1 rounded-full w-6 h-6 bg-white border-2 border-ccd-500 flex items-center justify-center">
                          <Package className="w-3 h-3 text-ccd-500" />
                        </div>
                        <div className="ml-10">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h4 className="text-sm font-medium text-gray-900">{event.status}</h4>
                            <time className="text-xs text-gray-500">{event.date} - {event.time}</time>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Opciones de notificación</h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ccd-500">
                    Recibir notificaciones por email
                  </button>
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ccd-500">
                    Recibir notificaciones por SMS
                  </button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryStatus;
