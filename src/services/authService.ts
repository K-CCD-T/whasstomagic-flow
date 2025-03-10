
import api from './api';
import { toast } from 'sonner';
import { mockUsers } from '../components/admin/users/mockData';

interface LoginCredentials {
  email: string;
  password: string;
  userType?: string;
}

interface RegisterData {
  nombre: string;
  email: string;
  password: string;
  rol: string;
}

interface AuthResponse {
  token?: string;
  message?: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<boolean> {
    try {
      // Credenciales para demo
      const demoCredentials = {
        admin: { email: 'admin@ccd.edu.pe', password: 'admin123', rol: 'admin' },
        advisor: { email: 'advisor@ccd.edu.pe', password: 'advisor123', rol: 'advisor' },
        student: { email: 'estudiante@ccd.edu.pe', password: 'estudiante123', rol: 'student' }
      };
      
      // Para demo - acceso con credenciales específicas según tipo de usuario
      if (credentials.userType === 'admin' && 
          credentials.email === demoCredentials.admin.email && 
          credentials.password === demoCredentials.admin.password) {
        localStorage.setItem('token', 'mock-jwt-token-for-demo-admin');
        localStorage.setItem('user', JSON.stringify({
          email: credentials.email,
          rol: 'admin',
          nombre: 'Administrador'
        }));
        return true;
      } else if (credentials.userType === 'advisor' && 
                credentials.email === demoCredentials.advisor.email && 
                credentials.password === demoCredentials.advisor.password) {
        localStorage.setItem('token', 'mock-jwt-token-for-demo-advisor');
        localStorage.setItem('user', JSON.stringify({
          email: credentials.email,
          rol: 'advisor',
          nombre: 'Asesor Académico'
        }));
        return true;
      } else if (credentials.userType === 'student' && 
                credentials.email === demoCredentials.student.email && 
                credentials.password === demoCredentials.student.password) {
        localStorage.setItem('token', 'mock-jwt-token-for-demo-student');
        localStorage.setItem('user', JSON.stringify({
          email: credentials.email,
          rol: 'student',
          nombre: 'Estudiante Demo'
        }));
        return true;
      }
      
      // Try API call as fallback (will fail in demo environment)
      try {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        
        return true;
      } catch (apiError) {
        console.error('API login failed, falling back to mock check');
        
        // Check if any user in mockData matches the credentials
        const mockUser = mockUsers.find(user => 
          user.correo === credentials.email && credentials.password === 'admin123'
        );
        
        if (mockUser) {
          localStorage.setItem('token', 'mock-jwt-token-for-demo');
          localStorage.setItem('user', JSON.stringify({
            email: mockUser.correo,
            rol: mockUser.tipo,
            nombre: `${mockUser.nombres} ${mockUser.apellidos}`
          }));
          return true;
        }
        
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      toast.error('Credenciales incorrectas');
      return false;
    }
  },
  
  async register(userData: RegisterData): Promise<boolean> {
    try {
      await api.post('/auth/register', userData);
      toast.success('Usuario registrado correctamente');
      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      toast.error('No se pudo registrar el usuario');
      return false;
    }
  },
  
  async createDefaultAdminIfNotExists(): Promise<void> {
    try {
      const adminData = {
        nombre: "Administrador",
        email: "admin@ccd.edu.pe",
        password: "admin123",
        rol: "admin"
      };
      
      // Intentamos registrar al administrador por defecto
      await this.register(adminData);
      console.log('Administrador por defecto creado o ya existente');
    } catch (error) {
      // Si falla, probablemente es porque ya existe
      console.log('El administrador por defecto ya existe');
    }
  },
  
  logout(): void {
    // Eliminar token de localStorage (versión antigua)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Eliminar cookie (cuando el backend se actualice)
    api.post('/auth/logout')
      .catch(err => console.error('Error al cerrar sesión:', err));
  },
  
  isAuthenticated(): boolean {
    // En un sistema basado en cookies, podríamos necesitar una verificación diferente
    // Por ahora, mantenemos la verificación básica con localStorage
    return !!localStorage.getItem('token');
  },
  
  getUserRole(): string {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return user.rol || '';
      } catch (e) {
        return '';
      }
    }
    return '';
  },
  
  getUserName(): string {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return user.nombre || '';
      } catch (e) {
        return '';
      }
    }
    return '';
  }
};
