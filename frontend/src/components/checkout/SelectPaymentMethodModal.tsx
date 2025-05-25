import React, { useState } from 'react';
import Image from 'next/image';

interface SelectPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  selectedAmount: number;
  onSelectMethod: (method: 'pix' | 'credit-card') => void;
  onNext: (selectedMethod: 'pix' | 'credit-card') => void;
}

export default function SelectPaymentMethodModal({ 
  isOpen, 
  onClose, 
  onBack,
  selectedAmount, 
  onSelectMethod, 
  onNext 
}: SelectPaymentMethodModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'pix' | 'credit-card' | null>(null);

  const handleSelectMethod = (method: 'pix' | 'credit-card') => {
    setSelectedMethod(method);
    onSelectMethod(method);
  };

  const handleNext = () => {
    if (selectedMethod) {
      onNext(selectedMethod);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            {/* Botão de fechar */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-8">
              {/* Imagem à esquerda */}
              <div className="flex-shrink-0 relative">
                <div className="relative w-96 h-96 flex items-center justify-center">
                  <Image 
                    src="/images/Payment.png" 
                    alt="Pagamento" 
                    width={384}
                    height={384}
                    className="object-contain filter brightness-110 contrast-110"
                  />
                </div>
              </div>

              {/* Conteúdo principal */}
              <div className="flex-1 max-w-md">
                <h2 className="text-3xl font-bold text-white mb-2 text-center">Escolha o pagamento</h2>
                <p className="text-white text-center mb-8 opacity-90">Como quer carregar a sua conta?</p>
                
                {/* Grid de métodos de pagamento */}
                <div className="grid grid-cols-1 gap-4 mb-8">
                  <button
                    onClick={() => handleSelectMethod('pix')}
                    className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                      selectedMethod === 'pix' 
                        ? 'border-white bg-white bg-opacity-20 shadow-lg' 
                        : 'border-gray-400 border-opacity-50 hover:border-white hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-[#4BB8A9] bg-opacity-20 p-3 rounded-full mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#4BB8A9]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-white text-lg font-bold">PIX</div>
                          <div className="text-white text-sm opacity-75">Transferência instantânea</div>
                        </div>
                      </div>
                      <span className="bg-[#F25790] text-white text-xs px-3 py-1 rounded-full">Aprovação instantânea</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => handleSelectMethod('credit-card')}
                    className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                      selectedMethod === 'credit-card' 
                        ? 'border-white bg-white bg-opacity-20 shadow-lg' 
                        : 'border-gray-400 border-opacity-50 hover:border-white hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-[#6366F1] bg-opacity-20 p-3 rounded-full mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#6366F1]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-white text-lg font-bold">Cartão de crédito</div>
                          <div className="text-white text-sm opacity-75">Visa, Mastercard, Elo</div>
                        </div>
                      </div>
                      <span className="bg-[#F25790] text-white text-xs px-3 py-1 rounded-full">Aprovação instantânea</span>
                    </div>
                  </button>
                </div>

                {/* Valor selecionado */}
                <div className="border-t border-white border-opacity-30 pt-4 mb-6">
                  <div className="flex justify-between text-white">
                    <span>Valor selecionado</span>
                    <span className="font-bold">R$ {selectedAmount.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
                
                {/* Botões */}
                <div className="flex justify-between gap-4">
                  <button
                    onClick={onBack || onClose}
                    className="flex-1 py-3 px-6 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors text-white font-medium"
                  >
                    Voltar
                  </button>
                  
                  <button
                    onClick={handleNext}
                    disabled={!selectedMethod}
                    className={`flex-1 py-3 px-6 rounded-full font-medium transition-all transform hover:scale-105 ${
                      selectedMethod
                        ? 'bg-[#F25790] hover:bg-[#d93d75] text-white'
                        : 'bg-gray-500 cursor-not-allowed text-white/60'
                    }`}
                  >
                    Avançar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
