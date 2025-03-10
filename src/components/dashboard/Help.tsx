
import { useState } from "react";
import { 
  HelpCircle, 
  Book, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Help = () => {
  const [openFaq, setOpenFaq] = useState(null);
  
  const faqs = [
    {
      question: "¿Cómo creo un nuevo trámite?",
      answer: "Para crear un nuevo trámite, debes dirigirte a la sección 'Crear Nuevo Trámite' en el menú lateral. Allí podrás seleccionar el tipo de trámite que necesitas y completar el formulario correspondiente con la información requerida."
    },
    {
      question: "¿Cuánto tiempo toma procesar mi trámite?",
      answer: "El tiempo de procesamiento depende del tipo de trámite. En general, los trámites regulares se procesan en un plazo de 5 días hábiles. Los trámites marcados como urgentes tienen un tiempo de respuesta de 2 días hábiles."
    },
    {
      question: "¿Cómo puedo hacer seguimiento a mi trámite?",
      answer: "Puedes hacer seguimiento a tu trámite desde la sección 'Mis Trámites'. Allí encontrarás una lista de todos tus trámites con su estado actual. También puedes recibir notificaciones automáticas sobre cambios en el estado de tus trámites."
    },
    {
      question: "¿Qué documentos necesito adjuntar para solicitar un certificado de estudios?",
      answer: "Para solicitar un certificado de estudios, necesitas adjuntar una copia de tu DNI o documento de identidad. Si es un certificado para fines específicos (postulación laboral, estudios en el extranjero, etc.), debes mencionarlo en la descripción del trámite."
    },
    {
      question: "¿Cómo puedo recuperar mi contraseña?",
      answer: "En la página de inicio de sesión, haz clic en '¿Olvidaste tu contraseña?'. Se te pedirá que ingreses tu correo electrónico institucional para recibir un enlace de recuperación. Sigue las instrucciones en el correo para establecer una nueva contraseña."
    },
    {
      question: "¿Dónde puedo recoger mis documentos físicos?",
      answer: "Los documentos físicos se pueden recoger en la Oficina Central de Trámites ubicada en el Pabellón A. El horario de atención es de lunes a viernes de 8:00 AM a 5:00 PM. Debes presentar tu DNI o carné universitario para recoger tus documentos."
    },
  ];

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ayuda y Soporte</h1>
        <p className="text-gray-600 mt-1">Encuentra respuestas a tus preguntas y obtén asistencia para el uso del sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <HelpCircle className="mr-2 h-5 w-5 text-ccd-600" />
              FAQs
            </CardTitle>
            <CardDescription>Preguntas frecuentes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-2">
              Encuentra respuestas a las preguntas más comunes sobre el sistema de trámites.
            </p>
            <button className="text-sm text-ccd-600 hover:text-ccd-700 font-medium">
              Ver todas las preguntas
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Book className="mr-2 h-5 w-5 text-ccd-600" />
              Manuales
            </CardTitle>
            <CardDescription>Guías de uso</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-2">
              Descarga manuales detallados sobre el uso del sistema de trámites.
            </p>
            <button className="text-sm text-ccd-600 hover:text-ccd-700 font-medium">
              Ver todos los manuales
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-ccd-600" />
              Soporte
            </CardTitle>
            <CardDescription>Contacta con nosotros</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-2">
              ¿Tienes problemas o dudas? Contacta directamente con nuestro equipo de soporte.
            </p>
            <button className="text-sm text-ccd-600 hover:text-ccd-700 font-medium">
              Contactar soporte
            </button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preguntas Frecuentes</CardTitle>
          <CardDescription>
            Respuestas a las preguntas más comunes sobre el sistema de trámites
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="flex justify-between items-center w-full px-4 py-3 text-left bg-white hover:bg-gray-50 focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                  <span>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </span>
                </button>
                
                {openFaq === index && (
                  <div className="px-4 pb-3 pt-0">
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Manuales de Usuario</CardTitle>
            <CardDescription>
              Guías detalladas para cada función del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Book size={20} className="text-blue-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Guía de Inicio Rápido</h4>
                  <p className="text-xs text-gray-500 mt-1">Una introducción rápida al sistema de trámites</p>
                  <button className="text-xs text-ccd-600 hover:text-ccd-700 mt-1 flex items-center">
                    Descargar PDF <ExternalLink size={12} className="ml-1" />
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Book size={20} className="text-blue-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Manual de Creación de Trámites</h4>
                  <p className="text-xs text-gray-500 mt-1">Cómo crear y gestionar tus trámites paso a paso</p>
                  <button className="text-xs text-ccd-600 hover:text-ccd-700 mt-1 flex items-center">
                    Descargar PDF <ExternalLink size={12} className="ml-1" />
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Book size={20} className="text-blue-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Guía de Seguimiento de Trámites</h4>
                  <p className="text-xs text-gray-500 mt-1">Cómo hacer seguimiento a tus trámites en proceso</p>
                  <button className="text-xs text-ccd-600 hover:text-ccd-700 mt-1 flex items-center">
                    Descargar PDF <ExternalLink size={12} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contacto y Soporte</CardTitle>
            <CardDescription>
              Canales de comunicación para asistencia técnica
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Soporte Técnico</h3>
                <div className="flex items-center mb-2">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">soporte@institucion.edu</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">+51 123 456 789</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Horario de atención: Lunes a viernes de 8:00 AM a 6:00 PM
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Chat en Vivo</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Conéctate con un asesor en tiempo real para resolver tus dudas
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ccd-600 hover:bg-ccd-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ccd-500">
                  <MessageSquare size={16} className="mr-2" />
                  Iniciar Chat
                </button>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Formulario de Soporte</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Envía una solicitud de soporte detallada y te responderemos a la brevedad
                </p>
                <button className="text-sm text-ccd-600 hover:text-ccd-700 font-medium">
                  Ir al formulario
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Help;
