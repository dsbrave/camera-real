import React, { useState } from 'react';
import CheckoutModal from './CheckoutModal';
import Image from 'next/image';

interface SelectPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAmount: number;
  onSelectMethod: (method: 'pix' | 'credit-card') => void;
  onNext: () => void;
}

export default function SelectPaymentMethodModal({ 
  isOpen, 
  onClose, 
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
      onNext();
    }
  };

  return (
    <CheckoutModal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-full gap-12">
        <div className="w-2/5 flex items-center justify-center">
  <Image 
    src="/images/Payment.png" 
    alt="Pagamento" 
    width={760}
    height={760}
    className="mx-auto"
    style={{ maxWidth: 760, width: '100%', height: 'auto', display: 'block' }}
    priority
  />
</div>
        
        <div className="w-3/5">
          <h2 className="text-2xl font-bold mb-2 text-center">Escolha o pagamento</h2>
          <p className="text-center mb-6">Como quer carregar a sua conta?</p>
          
          <div className="space-y-4 mb-8">
            <button
              onClick={() => handleSelectMethod('pix')}
              className={`w-full py-4 px-6 rounded-lg border-2 flex items-center justify-between transition-all ${
                selectedMethod === 'pix'
                  ? 'border-white bg-white bg-opacity-20'
                  : 'border-white border-opacity-20 hover:border-opacity-40'
              }`}
            >
              <div className="flex items-center">
                <div className="bg-white p-1 rounded mr-3">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="16" height="16" rx="4" fill="#35D07F"/>
    <path d="M8 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
</div>
                <span className="font-medium">Pix</span>
              </div>
              <span className="bg-[#F25790] text-xs px-3 py-1 rounded-full">Aprovação instantânea</span>
            </button>
            
            <button
              onClick={() => handleSelectMethod('credit-card')}
              className={`w-full py-4 px-6 rounded-lg border-2 flex items-center justify-between transition-all ${
                selectedMethod === 'credit-card'
                  ? 'border-white bg-white bg-opacity-20'
                  : 'border-white border-opacity-20 hover:border-opacity-40'
              }`}
            >
              <div className="flex items-center">
                <div className="bg-white p-1 rounded mr-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="5" width="18" height="14" rx="3" fill="#9747FF"/>
                    <rect x="3" y="9" width="18" height="2" fill="#fff"/>
                    <rect x="7" y="15" width="4" height="1.5" rx="0.75" fill="#fff"/>
                  </svg>
                </div>
                <span className="font-medium">Cartão de crédito</span>
              </div>
              <span className="bg-[#F25790] text-xs px-3 py-1 rounded-full">Aprovação instantânea</span>
            </button>
          </div>
          
          <div className="border-t border-white border-opacity-20 pt-6 mb-6">
            <div className="flex justify-between">
              <span>Valor selecionado</span>
              <span className="font-bold">R$ {selectedAmount.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="py-2 px-6 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
            >
              Voltar
            </button>
            
            <button
              onClick={handleNext}
              disabled={!selectedMethod}
              className={`py-2 px-8 rounded-full transition-colors ${
                selectedMethod
                  ? 'bg-[#F25790] hover:bg-[#e44a81]'
                  : 'bg-gray-400 cursor-not-allowed'
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
