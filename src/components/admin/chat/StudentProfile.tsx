
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChatMessage } from "./types";

interface StudentProfileProps {
  studentInfo: ChatMessage['studentInfo'];
  userName: string;
  userEmail: string;
}

const StudentProfile = ({ studentInfo, userName, userEmail }: StudentProfileProps) => {
  if (!studentInfo) return null;
  
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Perfil del Estudiante</DialogTitle>
        <DialogDescription>
          Información detallada del estudiante.
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Información Personal</h3>
            <p className="font-medium">{userName}</p>
            <p className="text-sm">{userEmail}</p>
            <p className="text-sm">ID: {studentInfo.id}</p>
            {studentInfo.contact.phone && (
              <p className="text-sm">Teléfono: {studentInfo.contact.phone}</p>
            )}
            {studentInfo.contact.alternateEmail && (
              <p className="text-sm">Email alternativo: {studentInfo.contact.alternateEmail}</p>
            )}
            {studentInfo.contact.address && (
              <p className="text-sm">Dirección: {studentInfo.contact.address}</p>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Información Académica</h3>
            <p className="text-sm">Programa: {studentInfo.program}</p>
            <p className="text-sm">Semestre: {studentInfo.semester}</p>
            <p className="text-sm">Fecha de inscripción: {studentInfo.enrollmentDate}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Certificaciones</h3>
            <ul className="list-disc list-inside text-sm">
              {studentInfo.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default StudentProfile;
