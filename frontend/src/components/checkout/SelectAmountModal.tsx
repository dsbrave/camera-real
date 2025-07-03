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
                className={`w-full py-2 px-4 rounded-xl border text-sm font-bold transition-all hover:scale-105 shadow-[0_0_10px_rgba(242,87,144,0.3)] border-[#F25790]/30 bg-gradient-to-r from-[#F25790]/15 to-[#d93d75]/15 hover:from-[#F25790]/20 hover:to-[#d93d75]/20 text-white mb-2 ${selectedAmount === amount.value ? 'border-[#F25790] bg-gradient-to-r from-[#F25790]/30 to-[#d93d75]/30' : ''}`}
              >
                <span className="text-xs mb-1">Carregue</span>
                <span className="text-base font-bold">R$ {amount.label}</span>
              </button>
            ))}
          </div>
          
          <div className="flex gap-3 items-center">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white font-semibold text-sm border border-white/20"
            >
              Voltar
            </button>
            <button
              onClick={handleNext}
              disabled={selectedAmount === null}
              className={`flex-1 py-2 px-4 font-semibold rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(242,87,144,0.3)] hover:shadow-[0_0_25px_rgba(242,87,144,0.5)] hover:scale-105 active:scale-95 border border-[#F25790]/20 text-sm ${selectedAmount !== null ? 'bg-gradient-to-r from-[#F25790]/40 to-[#d93d75]/40 hover:from-[#F25790]/60 hover:to-[#d93d75]/60 text-white' : 'bg-white/10 text-white/50 cursor-not-allowed'}`}
            >
              Avançar
            </button>
          </div>
        </div>
      </div>
    </CheckoutModal>
  );
}
