
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { mockUsers } from "./users/mockData";
import { User } from "./users/UserTable";
import SearchAndFilterBar from "./users/SearchAndFilterBar";
import UserTable from "./users/UserTable";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userType, setUserType] = useState("todos");
  const [userStatus, setUserStatus] = useState("todos");
  const { toast } = useToast();

  // Filter users based on search term, type, and status
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.correo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = userType === "todos" || user.tipo === userType;
    const matchesStatus = userStatus === "todos" || user.estado === userStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleUserAction = (action: string, userId: string) => {
    // This would be replaced with actual API calls in a real implementation
    let actionDescription = "";
    let variant: "default" | "destructive" = "default";
    
    switch(action) {
      case "edit":
        actionDescription = "Editar usuario";
        break;
      case "permissions":
        actionDescription = "Gestionar permisos";
        break;
      case "block":
        actionDescription = "Bloquear usuario";
        variant = "destructive";
        break;
      case "unblock":
        actionDescription = "Desbloquear usuario";
        // Using default variant instead of success since only default and destructive are supported
        variant = "default";
        break;
      case "reset":
        actionDescription = "Restablecer contraseña";
        break;
    }
    
    toast({
      title: `Acción: ${actionDescription}`,
      description: `Se ha iniciado la acción ${actionDescription} para el usuario con ID: ${userId}`,
      variant
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
        <p className="text-gray-600 mt-1">Administre estudiantes y personal con acceso al sistema.</p>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <SearchAndFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          userType={userType}
          setUserType={setUserType}
          userStatus={userStatus}
          setUserStatus={setUserStatus}
        />
        
        <UserTable 
          users={filteredUsers} 
          onUserAction={handleUserAction} 
        />
        
        <div className="p-4 border-t border-gray-200 text-sm text-gray-500">
          Mostrando {filteredUsers.length} de {mockUsers.length} usuarios
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
