
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardOverview from "../components/dashboard/DashboardOverview";
import MyProcedures from "../components/dashboard/MyProcedures";
import NewProcedure from "../components/dashboard/NewProcedure";
import DeliveryStatus from "../components/dashboard/DeliveryStatus";
import UserProfile from "../components/dashboard/UserProfile";
import Help from "../components/dashboard/Help";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // Verify authentication on component mount
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />;
      case "myProcedures":
        return <MyProcedures />;
      case "newProcedure":
        return <NewProcedure />;
      case "deliveryStatus":
        return <DeliveryStatus />;
      case "userProfile":
        return <UserProfile />;
      case "help":
        return <Help />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader 
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

export default Dashboard;
