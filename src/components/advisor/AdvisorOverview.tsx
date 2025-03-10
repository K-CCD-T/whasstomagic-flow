
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboardService";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Users
} from "lucide-react";

const AdvisorOverview = () => {
  // Fetch dashboard data with React Query
  const { data, isLoading } = useQuery({
    queryKey: ['advisorDashboardData'],
    queryFn: dashboardService.getDashboardData,
  });

  // Default stats to show while loading
  const stats = [
    { id: 1, label: "Trámites Asignados", value: isLoading ? "..." : data?.metrics.totalTickets || 0, icon: FileText, color: "bg-blue-500" },
    { id: 2, label: "En Proceso", value: isLoading ? "..." : data?.metrics.inProgressTickets || 0, icon: Clock, color: "bg-yellow-500" },
    { id: 3, label: "Completados (Mes)", value: isLoading ? "..." : data?.metrics.completedTickets || 0, icon: CheckCircle, color: "bg-green-500" },
    { id: 4, label: "Requieren Atención", value: isLoading ? "..." : data?.metrics.expiredSLATickets || 0, icon: AlertCircle, color: "bg-red-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Panel de Asesor Académico</h1>
        <p className="text-gray-600 mt-1">Bienvenido al panel de gestión de trámites asignados.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        {/* Left column: Urgent Tickets */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-medium text-gray-700 mb-4">Trámites Urgentes</h3>
          <div className="space-y-4">
            {!isLoading && (
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
                    <Users size={14} className="mr-1" />
                    <span>Estudiante: Juan Pérez</span>
                  </div>
                </div>
              ))
            )}
            <button className="w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-800">
              Ver todos los trámites urgentes
            </button>
          </div>
        </div>

        {/* Center column: Recent Activity */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-medium text-gray-700 mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                  <Users size={16} className="text-gray-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">
                    Se te asignó el trámite T-1042{item}
                  </p>
                  <p className="text-xs text-gray-500">Hace {item * 15} minutos</p>
                </div>
              </div>
            ))}
            <button className="w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-800">
              Ver toda la actividad
            </button>
          </div>
        </div>

        {/* Right column: Pending Comments */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-medium text-gray-700 mb-4">Mensajes Pendientes</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">T-1042{item}</p>
                    <p className="text-sm text-gray-600">Estudiante: José Rodriguez</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    Nuevo mensaje
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  Hola, quisiera saber si ya tienes alguna actualización sobre mi trámite. Gracias.
                </p>
              </div>
            ))}
            <button className="w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-800">
              Ver todos los mensajes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorOverview;
