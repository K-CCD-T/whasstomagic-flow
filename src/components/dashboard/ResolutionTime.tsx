
import React from 'react';
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardMetrics } from '@/services/dashboardService';

interface ResolutionTimeProps {
  metrics: DashboardMetrics;
}

const ResolutionTime: React.FC<ResolutionTimeProps> = ({ metrics }) => {
  // Format the resolution time
  const formatResolutionTime = (hours: number): string => {
    if (hours < 24) {
      return `${hours.toFixed(1)} horas`;
    } else {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      return `${days} día${days > 1 ? 's' : ''} ${remainingHours > 0 ? `y ${Math.round(remainingHours)} horas` : ''}`;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Clock className="mr-2 h-5 w-5 text-indigo-500" />
          Tiempo Promedio de Resolución
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-indigo-500">
          {formatResolutionTime(metrics.averageResolutionTime)}
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Basado en los últimos trámites completados
        </p>
      </CardContent>
    </Card>
  );
};

export default ResolutionTime;
