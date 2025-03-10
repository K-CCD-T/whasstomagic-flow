
import { Bell, Search, User, LogOut, Menu } from "lucide-react";

interface AdminHeaderProps {
  toggleSidebar: () => void;
  onLogout: () => void;
  sidebarOpen: boolean;
}

const AdminHeader = ({ toggleSidebar, onLogout, sidebarOpen }: AdminHeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="mr-4 text-gray-500 hover:text-gray-700 lg:hidden"
        >
          <Menu size={24} />
        </button>
        
        <div className="relative w-64 lg:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar tickets, usuarios..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700 relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        
        <div className="relative">
          <button className="flex items-center text-gray-700 hover:text-gray-900">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
              <User size={18} />
            </div>
            <span className="ml-2 font-medium text-sm hidden md:block">Administrador</span>
          </button>
        </div>
        
        <button 
          onClick={onLogout}
          className="text-gray-500 hover:text-gray-700 flex items-center"
        >
          <LogOut size={20} />
          <span className="ml-1 text-sm font-medium hidden md:block">Salir</span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
