
import { File, Award, Copy, GraduationCap, MessageSquare, FileText } from 'lucide-react';

const procedureTypes = [
  {
    icon: <File size={24} className="text-ccd-600" />,
    title: "Constancia de Notas",
    description: "Documento oficial que certifica las calificaciones obtenidas en el periodo académico."
  },
  {
    icon: <Award size={24} className="text-ccd-600" />,
    title: "Certificado de Estudios",
    description: "Documento que acredita la finalización satisfactoria de un programa académico."
  },
  {
    icon: <Copy size={24} className="text-ccd-600" />,
    title: "Duplicado de Diploma",
    description: "Solicitud de una nueva copia del diploma debido a pérdida o deterioro del original."
  },
  {
    icon: <GraduationCap size={24} className="text-ccd-600" />,
    title: "Constancia de Egreso",
    description: "Documento que certifica la culminación de todos los requisitos académicos del programa."
  },
  {
    icon: <MessageSquare size={24} className="text-ccd-600" />,
    title: "Queja o Sugerencia",
    description: "Canal para comunicar inconformidades o propuestas de mejora sobre servicios académicos."
  },
  {
    icon: <FileText size={24} className="text-ccd-600" />,
    title: "Otros Trámites",
    description: "Solicitudes especiales que requieren un proceso personalizado según necesidades específicas."
  }
];

const ProcedureTypes = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tipos de Trámites Disponibles
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Explora los diferentes procedimientos académicos que puedes gestionar en nuestra plataforma.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {procedureTypes.map((procedure, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-ccd-200 hover:translate-y-[-5px]"
            >
              <div className="flex items-start">
                <div className="w-10 h-10 bg-ccd-50 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  {procedure.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{procedure.title}</h3>
                  <p className="text-gray-600 text-sm">{procedure.description}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full px-4 py-2 bg-white text-ccd-600 rounded-lg font-medium border border-ccd-200 transition-all duration-300 hover:bg-ccd-50 focus:outline-none flex items-center justify-center">
                  Iniciar Trámite
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="btn-primary">
            Ver todos los trámites
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProcedureTypes;
