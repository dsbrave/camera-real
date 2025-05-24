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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#b162c9] rounded-lg max-w-xl w-full p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200"
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
                  className={`
                    rounded-lg py-3 px-4 text-center transition-all
                    ${selectedAmount === option.value 
                      ? 'bg-white text-[#b162c9] font-bold' 
                      : 'bg-[#8d41a8]/50 text-white hover:bg-[#8d41a8]'}
                  `}
                >
                  <div className="text-base font-medium">Carregue</div>
                  <div className={`text-xl ${selectedAmount === option.value ? 'font-bold' : 'font-semibold'}`}>
                    {option.label}
                  </div>
                </button>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex justify-between">
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-full bg-[#8d41a8]/50 text-white hover:bg-[#8d41a8]"
              >
                Voltar
              </button>
              <button
                onClick={handleAdvance}
                disabled={!selectedAmount}
                className={`
                  px-8 py-2 rounded-full 
                  ${selectedAmount ? 'bg-camera-pink text-white hover:bg-pink-600' : 'bg-gray-400 text-gray-100 cursor-not-allowed'}
                `}
              >
                Avançar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdicionarSaldoModal;
