
import { useState } from "react";
import { User, Mail, Phone, Calendar, MapPin, Edit, Save, X } from "lucide-react";
import { toast } from "sonner";

const AdvisorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    nombre: "María López",
    email: "advisor@ccd.edu.pe",
    telefono: "+51 987 654 321",
    fechaIngreso: "15/01/2020",
    direccion: "Av. Universidad 123, Lima",
    especialidad: "Trámites Académicos",
    departamento: "Atención al Estudiante",
    descripcion: "Especialista en atención al estudiante con más de 3 años de experiencia en gestión de trámites académicos y administrativos."
  });

  const [editedProfile, setEditedProfile] = useState({...profile});

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast.success("Perfil actualizado correctamente");
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit size={16} className="mr-2" />
            Editar Perfil
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save size={16} className="mr-2" />
              Guardar
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <X size={16} className="mr-2" />
              Cancelar
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              <User size={40} className="text-gray-600" />
            </div>
            <div className="flex-grow">
              {!isEditing ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-900">{profile.nombre}</h2>
                  <p className="text-gray-600">{profile.especialidad}</p>
                  <p className="text-gray-600">{profile.departamento}</p>
                </>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                    <input
                      type="text"
                      name="nombre"
                      value={editedProfile.nombre}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Especialidad</label>
                    <input
                      type="text"
                      name="especialidad"
                      value={editedProfile.especialidad}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                    <input
                      type="text"
                      name="departamento"
                      value={editedProfile.departamento}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Información Personal</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Correo Electrónico</p>
                    {!isEditing ? (
                      <p className="text-gray-600">{profile.email}</p>
                    ) : (
                      <input
                        type="email"
                        name="email"
                        value={editedProfile.email}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Teléfono</p>
                    {!isEditing ? (
                      <p className="text-gray-600">{profile.telefono}</p>
                    ) : (
                      <input
                        type="text"
                        name="telefono"
                        value={editedProfile.telefono}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Fecha de Ingreso</p>
                    <p className="text-gray-600">{profile.fechaIngreso}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Dirección</p>
                    {!isEditing ? (
                      <p className="text-gray-600">{profile.direccion}</p>
                    ) : (
                      <input
                        type="text"
                        name="direccion"
                        value={editedProfile.direccion}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Descripción Profesional</h3>
              {!isEditing ? (
                <p className="text-gray-600">{profile.descripcion}</p>
              ) : (
                <textarea
                  name="descripcion"
                  value={editedProfile.descripcion}
                  onChange={handleChange}
                  rows={5}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              )}
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Estadísticas</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-700">Trámites Completados</h4>
                    <p className="text-2xl font-bold text-blue-900">84</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-green-700">Tiempo Promedio</h4>
                    <p className="text-2xl font-bold text-green-900">1.5 días</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorProfile;
