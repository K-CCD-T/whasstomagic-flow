
import { 
  LayoutDashboard, 
  FileText, 
  User,
  ChevronLeft,
  LogOut,
  MessageCircle,
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AdvisorSidebar = ({ activeSection, setActiveSection, isOpen, setIsOpen }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", name: "Panel Principal", icon: <LayoutDashboard size={20} /> },
    { id: "tickets", name: "Trámites Asignados", icon: <FileText size={20} /> },
    { id: "chats", name: "Chats Asignados", icon: <MessageCircle size={20} /> },
    { id: "profile", name: "Mi Perfil", icon: <User size={20} /> },
  ];

  return (
    <aside 
      className={`bg-white shadow-md flex flex-col transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      } z-30 h-screen fixed`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-ccd-700">CCD</span>
          {isOpen && <span className="ml-2 text-sm font-semibold text-ccd-600">Asesor</span>}
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <ChevronLeft size={20} className={`transform transition-transform ${isOpen ? "" : "rotate-180"}`} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? "bg-ccd-50 text-ccd-800"
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

      <div className="p-3 border-t">
        <button
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          {isOpen && <span className="ml-3">Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdvisorSidebar;
