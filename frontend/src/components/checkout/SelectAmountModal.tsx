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
      <div className="flex flex-col md:flex-row items-stretch h-full gap-8">
        <div className="md:w-2/5 flex items-center justify-center">
          <Image
            src="/images/Payment.png"
            alt="Pagamento"
            width={400}
            height={400}
            className="mx-auto"
            style={{ maxWidth: 400, width: '100%', height: 'auto', display: 'block' }}
            priority
          />
        </div>
        <div className="md:w-3/5 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2 text-white text-center">Adicionar saldo</h2>
          <p className="text-white text-opacity-90 mb-6 text-center">Selecione um valor para adicionar a sua conta:</p>
          
          <div className="grid grid-cols-3 gap-3 mb-8">
            {amounts.map((amount) => (
              <button
                key={amount.value}
                onClick={() => handleSelectAmount(amount.value)}
                className={`py-3 px-4 rounded-lg border-2 font-medium text-sm transition-all flex flex-col items-center ${
                  selectedAmount === amount.value
                    ? 'border-white bg-white bg-opacity-20 text-white'
                    : 'border-white border-opacity-30 hover:border-opacity-50 text-white/80 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <span className="text-xs mb-1">Carregue</span>
                <span className="text-lg font-bold">R$ {amount.label}</span>
              </button>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="py-2 px-6 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors text-white font-medium"
            >
              Voltar
            </button>
            <button
              onClick={handleNext}
              disabled={selectedAmount === null}
              className={`py-2 px-8 rounded-full font-medium transition-colors ${
                selectedAmount !== null
                  ? 'bg-[#F25790] hover:bg-[#e44a81] text-white'
                  : 'bg-gray-500 cursor-not-allowed text-white/60'
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
