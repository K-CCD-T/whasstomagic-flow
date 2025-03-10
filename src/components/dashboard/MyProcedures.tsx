
import { useState, useEffect } from "react";
import { Search, Filter, Download, Eye, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ticketService } from "@/services/ticketService";
import { toast } from "sonner";

const MyProcedures = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [procedures, setProcedures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadProcedures = async () => {
      setIsLoading(true);
      try {
        const tickets = await ticketService.getMyTickets();
        
        // Transformar los tickets desde el formato del backend al formato de la UI
        const formattedProcedures = tickets.map(ticket => ({
          id: `TR-${ticket.id}`,
          type: ticket.tipo,
          description: ticket.descripcion,
          date: new Date(ticket.fecha_creacion).toLocaleDateString('es-ES', {
            day: 'numeric', 
            month: 'short', 
            year: 'numeric'
          }),
          status: mapBackendStatus(ticket.estado),
          statusColor: getStatusColor(ticket.estado)
        }));
        
        setProcedures(formattedProcedures);
      } catch (error) {
        console.error("Error al cargar trámites:", error);
        toast.error("No se pudieron cargar los trámites");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProcedures();
  }, []);
  
  // Función para mapear estados del backend a la UI
  const mapBackendStatus = (backendStatus) => {
    const statusMap = {
      'pendiente': 'Pendiente',
      'en_proceso': 'En proceso',
      'completado': 'Completado',
      'rechazado': 'Rechazado'
    };
    return statusMap[backendStatus] || backendStatus;
  };
  
  // Función para obtener colores de estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'completado':
        return 'bg-green-100 text-green-800';
      case 'en_proceso':
        return 'bg-blue-100 text-blue-800';
      case 'pendiente':
        return 'bg-amber-100 text-amber-800';
      case 'rechazado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProcedures = procedures.filter(procedure => {
    const matchesSearch = 
      procedure.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      procedure.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      procedure.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || 
      procedure.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mis Trámites</h1>
        <p className="text-gray-600 mt-1">Gestiona y haz seguimiento de todos tus trámites académicos</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Trámites</CardTitle>
          <CardDescription>
            Visualiza y filtra tus trámites académicos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ccd-500 focus:border-transparent"
                placeholder="Buscar por código o tipo de trámite..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Filter size={16} className="text-gray-400" />
                </div>
                <select
                  className="pl-10 pr-8 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ccd-500 focus:border-transparent appearance-none"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Todos los estados</option>
                  <option value="en proceso">En proceso</option>
                  <option value="completado">Completado</option>
                  <option value="pendiente">Pendiente</option>
                </select>
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Calendar size={16} className="text-gray-400" />
                </div>
                <select
                  className="pl-10 pr-8 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ccd-500 focus:border-transparent appearance-none"
                >
                  <option value="all">Todas las fechas</option>
                  <option value="last_month">Último mes</option>
                  <option value="last_quarter">Último trimestre</option>
                  <option value="last_year">Último año</option>
                </select>
              </div>
              
              <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-ccd-500 focus:border-transparent">
                <Download size={16} className="mr-2" />
                Exportar
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                {isLoading ? (
                  <div className="flex justify-center items-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Código
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tipo de Trámite
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Descripción
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredProcedures.map((procedure) => (
                        <tr key={procedure.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {procedure.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {procedure.type}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {procedure.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {procedure.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${procedure.statusColor}`}>
                              {procedure.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-ccd-600 hover:text-ccd-700 mr-3">
                              <Eye size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                
                {!isLoading && filteredProcedures.length === 0 && (
                  <div className="px-6 py-8 text-center">
                    <p className="text-gray-500 text-sm">No se encontraron trámites con los filtros aplicados.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Mostrando {filteredProcedures.length} de {procedures.length} trámites
            </div>
            
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                Anterior
              </button>
              <button className="px-3 py-1 bg-ccd-600 text-white rounded-md text-sm hover:bg-ccd-700">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                Siguiente
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyProcedures;
