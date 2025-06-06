import React, { useState } from 'react';
import Image from 'next/image';

interface UserPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePreferences: (preferences: UserPreferences) => void;
}

export interface UserPreferences {
  modelType: 'mulheres' | 'homens' | 'casais' | 'trans' | 'todos';
  priceRange: {
    min: number;
    max: number;
  };
}

const UserPreferencesModal: React.FC<UserPreferencesModalProps> = ({
  isOpen,
  onClose,
  onSavePreferences,
}) => {
  const [selectedModelType, setSelectedModelType] = useState<UserPreferences['modelType']>('todos');
  const [priceRange, setPriceRange] = useState({ min: 1, max: 5 });

  const modelTypes = [
    { id: 'mulheres', label: 'Mulheres', icon: '/icons/social/person.svg' },
    { id: 'homens', label: 'Homens', icon: '/icons/social/person_outline.svg' },
    { id: 'casais', label: 'Casais', icon: '/icons/social/people.svg' },
    { id: 'trans', label: 'Trans', icon: '/icons/social/groups.svg' },
    { id: 'todos', label: 'Todos', icon: '/icons/action/stars.svg' },
  ];

  const handleSave = () => {
    const preferences: UserPreferences = {
      modelType: selectedModelType,
      priceRange: priceRange,
    };
    onSavePreferences(preferences);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Overlay - Fixed positioning with highest z-index */}
      <div 
        data-modal="user-preferences"
        className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
          minHeight: '100vh',
          minWidth: '100vw'
        }}
      >
        {/* Modal Container - Centered and responsive */}
        <div 
          className="bg-black rounded-3xl w-full max-w-md my-4 shadow-[0_0_30px_rgba(242,87,144,0.3)] border border-[#F25790]/20 relative mx-auto"
          onClick={(e) => e.stopPropagation()}
          style={{
            maxHeight: 'calc(100vh - 2rem)',
            overflowY: 'auto'
          }}
        >
          {/* Efeitos neon de fundo */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#F25790]/5 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F25790] to-transparent opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F25790] to-transparent opacity-20"></div>
          
          <div className="relative z-10 p-6">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-[#F25790] to-[#d93d75] flex items-center justify-center">
                <Image
                  src="/icons/action/settings.svg"
                  alt="Configurações"
                  width={24}
                  height={24}
                  className="filter brightness-0 invert"
                />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Bem-vindo!</h2>
              <p className="text-gray-300 text-sm">
                Configure suas preferências para uma experiência personalizada
              </p>
            </div>

            {/* Model Type Selection */}
            <div className="mb-6">
              <h3 className="text-base font-semibold text-white mb-3">Tipo de modelo preferido:</h3>
              <div className="grid grid-cols-2 gap-2">
                {modelTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedModelType(type.id as UserPreferences['modelType'])}
                    className={`p-3 rounded-lg border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                      selectedModelType === type.id
                        ? 'border-[#F25790] bg-[#F25790]/10 shadow-[0_0_10px_rgba(242,87,144,0.3)]'
                        : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                    }`}
                  >
                    <Image
                      src={type.icon}
                      alt={type.label}
                      width={20}
                      height={20}
                      className={`filter ${selectedModelType === type.id ? 'brightness-0 saturate-100 invert(77%) sepia(86%) saturate(2476%) hue-rotate(2deg) brightness(119%) contrast(99%)"' : 'brightness-0 invert'}`}
                    />
                    <div className="text-white font-medium text-xs">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Selection */}
            <div className="mb-6">
              <h3 className="text-base font-semibold text-white mb-3">
                Faixa de preço para chat privado:
              </h3>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-3 text-sm">
                  <span className="text-white">Mínimo: {priceRange.min}</span>
                  <span className="text-white">Máximo: {priceRange.max}</span>
                </div>
                
                {/* Min Range Slider */}
                <div className="mb-3">
                  <label className="block text-gray-300 text-xs mb-1">Preço mínimo</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={priceRange.min}
                    onChange={(e) => {
                      const newMin = parseInt(e.target.value);
                      setPriceRange(prev => ({
                        min: newMin,
                        max: Math.max(newMin, prev.max)
                      }));
                    }}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #F25790 0%, #F25790 ${((priceRange.min - 1) / 4) * 100}%, #374151 ${((priceRange.min - 1) / 4) * 100}%, #374151 100%)`
                    }}
                  />
                </div>
                
                {/* Max Range Slider */}
                <div className="mb-3">
                  <label className="block text-gray-300 text-xs mb-1">Preço máximo</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={priceRange.max}
                    onChange={(e) => {
                      const newMax = parseInt(e.target.value);
                      setPriceRange(prev => ({
                        min: Math.min(prev.min, newMax),
                        max: newMax
                      }));
                    }}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #F25790 0%, #F25790 ${((priceRange.max - 1) / 4) * 100}%, #374151 ${((priceRange.max - 1) / 4) * 100}%, #374151 100%)`
                    }}
                  />
                </div>
                
                <div className="p-2 bg-[#F25790]/10 rounded border border-[#F25790]/20">
                  <p className="text-[#F25790] text-xs font-medium flex items-center gap-1">
                    <Image
                      src="/icons/action/stars.svg"
                      alt="Info"
                      width={12}
                      height={12}
                      className="filter brightness-0 saturate-100 invert(77%) sepia(86%) saturate(2476%) hue-rotate(2deg) brightness(119%) contrast(99%)"
                    />
                    Chat simples: sempre 1 crédito/min
                  </p>
                  <p className="text-gray-300 text-xs mt-1">
                    Chat privado: {priceRange.min === priceRange.max ? priceRange.min : `${priceRange.min} a ${priceRange.max}`} crédito(s)/min
                  </p>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="mb-6 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-start gap-2">
                <Image
                  src="/icons/action/settings.svg"
                  alt="Info"
                  width={16}
                  height={16}
                  className="filter brightness-0 saturate-100 invert(59%) sepia(98%) saturate(1946%) hue-rotate(201deg) brightness(97%) contrast(94%) mt-0.5"
                />
                <div>
                  <p className="text-blue-300 text-xs font-medium mb-1">
                    Você pode alterar essas preferências a qualquer momento
                  </p>
                  <p className="text-gray-400 text-xs">
                    Acesse "Meu Painel" → "Editar Perfil" → "Preferências"
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-[#F25790] to-[#d93d75] hover:from-[#d93d75] hover:to-[#c12d65] text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(242,87,144,0.4)] hover:shadow-[0_0_25px_rgba(242,87,144,0.6)] hover:scale-105 active:scale-95"
              >
                Salvar Preferências
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPreferencesModal; 