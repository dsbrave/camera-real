import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

// Para evitar sobreposição do conteúdo pelo header fixo, adicione <div className="header-spacer" /> logo após o <Header /> em cada página principal.
export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [creditos, setCreditos] = useState(150);
  
  // Função para testar a mudança de cor do ícone da carteira
  const handleTestWalletColor = (amount: number) => {
    setCreditos(amount);
  };
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
          // Simular saldo de Créditos (em uma aplicação real, isso viria da API)
          setCreditos(user.creditos || 150);
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
    setCreditos(0);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    router.push('/');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="py-3 md:py-6 border-b border-gray-800 bg-black bg-opacity-85 backdrop-blur-sm sticky top-0 w-full z-50 shadow-lg select-none">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="logo overflow-hidden">
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
          {isLoggedIn ? (
            <Link href="/suporte" className="hover:text-[#F25790] font-medium transition-colors">
              Suporte
            </Link>
          ) : (
            <Link href="/sobre" className="hover:text-[#F25790] font-medium transition-colors">
              Sobre
            </Link>
          )}
          
          {isLoggedIn && (
            <>
              {/* Saldo de Créditos como botão */}
              <div className="relative">
                <Link href="/carteira" className="flex items-center space-x-2 bg-gradient-to-r from-[#F25790]/20 to-purple-600/20 backdrop-blur-sm border border-[#F25790]/30 hover:border-[#F25790]/50 rounded-full px-3 py-1.5 transition-all duration-200 hover:bg-[#F25790]/10 group">
                  <div className="relative w-4 h-4">
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 filter invert absolute top-0 left-0 transition-all duration-200"
                      style={{ color: 'white' }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = creditos > 0 ? '#22c55e' : '#ef4444';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = 'white';
                      }}
                    >
                      <path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <span className="text-white font-medium text-sm">{creditos}</span>
                  <span className="text-gray-300 text-xs">Créditos</span>
                </Link>
                
                {/* Botões de teste para a carteira (discretos) */}
                <div className="absolute -bottom-5 left-0 flex gap-1 items-center opacity-30 hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleTestWalletColor(150)} 
                    className="w-4 h-4 bg-green-500 rounded-full text-[8px] flex items-center justify-center text-white"
                    title="Simular 150 créditos"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => handleTestWalletColor(0)} 
                    className="w-4 h-4 bg-red-500 rounded-full text-[8px] flex items-center justify-center text-white"
                    title="Simular 0 créditos"
                  >
                    0
                  </button>
                </div>
              </div>
            </>
          )}
          
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
                      J
                    </span>
                  )}
                </div>
                <span className="text-white font-medium">João</span>
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
          {isMobileMenuOpen ? (
            <Image 
              src="/icons/navigation/close.svg"
              alt="Fechar menu"
              width={24}
              height={24}
              className="w-6 h-6 text-white"
            />
          ) : (
            <Image 
              src="/icons/navigation/menu.svg"
              alt="Abrir menu"
              width={24}
              height={24}
              className="w-6 h-6 text-white"
            />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col items-center justify-center p-6 lg:hidden transition-all duration-300 overflow-y-auto">
          <div className="w-full max-w-xs mx-auto">
            {isLoggedIn && (
              <Link 
                href="/explorar" 
                className="block py-2 text-white hover:text-[#F25790] font-medium transition-colors break-words overflow-hidden"
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
            {isLoggedIn ? (
              <Link 
                href="/suporte" 
                className="block py-2 text-white hover:text-[#F25790] font-medium transition-colors"
                onClick={closeMobileMenu}
              >
                Suporte
              </Link>
            ) : (
              <Link 
                href="/sobre" 
                className="block py-2 text-white hover:text-[#F25790] font-medium transition-colors"
                onClick={closeMobileMenu}
              >
                Sobre
              </Link>
            )}
            
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
                {/* Saldo de Créditos como botão no Mobile */}
                <Link 
                  href="/carteira"
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-[#F25790]/20 to-purple-600/20 backdrop-blur-sm border border-[#F25790]/30 hover:border-[#F25790]/50 rounded-full px-4 py-2 mb-4 transition-all duration-200 hover:bg-[#F25790]/10"
                  onClick={closeMobileMenu}
                >
                  <Image
                    src="/icons/action/account_balance_wallet.svg"
                    alt="Créditos"
                    width={20}
                    height={20}
                    className="w-5 h-5 text-white filter invert"
                  />
                  <span className="text-white font-medium">{creditos}</span>
                  <span className="text-gray-300 text-sm">Créditos</span>
                </Link>
                
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
                    <p className="text-white font-medium break-words max-w-[120px] truncate">{userData?.name || 'Usuário'}</p>
                    <p className="text-gray-400 text-sm break-words max-w-[160px] truncate">{userData?.email}</p>
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
