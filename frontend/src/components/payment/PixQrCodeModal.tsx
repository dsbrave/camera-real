import React, { useState } from 'react';
import Image from 'next/image';

interface PixQrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  valorSelecionado: number;
  userName: string;
  onComplete: () => void;
}

const PixQrCodeModal: React.FC<PixQrCodeModalProps> = ({
  isOpen,
  onClose,
  onBack,
  valorSelecionado,
  userName,
  onComplete,
}) => {
  const [saveInfo, setSaveInfo] = useState(true);

  const handleCopyCode = () => {
    // In a real app, this would copy a PIX code to clipboard
    alert('Código PIX copiado!');
  };

  if (!isOpen) return null;

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
                src="/images/Wavy Buddies - Payment 1.png" 
                alt="Ilustração de pagamento - Wavy Buddies" 
                width={320} 
                height={320}
                className="object-contain mx-auto"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="md:w-2/3 md:pl-8">
            <h2 className="text-2xl font-bold text-white mb-4 text-center md:text-left">Pagamento via PIX</h2>
            
            <div className="bg-camera-pink/20 text-white p-4 rounded-md mb-6">
              <p className="text-sm">
                Abra o aplicativo do seu banco no celular, escolha pagar por PIX, selecione QR Code e escaneie o código abaixo.
              </p>
            </div>

            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-lg">
                <Image 
                  src="/images/qr-code.png" 
                  alt="QR Code PIX" 
                  width={150} 
                  height={150}
                  className="object-contain"
                  onError={(e) => {
                    // Fallback if QR code image is not available
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    // Use a dummy QR code for demo purposes
                    target.src = 'data:image/png;base64,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';
                  }}
                />
              </div>
            </div>

            <div className="flex space-x-4 mb-6">
              <button 
                onClick={handleCopyCode}
                className="flex-1 py-2 bg-camera-pink text-white rounded-full hover:bg-pink-600 transition-colors text-sm"
              >
                Pagar com Copia e Cola
              </button>

              <button 
                onClick={onComplete}
                className="flex-1 py-2 bg-camera-pink text-white rounded-full hover:bg-pink-600 transition-colors text-sm"
              >
                Já finalizei a transferência
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#8d41a8]/30 rounded-lg mb-6">
              <div className="flex items-center">
                <span className="text-white">Nome: {userName}</span>
              </div>
              <button className="text-camera-pink text-sm hover:underline">
                Editar
              </button>
            </div>

            <div className="flex items-center mb-6">
              <input 
                type="checkbox"
                id="save-info"
                checked={saveInfo}
                onChange={() => setSaveInfo(!saveInfo)}
                className="h-4 w-4 text-camera-pink focus:ring-camera-pink border-gray-300 rounded"
              />
              <label htmlFor="save-info" className="ml-2 block text-sm text-white">
                Salvar as informações para futuras transações
              </label>
            </div>
            
            <div className="border-t border-white/20 pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white/70 text-sm">Valor da compra</p>
                  <p className="text-white text-2xl font-bold">R$ {valorSelecionado.toFixed(2).replace('.', ',')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onBack}
          className="absolute bottom-8 left-8 px-6 py-2 rounded-full bg-[#8d41a8]/50 text-white hover:bg-[#8d41a8]"
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default PixQrCodeModal;
