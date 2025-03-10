
export interface ChatMessage {
  id: string;
  userName: string;
  userEmail: string;
  timestamp: Date;
  lastMessage: string;
  status: "active" | "waiting" | "resolved";
  type: "agent" | "bot";
  assignedTo?: string;
  unreadCount: number;
  studentInfo?: {
    id: string;
    program: string;
    semester: string;
    enrollmentDate: string;
    certifications: string[];
    contact: {
      phone: string;
      alternateEmail?: string;
      address?: string;
    }
  };
}

export interface Advisor {
  id: string;
  name: string;
  department: string;
  available: boolean;
}

export type ChatFilter = "all" | "waiting" | "active" | "resolved";
