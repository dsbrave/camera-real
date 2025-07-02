import React, { useState } from 'react';
import Image from 'next/image';

interface AdicionarSaldoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCredits: (amount: number) => void;
}

const AdicionarSaldoModal: React.FC<AdicionarSaldoModalProps> = ({
  isOpen,
  onClose,
  onAddCredits,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const handleSelectAmount = (amount: number) => {
    setSelectedAmount(amount);
  };

  const handleAdvance = () => {
    if (selectedAmount) {
      onAddCredits(selectedAmount);
      onClose();
    }
  };

  if (!isOpen) return null;

  const creditOptions = [
    { value: 10, label: 'R$ 10' },
    { value: 30, label: 'R$ 30' },
    { value: 50, label: 'R$ 50' },
    { value: 100, label: 'R$ 100' },
    { value: 150, label: 'R$ 150' },
    { value: 300, label: 'R$ 300' },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-xl relative max-h-[90vh] overflow-y-auto p-8">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row items-center">
          {/* Left side - Illustration */}
          <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
            <div className="relative h-48 w-48">
              <Image 
                src="/images/credit-illustration.svg" 
                alt="Adicionar saldo" 
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
            <h2 className="text-2xl font-bold text-white mb-2 text-center md:text-left">Adicionar saldo</h2>
            <p className="text-white mb-6 text-center md:text-left">Selecione um valor para adicionar à sua conta:</p>

            {/* Credit options grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {creditOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelectAmount(option.value)}
                  className={
                    `rounded-lg py-3 px-4 text-center transition-all ` +
                    (selectedAmount === option.value 
                      ? 'bg-white text-[#F25790] font-bold border-2 border-[#F25790]' 
                      : 'bg-[#8d41a8]/50 text-white hover:bg-[#8d41a8] border border-transparent')
                  }
                >
                  <div className="text-base font-medium">Carregue</div>
                  <div className={`text-xl ${selectedAmount === option.value ? 'font-bold' : 'font-semibold'}`}>
                    {option.label}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleAdvance}
              disabled={!selectedAmount}
              className="w-full py-3 bg-gradient-to-r from-[#F25790] to-[#d93d75] text-white font-bold rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(242,87,144,0.4)] hover:shadow-[0_0_25px_rgba(242,87,144,0.6)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Avançar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdicionarSaldoModal;
