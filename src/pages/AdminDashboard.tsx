
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminOverview from "../components/admin/AdminOverview";
import TicketManagement from "../components/admin/TicketManagement";
import Reports from "../components/admin/Reports";
import PhysicalDelivery from "../components/admin/PhysicalDelivery";
import UserManagement from "../components/admin/UserManagement";
import SystemConfig from "../components/admin/SystemConfig";
import Audit from "../components/admin/Audit";
import ChatManagement from "../components/admin/ChatManagement";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminOverview />;
      case "tickets":
        return <TicketManagement />;
      case "reports":
        return <Reports />;
      case "delivery":
        return <PhysicalDelivery />;
      case "users":
        return <UserManagement />;
      case "config":
        return <SystemConfig />;
      case "audit":
        return <Audit />;
      case "chats":
        return <ChatManagement />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className={`flex flex-col flex-1 overflow-hidden ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <AdminHeader 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          onLogout={handleLogout}
          sidebarOpen={sidebarOpen}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
