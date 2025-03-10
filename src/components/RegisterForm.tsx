
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, GraduationCap, BookOpen, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { authService } from '@/services/authService';

interface RegisterFormProps {
  onSuccessfulRegister?: () => void;
  onClose?: () => void;
}

const RegisterForm = ({ onSuccessfulRegister, onClose }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('student'); // Default to student
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!nombre || !apellidos || !email || !password || !confirmPassword) {
      toast.error('Por favor complete todos los campos');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    
    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const registerData = {
        nombre: `${nombre} ${apellidos}`,
        email,
        password,
        rol: userType
      };
      
      const success = await authService.register(registerData);
      
      if (success) {
        toast.success('Registro exitoso. Revisa tu correo para verificar tu cuenta.');
        
        // Limpiar el formulario
        setNombre('');
        setApellidos('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        
        // Call the callback if provided
        if (onSuccessfulRegister) {
          onSuccessfulRegister();
        }
        
        // Close modal if provided
        if (onClose) {
          onClose();
        }
      }
    } catch (error) {
      console.error('Error de registro:', error);
      toast.error('Error al registrar usuario');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md border border-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Registro de Usuario</h2>
        <p className="text-gray-600 mt-2">Crea tu cuenta en el sistema de trámites académicos</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* User Type Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Tipo de Usuario
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setUserType('student')}
                className={`flex items-center justify-center space-x-1 px-3 py-2 border rounded-lg text-sm transition-colors ${
                  userType === 'student' 
                    ? 'bg-blue-50 border-blue-500 text-blue-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <GraduationCap size={16} />
                <span>Estudiante</span>
              </button>
              <button
                type="button"
                onClick={() => setUserType('advisor')}
                className={`flex items-center justify-center space-x-1 px-3 py-2 border rounded-lg text-sm transition-colors ${
                  userType === 'advisor' 
                    ? 'bg-blue-50 border-blue-500 text-blue-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <BookOpen size={16} />
                <span>Asesor</span>
              </button>
              <button
                type="button"
                onClick={() => setUserType('admin')}
                className={`flex items-center justify-center space-x-1 px-3 py-2 border rounded-lg text-sm transition-colors ${
                  userType === 'admin' 
                    ? 'bg-blue-50 border-blue-500 text-blue-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Shield size={16} />
                <span>Admin</span>
              </button>
            </div>
          </div>
          
          {/* Nombre */}
          <div className="space-y-2">
            <label htmlFor="nombre" className="text-sm font-medium text-gray-700 block">
              Nombre
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-ccd-500 focus:border-ccd-500 sm:text-sm"
                placeholder="Juan"
              />
            </div>
          </div>
          
          {/* Apellidos */}
          <div className="space-y-2">
            <label htmlFor="apellidos" className="text-sm font-medium text-gray-700 block">
              Apellidos
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                id="apellidos"
                name="apellidos"
                type="text"
                required
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-ccd-500 focus:border-ccd-500 sm:text-sm"
                placeholder="Pérez"
              />
            </div>
          </div>
          
          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
              Correo electrónico institucional
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-ccd-500 focus:border-ccd-500 sm:text-sm"
                placeholder="usuario@institucion.edu"
              />
            </div>
          </div>
          
          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-ccd-500 focus:border-ccd-500 sm:text-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-400 hover:text-gray-500" />
                ) : (
                  <Eye size={18} className="text-gray-400 hover:text-gray-500" />
                )}
              </button>
            </div>
          </div>
          
          {/* Confirm Password */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block">
              Confirmar Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-ccd-500 focus:border-ccd-500 sm:text-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} className="text-gray-400 hover:text-gray-500" />
                ) : (
                  <Eye size={18} className="text-gray-400 hover:text-gray-500" />
                )}
              </button>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            ¿Ya tienes una cuenta?{' '}
            <button
              type="button"
              onClick={onClose}
              className="font-medium text-ccd-600 hover:text-ccd-500"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
