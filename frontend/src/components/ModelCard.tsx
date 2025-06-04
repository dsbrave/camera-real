import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ModelCardProps {
  model: {
    id: string;
    nome?: string;
    name?: string;
    fotoPerfil?: string;
    photo?: string;
    categorias?: string[];
    category?: string;
    online: boolean;
    destacado?: boolean;
    avaliacoes?: number;
    rating?: number;
    valorPorMinuto?: number;
    pricePerMinute?: number;
    idade?: number;
    localizacao?: string;
  };
  isLoggedIn: boolean;
  favoriteModels: string[];
  onToggleFavorite: (model: any) => void;
  onOpenModal?: (model: any) => void;
  showRemoveButton?: boolean;
  onRemoveFavorite?: (modelId: string) => void;
  size?: 'small' | 'medium' | 'large';
}

export default function ModelCard({
  model,
  isLoggedIn,
  favoriteModels,
  onToggleFavorite,
  onOpenModal,
  showRemoveButton = false,
  onRemoveFavorite,
  size = 'medium'
}: ModelCardProps) {
  // Normalizar dados do modelo para compatibilidade
  const modelName = model.nome || model.name || '';
  const modelPhoto = model.fotoPerfil || model.photo || '';
  const modelCategories = model.categorias || (model.category ? [model.category] : []);
  const modelRating = model.avaliacoes || model.rating || 4.5;
  const modelPrice = model.valorPorMinuto || model.pricePerMinute || 0;

  const isFavorite = favoriteModels.includes(model.id);

  const handleCardClick = () => {
    if (onOpenModal) {
      // Converter para formato esperado pelo modal
      const normalizedModel = {
        id: model.id,
        nome: modelName,
        fotoPerfil: modelPhoto,
        categorias: modelCategories,
        online: model.online,
        destacado: model.destacado || false,
        avaliacoes: modelRating,
        valorPorMinuto: modelPrice,
        idade: model.idade,
        localizacao: model.localizacao
      };
      onOpenModal(normalizedModel);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const normalizedModel = {
      id: model.id,
      nome: modelName,
      fotoPerfil: modelPhoto,
      categorias: modelCategories,
      online: model.online,
      destacado: model.destacado || false,
      avaliacoes: modelRating,
      valorPorMinuto: modelPrice,
      idade: model.idade,
      localizacao: model.localizacao
    };
    onToggleFavorite(normalizedModel);
  };

  const handleRemoveFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemoveFavorite) {
      onRemoveFavorite(model.id);
    }
  };

  // Definir classes baseadas no tamanho
  const sizeClasses = {
    small: {
      container: 'w-48 sm:w-56',
      image: 'h-48 sm:h-64',
      title: 'text-base sm:text-lg',
      button: 'py-1.5 px-3 text-xs',
      price: 'text-sm'
    },
    medium: {
      container: 'w-64 sm:w-72',
      image: 'h-64 sm:h-80',
      title: 'text-lg sm:text-xl',
      button: 'py-2 px-5 text-sm',
      price: 'text-lg'
    },
    large: {
      container: 'w-72 sm:w-80',
      image: 'h-72 sm:h-96',
      title: 'text-xl sm:text-2xl',
      button: 'py-2.5 px-6 text-base',
      price: 'text-xl'
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div 
      className={`${currentSize.container} bg-gradient-to-br from-[#F25790]/10 via-purple-500/5 to-blue-500/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:from-[#F25790]/15 hover:via-purple-500/10 hover:to-blue-500/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/20 hover:border-[#F25790]/50 cursor-pointer relative`}
      onClick={handleCardClick}
    >
      <div className={`relative ${currentSize.image} bg-gradient-to-br from-black/30 to-black/50`}>
        {/* Imagem da modelo */}
        {modelPhoto && (
          <Image
            src={modelPhoto}
            alt={modelName}
            fill
            className="object-cover opacity-95"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        
        {/* Overlay gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
        
        {/* Status e Destaque */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          {model.destacado && (
            <div className="bg-gradient-to-r from-[#F25790] to-[#d93d75] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#FCD34D" viewBox="0 0 24 24" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25l-5.197 3.102 1.4-5.92-4.203-3.632 5.962-.513L12 4l2.038 6.287 5.962.513-4.203 3.632 1.4 5.92z" />
              </svg>
              DESTAQUE
            </div>
          )}
          <div className={`flex items-center gap-1.5 px-4 py-1 rounded-full backdrop-blur-md bg-green-500/20 border border-green-400/30 ${model.destacado ? '' : 'ml-auto'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${model.online ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
            <span className="text-xs font-medium text-green-300">
              {model.online ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
        
        {/* Nome, avaliação e coração */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 pr-3">
              <h2 className={`${currentSize.title} font-bold mb-2 break-words max-w-[140px]`}>{modelName}</h2>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-3.5 h-3.5 ${i < Math.floor(modelRating) ? 'text-yellow-400' : 'text-white/30'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-400 text-sm break-words max-w-[120px]">{model.idade ? `${model.idade} anos` : ''} {model.localizacao ? `• ${model.localizacao}` : ''}</p>
              </div>
            </div>
            
            {/* Botão de Favoritar */}
            {isLoggedIn && (
              <button
                onClick={handleToggleFavorite}
                className="p-2 rounded-full transition-all duration-200 hover:scale-110"
                title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              >
                <Image
                  src={isFavorite ? '/icons/action/favorite.svg' : '/icons/action/favorite_border.svg'}
                  alt="Favoritar"
                  width={20}
                  height={20}
                  className={`w-5 h-5 ${isFavorite ? 'filter brightness-0 saturate-100' : 'filter brightness-0 invert'}`}
                  style={isFavorite ? { filter: 'brightness(0) saturate(100%) invert(77%) sepia(86%) saturate(2476%) hue-rotate(2deg) brightness(119%) contrast(99%)' } : {}}
                />
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 sm:p-5 bg-gradient-to-br from-white/5 via-white/3 to-transparent backdrop-blur-sm">
        {/* Categorias */}
        <div className="flex flex-wrap gap-2 mb-4">
          {modelCategories.slice(0, 2).map((categoria, index) => (
            <span 
              key={index} 
              className="text-xs bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-1.5 rounded-full text-white/90 font-medium break-words truncate max-w-[80px]"
            >
              {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
            </span>
          ))}
        </div>
        
        {/* Preço e botão lado a lado */}
        <div className="flex items-center justify-between">
          <div className={`text-[#F25790] font-bold ${currentSize.price} drop-shadow`}>
            {modelPrice.toFixed(0)} <span className="text-sm text-white/70">Créditos/min</span>
          </div>
          <Link href={`/chat-video?id=${model.id}`} onClick={(e) => e.stopPropagation()}>
            <button className={`bg-gradient-to-r from-[#F25790] to-[#d93d75] hover:from-[#d93d75] hover:to-[#c12d65] text-white font-medium ${currentSize.button} rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#F25790]/25 backdrop-blur-sm`}>
              Conversar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
} 