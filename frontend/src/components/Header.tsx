import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

// Para evitar sobreposição do conteúdo pelo header fixo, adicione <div className="header-spacer" /> logo após o <Header /> em cada página principal.
export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    window.location.href = '/';
  };

  return (
    <header className="py-6 border-b border-gray-800 bg-black bg-opacity-90 backdrop-blur-sm sticky top-0 w-full z-50 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="logo">
          <Link href="/">
            <Image 
              src="/icons/logo.svg" 
              alt="Camera Real" 
              width={220} 
              height={70}
              className="h-16 w-auto"
            />
          </Link>
        </div>
        <nav className="flex items-center space-x-6">
          {isLoggedIn && (
            <Link href="/explorar" className="hover:text-[#F25790] font-medium">
              Explorar
            </Link>
          )}
          <Link href="/videochats" className="hover:text-[#F25790] font-medium">
            Como Funciona
          </Link>
          <Link href="/sobre" className="hover:text-[#F25790] font-medium">
            Sobre
          </Link>
          {!isLoggedIn ? (
            <>
              <Link href="/seja-modelo" className="hover:text-[#F25790] font-medium">
                Seja modelo
              </Link>
              <div className="flex flex-col items-end">
                <div className="grid grid-cols-1 justify-items-end">
                  <Link href="/login" className="btn-primary px-4 py-2 text-center text-sm whitespace-nowrap w-full">
                    Entrar
                  </Link>
                  <div className="text-xs text-gray-400 mt-1 whitespace-nowrap">
                    Primeira vez? <Link href="/cadastro" className="text-[#F25790] hover:underline">Cadastre-se</Link>
                  </div>
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
      </div>
    </header>
  )
}
