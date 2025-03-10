
import { Edit, Shield, Lock, Unlock, RefreshCw, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserActionsMenuProps {
  userId: string;
  userStatus: string;
  onAction: (action: string, userId: string) => void;
}

const UserActionsMenu = ({ userId, userStatus, onAction }: UserActionsMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onAction("edit", userId)}>
          <Edit className="mr-2 h-4 w-4" />
          <span>Editar perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction("permissions", userId)}>
          <Shield className="mr-2 h-4 w-4" />
          <span>Gestionar permisos</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {userStatus === "activo" ? (
          <DropdownMenuItem onClick={() => onAction("block", userId)}>
            <Lock className="mr-2 h-4 w-4" />
            <span>Bloquear usuario</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => onAction("unblock", userId)}>
            <Unlock className="mr-2 h-4 w-4" />
            <span>Desbloquear usuario</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => onAction("reset", userId)}>
          <RefreshCw className="mr-2 h-4 w-4" />
          <span>Restablecer contraseña</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActionsMenu;
