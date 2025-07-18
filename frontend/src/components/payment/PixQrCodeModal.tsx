import React, { useState } from "react";
import Image from "next/image";

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
  const handleCopyCode = () => {
    if (typeof window !== "undefined") {
      alert("Código PIX copiado!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[99999]">
      <div className="bg-[#b162c9] rounded-lg max-w-md w-full p-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex flex-col items-center">
          {/* Left side - Illustration */}
          <div className="mb-3">
            <div className="relative h-20 w-20">
              <Image 
                src="/images/realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_lesbian_real-life_ywl5rbewnur5zwcu1br6_0.png" 
                alt="Casal brasileiro - Pagamento PIX" 
                width={80}
                height={80}
                className="object-cover rounded-lg mx-auto"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-full">
            <h2 className="text-xl font-bold text-white mb-3 text-center">
              Pagamento via PIX
            </h2>
            
            <div className="bg-camera-pink/20 text-white p-4 rounded-md mb-6">
              <p className="text-sm">
                Abra o aplicativo do seu banco no celular, escolha pagar por
                PIX, selecione QR Code e escaneie o código abaixo.
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
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src =
                      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PIX-DEMO";
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <button
                onClick={handleCopyCode}
                className="bg-white text-[#b162c9] px-4 py-2 rounded font-bold mb-2"
              >
                Copiar código PIX
              </button>
              <button onClick={onBack} className="text-white underline text-sm">
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixQrCodeModal;
