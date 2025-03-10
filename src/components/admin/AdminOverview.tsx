
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboardService";
import { 
  AlertCircle, 
  Check, 
  Clock, 
  FileText, 
  UserCheck, 
  Users as UsersIcon,
  Hourglass
} from "lucide-react";

const AdminOverview = () => {
  // Fetch dashboard data with React Query
  const { data, isLoading } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: dashboardService.getDashboardData,
  });

  // Default stats to show while loading
  const stats = [
    { id: 1, label: "Tickets Nuevos (Hoy)", value: isLoading ? "..." : data?.metrics.totalTickets || 0, icon: FileText, color: "bg-blue-500" },
    { id: 2, label: "Pendientes Asignación", value: isLoading ? "..." : data?.metrics.pendingTickets || 0, icon: Clock, color: "bg-yellow-500" },
    { id: 3, label: "En Proceso", value: isLoading ? "..." : data?.metrics.inProgressTickets || 0, icon: Hourglass, color: "bg-indigo-500" },
    { id: 4, label: "Tiempo Prom. Resolución", value: isLoading ? "..." : 
      `${Math.floor(data?.metrics.averageResolutionTime / 24 || 0)} días ${Math.round(data?.metrics.averageResolutionTime % 24 || 0)} h`, 
      icon: Check, color: "bg-green-500" },
    { id: 5, label: "Tickets con Retraso", value: isLoading ? "..." : data?.metrics.expiredSLATickets || 0, icon: AlertCircle, color: "bg-red-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrativo</h1>
        <p className="text-gray-600 mt-1">Bienvenido al panel de control administrativo del sistema de tickets.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="text-white" size={20} />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">{stat.label}</h2>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Ticket Distribution */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm col-span-2">
          <h3 className="font-medium text-gray-700 mb-4">Distribución de Tickets</h3>
          {isLoading ? (
            <div className="h-80 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500">Gráfico de distribución por tipo</p>
            </div>
          )}
        </div>

        {/* Right column: Critical Tickets */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-medium text-gray-700 mb-4">Tickets Críticos</h3>
          <div className="space-y-4">
            {!isLoading && data?.metrics.urgentTickets ? (
              [...Array(Math.min(data.metrics.urgentTickets, 3))].map((_, index) => (
                <div key={index} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">T-1045{index + 1}</p>
                      <p className="text-sm text-gray-600">Certificado de Estudios</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                      Vence hoy
                    </span>
                  </div>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <UserCheck size={14} className="mr-1" />
                    <span>Estudiante: Juan Pérez</span>
                  </div>
                </div>
              ))
            ) : (
              [...Array(3)].map((_, index) => (
                <div key={index} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">T-1045{index + 1}</p>
                      <p className="text-sm text-gray-600">Certificado de Estudios</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                      Vence hoy
                    </span>
                  </div>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <UserCheck size={14} className="mr-1" />
                    <span>Estudiante: Juan Pérez</span>
                  </div>
                </div>
              ))
            )}
            <button className="w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-800">
              Ver todos los tickets críticos
            </button>
          </div>
        </div>
      </div>

      {/* Lower section: Workload and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Workload Heat Map */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-medium text-gray-700 mb-4">Mapa de Carga de Trabajo</h3>
          <div className="h-60 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">Mapa de calor por área y carga</p>
          </div>
        </div>

        {/* Right: Recent Activity */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-medium text-gray-700 mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                  <UsersIcon size={16} className="text-gray-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">
                    Admin asignó el ticket T-1042{item} a María Gonzalez
                  </p>
                  <p className="text-xs text-gray-500">Hace {item * 15} minutos</p>
                </div>
              </div>
            ))}
            <button className="w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-800">
              Ver todas las actividades
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
