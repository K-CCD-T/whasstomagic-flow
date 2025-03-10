
import { Search, Filter, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchAndFilterBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  userType: string;
  setUserType: (value: string) => void;
  userStatus: string;
  setUserStatus: (value: string) => void;
}

const SearchAndFilterBar = ({
  searchTerm,
  setSearchTerm,
  userType,
  setUserType,
  userStatus,
  setUserStatus,
}: SearchAndFilterBarProps) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Buscar por ID, nombre o correo..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="w-40">
            <Select value={userType} onValueChange={setUserType}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de usuario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los tipos</SelectItem>
                <SelectItem value="estudiante">Estudiantes</SelectItem>
                <SelectItem value="administrativo">Administrativos</SelectItem>
                <SelectItem value="operador">Operadores</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-40">
            <Select value={userStatus} onValueChange={setUserStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="bloqueado">Bloqueado</SelectItem>
                <SelectItem value="inactivo">Inactivo</SelectItem>
                <SelectItem value="suspendido">Suspendido</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button className="ml-auto" variant="outline">
            <Filter size={16} className="mr-2" />
            Filtros avanzados
          </Button>
          
          <Button>
            <UserPlus size={16} className="mr-2" />
            Nuevo usuario
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilterBar;
