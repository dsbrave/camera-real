import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface AgeVerificationProps {
  onVerify?: () => void;
}

// Componente removido conforme solicitado

const AgeVerification: React.FC<AgeVerificationProps> = ({ onVerify }) => {
  const [showVerification, setShowVerification] = useState(false);
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Mouse tracking for interactive background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    window.location.href = 'https://www.google.com';
  };

  if (!showVerification) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden" style={{ backgroundImage: "url('/images/Group 26.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'darken' }}>
        {/* Logo no canto superior esquerdo */}
        <div className="fixed top-6 left-6 z-20">
          <div>
            <Image 
              src="/icons/logo.svg" 
              alt="Camera Real" 
              width={120} 
              height={40} 
              priority 
            />
          </div>
        </div>
        
        <div className="w-full max-w-md mx-auto relative z-10">
          <div className="w-full p-6 sm:p-8 bg-black/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700/50 relative overflow-hidden animate-fadeIn animate-slideUp">
            {/* Animated Background - Only in Form */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              {/* Base gradient background - more subtle */}
              <div 
                className="absolute inset-0 opacity-10 transition-all duration-1500 ease-out"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                    #F25790 0%, 
                    #8B5CF6 35%, 
                    #3B82F6 60%, 
                    #1E1B4B 80%, 
                    #000000 100%)`
                }}
              />
              
              {/* Subtle gradient waves - reduced intensity */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 opacity-4 animate-pulse">
                  <div 
                    className="absolute w-full h-full transition-transform duration-3000 ease-out"
                    style={{
                      background: `conic-gradient(from ${mousePosition.x * 0.3}deg at 50% 50%, 
                        transparent 0deg, 
                        #F25790 120deg, 
                        transparent 240deg, 
                        #8B5CF6 360deg)`,
                      filter: 'blur(100px)',
                      transform: `rotate(${mousePosition.x * 0.02}deg) scale(${1 + mousePosition.y * 0.0002})`
                    }}
                  />
                </div>
              </div>
              
              {/* Camera lens flare - more realistic and subtle */}
              <div 
                className="absolute transition-all duration-300 ease-out pointer-events-none"
                style={{
                  left: `${mousePosition.x}%`,
                  top: `${mousePosition.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* Main lens reflection */}
                <div 
                  className="absolute w-8 h-8 rounded-full opacity-15"
                  style={{
                    background: 'radial-gradient(circle, rgba(242, 87, 144, 0.3) 0%, rgba(242, 87, 144, 0.05) 40%, transparent 70%)',
                    filter: 'blur(4px)',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
                
                {/* Secondary lens ring */}
                <div 
                  className="absolute w-12 h-12 rounded-full opacity-10"
                  style={{
                    background: 'radial-gradient(circle, transparent 50%, rgba(139, 92, 246, 0.1) 60%, transparent 70%)',
                    filter: 'blur(2px)',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
                
                {/* Lens reflection cross - camera-like */}
                <div 
                  className="absolute w-0.5 h-4 opacity-15"
                  style={{
                    background: 'linear-gradient(to bottom, transparent, rgba(242, 87, 144, 0.3), transparent)',
                    transform: 'translate(-50%, -50%)',
                    filter: 'blur(0.5px)'
                  }}
                />
                <div 
                  className="absolute w-4 h-0.5 opacity-15"
                  style={{
                    background: 'linear-gradient(to right, transparent, rgba(242, 87, 144, 0.3), transparent)',
                    transform: 'translate(-50%, -50%)',
                    filter: 'blur(0.5px)'
                  }}
                />
              </div>
              
              {/* Light black overlay to reduce intensity */}
              <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col items-center justify-center mb-2">
                <div className="text-white text-8xl font-bold mb-4">!</div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-[#F25790]">Verificação de Idade</h2>
              
              <p className="text-gray-300 mb-6 text-center">
                Este site contém material com restrições de idade, incluindo nudez e representações 
                explícitas de atividade sexual. Ao continuar, você afirma que tem pelo menos 18 
                anos de idade ou a maioridade na jurisdição de onde está acessando o site.
              </p>
              
              <button
                onClick={handleVerify}
                className="w-full bg-[#F25790] hover:bg-[#d93d75] text-white py-3 sm:py-4 px-4 rounded-full mt-4 sm:mt-6 transition-colors font-medium text-base sm:text-lg mb-4"
              >
                Tenho 18 anos ou mais - Entrar
              </button>
              
              <button
                onClick={handleReject}
                className="w-full py-3 bg-transparent border border-gray-600 text-white rounded-full hover:bg-gray-800 transition"
              >
                Tenho menos de 18 anos - Sair
              </button>
              
              <div className="mt-6 text-xs text-gray-500 flex justify-center space-x-4">
                <button 
                  onClick={() => setShowPrivacyModal(true)} 
                  className="text-[#F25790] hover:underline bg-transparent border-none cursor-pointer"
                >
                  Política de privacidade
                </button>
                <button 
                  onClick={() => setShowTermsModal(true)} 
                  className="text-[#F25790] hover:underline bg-transparent border-none cursor-pointer"
                >
                  Termos e condições
                </button>
              </div>
              
              <div className="mt-6 text-xs text-gray-500 text-center">
                <p>Para fins de demonstração, você pode:</p>
                <p className="mt-1">Clicar em "Tenho 18 anos ou mais" para acessar o site</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Política de Privacidade */}
      {showPrivacyModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[60] p-4 animate-fadeIn"
          onClick={() => setShowPrivacyModal(false)}
        >
          <div 
            className="bg-[#1a0e1a] rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto scrollbar-hide relative animate-slideUp"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 0 30px rgba(242, 87, 144, 0.2)',
              border: '1px solid rgba(242, 87, 144, 0.3)'
            }}
          >
            <button 
              onClick={() => setShowPrivacyModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-xl font-bold mb-6 text-[#F25790] border-b border-[#F25790]/30 pb-2">Política de Privacidade</h2>
            
            <div className="text-gray-300 text-sm space-y-4">
              <p>A sua privacidade é importante para nós. É política do Camera Real respeitar a sua privacidade em relação a qualquer informação que possamos coletar.</p>
              
              <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.</p>
              
              <p>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>
              
              <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>
              
              <p>O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.</p>
            </div>
            
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="mt-8 bg-[#F25790] hover:bg-[#d93d75] text-white py-3 px-4 rounded-full transition-colors w-full font-medium"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
      
      {/* Modal de Termos e Condições */}
      {showTermsModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[60] p-4 animate-fadeIn"
          onClick={() => setShowTermsModal(false)}
        >
          <div 
            className="bg-[#1a0e1a] rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto scrollbar-hide relative animate-slideUp"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 0 30px rgba(242, 87, 144, 0.2)',
              border: '1px solid rgba(242, 87, 144, 0.3)'
            }}
          >
            <button 
              onClick={() => setShowTermsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-xl font-bold mb-6 text-[#F25790] border-b border-[#F25790]/30 pb-2">Termos e Condições</h2>
            
            <div className="text-gray-300 text-sm space-y-4">
              <p>Ao acessar o site Camera Real, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis.</p>
              
              <p>Este site contém material com restrições de idade. Ao utilizar este site, você confirma que tem pelo menos 18 anos de idade ou a maioridade legal em sua jurisdição.</p>
              
              <p>Não é permitido usar nosso site para qualquer fim ilegal ou não autorizado. Você não deve transmitir worms, vírus ou qualquer código de natureza destrutiva.</p>
              
              <p>Reservamo-nos o direito de recusar o serviço a qualquer pessoa por qualquer motivo a qualquer momento.</p>
              
              <p>Seu conteúdo (não incluindo informações de cartão de crédito), pode ser transferido sem criptografia e isso implica na transmissão conhecida pela Internet que nem sempre fornece 100% de segurança.</p>
            </div>
            
            <button
              onClick={() => setShowTermsModal(false)}
              className="mt-8 bg-[#F25790] hover:bg-[#d93d75] text-white py-3 px-4 rounded-full transition-colors w-full font-medium"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </>
  );
};


export default AgeVerification;
