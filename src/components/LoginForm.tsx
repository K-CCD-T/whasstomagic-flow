
import { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, GraduationCap, Shield, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '../services/authService';

interface LoginFormProps {
  onSuccessfulLogin?: () => void;
  onClose?: () => void;
}

const LoginForm = ({ onSuccessfulLogin, onClose }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('admin'); // Default to admin
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Intentar crear el usuario administrador por defecto al cargar el componente
  useEffect(() => {
    authService.createDefaultAdminIfNotExists();
    
    // Precargar las credenciales de administrador para facilitar el acceso
    setEmail('admin@ccd.edu.pe');
    setPassword('admin123');
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast.error('Por favor complete todos los campos');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Pasamos el tipo de usuario seleccionado al servicio de autenticación
      const success = await authService.login({ email, password, userType });
      
      if (success) {
        toast.success('Inicio de sesión exitoso');
        
        // Call the callback if provided
        if (onSuccessfulLogin) {
          onSuccessfulLogin();
        }
        
        // Close modal if provided
        if (onClose) {
          onClose();
        }
        
        // Navigate based on user type
        const userRole = authService.getUserRole();
        if (userRole === 'admin') {
          navigate('/admin-dashboard');
        } else if (userRole === 'advisor') {
          navigate('/advisor-dashboard');
        } else {
          navigate('/dashboard'); // Para estudiantes
        }
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      toast.error('Credenciales incorrectas');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Función para usar las credenciales predeterminadas según el tipo de usuario
  const useDefaultCredentials = () => {
    if (userType === 'admin') {
      setEmail('admin@ccd.edu.pe');
      setPassword('admin123');
    } else if (userType === 'advisor') {
      setEmail('advisor@ccd.edu.pe');
      setPassword('advisor123');
    } else {
      setEmail('estudiante@ccd.edu.pe');
      setPassword('estudiante123');
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md border border-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
        <p className="text-gray-600 mt-2">Accede al sistema de trámites académicos</p>
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
                autoComplete="current-password"
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
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-ccd-600 focus:ring-ccd-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Recordarme
              </label>
            </div>
            
            <a href="#" className="text-sm font-medium text-ccd-600 hover:text-ccd-500">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          
          {/* Credenciales de prueba */}
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Credenciales de {userType === 'admin' ? 'Administrador' : userType === 'advisor' ? 'Asesor' : 'Estudiante'}:</p>
              {userType === 'admin' && (
                <>
                  <p>Email: admin@ccd.edu.pe</p>
                  <p>Contraseña: admin123</p>
                </>
              )}
              {userType === 'advisor' && (
                <>
                  <p>Email: advisor@ccd.edu.pe</p>
                  <p>Contraseña: advisor123</p>
                </>
              )}
              {userType === 'student' && (
                <>
                  <p>Email: estudiante@ccd.edu.pe</p>
                  <p>Contraseña: estudiante123</p>
                </>
              )}
              <button
                type="button"
                onClick={useDefaultCredentials}
                className="mt-2 text-xs font-medium bg-blue-100 hover:bg-blue-200 text-blue-700 py-1 px-2 rounded transition-colors"
              >
                Usar estas credenciales
              </button>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
