
import React from 'react';
import { Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentProcedure, UpcomingDate } from '@/services/dashboardService';

interface RecentUpdatesProps {
  recentProcedures: RecentProcedure[];
  upcomingDates: UpcomingDate[];
}

const RecentUpdates: React.FC<RecentUpdatesProps> = ({ recentProcedures, upcomingDates }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Trámites Recientes</CardTitle>
          <CardDescription>Últimas solicitudes realizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-2 p-3 border-b text-sm font-medium text-gray-600 bg-gray-50">
              <div className="col-span-2">Código</div>
              <div className="col-span-4">Tipo</div>
              <div className="col-span-2">Fecha</div>
              <div className="col-span-2">Estado</div>
              <div className="col-span-2 text-right">Acción</div>
            </div>
            {recentProcedures.map((procedure) => (
              <div key={procedure.id} className="grid grid-cols-12 gap-2 p-3 border-b text-sm items-center">
                <div className="col-span-2 font-medium">{procedure.id}</div>
                <div className="col-span-4">{procedure.type}</div>
                <div className="col-span-2 text-gray-600">{procedure.date}</div>
                <div className="col-span-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    procedure.statusColor === "bg-green-500" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {procedure.status}
                  </span>
                </div>
                <div className="col-span-2 text-right">
                  <button className="text-ccd-600 hover:text-ccd-700 font-medium text-xs">
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <button className="text-sm text-ccd-600 hover:text-ccd-700 font-medium">
            Ver todos los trámites
          </button>
        </CardFooter>
      </Card>

      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-ccd-600" />
            Próximas Fechas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingDates.map((item) => (
              <div key={item.id} className="border-l-4 border-ccd-500 pl-4 py-2">
                <p className="text-sm font-medium">{item.event}</p>
                <p className="text-xs text-gray-600">{item.date}</p>
                <p className="text-xs text-gray-500 mt-1">Trámite: {item.id}</p>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <button className="text-sm text-ccd-600 hover:text-ccd-700 font-medium">
            Ver calendario completo
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RecentUpdates;
