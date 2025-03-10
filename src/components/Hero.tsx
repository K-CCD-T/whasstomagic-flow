
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-bg pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className="max-w-xl">
              <h4 className="text-ccd-600 font-medium opacity-0 animate-fadeIn mb-2">
                Centro de Capacitación y Desarrollo
              </h4>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 opacity-0 animate-fadeIn animate-stagger-1 leading-tight">
                Sistema de Gestión de Trámites Académicos
              </h1>
              <p className="mt-4 text-lg text-gray-600 opacity-0 animate-fadeIn animate-stagger-2">
                Simplifica tus trámites en el Centro de Capacitación y Desarrollo.
                Gestiona, monitorea y completa tus procedimientos académicos en un solo lugar.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 opacity-0 animate-fadeIn animate-stagger-3">
                <button className="btn-primary flex items-center justify-center">
                  Crear Nuevo Trámite
                  <ArrowRight size={18} className="ml-2" />
                </button>
                <button className="btn-secondary">
                  Explorar Trámites
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center opacity-0 animate-fadeInRight animate-stagger-2">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-ccd-400 to-ccd-600 rounded-2xl blur-xl opacity-20 animate-pulse"></div>
              <div className="glass-card relative rounded-2xl p-6 md:p-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-ccd-100 to-ccd-200 rounded-bl-2xl"></div>
                <div className="relative rounded-xl bg-white p-4 mb-6 border border-gray-100">
                  <h3 className="font-medium text-gray-800">Estado de Trámites</h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">En proceso</span>
                      <span className="text-sm font-medium text-ccd-600">2</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-ccd-500 rounded-full w-1/3"></div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Completados</span>
                      <span className="text-sm font-medium text-green-600">5</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full w-5/6"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Trámites Recientes</h2>
                  <button className="text-sm text-ccd-600 hover:text-ccd-700 font-medium">Ver todos</button>
                </div>
                <div className="space-y-3">
                  {[
                    { id: 'T-2023-089', type: 'Certificado de Estudios', status: 'En proceso', date: '12/05/2023' },
                    { id: 'T-2023-076', type: 'Constancia de Notas', status: 'Completado', date: '05/05/2023' },
                  ].map((tramite) => (
                    <div key={tramite.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 transition-all hover:bg-white hover:shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-800">{tramite.type}</p>
                          <p className="text-xs text-gray-500">ID: {tramite.id} | {tramite.date}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          tramite.status === 'Completado' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {tramite.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
