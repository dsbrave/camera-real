import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

// Para evitar sobreposição do conteúdo pelo header fixo, adicione <div className="header-spacer" /> logo após o <Header /> em cada página principal.
export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Verificar se o usuário está logado através do localStorage
    const checkLoginStatus = () => {
      try {
        const userStorage = localStorage.getItem('user');
        if (userStorage) {
          const user = JSON.parse(userStorage);
          setIsLoggedIn(!!user.isLoggedIn);
          setUserData(user);
        }
      } catch (error) {
        console.error('Erro ao verificar login:', error);
      }
    };

    checkLoginStatus();

    // Fechar dropdown quando clicar fora dele
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserData(null);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    window.location.href = '/';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="py-3 md:py-6 border-b border-gray-800 bg-black bg-opacity-85 backdrop-blur-sm sticky top-0 w-full z-50 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="logo">
          <Link href="/">
            <Image 
              src="/icons/logo.svg" 
              alt="Camera Real" 
              width={220} 
              height={70}
              className="h-10 sm:h-12 md:h-16 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {isLoggedIn && (
            <Link href="/explorar" className="hover:text-[#F25790] font-medium transition-colors">
              Explorar
            </Link>
          )}
          <Link href="/videochats" className="hover:text-[#F25790] font-medium transition-colors">
            Como Funciona
          </Link>
          <Link href="/sobre" className="hover:text-[#F25790] font-medium transition-colors">
            Sobre
          </Link>
          {!isLoggedIn ? (
            <>
              <Link href="/seja-modelo" className="hover:text-[#F25790] font-medium transition-colors">
                Seja modelo
              </Link>
              <div className="grid grid-cols-1 justify-items-end">
                <Link href="/login" className="btn-primary px-4 py-2 text-center text-sm whitespace-nowrap w-full">
                  Entrar
                </Link>
                <div className="text-xs text-gray-400 mt-1 whitespace-nowrap">
                  Primeira vez? <Link href="/cadastro" className="text-[#F25790] hover:underline">Cadastre-se</Link>
                </div>
              </div>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button 
                className="flex items-center space-x-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-[#F25790] flex items-center justify-center overflow-hidden">
                  {userData?.photo ? (
                    <Image 
                      src={userData.photo} 
                      alt={userData.name || 'Usuário'} 
                      width={32} 
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-sm font-bold">
                      {userData?.name?.charAt(0) || 'U'}
                    </span>
                  )}
                </div>
                <span className="text-white font-medium">{userData?.name?.split(' ')[0] || 'Usuário'}</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-900 rounded-lg shadow-xl z-50">
                  {userData?.isModel ? (
                    <Link href="/painel-modelo" className="block px-4 py-2 text-white hover:bg-gray-800">
                      Painel de Modelo
                    </Link>
                  ) : (
                    <Link href="/painel-usuario" className="block px-4 py-2 text-white hover:bg-gray-800">
                      Meu Painel
                    </Link>
                  )}
                  <Link href="/carteira" className="block px-4 py-2 text-white hover:bg-gray-800">
                    Carteira
                  </Link>
                  <Link href="/editar-perfil" className="block px-4 py-2 text-white hover:bg-gray-800">
                    Editar Perfil
                  </Link>
                  <hr className="my-1 border-gray-700" />
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black bg-opacity-95 border-t border-gray-800">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {isLoggedIn && (
              <Link 
                href="/explorar" 
                className="block py-2 text-white hover:text-[#F25790] font-medium transition-colors"
                onClick={closeMobileMenu}
              >
                Explorar
              </Link>
            )}
            <Link 
              href="/videochats" 
              className="block py-2 text-white hover:text-[#F25790] font-medium transition-colors"
              onClick={closeMobileMenu}
            >
              Como Funciona
            </Link>
            <Link 
              href="/sobre" 
              className="block py-2 text-white hover:text-[#F25790] font-medium transition-colors"
              onClick={closeMobileMenu}
            >
              Sobre
            </Link>
            
            {!isLoggedIn ? (
              <>
                <Link 
                  href="/seja-modelo" 
                  className="block py-2 text-white hover:text-[#F25790] font-medium transition-colors"
                  onClick={closeMobileMenu}
                >
                  Seja modelo
                </Link>
                <div className="pt-4 border-t border-gray-700">
                  <Link 
                    href="/login" 
                    className="block w-full btn-primary px-4 py-3 text-center text-sm mb-3"
                    onClick={closeMobileMenu}
                  >
                    Entrar
                  </Link>
                  <p className="text-xs text-gray-400 text-center">
                    Primeira vez? <Link href="/cadastro" className="text-[#F25790] hover:underline" onClick={closeMobileMenu}>Cadastre-se</Link>
                  </p>
                </div>
              </>
            ) : (
              <div className="pt-4 border-t border-gray-700 space-y-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#F25790] flex items-center justify-center overflow-hidden">
                    {userData?.photo ? (
                      <Image 
                        src={userData.photo} 
                        alt={userData.name || 'Usuário'} 
                        width={40} 
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-sm font-bold">
                        {userData?.name?.charAt(0) || 'U'}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">{userData?.name || 'Usuário'}</p>
                    <p className="text-gray-400 text-sm">{userData?.email}</p>
                  </div>
                </div>
                
                {userData?.isModel ? (
                  <Link 
                    href="/painel-modelo" 
                    className="block py-2 text-white hover:text-[#F25790] transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Painel de Modelo
                  </Link>
                ) : (
                  <Link 
                    href="/painel-usuario" 
                    className="block py-2 text-white hover:text-[#F25790] transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Meu Painel
                  </Link>
                )}
                <Link 
                  href="/carteira" 
                  className="block py-2 text-white hover:text-[#F25790] transition-colors"
                  onClick={closeMobileMenu}
                >
                  Carteira
                </Link>
                <Link 
                  href="/editar-perfil" 
                  className="block py-2 text-white hover:text-[#F25790] transition-colors"
                  onClick={closeMobileMenu}
                >
                  Editar Perfil
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
