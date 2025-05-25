import React, { useState } from 'react';

interface CheckoutControllerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number) => void;
}

export default function CheckoutController({ isOpen, onClose, onSuccess }: CheckoutControllerProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(50);

  if (!isOpen) return null;

  const handleSuccess = () => {
    onSuccess(selectedAmount);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Adicionar Créditos</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-white">Selecione o valor:</label>
            <div className="grid grid-cols-2 gap-3">
              {[50, 100, 150, 300].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedAmount === amount
                      ? 'border-[#F25790] bg-[#F25790] bg-opacity-20 text-white'
                      : 'border-gray-600 hover:border-[#F25790] text-gray-300 hover:text-white'
                  }`}
                >
                  <div className="text-lg font-bold">R$ {amount},00</div>
                  <div className="text-sm">{amount} Créditos</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSuccess}
            className="flex-1 py-2 px-4 bg-[#F25790] hover:bg-[#e44a81] text-white rounded-lg transition-colors"
          >
            Adicionar R$ {selectedAmount},00
          </button>
        </div>
      </div>
    </div>
  );
}
