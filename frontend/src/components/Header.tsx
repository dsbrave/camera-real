import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { userStorage } from "../utils/userStorage";
import { useUser } from "@/contexts/UserContext";

// Para evitar sobreposição do conteúdo pelo header fixo, adicione <div className="header-spacer" /> logo após o <Header /> em cada página principal.
export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const { userCredits, setUserCredits, refreshCredits } = useUser();
  const [isClient, setIsClient] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isModel, setIsModel] = useState(false);

  // Verificar se estamos no cliente
  useEffect(() => {
    setIsClient(true);
    // Pequeno delay para garantir hidratação suave
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Verificar se estamos na página de chat para manter logo pequena
  const isChatPage = router.pathname === "/chat-video";

  // Função para testar a mudança de cor do ícone da carteira
  const handleTestWalletColor = (amount: number) => {
    setUserCredits(amount);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      if (typeof window !== "undefined") {
        const user = localStorage.getItem("user");
        if (user) {
          try {
            const userData = JSON.parse(user);
            setIsLoggedIn(true);
            setUserData(userData);
            setIsModel(userData.isModel || false);
            if (userData.credits !== undefined) {
              setUserCredits(userData.credits);
            } else {
              refreshCredits();
            }
          } catch (error) {
            console.error("Erro ao fazer parse dos dados do usuário:", error);
            localStorage.removeItem("user");
            setIsLoggedIn(false);
            setUserData(null);
            setUserCredits(0);
            setIsModel(false);
          }
        } else {
          setIsLoggedIn(false);
          setUserData(null);
          setUserCredits(0);
          setIsModel(false);
        }
      }
    };

    if (isClient) {
      checkLoginStatus();

      // Adicionar listener para mudanças no localStorage
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'user') {
          checkLoginStatus();
        }
      };

      // Listener customizado para mudanças no localStorage da mesma aba
      const handleCustomStorageChange = () => {
        checkLoginStatus();
      };

      // Fechar dropdown quando clicar fora dele
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsDropdownOpen(false);
        }
      };

      window.addEventListener("storage", handleStorageChange);
      window.addEventListener("userDataUpdated", handleCustomStorageChange);
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener("userDataUpdated", handleCustomStorageChange);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isClient, refreshCredits]);

  // Simplificar o segundo useEffect para apenas lidar com atualizações de perfil
  useEffect(() => {
    // Listener para mudanças nos dados do usuário (apenas para atualizações de perfil)
    const handleUserDataUpdate = (event: any) => {
      console.log('Header - Dados do usuário atualizados:', event.detail);
      if (event.detail) {
        setUserData(event.detail);
        setIsLoggedIn(true);
        setIsModel(event.detail.isModel || false);
        if (event.detail.credits !== undefined) {
          setUserCredits(event.detail.credits);
        }
      } else {
        // Se detail é null, significa logout
        console.log('Header - Logout detectado via evento');
        setIsLoggedIn(false);
        setUserData(null);
        setUserCredits(0);
        setIsModel(false);
      }
    };

    window.addEventListener('userDataUpdated', handleUserDataUpdate);
    
    return () => {
      window.removeEventListener('userDataUpdated', handleUserDataUpdate);
    };
  }, [setUserCredits]);

  const handleLogout = () => {
    // Limpar localStorage primeiro
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
    
    // Limpar todos os estados
    setIsLoggedIn(false);
    setUserData(null);
    setUserCredits(0);
    setIsModel(false);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);

    // Disparar evento personalizado para notificar outros componentes
    window.dispatchEvent(
      new CustomEvent("userDataUpdated", { detail: null })
    );

    // Redirecionamento simples sem reload forçado
    router.push("/");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleUpdateProfile = (updatedData: any) => {
    const success = userStorage.saveUserData(updatedData);
    if (success) {
      const updatedUser = userStorage.getUserData();
      if (updatedUser) {
        setUserData(updatedUser);
        setIsLoggedIn(true);
        setIsModel(updatedUser.isModel || false);
        if (updatedUser.credits !== undefined) {
          setUserCredits(updatedUser.credits);
        }
      }
    }
  };

  // Renderização condicional para evitar flash durante hidratação
  if (!isHydrated) {
    return (
      <header className="py-3 md:py-5 border-b border-gray-800 bg-black bg-opacity-85 backdrop-blur-sm sticky top-0 w-full z-[10000] shadow-lg ">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <div className="logo overflow-hidden relative z-[10001]">
            <Link href="/" className="block cursor-pointer">
              <Image
                src="/icons/logo.svg"
                alt="Camera Real"
                width={isChatPage ? 100 : 150}
                height={isChatPage ? 30 : 40}
                className={
                  isChatPage
                    ? "h-8 md:h-10 w-auto max-w-[100px]"
                    : "h-10 sm:h-12 md:h-14 w-auto max-w-[150px]"
                }
              />
            </Link>
          </div>

          {/* Placeholder para navegação durante hidratação */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="w-20 h-6 bg-gray-800 rounded animate-pulse"></div>
            <div className="w-24 h-8 bg-gray-800 rounded animate-pulse"></div>
          </div>

          {/* Mobile Menu Button Placeholder */}
          <div className="lg:hidden w-10 h-10 bg-gray-800 rounded animate-pulse"></div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="py-3 md:py-5 border-b border-gray-800 bg-black bg-opacity-85 backdrop-blur-sm sticky top-0 w-full z-[10000] shadow-lg ">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <div className="logo overflow-hidden relative z-[10001]">
            <Link href="/" className="block cursor-pointer">
              <Image
                src="/icons/logo.svg"
                alt="Camera Real"
                width={isChatPage ? 100 : 150}
                height={isChatPage ? 30 : 40}
                className={
                  isChatPage
                    ? "h-8 md:h-10 w-auto max-w-[100px]"
                    : "h-10 sm:h-12 md:h-14 w-auto max-w-[150px]"
                }
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {!isLoggedIn && (
              <>
                <Link
                  href="/cadastro"
                  className="hover:text-[#F25790] font-medium transition-colors"
                >
                  Cadastre-se
                </Link>
                <Link
                  href="/seja-modelo"
                  className="hover:text-[#F25790] font-medium transition-colors"
                >
                  Seja modelo
                </Link>
                <Link
                  href="/sobre"
                  className="hover:text-[#F25790] font-medium transition-colors"
                >
                  Sobre
                </Link>
              </>
            )}

            {isLoggedIn && (
              <>
                {/* Novos links para usuários logados */}
                <Link
                  href="/explorar"
                  className="hover:text-[#F25790] font-medium transition-colors"
                >
                  Explorar
                </Link>
                <Link
                  href="/favoritos"
                  className="hover:text-[#F25790] font-medium transition-colors"
                >
                  Favoritos
                </Link>
                <Link
                  href="/perfil-usuario"
                  className="hover:text-[#F25790] font-medium transition-colors"
                >
                  Perfil
                </Link>
                <Link
                  href="/suporte"
                  className="hover:text-[#F25790] font-medium transition-colors"
                >
                  Suporte
                </Link>

                {/* Saldo de Créditos como botão */}
                <div className="relative">
                  <Link
                    href="/carteira"
                    className="flex items-center space-x-2 bg-gradient-to-r from-[#F25790]/20 to-purple-600/20 backdrop-blur-sm border border-[#F25790]/30 hover:border-[#F25790]/50 rounded-full px-3 py-1.5 transition-all duration-200 hover:bg-[#F25790]/10 group"
                  >
                    <div className="relative w-4 h-4">
                      {/* Ícone branco padrão */}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-white absolute top-0 left-0 group-hover:opacity-0 transition-opacity duration-200"
                      >
                        <path
                          d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"
                          fill="white"
                        />
                      </svg>

                      {/* Ícone colorido no hover */}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[#F25790]"
                      >
                        <path
                          d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"
                          fill="#F25790"
                        />
                      </svg>
                    </div>
                    <span className="text-white font-medium text-sm">
                      {userCredits}
                    </span>
                    <span className="text-gray-300 text-xs">Créditos</span>
                  </Link>
                </div>
                {isModel && (
                  <Link
                    href="/painel-modelo"
                    className="bg-[#F25790] hover:bg-[#d93d75] text-white font-medium px-5 py-2 rounded-full transition-colors duration-200 text-sm"
                  >
                    Entrar ao Vivo
                  </Link>
                )}
              </>
            )}

            {!isLoggedIn ? (
              <div className="grid grid-cols-1 justify-items-end">
                <Link
                  href="/login"
                  className="btn-primary px-4 py-2 text-center text-sm whitespace-nowrap w-full"
                >
                  Entrar
                </Link>
                <div className="text-xs text-gray-400 mt-1 whitespace-nowrap">
                  Primeira vez?{" "}
                  <Link
                    href="/cadastro"
                    className="text-[#F25790] hover:underline"
                  >
                    Cadastre-se
                  </Link>
                </div>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center space-x-2"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                    {userData?.photo && userData.photo !== "/images/default-avatar.png" ? (
                      <Image
                        src={userData.photo}
                        alt={userData.name || "Usuário"}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {userData?.name?.charAt(0).toUpperCase() || "U"}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-white font-medium">
                    {userData?.name || "Usuário"}
                  </span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-900 rounded-lg shadow-xl z-50">
                    <Link
                      href="/carteira"
                      className="block px-4 py-2 text-white hover:bg-gray-800"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Carteira
                    </Link>
                    <Link
                      href="/perfil-usuario"
                      className="block px-4 py-2 text-white hover:bg-gray-800"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Perfil
                    </Link>
                    <Link
                      href={
                        userData?.isModel ? "/painel-modelo" : "/painel-usuario"
                      }
                      className="block px-4 py-2 text-white hover:bg-gray-800"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {userData?.isModel ? "Painel da Modelo" : "Meu Painel"}
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
                <>
                  <Link
                    href="/perfil-usuario"
                    className="block py-2 text-white hover:text-[#F25790] font-medium transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Perfil
                  </Link>
                  <Link
                    href="/explorar"
                    className="block py-2 text-white hover:text-[#F25790] font-medium transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Explorar
                  </Link>
                  <Link
                    href="/favoritos"
                    className="block py-2 text-white hover:text-[#F25790] font-medium transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Favoritos
                  </Link>
                  <Link
                    href="/suporte"
                    className="block py-2 text-white hover:text-[#F25790] font-medium transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Suporte
                  </Link>
                </>
              )}
              <Link
                href="/videochats"
                className="block py-2 text-white hover:text-[#F25790] font-medium transition-colors"
                onClick={closeMobileMenu}
              >
                Como Funciona
              </Link>
              {!isLoggedIn && (
                <>
                  <Link
                    href="/cadastro"
                    className="block py-2 text-white hover:text-[#F25790] font-medium transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Cadastre-se
                  </Link>
                  <Link
                    href="/seja-modelo"
                    className="block py-2 text-white hover:text-[#F25790] font-medium transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Seja modelo
                  </Link>
                  <Link
                    href="/sobre"
                    className="block py-2 text-white hover:text-[#F25790] font-medium transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Sobre
                  </Link>
                </>
              )}

              {!isLoggedIn ? (
                <div className="pt-4 border-t border-gray-700">
                  <Link
                    href="/login"
                    className="block w-full btn-primary px-4 py-3 text-center text-sm mb-3"
                    onClick={closeMobileMenu}
                  >
                    Entrar
                  </Link>
                  <p className="text-xs text-gray-400 text-center">
                    Primeira vez?{" "}
                    <Link
                      href="/cadastro"
                      className="text-[#F25790] hover:underline"
                      onClick={closeMobileMenu}
                    >
                      Cadastre-se
                    </Link>
                  </p>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-700 space-y-2">
                  {/* Saldo de Créditos como botão no Mobile */}
                  <Link
                    href="/carteira"
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-[#F25790]/20 to-purple-600/20 backdrop-blur-sm border border-[#F25790]/30 hover:border-[#F25790]/50 rounded-full px-4 py-2 mb-4 transition-all duration-200 hover:bg-[#F25790]/10"
                    onClick={closeMobileMenu}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-white"
                    >
                      <path
                        d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"
                        fill="white"
                      />
                    </svg>
                    <span className="text-white font-medium">
                      {userCredits}
                    </span>
                    <span className="text-gray-300 text-sm">Créditos</span>
                  </Link>

                  <Link
                    href={
                      userData?.isModel ? "/painel-modelo" : "/painel-usuario"
                    }
                    className="block py-2 text-white hover:text-[#F25790] transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {userData?.isModel ? "Painel da Modelo" : "Meu Painel"}
                  </Link>

                  <Link
                    href="/perfil-usuario"
                    className="block py-2 text-white hover:text-[#F25790] transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Perfil
                  </Link>

                  <hr className="my-2 border-gray-700" />

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 text-white hover:text-[#F25790] transition-colors"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Configurações Modal */}
      {/* Removido - modal não é mais usado no dropdown */}
    </>
  );
}
