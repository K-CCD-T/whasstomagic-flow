
import { useState } from "react";
import { Bell, Search, Menu, User } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
  onLogout: () => void;
  sidebarOpen: boolean;
}

const DashboardHeader = ({ toggleSidebar, onLogout, sidebarOpen }: HeaderProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const notifications = [
    { id: 1, text: "Tu trámite #TR-2023-001 ha sido actualizado", time: "Hace 5 minutos", unread: true },
    { id: 2, text: "Nuevo mensaje de soporte técnico", time: "Hace 1 hora", unread: true },
    { id: 3, text: "Tu trámite #TR-2023-002 ha sido completado", time: "Ayer", unread: false },
  ];

  return (
    <header className="bg-white border-b border-gray-200 z-20">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 focus:outline-none md:hidden"
          >
            <Menu size={20} />
          </button>
          
          <div className={`relative ml-4 ${sidebarOpen ? 'md:ml-0' : 'md:ml-4'}`}>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-48 md:w-64 lg:w-80 bg-gray-100 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ccd-500 focus:border-transparent"
              placeholder="Buscar trámites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900">Notificaciones</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 ${notification.unread ? 'bg-blue-50' : ''}`}
                    >
                      <p className="text-sm text-gray-800">{notification.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-200">
                  <button className="text-xs font-medium text-ccd-600 hover:text-ccd-700">
                    Ver todas las notificaciones
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <User size={16} className="text-gray-600" />
              </div>
              <span className="ml-2 text-sm font-medium hidden md:block">Estudiante Demo</span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">Estudiante Demo</p>
                  <p className="text-xs text-gray-500 mt-1">estudiante@institucion.edu</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      document.getElementById("userProfile")?.click();
                    }}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Perfil de Usuario
                  </button>
                  <button
                    onClick={onLogout}
                    className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
