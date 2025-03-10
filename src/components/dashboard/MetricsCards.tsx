
import React from 'react';
import { ClipboardList, ClipboardCheck, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardMetrics } from '@/services/dashboardService';

interface MetricsCardsProps {
  metrics: DashboardMetrics;
}

const MetricsCards: React.FC<MetricsCardsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <ClipboardList className="mr-2 h-5 w-5 text-blue-500" />
            En Proceso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-500">{metrics.inProgressTickets}</div>
        </CardContent>
        <CardFooter className="pt-0">
          <button className="text-sm text-blue-600 flex items-center hover:underline">
            Ver todos
          </button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <ClipboardCheck className="mr-2 h-5 w-5 text-green-500" />
            Completados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-500">{metrics.completedTickets}</div>
        </CardContent>
        <CardFooter className="pt-0">
          <button className="text-sm text-green-600 flex items-center hover:underline">
            Ver todos
          </button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Clock className="mr-2 h-5 w-5 text-amber-500" />
            Pendientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-amber-500">{metrics.pendingTickets}</div>
        </CardContent>
        <CardFooter className="pt-0">
          <button className="text-sm text-amber-600 flex items-center hover:underline">
            Ver todos
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MetricsCards;
