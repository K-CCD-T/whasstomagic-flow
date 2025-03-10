
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-ccd-800">CCD</span>
              <span className="ml-1 text-sm font-medium text-ccd-600">Trámites</span>
            </div>
            <p className="text-gray-600 mb-4">
              Sistema de Gestión de Trámites Académicos para el Centro de Capacitación y Desarrollo.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail size={16} className="text-ccd-600 mr-2" />
                <a href="mailto:info@ccd.edu" className="text-gray-600 hover:text-ccd-600">
                  info@ccd.edu
                </a>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="text-ccd-600 mr-2" />
                <a href="tel:+51123456789" className="text-gray-600 hover:text-ccd-600">
                  (01) 123-4567
                </a>
              </div>
              <div className="flex items-start">
                <MapPin size={16} className="text-ccd-600 mr-2 mt-1" />
                <span className="text-gray-600">
                  Av. Universidad 123, Lima, Perú
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-ccd-600 transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-ccd-600 transition-colors">
                  Crear Nuevo Trámite
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-ccd-600 transition-colors">
                  Mis Trámites
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-ccd-600 transition-colors">
                  Estado de Entregas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-ccd-600 transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trámites Populares</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-ccd-600 transition-colors">
                  Constancia de Notas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-ccd-600 transition-colors">
                  Certificado de Estudios
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-ccd-600 transition-colors">
                  Duplicado de Diploma
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-ccd-600 transition-colors">
                  Constancia de Egreso
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-ccd-600 transition-colors">
                  Queja o Sugerencia
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ayuda y Soporte</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-ccd-600 transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-ccd-600 transition-colors">
                  Guías de Usuario
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-ccd-600 transition-colors">
                  Políticas de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-ccd-600 transition-colors">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-ccd-600 transition-colors">
                  Contacto de Soporte
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} Centro de Capacitación y Desarrollo. Todos los derechos reservados.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="text-gray-600 hover:text-ccd-600 transition-colors">
                    Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-ccd-600 transition-colors">
                    Términos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-ccd-600 transition-colors">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
