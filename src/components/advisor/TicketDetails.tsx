
import { useState, useEffect } from "react";
import { ArrowLeft, Send, Paperclip, User, Clock, Calendar, Tag, FileText, GraduationCap } from "lucide-react";
import { toast } from "sonner";

interface TicketDetailsProps {
  ticketId: string;
  onBack: () => void;
}

const TicketDetails = ({ ticketId, onBack }: TicketDetailsProps) => {
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState<any>(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchTicketDetails = async () => {
      setLoading(true);
      try {
        // En una aplicación real, aquí se realizaría una llamada a la API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Datos de ejemplo
        setTicket({
          id: ticketId,
          student: {
            name: "Juan Pérez",
            email: "juan.perez@estudiante.edu.pe",
            id: "E-2023012",
            phone: "+51 987 654 321",
            program: "Ingeniería de Sistemas",
            semester: "6to semestre",
            certifications: ["Programación Web", "Python Avanzado", "Inglés B2"]
          },
          type: "Certificado de Estudios",
          created: "10/03/2023",
          deadline: "15/03/2023",
          status: "inProgress",
          priority: "high",
          description: "Solicito un certificado de estudios para el programa de intercambio académico con la Universidad de Barcelona. Necesito que incluya el promedio ponderado y los cursos aprobados hasta el momento.",
          attachments: [
            { name: "solicitud_formal.pdf", size: "245 KB" },
            { name: "identificacion.jpg", size: "1.2 MB" }
          ],
          history: [
            { 
              date: "10/03/2023 09:15", 
              action: "Trámite creado", 
              user: "Juan Pérez",
              role: "student"
            },
            { 
              date: "10/03/2023 11:30", 
              action: "Trámite asignado a asesor", 
              user: "Sistema",
              role: "system"
            },
            { 
              date: "11/03/2023 14:20", 
              action: "Trámite en proceso de verificación", 
              user: "María López",
              role: "advisor",
              comment: "Iniciando verificación de requisitos para emitir el certificado. Estaré en contacto si necesito información adicional."
            }
          ],
          messages: [
            {
              id: 1,
              date: "11/03/2023 14:20",
              sender: "María López",
              role: "advisor",
              content: "Hola Juan, estoy revisando tu solicitud. ¿Podrías especificar si necesitas el certificado en español o inglés?"
            },
            {
              id: 2,
              date: "11/03/2023 15:45",
              sender: "Juan Pérez",
              role: "student",
              content: "Hola María, necesito el certificado en ambos idiomas si es posible. El programa requiere la versión en inglés pero me gustaría tener también la versión en español."
            }
          ]
        });
      } catch (error) {
        console.error("Error al cargar detalles del trámite:", error);
        toast.error("No se pudieron cargar los detalles del trámite");
      } finally {
        setLoading(false);
      }
    };
    
    fetchTicketDetails();
  }, [ticketId]);

  const handleSendComment = () => {
    if (!comment.trim()) return;
    
    // En una aplicación real, aquí se enviaría el comentario a la API
    const newMessage = {
      id: ticket.messages.length + 1,
      date: new Date().toLocaleString('es-ES'),
      sender: "María López",
      role: "advisor",
      content: comment
    };
    
    setTicket({
      ...ticket,
      messages: [...ticket.messages, newMessage]
    });
    
    setComment("");
    toast.success("Mensaje enviado correctamente");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
        <h2 className="text-lg font-medium text-red-800">No se encontró el trámite</h2>
        <p className="text-red-600 mt-1">El trámite solicitado no existe o no tienes acceso a él.</p>
        <button 
          onClick={onBack} 
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeft size={16} className="mr-2" />
          Volver a la lista
        </button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "inProgress": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "delayed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const MessageBubble = ({ message }) => {
    const isAdvisor = message.role === "advisor";
    return (
      <div className={`flex ${isAdvisor ? "justify-end" : "justify-start"} mb-4`}>
        <div className={`max-w-[75%] p-3 rounded-lg ${isAdvisor ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}>
          <div className="flex items-center text-xs text-gray-500 mb-1">
            <span className="font-medium">{message.sender}</span>
            <span className="mx-1">•</span>
            <span>{message.date}</span>
          </div>
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <button 
        onClick={onBack} 
        className="mb-4 inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <ArrowLeft size={16} className="mr-1" />
        Volver a la lista
      </button>
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {/* Header with ticket basic info */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-900 flex items-center">
                {ticket.id} 
                <span className={`ml-3 px-2 py-1 text-xs font-medium ${getStatusColor(ticket.status)} rounded-full`}>
                  {ticket.status === "pending" ? "Pendiente" :
                   ticket.status === "inProgress" ? "En proceso" :
                   ticket.status === "completed" ? "Completado" : "Con retraso"}
                </span>
              </h1>
              <p className="text-gray-600 mt-1">{ticket.type}</p>
            </div>
            <div className="mt-2 sm:mt-0 flex-shrink-0">
              <div className={`px-3 py-1.5 text-sm font-medium ${getPriorityColor(ticket.priority)} rounded-lg inline-block`}>
                Prioridad: {ticket.priority === "urgent" ? "Urgente" :
                            ticket.priority === "high" ? "Alta" :
                            ticket.priority === "medium" ? "Media" : "Baja"}
              </div>
            </div>
          </div>
        </div>
        
        {/* Ticket content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-6">
          {/* Left column: Messages */}
          <div className="lg:col-span-2 p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Mensajes</h2>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-96 overflow-y-auto mb-4">
              {ticket.messages.map(message => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </div>
            
            <div className="flex items-center">
              <div className="relative flex-grow">
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Escribe tu mensaje aquí..."
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button className="absolute right-3 bottom-3 text-gray-400 hover:text-gray-600">
                  <Paperclip size={18} />
                </button>
              </div>
              <button
                className="ml-3 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg flex-shrink-0"
                onClick={handleSendComment}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
          
          {/* Right column: Ticket details and history */}
          <div className="bg-gray-50 p-4 border-t lg:border-t-0 lg:border-l border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Detalles del Trámite</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <User size={16} className="mr-1" /> Estudiante
                </h3>
                <p className="text-gray-900">{ticket.student.name}</p>
                <p className="text-sm text-gray-600">{ticket.student.email}</p>
                <p className="text-sm text-gray-600">ID: {ticket.student.id}</p>
                <p className="text-sm text-gray-600">Teléfono: {ticket.student.phone}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <GraduationCap size={16} className="mr-1" /> Información Académica
                </h3>
                <p className="text-sm text-gray-600">Programa: {ticket.student.program}</p>
                <p className="text-sm text-gray-600">Semestre: {ticket.student.semester}</p>
                
                <h4 className="text-xs font-medium text-gray-500 mt-2">Certificaciones:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 pl-2">
                  {ticket.student.certifications.map((cert, index) => (
                    <li key={index} className="text-sm">{cert}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <Calendar size={16} className="mr-1" /> Fechas
                </h3>
                <p className="text-sm text-gray-600">Creado: {ticket.created}</p>
                <p className="text-sm text-gray-600">Fecha límite: {ticket.deadline}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <Tag size={16} className="mr-1" /> Tipo de Trámite
                </h3>
                <p className="text-gray-900">{ticket.type}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <FileText size={16} className="mr-1" /> Descripción
                </h3>
                <p className="text-sm text-gray-600">{ticket.description}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Adjuntos</h3>
                <div className="mt-1 space-y-2">
                  {ticket.attachments.map((file, index) => (
                    <div key={index} className="flex items-center p-2 border border-gray-200 rounded-md bg-white">
                      <Paperclip size={16} className="text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-blue-600">{file.name}</p>
                        <p className="text-xs text-gray-500">{file.size}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <Clock size={16} className="mr-1" /> Historial
                </h3>
                <div className="mt-2 space-y-3">
                  {ticket.history.map((event, index) => (
                    <div key={index} className="relative pl-4 border-l-2 border-gray-200">
                      <span className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-blue-500"></span>
                      <p className="text-xs text-gray-500">{event.date}</p>
                      <p className="text-sm font-medium text-gray-800">{event.action}</p>
                      <p className="text-xs text-gray-600">Por: {event.user}</p>
                      {event.comment && (
                        <p className="text-xs text-gray-600 mt-1 italic">"{event.comment}"</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
