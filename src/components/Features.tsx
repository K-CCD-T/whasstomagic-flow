
import { CheckCircle, Clock, RefreshCw, HeadphonesIcon } from 'lucide-react';

const features = [
  {
    icon: <CheckCircle size={28} className="text-ccd-600" />,
    title: "Trámites 100% en línea",
    description: "Realiza todos tus procedimientos académicos completamente en línea, sin papeles ni filas."
  },
  {
    icon: <Clock size={28} className="text-ccd-600" />,
    title: "Seguimiento en tiempo real",
    description: "Monitorea el estado de tus trámites en cualquier momento y desde cualquier dispositivo."
  },
  {
    icon: <RefreshCw size={28} className="text-ccd-600" />,
    title: "Gestión simple y rápida",
    description: "Interfaz intuitiva que te permite completar tus trámites con el mínimo esfuerzo."
  },
  {
    icon: <HeadphonesIcon size={28} className="text-ccd-600" />,
    title: "Soporte inmediato",
    description: "Asistencia personalizada para resolver cualquier duda durante el proceso."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Características Principales
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Descubre las ventajas de gestionar tus trámites académicos en nuestra plataforma digital.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-ccd-100"
            >
              <div className="w-12 h-12 bg-ccd-50 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
