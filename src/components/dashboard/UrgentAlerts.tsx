
import React from 'react';
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardMetrics } from '@/services/dashboardService';

interface UrgentAlertsProps {
  metrics: DashboardMetrics;
}

const UrgentAlerts: React.FC<UrgentAlertsProps> = ({ metrics }) => {
  // Only show the card if there are urgent tickets or expired SLA tickets
  if (metrics.urgentTickets === 0 && metrics.expiredSLATickets === 0) {
    return null;
  }

  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center text-red-700">
          <AlertCircle className="mr-2 h-5 w-5" />
          Alertas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.urgentTickets > 0 && (
            <div className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2">
                <AlertCircle size={12} className="text-red-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-red-700">
                  {metrics.urgentTickets} trámite(s) urgente(s) requieren atención inmediata
                </p>
              </div>
            </div>
          )}
          
          {metrics.expiredSLATickets > 0 && (
            <div className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mr-2">
                <AlertCircle size={12} className="text-red-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-red-700">
                  {metrics.expiredSLATickets} trámite(s) han excedido el SLA establecido
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UrgentAlerts;
