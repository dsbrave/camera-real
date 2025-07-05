import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => router.pathname === path;

  return (
    <nav className="bg-black bg-opacity-90 fixed w-full z-50 border-b border-gray-800 select-none">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center overflow-x-auto">
        <Link href="/" className="flex items-center">
          <Image 
            src="/icons/logo.svg" 
            alt="Camera Real" 
            width={140} 
            height={40} 
            priority
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/explorar" className={`font-medium break-words truncate max-w-[120px] ${isActive('/explorar') ? 'text-[#F25790]' : 'text-white hover:text-[#F25790]'} transition-colors`}>
            Explorar
          </Link>
          <Link href="/videochats" className={`font-medium ${isActive('/videochats') ? 'text-[#F25790]' : 'text-white hover:text-[#F25790]'} transition-colors`}>
            Videochats
          </Link>
          <Link href="/carteira" className={`font-medium ${isActive('/carteira') ? 'text-[#F25790]' : 'text-white hover:text-[#F25790]'} transition-colors`}>
            Carteira
          </Link>
          <div className="flex items-center space-x-3 ml-4">
            <Link href="/notificacoes">
              <div className="relative">
                <button className="btn-icon relative">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-[#F25790] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                </button>
              </div>
            </Link>
            <Link href="/perfil-usuario">
              <div className="w-8 h-8 rounded-full bg-gray-600 overflow-hidden">
                {/* Placeholder para avatar do usuário */}
                <div className="w-full h-full bg-gradient-to-br from-[#F25790] to-purple-600"></div>
              </div>
            </Link>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3 12h18M3 6h18M3 18h18"} />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col items-center justify-center p-6 md:hidden transition-all duration-300 overflow-y-auto">
          <div className="container mx-auto px-4 flex flex-col space-y-2">
            <Link 
              href="/explorar" 
              className={`font-medium px-4 py-2 rounded-lg ${isActive('/explorar') ? 'bg-[#F25790] bg-opacity-20 text-[#F25790]' : 'text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Explorar
            </Link>
            <Link 
              href="/videochats" 
              className={`font-medium px-4 py-2 rounded-lg ${isActive('/videochats') ? 'bg-[#F25790] bg-opacity-20 text-[#F25790]' : 'text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Videochats
            </Link>
            <Link 
              href="/carteira" 
              className={`font-medium px-4 py-2 rounded-lg ${isActive('/carteira') ? 'bg-[#F25790] bg-opacity-20 text-[#F25790]' : 'text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Carteira
            </Link>
            <Link 
              href="/historico-transacoes" 
              className={`font-medium px-4 py-2 rounded-lg ${isActive('/historico-transacoes') ? 'bg-[#F25790] bg-opacity-20 text-[#F25790]' : 'text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Histórico
            </Link>
            <Link 
              href="/perfil-usuario" 
              className={`font-medium px-4 py-2 rounded-lg ${isActive('/perfil-usuario') ? 'bg-[#F25790] bg-opacity-20 text-[#F25790]' : 'text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Perfil
            </Link>
            <Link 
              href="/notificacoes" 
              className={`font-medium px-4 py-2 rounded-lg ${isActive('/notificacoes') ? 'bg-[#F25790] bg-opacity-20 text-[#F25790]' : 'text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Notificações
            </Link>
            <Link 
              href="/configuracoes" 
              className={`font-medium px-4 py-2 rounded-lg ${isActive('/configuracoes') ? 'bg-[#F25790] bg-opacity-20 text-[#F25790]' : 'text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Configurações
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
