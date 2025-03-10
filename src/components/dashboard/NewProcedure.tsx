
import { useState } from "react";
import { Upload, AlertCircle, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const NewProcedure = () => {
  const [procedureType, setProcedureType] = useState("");
  const [urgency, setUrgency] = useState("normal");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);

  const procedureTypes = [
    { id: "constancia-notas", name: "Constancia de Notas" },
    { id: "certificado-estudios", name: "Certificado de Estudios" },
    { id: "duplicado-diploma", name: "Duplicado de Diploma" },
    { id: "constancia-egreso", name: "Constancia de Egreso" },
    { id: "queja-sugerencia", name: "Queja o Sugerencia" },
    { id: "otros", name: "Otros Trámites" },
  ];

  const handleFileChange = (e) => {
    // In a real app, you would handle file uploads here
    console.log("Files selected:", e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit the form data to your backend
    alert("Trámite enviado con éxito. Código generado: TR-2023-006");
  };

  const renderFormFields = () => {
    switch (procedureType) {
      case "constancia-notas":
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Semestre Académico
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ccd-500 focus:border-transparent">
                <option value="">Seleccionar semestre</option>
                <option value="2023-I">2023-I</option>
                <option value="2023-II">2023-II</option>
                <option value="2022-I">2022-I</option>
                <option value="2022-II">2022-II</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Propósito de la Constancia
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ccd-500 focus:border-transparent">
                <option value="">Seleccionar propósito</option>
                <option value="beca">Beca</option>
                <option value="trabajo">Trabajo</option>
                <option value="estudios">Continuación de Estudios</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </>
        );

      case "certificado-estudios":
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Período Académico
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Desde</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ccd-500 focus:border-transparent">
                    <option value="">Año inicial</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Hasta</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ccd-500 focus:border-transparent">
                    <option value="">Año final</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Certificado
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ccd-500 focus:border-transparent">
                <option value="">Seleccionar tipo</option>
                <option value="completo">Certificado Completo</option>
                <option value="parcial">Certificado Parcial</option>
              </select>
            </div>
          </>
        );

      // Add cases for other procedure types as needed
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Crear Nuevo Trámite</h1>
        <p className="text-gray-600 mt-1">Completa el formulario para iniciar un nuevo trámite académico</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{previewMode ? "Vista Previa del Trámite" : "Formulario de Solicitud"}</CardTitle>
          <CardDescription>
            {previewMode 
              ? "Revisa la información antes de enviar tu solicitud" 
              : "Completa todos los campos requeridos para tu trámite"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {previewMode ? (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Resumen de la Solicitud</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Tipo de Trámite</p>
                    <p className="font-medium">
                      {procedureTypes.find(pt => pt.id === procedureType)?.name || "No seleccionado"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nivel de Urgencia</p>
                    <p className="font-medium capitalize">{urgency}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Información Adicional</p>
                  <div className="mt-1 p-2 bg-white border border-gray-200 rounded-md">
                    {description || <span className="text-gray-400 italic">Sin descripción</span>}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Documentos Adjuntos</p>
                  <p className="font-medium">{attachments.length > 0 ? `${attachments.length} archivos` : "Sin adjuntos"}</p>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ccd-500"
                  onClick={() => setPreviewMode(false)}
                >
                  Volver al Formulario
                </button>
                
                <button
                  type="button"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ccd-600 hover:bg-ccd-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ccd-500"
                  onClick={handleSubmit}
                >
                  Enviar Solicitud
                </button>
              </div>
            </div>
          ) : (
            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Trámite *
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ccd-500 focus:border-transparent"
                    value={procedureType}
                    onChange={(e) => setProcedureType(e.target.value)}
                    required
                  >
                    <option value="">Seleccionar tipo de trámite</option>
                    {procedureTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {procedureType && (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-4">
                      Información Específica
                    </h3>
                    {renderFormFields()}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nivel de Urgencia
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-ccd-600 focus:ring-ccd-500"
                        name="urgency"
                        value="normal"
                        checked={urgency === "normal"}
                        onChange={() => setUrgency("normal")}
                      />
                      <span className="ml-2 text-sm text-gray-700">Normal</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-ccd-600 focus:ring-ccd-500"
                        name="urgency"
                        value="urgente"
                        checked={urgency === "urgente"}
                        onChange={() => setUrgency("urgente")}
                      />
                      <span className="ml-2 text-sm text-gray-700">Urgente</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción Detallada
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ccd-500 focus:border-transparent"
                    rows={4}
                    placeholder="Proporciona información adicional relevante para tu trámite..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Documentos Adjuntos
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-ccd-600 hover:text-ccd-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-ccd-500"
                        >
                          <span>Subir archivos</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            multiple
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">o arrastra y suelta</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, DOCX, JPG hasta 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="h-4 w-4 text-ccd-600 focus:ring-ccd-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-gray-700">
                      Confirmo que la información proporcionada es correcta
                    </label>
                  </div>
                </div>
                
                <button
                  type="button"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ccd-600 hover:bg-ccd-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ccd-500"
                  onClick={() => setPreviewMode(true)}
                >
                  Vista Previa
                </button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Los trámites son procesados en un plazo de 5 días hábiles. Los trámites marcados como urgentes tienen un tiempo de respuesta de 2 días hábiles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProcedure;
