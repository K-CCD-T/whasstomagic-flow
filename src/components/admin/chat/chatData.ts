
import { Advisor, ChatMessage } from "./types";

// Mock chat data
export const mockChats: ChatMessage[] = [
  {
    id: "chat-1",
    userName: "Carlos García",
    userEmail: "carlos.garcia@example.com",
    timestamp: new Date(Date.now() - 15 * 60000), // 15 minutes ago
    lastMessage: "Necesito ayuda con mi trámite de certificado",
    status: "waiting",
    type: "agent",
    unreadCount: 1,
    studentInfo: {
      id: "E-2023012",
      program: "Ingeniería de Sistemas",
      semester: "6to semestre",
      enrollmentDate: "08/2020",
      certifications: ["Curso básico de programación", "Inglés B2"],
      contact: {
        phone: "+51 987 654 321",
        alternateEmail: "carlos.garcia.personal@gmail.com",
        address: "Av. Universitaria 1801, Lima"
      }
    }
  },
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
    id: "chat-3",
    userName: "Juan Pérez",
    userEmail: "juan.perez@example.com",
    timestamp: new Date(Date.now() - 120 * 60000), // 2 hours ago
    lastMessage: "Gracias por la información",
    status: "resolved",
    type: "bot",
    unreadCount: 0,
    studentInfo: {
      id: "E-2022078",
      program: "Administración de Empresas",
      semester: "4to semestre",
      enrollmentDate: "08/2021",
      certifications: ["Marketing digital", "Excel avanzado"],
      contact: {
        phone: "+51 945 678 123"
      }
    }
  },
  {
    id: "chat-4",
    userName: "Ana Rodríguez",
    userEmail: "ana.rodriguez@example.com",
    timestamp: new Date(Date.now() - 10 * 60000), // 10 minutes ago
    lastMessage: "¿Cómo puedo solicitar una prórroga?",
    status: "waiting",
    type: "agent",
    unreadCount: 2,
    studentInfo: {
      id: "E-2023102",
      program: "Derecho",
      semester: "7mo semestre",
      enrollmentDate: "03/2020",
      certifications: ["Derecho penal", "Argumentación jurídica", "Portugués básico"],
      contact: {
        phone: "+51 978 123 456",
        alternateEmail: "ana.rodriguez.legal@gmail.com",
        address: "Jr. Salaverry 2020, Lima"
      }
    }
  },
];

// Mock advisors data
export const advisors: Advisor[] = [
  { id: "adv-1", name: "Carlos Mendoza", department: "Ingeniería", available: true },
  { id: "adv-2", name: "María Rodríguez", department: "Medicina", available: true },
  { id: "adv-3", name: "Jorge Fernández", department: "Negocios", available: false },
  { id: "adv-4", name: "Alicia Torres", department: "Ciencias", available: true },
];
