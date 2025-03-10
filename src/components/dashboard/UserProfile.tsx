
import { useState } from "react";
import { User, Mail, Phone, Book, Shield, Camera, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  
  // Mock user data
  const userData = {
    personal: {
      name: "Estudiante Demo",
      email: "estudiante@institucion.edu",
      phone: "+51 987 654 321",
      idNumber: "12345678",
      address: "Av. Universidad 123, Lima",
      birthDate: "01/01/1995",
    },
    academic: {
      faculty: "Ingeniería",
      program: "Ingeniería de Sistemas",
      studentId: "20192001",
      currentCycle: "8vo Ciclo",
      enrollmentDate: "15/03/2019",
      academicStatus: "Regular",
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Perfil de Usuario</h1>
        <p className="text-gray-600 mt-1">Gestiona tu información personal y configuración de cuenta</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden mb-4 border-4 border-white shadow">
                <User size={40} className="text-gray-500" />
                <button className="absolute bottom-0 right-0 bg-ccd-600 text-white p-1 rounded-full">
                  <Camera size={16} />
                </button>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Estudiante Demo</h3>
              <p className="text-sm text-gray-500">estudiante@institucion.edu</p>
              
              <div className="w-full mt-6">
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab("personal")}
                    className={`flex items-center px-3 py-2 w-full rounded-md ${
                      activeTab === "personal" 
                        ? "bg-ccd-50 text-ccd-700" 
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <User size={16} className="mr-3" />
                    <span>Información Personal</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("academic")}
                    className={`flex items-center px-3 py-2 w-full rounded-md ${
                      activeTab === "academic" 
                        ? "bg-ccd-50 text-ccd-700" 
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Book size={16} className="mr-3" />
                    <span>Información Académica</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("security")}
                    className={`flex items-center px-3 py-2 w-full rounded-md ${
                      activeTab === "security" 
                        ? "bg-ccd-50 text-ccd-700" 
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Shield size={16} className="mr-3" />
                    <span>Seguridad</span>
                  </button>
                </nav>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          {activeTab === "personal" && (
            <>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>
                  Actualiza tu información de contacto y datos personales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ccd-500 focus:border-transparent"
                        defaultValue={userData.personal.name}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Correo Electrónico
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ccd-500 focus:border-transparent"
                          defaultValue={userData.personal.email}
                          readOnly
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">El correo electrónico institucional no se puede modificar</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ccd-500 focus:border-transparent"
                          defaultValue={userData.personal.phone}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        DNI / Documento de Identidad
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ccd-500 focus:border-transparent"
                        defaultValue={userData.personal.idNumber}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dirección
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ccd-500 focus:border-transparent"
                        defaultValue={userData.personal.address}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de Nacimiento
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ccd-500 focus:border-transparent"
                        defaultValue={userData.personal.birthDate}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ccd-600 hover:bg-ccd-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ccd-500"
                    >
                      <Save size={16} className="mr-2" />
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </CardContent>
            </>
          )}

          {activeTab === "academic" && (
            <>
              <CardHeader>
                <CardTitle>Información Académica</CardTitle>
                <CardDescription>
                  Información sobre tu programa académico y estado actual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Facultad</h3>
                    <p className="text-base font-medium">{userData.academic.faculty}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Programa</h3>
                    <p className="text-base font-medium">{userData.academic.program}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Código de Estudiante</h3>
                    <p className="text-base font-medium">{userData.academic.studentId}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Ciclo Actual</h3>
                    <p className="text-base font-medium">{userData.academic.currentCycle}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Fecha de Ingreso</h3>
                    <p className="text-base font-medium">{userData.academic.enrollmentDate}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Estado Académico</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {userData.academic.academicStatus}
                    </span>
                  </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Documentos Académicos</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Book size={20} className="text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Constancia de Matrícula</p>
                          <p className="text-xs text-gray-500">Semestre 2023-II</p>
                        </div>
                      </div>
                      <button className="text-sm font-medium text-ccd-600 hover:text-ccd-700">
                        Descargar
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Book size={20} className="text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Récord Académico</p>
                          <p className="text-xs text-gray-500">Actualizado al 01/11/2023</p>
                        </div>
                      </div>
                      <button className="text-sm font-medium text-ccd-600 hover:text-ccd-700">
                        Descargar
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {activeTab === "security" && (
            <>
              <CardHeader>
                <CardTitle>Seguridad de la Cuenta</CardTitle>
                <CardDescription>
                  Gestiona tu contraseña y opciones de seguridad
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Cambiar Contraseña</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contraseña Actual
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ccd-500 focus:border-transparent"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nueva Contraseña
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ccd-500 focus:border-transparent"
                          placeholder="••••••••"
                        />
                        <p className="mt-1 text-xs text-gray-500">La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula y un número</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Confirmar Nueva Contraseña
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ccd-500 focus:border-transparent"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ccd-600 hover:bg-ccd-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ccd-500"
                        >
                          Actualizar Contraseña
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Autenticación de Dos Factores</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Protege tu cuenta con autenticación de dos factores</p>
                        <p className="text-xs text-gray-500 mt-1">Se enviará un código a tu teléfono móvil cada vez que inicies sesión</p>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ccd-500"
                      >
                        Activar
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Historial de Inicios de Sesión</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Lima, Perú</p>
                          <p className="text-xs text-gray-500 mt-1">Hoy, 10:30 AM • Google Chrome</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Sesión actual
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Lima, Perú</p>
                          <p className="text-xs text-gray-500 mt-1">Ayer, 15:45 PM • Safari</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Finalizada
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Lima, Perú</p>
                          <p className="text-xs text-gray-500 mt-1">12 Nov 2023, 09:15 AM • Firefox</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Finalizada
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
