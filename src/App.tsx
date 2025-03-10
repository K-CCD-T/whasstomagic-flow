
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdvisorDashboard from "./pages/AdvisorDashboard";
import NotFound from "./pages/NotFound";
import ChatBubble from "./components/chat/ChatBubble";
import { authService } from "./services/authService";

const queryClient = new QueryClient();

// Componente de protección de rutas
const ProtectedRoute = ({ element, allowedRoles, redirectTo = "/" }) => {
  const isAuthenticated = authService.isAuthenticated();
  const userRole = authService.getUserRole();
  
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirigir al dashboard apropiado según el rol
    if (userRole === 'admin') {
      return <Navigate to="/admin-dashboard" replace />;
    } else if (userRole === 'advisor') {
      return <Navigate to="/advisor-dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }
  
  return element;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute 
                element={<Dashboard />} 
                allowedRoles={['student']} 
              />
            } 
          />
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute 
                element={<AdminDashboard />} 
                allowedRoles={['admin']} 
              />
            } 
          />
          <Route 
            path="/advisor-dashboard" 
            element={
              <ProtectedRoute 
                element={<AdvisorDashboard />} 
                allowedRoles={['advisor']} 
              />
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatBubble />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
