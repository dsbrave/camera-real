import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface PagamentoSucessoModalProps {
  isOpen: boolean;
  onClose: () => void;
  valorAdicionado: number;
}

const PagamentoSucessoModal: React.FC<PagamentoSucessoModalProps> = ({
  isOpen,
  onClose,
  valorAdicionado,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      // Após 3 segundos, redirecionar para a carteira
      const timer = setTimeout(() => {
        router.push('/carteira');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#F25790] rounded-lg max-w-md w-full p-8 relative text-center">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32">
          <Image 
            src="/images/Shiny Happy - Rock n Rollin 1.png" 
            alt="Compra concluída com sucesso" 
            width={320} 
            height={320}
            className="mx-auto mb-6"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              // SVG de fallback em caso de erro na imagem
              const svgContainer = document.createElement('div');
              svgContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#F25790]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
              const parentNode = target.parentNode;
              if (parentNode) {
                parentNode.replaceChild(svgContainer.firstChild!, target);
              }
            }}
          />
        </div>
        
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Pagamento confirmado!</h2>
        <p className="text-white mb-6">
          Você adicionou <span className="font-bold">R$ {valorAdicionado.toFixed(2).replace('.', ',')}</span> à sua conta.
          Aproveite para conversar com nossos modelos!
        </p>
        
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-white hover:bg-gray-100 text-[#F25790] font-bold py-2 px-8 rounded-full transition-colors"
          >
            Continuar
          </button>
        </div>
        
        <p className="text-white text-sm mt-6 animate-pulse">
          Redirecionando para sua carteira...
        </p>
      </div>
    </div>
  );
};

export default PagamentoSucessoModal;
