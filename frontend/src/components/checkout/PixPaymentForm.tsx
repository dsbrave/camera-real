import React, { useState } from 'react';
import CheckoutModal from './CheckoutModal';
import Image from 'next/image';

interface PixPaymentFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAmount: number;
  onSubmit: () => void;
}

export default function PixPaymentForm({ isOpen, onClose, selectedAmount, onSubmit }: PixPaymentFormProps) {
  const [showQRCode, setShowQRCode] = useState(true);
  const [userName, setUserName] = useState('Cláudia Soso Venturin');
  const [saveInfo, setSaveInfo] = useState(true);
  
  // PIX code simulado
  const pixCode = '90231809371874-39.192834.gov.1o23o.bb.pix91983.api.developer.btgpactual.com/1nsah18das9daj90231809371874-39.192834.gov.1o23o.bb.pix91983.api.developer.btgpactual.com/v1/1nsah18das9daj';
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <CheckoutModal isOpen={isOpen} onClose={onClose} bgColor="bg-[#9747FF]">
      <div className="flex flex-col items-center py-6 max-w-md mx-auto text-white">
        <h2 className="text-2xl font-bold mb-2 text-center">Pagamento via PIX</h2>
        
        <div className="bg-[#F25790] text-white text-sm p-3 rounded-md mb-6 w-full">
          Abra o aplicativo do seu banco no celular, escolha pagar por PIX, selecione QR Code e escaneie o código abaixo.
        </div>
        
        <div className="flex w-full mb-6">
          <div className="w-1/2 flex items-center justify-center">
            <div className="relative w-full">
              <Image 
                src="/images/Payment.png" 
                alt="Pagamento via Pix" 
                width={420}
                height={420}
                className="mx-auto"
                style={{ maxWidth: 420, width: '100%', height: 'auto', display: 'block' }}
                priority
              />
            </div>
          </div>
          
          <div className="w-1/2 flex flex-col items-center justify-center">
            {showQRCode ? (
              <div className="bg-white p-2 rounded-md">
                <Image 
                  src="/images/qr-code-pix.png" 
                  alt="QR Code PIX" 
                  width={150} 
                  height={150}
                />
              </div>
            ) : (
              <div className="w-full px-2">
                <div className="text-xs text-gray-200 mb-1">Código do PIX</div>
                <div className="bg-white text-gray-800 p-2 rounded-md text-xs mb-1 overflow-hidden break-words">
                  {pixCode}
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={() => copyToClipboard(pixCode)}
                    className="text-xs text-right text-pink-300 hover:text-white"
                  >
                    Copiar código do PIX
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between w-full gap-4 mb-6">
          <button 
            onClick={() => setShowQRCode(true)}
            className={`py-2 px-4 rounded-full ${showQRCode ? 'bg-[#F25790]' : 'bg-[#F25790]/70'} hover:bg-[#F25790] transition-colors flex-1`}
          >
            Pagar com QR Code
          </button>
          
          <button 
            onClick={() => setShowQRCode(false)}
            className={`py-2 px-4 rounded-full ${!showQRCode ? 'bg-[#F25790]' : 'bg-[#F25790]/70'} hover:bg-[#F25790] transition-colors flex-1`}
          >
            Pagar com Copia e Cola
          </button>
        </div>
        
        <div className="w-full mb-1 bg-[#9747FF]/40 p-2 rounded-md flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-200">Nome:</div>
            <div>{userName}</div>
          </div>
          <button className="text-[#F25790] hover:text-white text-sm">Editar</button>
        </div>
        
        <div className="w-full mb-6 flex items-center">
          <input 
            type="checkbox" 
            id="saveInfo" 
            checked={saveInfo} 
            onChange={() => setSaveInfo(!saveInfo)} 
            className="mr-2"
          />
          <label htmlFor="saveInfo" className="text-sm">Salvar as informações para futuras transações</label>
        </div>
        
        <div className="w-full mb-6">
          <div className="border-t border-white/20 pt-4">
            <div className="text-sm">Valor da compra</div>
            <div className="text-2xl font-bold">R$ {selectedAmount.toFixed(2).replace('.', ',')}</div>
          </div>
        </div>
        
        <div className="w-full flex justify-between gap-4">
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#9747FF]/50 hover:bg-[#9747FF]/70 transition-colors"
          >
            Voltar
          </button>
          
          <button 
            onClick={onSubmit}
            className="px-6 py-2 rounded-full bg-[#F25790] hover:bg-[#e44a81] transition-colors"
          >
            Já finalizei a transferência
          </button>
        </div>
      </div>
    </CheckoutModal>
  );
}
