import React from 'react';
import CheckoutModal from './CheckoutModal';
import Image from 'next/image';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

export default function SuccessModal({ isOpen, onClose, amount }: SuccessModalProps) {
  // Gerar data e ID da transação
  const currentDate = new Date().toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  });
  const currentTime = new Date().toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });
  
  const transactionId = '66A24-9A3A0-C76-987';
  
  return (
  <CheckoutModal isOpen={isOpen} onClose={onClose} bgColor="bg-[#9747FF]">
    <div className="flex flex-col md:flex-row text-white h-full gap-12 justify-center items-center">
      <div className="w-2/5 flex items-center justify-center">
        <Image
          src="/images/Shiny Happy - Rock n Rollin 1.png"
          alt="Confirmação de compra"
          width={760}
          height={760}
          className="mx-auto"
          style={{ maxWidth: 760, width: '100%', height: 'auto', display: 'block', margin: 'auto' }}
          priority
        />
      </div>
      <div className="w-3/5 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-1">Pagamento aprovado</h2>
        <p className="text-sm text-center">
          Sua transação para carregar sua conta realizada por PIX foi
          aprovada com sucesso! O saldo está disponível em sua
          conta e já pode ser utilizado.
        </p>
        <div className="bg-[#9747FF]/40 rounded-md p-4 mb-6">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="text-gray-300">Data:</div>
              <div>{currentDate} {currentTime}</div>
            </div>
            <div>
              <div className="text-gray-300">Valor:</div>
              <div>R$ {amount.toFixed(2).replace('.', ',')}</div>
            </div>
            <div className="col-span-2">
              <div className="text-gray-300">ID:</div>
              <div>{transactionId}</div>
            </div>
            <div className="text-gray-300">Data:</div>
            <div>{currentDate} {currentTime}</div>
          </div>
          <div>
            <div className="text-gray-300">Valor:</div>
            <div>R$ {amount.toFixed(2).replace('.', ',')}</div>
          </div>
          <div className="col-span-2">
            <div className="text-gray-300">ID:</div>
            <div>{transactionId}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={onClose}
          className="py-2 px-8 rounded-full bg-[#F25790] hover:bg-[#e44a81] transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  </CheckoutModal>
);
}
