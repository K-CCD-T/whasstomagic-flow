
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-ccd-800">CCD</span>
              <span className="ml-1 text-sm font-medium text-ccd-600">Trámites</span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <a href="#" className="nav-link nav-link-active">Inicio</a>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
              <DialogTrigger asChild>
                <button className="btn-secondary">Iniciar Sesión</button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <LoginForm 
                  onSuccessfulLogin={() => setIsLoginModalOpen(false)} 
                  onClose={() => setIsLoginModalOpen(false)}
                />
              </DialogContent>
            </Dialog>
            
            <Dialog open={isRegisterModalOpen} onOpenChange={setIsRegisterModalOpen}>
              <DialogTrigger asChild>
                <button className="btn-primary">Registrarse</button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <RegisterForm 
                  onSuccessfulRegister={() => setIsRegisterModalOpen(false)}
                  onClose={() => setIsRegisterModalOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg">
          <a href="#" className="block px-3 py-2 text-base font-medium text-ccd-700 rounded-md">Inicio</a>
          
          <div className="pt-4 flex flex-col space-y-3">
            <Dialog open={isLoginModalOpen} onOpenChange={(open) => {
              setIsLoginModalOpen(open);
              if (open) setMobileMenuOpen(false);
            }}>
              <DialogTrigger asChild>
                <button className="w-full btn-secondary">
                  Iniciar Sesión
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <LoginForm 
                  onSuccessfulLogin={() => setIsLoginModalOpen(false)} 
                  onClose={() => setIsLoginModalOpen(false)}
                />
              </DialogContent>
            </Dialog>
            
            <Dialog open={isRegisterModalOpen} onOpenChange={(open) => {
              setIsRegisterModalOpen(open);
              if (open) setMobileMenuOpen(false);
            }}>
              <DialogTrigger asChild>
                <button className="w-full btn-primary">
                  Registrarse
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <RegisterForm 
                  onSuccessfulRegister={() => setIsRegisterModalOpen(false)}
                  onClose={() => setIsRegisterModalOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
