
import api from './api';
import { toast } from 'sonner';
import { mockUsers } from '../components/admin/users/mockData';
import { supabase } from '@/integrations/supabase/client';

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
      // Try Supabase login first
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Get the user profile to determine role
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        if (profileData) {
          localStorage.setItem('user', JSON.stringify({
            id: data.user.id,
            email: credentials.email,
            rol: profileData.tipo,
            nombre: `${profileData.nombre} ${profileData.apellidos}`.trim() || 'Usuario'
          }));
        }
        
        return true;
      }
      
      // Fallback to demo credentials if Supabase login fails
      const demoCredentials = {
        admin: { email: 'admin@ccd.edu.pe', password: 'admin123', rol: 'admin' },
        advisor: { email: 'advisor@ccd.edu.pe', password: 'advisor123', rol: 'advisor' },
        student: { email: 'estudiante@ccd.edu.pe', password: 'estudiante123', rol: 'student' }
      };
      
      // For demo - access with specific credentials based on user type
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
      
      // Check if any user in mockData matches the credentials as last fallback
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
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      toast.error('Credenciales incorrectas');
      return false;
    }
  },
  
  async register(userData: RegisterData): Promise<boolean> {
    try {
      // Register with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            tipo: userData.rol,
            nombre: userData.nombre.split(' ')[0] || '',
            apellidos: userData.nombre.split(' ').slice(1).join(' ') || ''
          }
        }
      });
      
      if (error) throw error;
      
      toast.success('Usuario registrado correctamente. Revise su correo para verificar la cuenta.');
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
      
      // Try to create default admin
      await this.register(adminData);
      console.log('Administrador por defecto creado o ya existente');
    } catch (error) {
      // If it fails, the admin probably already exists
      console.log('El administrador por defecto ya existe');
    }
  },
  
  async logout(): Promise<void> {
    // Log out from Supabase
    await supabase.auth.signOut();
    
    // Remove local storage items
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  isAuthenticated(): boolean {
    return !!supabase.auth.getSession() || !!localStorage.getItem('token');
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
