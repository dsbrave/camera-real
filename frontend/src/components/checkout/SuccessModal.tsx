import React from 'react';
import CheckoutModal from './CheckoutModal';
import Image from 'next/image';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionAmount: number;
}

export default function SuccessModal({ isOpen, onClose, transactionAmount }: SuccessModalProps) {
  // Gerar data e hora atual
  const now = new Date();
  const dateTime = now.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  // ID da transação simulado
  const transactionId = '66A24-9A3A0-C76-987';

  return (
    <CheckoutModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col md:flex-row items-stretch h-full gap-8 text-white">
        <div className="md:w-2/5 flex items-center justify-center">
          <Image
            src="/images/Payment.png"
            alt="Pagamento aprovado"
            width={400}
            height={400}
            className="mx-auto"
            style={{ maxWidth: 400, width: '100%', height: 'auto', display: 'block' }}
            priority
          />
        </div>
        
        <div className="md:w-3/5 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4 text-center">Pagamento aprovado</h2>
          
          <p className="text-center text-white text-opacity-90 mb-8">
            Sua transação para carregar sua conta realizada por PIX foi aprovada com sucesso! O saldo está disponível em sua conta e já pode ser utilizado.
          </p>
          
          <div className="space-y-3 mb-8">
            <div className="flex justify-between">
              <span className="text-white text-opacity-80">Data:</span>
              <span className="font-medium">{dateTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white text-opacity-80">Valor:</span>
              <span className="font-medium">R$ {transactionAmount.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white text-opacity-80">ID:</span>
              <span className="font-medium">{transactionId}</span>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="py-3 px-8 rounded-full bg-[#F25790] hover:bg-[#e44a81] transition-colors text-white font-medium"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </CheckoutModal>
  );
}
