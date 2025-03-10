
import { Search, ChevronDown, Filter, Download, Check, X, MoreHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { ticketService } from "@/services/ticketService";
import { toast } from "sonner";

const TicketManagement = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadAllTickets = async () => {
      setIsLoading(true);
      try {
        // Aquí deberíamos tener un endpoint para administradores que devuelva todos los tickets
        // En este ejemplo usamos el mismo endpoint de usuarios (que devuelve solo los del usuario)
        const backendTickets = await ticketService.getMyTickets();
        
        // Transformar los tickets para adaptarlos al formato de la UI
        const formattedTickets = backendTickets.map(ticket => ({
          id: `T-${ticket.id}`,
          student: "Usuario ID: " + ticket.usuario_id, // En un caso real, obtendríamos el nombre
          type: ticket.tipo,
          created: new Date(ticket.fecha_creacion).toLocaleDateString('es-ES'),
          deadline: calculateDeadline(ticket.fecha_creacion),
          status: mapBackendStatus(ticket.estado),
          assignedTo: "No asignado", // Este dato vendría del backend en un caso real
          priority: calculatePriority(ticket.estado, ticket.fecha_creacion),
        }));
        
        setTickets(formattedTickets);
      } catch (error) {
        console.error("Error al cargar tickets:", error);
        toast.error("No se pudieron cargar los tickets");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAllTickets();
  }, []);
  
  // Función para mapear estados del backend
  const mapBackendStatus = (backendStatus) => {
    const statusMap = {
      'pendiente': 'pending',
      'en_proceso': 'inProgress',
      'completado': 'completed',
      'rechazado': 'delayed'
    };
    return statusMap[backendStatus] || 'pending';
  };
  
  // Función para calcular la fecha límite (ejemplo simplificado)
  const calculateDeadline = (creationDate) => {
    const date = new Date(creationDate);
    date.setDate(date.getDate() + 3); // Agregar 3 días como ejemplo
    return date.toLocaleDateString('es-ES');
  };
  
  // Función para calcular prioridad basada en estado y fecha
  const calculatePriority = (status, creationDate) => {
    if (status === 'rechazado') return 'urgent';
    
    // Arreglando el error de TypeScript: convertir las fechas a números antes de restar
    const daysAgo = (Date.now() - new Date(creationDate).getTime()) / (1000 * 60 * 60 * 24);
    if (daysAgo > 5) return 'high';
    if (daysAgo > 3) return 'medium';
    return 'low';
  };

  const filters = [
    { id: "all", label: "Todos los tickets" },
    { id: "pending", label: "Pendientes" },
    { id: "inProgress", label: "En proceso" },
    { id: "completed", label: "Completados" },
    { id: "delayed", label: "Con retraso" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Pendiente</span>;
      case "inProgress":
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">En proceso</span>;
      case "completed":
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Completado</span>;
      case "delayed":
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Con retraso</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Desconocido</span>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "urgent":
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Urgente</span>;
      case "high":
        return <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">Alta</span>;
      case "medium":
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Media</span>;
      case "low":
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Baja</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Normal</span>;
    }
  };
  
  // Filtrar tickets según el filtro seleccionado
  const filteredTickets = selectedFilter === 'all' 
    ? tickets 
    : tickets.filter(ticket => ticket.status === selectedFilter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Tickets</h1>
        <p className="text-gray-600 mt-1">Administre y dé seguimiento a todos los tickets del sistema.</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {/* Filter and search bar */}
        <div className="border-b border-gray-200 p-4 flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap ${
                  selectedFilter === filter.id
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar tickets..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <button className="flex items-center text-gray-700 hover:text-gray-900 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium">
              <Filter size={16} className="mr-1" />
              <span>Filtros</span>
              <ChevronDown size={16} className="ml-1" />
            </button>
            
            <button className="hidden md:flex items-center text-gray-700 hover:text-gray-900 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium">
              <Download size={16} className="mr-1" />
              <span>Exportar</span>
            </button>
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estudiante
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Creado
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Límite
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Asignado
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prioridad
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {ticket.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ticket.student}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket.created}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket.deadline}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(ticket.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket.assignedTo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getPriorityBadge(ticket.priority)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="text-green-600 hover:text-green-900">
                            <Check size={18} />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <X size={18} />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="px-6 py-4 text-center text-sm text-gray-500">
                      No se encontraron tickets
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700">
              Mostrando <span className="font-medium">{filteredTickets.length}</span> resultados
            </p>
          </div>
          <div className="flex-1 flex justify-between sm:justify-end space-x-2">
            <button
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Anterior
            </button>
            <button
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketManagement;
