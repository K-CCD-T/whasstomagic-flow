
import { ChatMessage } from "./types";

// Mock chat data for demonstration
export const mockChats: ChatMessage[] = [
  {
    id: "chat-2",
    userName: "María López",
    userEmail: "maria.lopez@example.com",
    timestamp: new Date(Date.now() - 45 * 60000), // 45 minutes ago
    lastMessage: "¿Cuándo estará listo mi documento?",
    status: "active",
    type: "agent",
    assignedTo: "Asesor 1",
    unreadCount: 0,
    studentInfo: {
      id: "E-2023045",
      program: "Medicina",
      semester: "8vo semestre",
      enrollmentDate: "03/2019",
      certifications: ["Primeros auxilios", "Anatomía avanzada", "Inglés C1"],
      contact: {
        phone: "+51 912 345 678",
        alternateEmail: "maria.lopez.med@gmail.com"
      }
    }
  },
  {
    id: "chat-5",
    userName: "Ricardo Sánchez",
    userEmail: "ricardo.sanchez@example.com",
    timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
    lastMessage: "Tengo una duda sobre el proceso de inscripción",
    status: "active",
    type: "agent",
    assignedTo: "Asesor 1",
    unreadCount: 2,
    studentInfo: {
      id: "E-2023057",
      program: "Arquitectura",
      semester: "3er semestre",
      enrollmentDate: "03/2022",
      certifications: ["Diseño 3D", "AutoCAD básico"],
      contact: {
        phone: "+51 945 123 789",
        alternateEmail: "ricardo.sanchez.arq@gmail.com",
        address: "Av. La Marina 500, Lima"
      }
    }
  },
  {
    id: "chat-6",
    userName: "Luis Fernández",
    userEmail: "luis.fernandez@example.com",
    timestamp: new Date(Date.now() - 120 * 60000), // 2 hours ago
    lastMessage: "Muchas gracias por la ayuda",
    status: "resolved",
    type: "agent",
    assignedTo: "Asesor 1",
    unreadCount: 0,
    studentInfo: {
      id: "E-2022089",
      program: "Contabilidad",
      semester: "5to semestre",
      enrollmentDate: "08/2020",
      certifications: ["Excel avanzado", "Finanzas corporativas", "SAP básico"],
      contact: {
        phone: "+51 987 456 321"
      }
    }
  },
];
