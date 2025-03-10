
import { 
  LayoutDashboard, 
  FileText, 
  FilePlus, 
  Package, 
  User, 
  HelpCircle,
  ChevronLeft,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DashboardSidebar = ({ activeSection, setActiveSection, isOpen, setIsOpen }: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const menuItems = [
    { id: "dashboard", name: "Panel Principal", icon: <LayoutDashboard size={20} /> },
    { id: "myProcedures", name: "Mis Trámites", icon: <FileText size={20} /> },
    { id: "newProcedure", name: "Crear Nuevo Trámite", icon: <FilePlus size={20} /> },
    { id: "deliveryStatus", name: "Estado de Entregas", icon: <Package size={20} /> },
    { id: "userProfile", name: "Perfil de Usuario", icon: <User size={20} /> },
    { id: "help", name: "Ayuda y Soporte", icon: <HelpCircle size={20} /> },
  ];

  return (
    <aside 
      className={`bg-white shadow-lg flex flex-col transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      } z-30`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-ccd-800">CCD</span>
          {isOpen && <span className="ml-1 text-sm font-medium text-ccd-600">Trámites</span>}
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <ChevronLeft size={20} className={`transform transition-transform ${isOpen ? "" : "rotate-180"}`} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id} className="px-3">
              <button
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? "bg-ccd-50 text-ccd-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {isOpen && <span className="ml-3 text-sm font-medium">{item.name}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-3 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          {isOpen && <span className="ml-3">Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
