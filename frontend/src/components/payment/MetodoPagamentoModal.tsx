import React, { useState } from 'react';
import Image from 'next/image';

interface MetodoPagamentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  valorSelecionado: number;
  onSelectPaymentMethod: (method: 'pix' | 'credit-card') => void;
}

const MetodoPagamentoModal: React.FC<MetodoPagamentoModalProps> = ({
  isOpen,
  onClose,
  valorSelecionado,
  onSelectPaymentMethod,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'pix' | 'credit-card' | null>(null);
  
  const handleSelectMethod = (method: 'pix' | 'credit-card') => {
    setSelectedMethod(method);
    onSelectPaymentMethod(method);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[99999]">
      <div className="bg-[#b162c9] rounded-lg max-w-xl w-full p-8 relative">
        {/* Imagem ilustrativa */}
        <div className="absolute right-8 top-8 w-32 h-32 opacity-70">
          <Image 
            src="/images/realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_lesbian_real-life_ywl5rbewnur5zwcu1br6_0.png" 
            alt="Pagamento" 
            width={128} 
            height={128} 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              console.log('Erro ao carregar imagem de pagamento');
            }}
          />
        </div>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200 bg-black/40 rounded-full p-1.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row items-center">
          {/* Left side - Illustration */}
          <div className="md:w-1/3 mb-6 md:mb-0">
            <div className="relative h-48 w-48">
              <Image 
                src="/images/credit-illustration.svg" 
                alt="Pagamento" 
                width={200} 
                height={200}
                className="object-contain"
                onError={(e) => {
                  // Fallback if SVG is not available
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/images/credit-illustration.png';
                }}
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="md:w-2/3 md:pl-8">
            <h2 className="text-2xl font-bold text-white mb-2 text-center md:text-left">Escolha o pagamento</h2>
            <p className="text-white mb-6 text-center md:text-left">Como quer carregar a sua conta?</p>

            {/* Payment method options */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`p-4 border rounded-lg flex flex-col items-center cursor-pointer transition-all ${selectedMethod === 'pix' ? 'border-white bg-white/20' : 'border-white/40 hover:border-white/60'}`}
                onClick={() => handleSelectMethod('pix')}
              >
                <div className="w-10 h-10 mb-2 bg-white rounded-full flex items-center justify-center">
                  <Image 
                    src="/icons/action/payment.svg" 
                    alt="PIX" 
                    width={24} 
                    height={24} 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/icons/dollar-sign 1.png';
                    }}
                  />
                </div>
                <span className="text-sm">Pix</span>
              </div>
              
              <div
                className={`p-4 border rounded-lg flex flex-col items-center cursor-pointer transition-all ${selectedMethod === 'credit-card' ? 'border-white bg-white/20' : 'border-white/40 hover:border-white/60'}`}
                onClick={() => handleSelectMethod('credit-card')}
              >
                <div className="w-10 h-10 mb-2 bg-white rounded-full flex items-center justify-center">
                  <Image 
                    src="/icons/action/credit_card.svg" 
                    alt="Cartão de Crédito" 
                    width={24} 
                    height={24} 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/icons/dollar-sign 1.png';
                    }}
                  />
                </div>
                <span className="text-sm">Cartão de Crédito</span>
              </div>
            </div>

            <div className="mt-8 border-t border-white/20 pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white/70 text-sm">Valor selecionado</p>
                  <p className="text-white text-2xl font-bold">R$ {valorSelecionado.toFixed(2).replace('.', ',')}</p>
                </div>
                <button 
                  onClick={() => {}}
                  className="bg-gradient-to-r from-[#F25790]/40 to-[#d93d75]/40 text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-[0_0_10px_rgba(242,87,144,0.3)] hover:from-[#F25790]/60 hover:to-[#d93d75]/60 transition-all"
                  disabled
                >
                  Avançar
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute bottom-8 left-8 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 font-semibold text-sm"
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default MetodoPagamentoModal;
