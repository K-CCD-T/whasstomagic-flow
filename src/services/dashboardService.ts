
import api from './api';
import { toast } from 'sonner';

// Define interfaces for the dashboard data
export interface DashboardMetrics {
  totalTickets: number;
  activeUsers: number;
  pendingTickets: number;
  inProgressTickets: number;
  completedTickets: number;
  averageResolutionTime: number; // in hours
  urgentTickets: number;
  expiredSLATickets: number;
}

export interface TicketDistribution {
  name: string;
  value: number;
  color: string;
}

export interface TicketTypeData {
  name: string;
  Cantidad: number;
}

export interface RecentProcedure {
  id: string;
  type: string;
  date: string;
  status: string;
  statusColor: string;
}

export interface UpcomingDate {
  id: string;
  event: string;
  date: string;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  statusDistribution: TicketDistribution[];
  typeDistribution: TicketTypeData[];
  recentProcedures: RecentProcedure[];
  upcomingDates: UpcomingDate[];
}

// Mock data for demonstration purposes - will be replaced with API data when backend is ready
const mockDashboardData: DashboardData = {
  metrics: {
    totalTickets: 14,
    activeUsers: 8,
    pendingTickets: 2,
    inProgressTickets: 4,
    completedTickets: 8,
    averageResolutionTime: 28.5, // 28.5 hours average resolution time
    urgentTickets: 1,
    expiredSLATickets: 0
  },
  statusDistribution: [
    { name: "En proceso", value: 4, color: "#3b82f6" },
    { name: "Completados", value: 8, color: "#10b981" },
    { name: "Pendientes", value: 2, color: "#f59e0b" },
  ],
  typeDistribution: [
    { name: "Constancias", Cantidad: 5 },
    { name: "Certificados", Cantidad: 3 },
    { name: "Duplicados", Cantidad: 2 },
    { name: "Quejas", Cantidad: 1 },
    { name: "Otros", Cantidad: 3 },
  ],
  recentProcedures: [
    { 
      id: "TR-2023-004", 
      type: "Constancia de Notas", 
      date: "10 Nov 2023", 
      status: "En proceso",
      statusColor: "bg-blue-500" 
    },
    { 
      id: "TR-2023-003", 
      type: "Certificado de Estudios", 
      date: "5 Nov 2023", 
      status: "Completado",
      statusColor: "bg-green-500" 
    },
    { 
      id: "TR-2023-002", 
      type: "Duplicado de Diploma", 
      date: "28 Oct 2023", 
      status: "Completado",
      statusColor: "bg-green-500" 
    },
    { 
      id: "TR-2023-001", 
      type: "Queja Académica", 
      date: "15 Oct 2023", 
      status: "Completado",
      statusColor: "bg-green-500" 
    },
  ],
  upcomingDates: [
    { id: "TR-2023-004", event: "Fecha límite de entrega", date: "15 Nov 2023" },
    { id: "TR-2023-005", event: "Próxima revisión", date: "20 Nov 2023" },
  ]
};

export const dashboardService = {
  async getDashboardData(): Promise<DashboardData> {
    try {
      // Attempt to fetch data from backend API
      try {
        const response = await api.get<DashboardData>('/dashboard');
        return response.data;
      } catch (apiError) {
        console.error('Failed to fetch from API, using mock data', apiError);
        // Fall back to mock data if API fails
        return mockDashboardData;
      }
    } catch (error) {
      console.error('Error getting dashboard data:', error);
      toast.error('No se pudieron cargar los datos del dashboard');
      return mockDashboardData;
    }
  }
};
