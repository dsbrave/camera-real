import React from 'react';
import Image from 'next/image';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelImage?: string;
  modelName?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function BaseModal({ 
  isOpen, 
  onClose, 
  modelImage = "/images/realistic_photo_of_a_beautiful_curvy_cam_model_in_sexy_casual_clothing_crouching_down_seductively_t_02y5lhog5fhudntrltmb_72.png",
  modelName = "Modelo",
  title,
  subtitle,
  children 
}: BaseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="bg-black rounded-3xl max-w-4xl w-full mx-4 shadow-[0_0_50px_rgba(242,87,144,0.3)] border border-[#F25790]/30 overflow-hidden relative">
        {/* Efeitos neon de fundo */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F25790]/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F25790] to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F25790] to-transparent opacity-40"></div>
        
        {/* Botão de fechar */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-20"
        >
          <Image
            src="/icons/navigation/close.svg"
            alt="Fechar"
            width={32}
            height={32}
            className="w-8 h-8"
            style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
          />
        </button>
        
        <div className="flex flex-col md:flex-row relative z-10 min-h-[400px]">
          {/* Lado esquerdo - Imagem da modelo (edge-to-edge) */}
          <div className="md:w-1/2 relative overflow-hidden">
            {/* Imagem de fundo que vai de ponta a ponta */}
            <div className="absolute inset-0">
              <Image
                src={modelImage}
                alt={modelName}
                fill
                className="object-cover object-center"
              />
            </div>
            
            {/* Gradiente de transição para o lado direito */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/80 md:to-black/90"></div>
            
            {/* Gradiente inferior para melhor legibilidade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Overlay neon sutil */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#F25790]/20 via-transparent to-transparent mix-blend-overlay"></div>
            
            {/* Efeito de brilho neon nas bordas */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F25790]/60 via-[#F25790]/80 to-transparent blur-sm"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#F25790]/40 via-[#F25790]/60 to-transparent blur-sm"></div>
            </div>
          </div>
          
          {/* Lado direito - Conteúdo */}
          <div className="md:w-1/2 p-6 flex flex-col justify-center relative bg-gradient-to-br from-black/95 via-black/90 to-black/95">
            {/* Efeito de continuidade visual */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-black pointer-events-none"></div>
            
            <div className="relative z-10">
              {/* Título com efeito neon */}
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                    {title}
                  </span>
                </h2>
                {subtitle && (
                  <h3 className="text-lg md:text-xl font-bold mb-3">
                    <span className="bg-gradient-to-r from-[#F25790] to-[#d93d75] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(242,87,144,0.5)]">
                      {subtitle}
                    </span>
                  </h3>
                )}
                <div className="w-16 h-1 bg-gradient-to-r from-[#F25790] to-[#d93d75] mx-auto rounded-full shadow-[0_0_15px_rgba(242,87,144,0.6)]"></div>
              </div>
              
              {/* Conteúdo personalizado */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 