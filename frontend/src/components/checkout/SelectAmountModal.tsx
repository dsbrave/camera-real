import React, { useState } from 'react';
import CheckoutModal from './CheckoutModal';
import Image from 'next/image';

interface SelectAmountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAmount: (amount: number) => void;
  onNext: () => void;
}

export default function SelectAmountModal({ isOpen, onClose, onSelectAmount, onNext }: SelectAmountModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const handleSelectAmount = (amount: number) => {
    setSelectedAmount(amount);
    onSelectAmount(amount);
  };

  const handleNext = () => {
    if (selectedAmount !== null) {
      onNext();
    }
  };

  const amounts = [
    { value: 10, label: '10' },
    { value: 30, label: '30' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
    { value: 150, label: '150' },
    { value: 300, label: '300' },
  ];

  return (
    <CheckoutModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col md:flex-row items-stretch bg-gradient-to-br from-[#a259c6] via-[#b16fdc] to-[#f25790] rounded-2xl p-4 md:p-8 shadow-2xl min-w-[320px] md:min-w-[720px] max-w-[900px]">
        <div className="md:w-2/5 flex items-center justify-center mb-6 md:mb-0">
          <Image 
            src="/images/Payment.png" 
            alt="Pagamento" 
            width={420}
            height={420}
            className="mx-auto"
            style={{ maxWidth: 420, width: '100%', height: 'auto', display: 'block' }}
            priority
          />
        </div>
        
        <div className="md:w-3/5 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2 text-white text-left md:text-center">Adicionar saldo</h2>
          <p className="text-white text-opacity-90 mb-8 text-left md:text-center">Selecione um valor para adicionar a sua conta:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {amounts.map((amount) => (
              <button
                key={amount.value}
                onClick={() => handleSelectAmount(amount.value)}
                className={`py-4 px-0 rounded-xl border-2 font-semibold text-lg transition-all flex flex-col items-center shadow-md focus:outline-none focus:ring-2 focus:ring-white/80 ${
                  selectedAmount === amount.value
                    ? 'border-white bg-white bg-opacity-20 text-white'
                    : 'border-white border-opacity-20 hover:border-opacity-40 text-white/80 hover:text-white'
                }`}
              >
                <span className="text-base mb-1">Carregue</span>
                <span className="text-2xl font-bold">R$ {amount.label}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-row justify-between items-center gap-4 mt-2">
            <button
              onClick={onClose}
              className="py-2 px-8 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors text-white font-semibold text-base"
            >
              Voltar
            </button>
            <button
              onClick={handleNext}
              disabled={selectedAmount === null}
              className={`py-2 px-10 rounded-full font-bold text-base transition-colors shadow-md ${
                selectedAmount !== null
                  ? 'bg-[#F25790] hover:bg-[#e44a81] text-white'
                  : 'bg-gray-400 cursor-not-allowed text-white/60'
              }`}
            >
              Avançar
            </button>
          </div>
        </div>
      </div>
    </CheckoutModal>
  );
}
