
import { useEffect, useState } from "react";
import { dashboardService, DashboardData } from "@/services/dashboardService";
import { useQuery } from "@tanstack/react-query";
import MetricsCards from "./MetricsCards";
import DataCharts from "./DataCharts";
import RecentUpdates from "./RecentUpdates";
import UrgentAlerts from "./UrgentAlerts";
import ResolutionTime from "./ResolutionTime";
import { ArrowRight } from "lucide-react";

const DashboardOverview = () => {
  // Fetch dashboard data with React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: dashboardService.getDashboardData,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando datos del dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
        <h3 className="font-medium">Error al cargar datos</h3>
        <p className="text-sm">No se pudieron cargar los datos del dashboard. Por favor, inténtalo de nuevo más tarde.</p>
      </div>
    );
  }

  // Destructure data for easier access
  const { 
    metrics, 
    statusDistribution, 
    typeDistribution, 
    recentProcedures, 
    upcomingDates 
  } = data as DashboardData;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Panel Principal</h1>
        <p className="text-gray-600 mt-1">Bienvenido a tu panel de trámites académicos</p>
      </div>

      {/* Urgent Alerts - Only shows if there are urgent items */}
      <UrgentAlerts metrics={metrics} />

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <MetricsCards metrics={metrics} />
        </div>
        <div className="md:col-span-1">
          <ResolutionTime metrics={metrics} />
        </div>
      </div>

      {/* Data Charts */}
      <DataCharts 
        statusData={statusDistribution} 
        typeData={typeDistribution} 
      />

      {/* Recent Updates and Upcoming Dates */}
      <RecentUpdates 
        recentProcedures={recentProcedures} 
        upcomingDates={upcomingDates} 
      />
    </div>
  );
};

export default DashboardOverview;
