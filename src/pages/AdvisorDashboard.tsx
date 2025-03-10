
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import AdvisorHeader from "../components/advisor/AdvisorHeader";
import AdvisorSidebar from "../components/advisor/AdvisorSidebar";
import AdvisorOverview from "../components/advisor/AdvisorOverview";
import AssignedTickets from "../components/advisor/AssignedTickets";
import TicketDetails from "../components/advisor/TicketDetails";
import AdvisorProfile from "../components/advisor/AdvisorProfile";
import AdvisorChats from "../components/advisor/AdvisorChats";

const AdvisorDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdvisorOverview />;
      case "tickets":
        return selectedTicketId ? (
          <TicketDetails 
            ticketId={selectedTicketId} 
            onBack={() => setSelectedTicketId(null)} 
          />
        ) : (
          <AssignedTickets onSelectTicket={(id) => setSelectedTicketId(id)} />
        );
      case "chats":
        return <AdvisorChats />;
      case "profile":
        return <AdvisorProfile />;
      default:
        return <AdvisorOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdvisorSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className={`flex flex-col flex-1 overflow-hidden ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <AdvisorHeader 
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

export default AdvisorDashboard;
