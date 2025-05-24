import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AgeVerificationProps {
  onVerify?: () => void;
}

export default function AgeVerification({ onVerify }: AgeVerificationProps) {
  const [showVerification, setShowVerification] = useState(false);
  
  useEffect(() => {
    // Verificar se o usuário já confirmou a idade
    const hasVerified = localStorage.getItem('age-verified');
    if (!hasVerified) {
      setShowVerification(true);
    }
  }, []);
  
  const handleVerify = () => {
    localStorage.setItem('age-verified', 'true');
    setShowVerification(false);
    if (onVerify) onVerify();
  };
  
  const handleReject = () => {
    // Redirecionar para site seguro
    window.location.href = 'https://www.google.com';
  };
  
  if (!showVerification) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative bg-gray-900 p-8 rounded-lg max-w-md w-full mx-4 text-center">
        <div className="absolute top-4 left-4">
          <Image 
            src="/icons/logo.svg" 
            alt="Camera Real" 
            width={100} 
            height={30} 
            priority 
          />
        </div>
        
        <div className="mt-12 mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-octagon border-2 border-[#F25790] flex items-center justify-center">
            <span className="text-[#F25790] text-4xl font-bold">!</span>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-white mb-4">Este é um site adulto</h2>
        
        <p className="text-gray-300 mb-6">
          Este site contém material com restrições de idade, incluindo nudez e representações 
          explícitas de atividade sexual. Ao se registrar, você afirma que tem pelo menos 18 
          anos de idade ou a maioridade na jurisdição de onde está acessando o site e que 
          consente em visualizar conteúdo sexualmente explícito.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleReject}
            className="px-6 py-3 bg-gray-600 text-white rounded-full hover:bg-gray-700"
          >
            Tenho menos de 18 anos - Sair
          </button>
          
          <button
            onClick={handleVerify}
            className="px-6 py-3 bg-[#F25790] text-white rounded-full hover:bg-[#d93d75]"
          >
            Tenho 18 anos ou mais - Entrar
          </button>
        </div>
        
        <div className="mt-6 text-xs text-gray-500 flex justify-center space-x-4">
          <Link href="/politica-privacidade" className="hover:text-[#F25790]">
            Política de privacidade
          </Link>
          <Link href="/termos-condicoes" className="hover:text-[#F25790]">
            Termos e condições
          </Link>
        </div>
      </div>
    </div>
  );
}
