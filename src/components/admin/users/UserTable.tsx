
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import UserActionsMenu from "./UserActionsMenu";

export interface User {
  id: string;
  tipo: string;
  nombres: string;
  apellidos: string;
  correo: string;
  programa: string;
  estado: string;
  ultimoAcceso: string;
}

interface UserTableProps {
  users: User[];
  onUserAction: (action: string, userId: string) => void;
}

const UserTable = ({ users, onUserAction }: UserTableProps) => {
  const getUserStatusBadge = (status: string) => {
    switch(status) {
      case 'activo':
        return <Badge className="bg-green-500">Activo</Badge>;
      case 'bloqueado':
        return <Badge className="bg-red-500">Bloqueado</Badge>;
      case 'inactivo':
        return <Badge className="bg-gray-500">Inactivo</Badge>;
      case 'suspendido':
        return <Badge className="bg-amber-500">Suspendido</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Programa/Área</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Último acceso</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{`${user.nombres} ${user.apellidos}`}</TableCell>
                <TableCell>{user.correo}</TableCell>
                <TableCell className="capitalize">{user.tipo}</TableCell>
                <TableCell>{user.programa}</TableCell>
                <TableCell>{getUserStatusBadge(user.estado)}</TableCell>
                <TableCell>{new Date(user.ultimoAcceso).toLocaleString('es-ES', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</TableCell>
                <TableCell className="text-right">
                  <UserActionsMenu 
                    userId={user.id} 
                    userStatus={user.estado} 
                    onAction={onUserAction} 
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                No se encontraron usuarios con los criterios de búsqueda.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
