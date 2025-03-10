
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChatMessage } from "./types";

interface StudentProfileDialogProps {
  chat: ChatMessage;
}

const StudentProfileDialog = ({ chat }: StudentProfileDialogProps) => {
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
            <p className="font-medium">{chat.userName}</p>
            <p className="text-sm">{chat.userEmail}</p>
            <p className="text-sm">ID: {chat.studentInfo?.id}</p>
            {chat.studentInfo?.contact.phone && (
              <p className="text-sm">Teléfono: {chat.studentInfo?.contact.phone}</p>
            )}
            {chat.studentInfo?.contact.alternateEmail && (
              <p className="text-sm">Email alternativo: {chat.studentInfo?.contact.alternateEmail}</p>
            )}
            {chat.studentInfo?.contact.address && (
              <p className="text-sm">Dirección: {chat.studentInfo?.contact.address}</p>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Información Académica</h3>
            <p className="text-sm">Programa: {chat.studentInfo?.program}</p>
            <p className="text-sm">Semestre: {chat.studentInfo?.semester}</p>
            <p className="text-sm">Fecha de inscripción: {chat.studentInfo?.enrollmentDate}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Certificaciones</h3>
            <ul className="list-disc list-inside text-sm">
              {chat.studentInfo?.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default StudentProfileDialog;
