import React, { useState } from 'react';
import Image from 'next/image';
import BaseModal from '@/components/BaseModal';

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

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      modelImage="/images/realistic_photo_of_a_beautiful_curvy_cam_model_in_sexy_casual_clothing_in_a_pink_neon-lit_cam_studi_01vxr9sv9u5n1mi8vknf_2.png"
      modelName="Modelo Cam"
      title="Bem-vindo!"
      subtitle="Configure suas preferências para uma experiência personalizada"
    >
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

      {/* Action Button */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="flex-1 bg-gradient-to-r from-[#F25790] to-[#d93d75] hover:from-[#d93d75] hover:to-[#c12d65] text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(242,87,144,0.4)] hover:shadow-[0_0_25px_rgba(242,87,144,0.6)] hover:scale-105 active:scale-95"
        >
          Salvar Preferências
        </button>
      </div>
    </BaseModal>
  );
};

export default UserPreferencesModal; 