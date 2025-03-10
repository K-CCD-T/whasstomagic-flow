
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

export const mockUsers: User[] = [
  {
    id: "EST-2023-0001",
    tipo: "estudiante",
    nombres: "Juan Carlos",
    apellidos: "Méndez López",
    correo: "jmendez@ccd.edu.pe",
    programa: "Ingeniería Civil",
    estado: "activo",
    ultimoAcceso: "2023-09-15T08:45:00",
  },
  {
    id: "EST-2023-0002",
    tipo: "estudiante",
    nombres: "María José",
    apellidos: "Fernández Gómez",
    correo: "mfernandez@ccd.edu.pe",
    programa: "Administración",
    estado: "bloqueado",
    ultimoAcceso: "2023-09-10T14:30:00",
  },
  {
    id: "ADM-2023-0007",
    tipo: "administrativo",
    nombres: "María Elena",
    apellidos: "Gómez Fernández",
    correo: "mgomez@ccd.edu.pe",
    programa: "Coordinación Académica",
    estado: "activo",
    ultimoAcceso: "2023-09-18T14:20:00",
  },
  {
    id: "EST-2023-0003",
    tipo: "estudiante",
    nombres: "Roberto",
    apellidos: "Sánchez Torres",
    correo: "rsanchez@ccd.edu.pe",
    programa: "Psicología",
    estado: "inactivo",
    ultimoAcceso: "2023-08-05T11:15:00",
  },
  {
    id: "OPE-2023-0004",
    tipo: "operador",
    nombres: "Carlos Eduardo",
    apellidos: "Ramírez Ponce",
    correo: "cramirez@ccd.edu.pe",
    programa: "Soporte Técnico",
    estado: "activo",
    ultimoAcceso: "2023-09-18T09:30:00",
  }
];
