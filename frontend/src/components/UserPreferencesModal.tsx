import React, { useState } from 'react';
import Image from 'next/image';

interface UserPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePreferences: (preferences: UserPreferences) => void;
}

export interface UserPreferences {
  modelType: ('mulheres' | 'homens' | 'casais' | 'trans' | 'todos')[];
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
  const [selectedModelTypes, setSelectedModelTypes] = useState<('mulheres' | 'homens' | 'casais' | 'trans' | 'todos')[]>(['todos']);
  const [priceRange, setPriceRange] = useState({ min: 1, max: 5 });

  const modelTypes = [
    { id: 'mulheres', label: 'Mulheres' },
    { id: 'homens', label: 'Homens' },
    { id: 'casais', label: 'Casais' },
    { id: 'trans', label: 'Trans' },
    { id: 'todos', label: 'Todos' },
  ];

  const handleModelTypeToggle = (typeId: 'mulheres' | 'homens' | 'casais' | 'trans' | 'todos') => {
    setSelectedModelTypes(prev => {
      if (prev.includes(typeId)) {
        // Se já está selecionado, remove
        const newSelection = prev.filter(type => type !== typeId);
        // Se não sobrar nenhum, seleciona "todos"
        return newSelection.length === 0 ? ['todos'] : newSelection;
      } else {
        // Se não está selecionado, adiciona
        const newSelection = [...prev, typeId];
        // Se selecionou "todos", remove os outros
        if (typeId === 'todos') {
          return ['todos'];
        }
        // Se selecionou outro tipo e "todos" estava selecionado, remove "todos"
        return newSelection.filter(type => type !== 'todos');
      }
    });
  };

  const handleSave = () => {
    const preferences: UserPreferences = {
      modelType: selectedModelTypes,
      priceRange: priceRange,
    };
    onSavePreferences(preferences);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-6 pb-4">
          <h2 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-[#F25790] to-[#d93d75] bg-clip-text text-transparent">
            Bem-vindo!
          </h2>
          <p className="text-gray-300 text-sm">
            Configure suas preferências para uma experiência personalizada
          </p>
        </div>

        <div className="px-6 pb-6">
          {/* Model Type Selection */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-white mb-3">Tipo de modelo preferido:</h3>
            <div className="grid grid-cols-2 gap-2">
              {modelTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleModelTypeToggle(type.id as 'mulheres' | 'homens' | 'casais' | 'trans' | 'todos')}
                  className={`p-3 rounded-lg border-2 transition-all duration-300 text-center ${
                    selectedModelTypes.includes(type.id as 'mulheres' | 'homens' | 'casais' | 'trans' | 'todos')
                      ? 'border-[#F25790] bg-[#F25790]/10 shadow-[0_0_10px_rgba(242,87,144,0.3)]'
                      : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                  }`}
                >
                  <div className="text-white font-medium text-sm">{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Selection */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-white mb-3">
              Faixa de preço para chat privado:
            </h3>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-center mb-3 text-sm">
                <span className="text-white">Preço máximo: {priceRange.max}</span>
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
                      min: 1,
                      max: newMax
                    }));
                  }}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #F25790 0%, #F25790 ${((priceRange.max - 1) / 4) * 100}%, #374151 ${((priceRange.max - 1) / 4) * 100}%, #374151 100%)`
                  }}
                />
              </div>
              
              <div className="p-3 bg-[#F25790]/10 rounded border border-[#F25790]/20">
                <p className="text-white text-xs font-medium">
                  Chat simples: 1 crédito/min
                </p>
                <p className="text-gray-300 text-xs mt-1">
                  Chat privado: até {priceRange.max} crédito(s)/min
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
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
  );
};

export default UserPreferencesModal; 