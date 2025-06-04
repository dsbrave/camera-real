import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black py-4 border-t border-gray-800 mt-auto select-none">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-y-4">
        <div className="mb-4 md:mb-0">
          <Link href="/">
            <Image 
              src="/icons/logo.svg" 
              alt="Camera Real" 
              width={120} 
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <Link href="/" className="text-gray-400 hover:text-[#F25790] break-words truncate max-w-[120px]">
            Início
          </Link>
          <Link href="/sobre" className="text-gray-400 hover:text-[#F25790]">
            Sobre
          </Link>
          <Link href="/termos-condicoes" className="text-gray-400 hover:text-[#F25790]">
            Termos de Uso
          </Link>
          <Link href="/suporte" className="text-gray-400 hover:text-[#F25790]">
            Suporte
          </Link>
        </div>
        
        <p className="text-gray-500 mt-4 md:mt-0 break-words truncate">&copy; 2025 Camera Real</p>
      </div>
    </footer>
  );
}
