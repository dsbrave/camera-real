import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ModelProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  model: {
    id: string;
    nome: string;
    fotoPerfil?: string;
    categorias: string[];
    online: boolean;
    destacado: boolean;
    avaliacoes: number;
    valorPorMinuto: number;
    idade?: number;
    localizacao?: string;
  };
}

export default function ModelProfileModal({ isOpen, onClose, model }: ModelProfileModalProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Verificar se a modelo já está nos favoritos
      const favorites = JSON.parse(localStorage.getItem('favoriteModels') || '[]');
      setIsFavorite(favorites.some((fav: any) => fav.id === model.id));
    }
  }, [isOpen, model.id]);

  if (!isOpen) return null;

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteModels') || '[]');
    
    if (isFavorite) {
      // Remover dos favoritos
      const updatedFavorites = favorites.filter((fav: any) => fav.id !== model.id);
      localStorage.setItem('favoriteModels', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      // Adicionar aos favoritos
      const favoriteModel = {
        id: model.id,
        name: model.nome,
        online: model.online,
        lastSeen: new Date(),
        category: model.categorias[0] || 'Conversa',
        photo: model.fotoPerfil,
        rating: model.avaliacoes,
        pricePerMinute: model.valorPorMinuto,
        destacado: model.destacado || false
      };
      const updatedFavorites = [...favorites, favoriteModel];
      localStorage.setItem('favoriteModels', JSON.stringify(updatedFavorites));
      setIsFavorite(true);
    }
  };

  return (
    <>
      {/* Modal Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        {/* Modal Container */}
        <div className="bg-black rounded-3xl max-w-lg w-full mx-4 shadow-[0_0_30px_rgba(242,87,144,0.3)] border border-[#F25790]/20 overflow-hidden relative">
          {/* Efeitos neon de fundo */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#F25790]/5 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F25790] to-transparent opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F25790] to-transparent opacity-20"></div>
          
          <div className="relative z-10">
            {/* Header com botão de fechar e favoritar */}
            <div className="flex items-center justify-between p-6 pb-0">
              <h2 className="text-2xl font-bold text-white">Perfil da Modelo</h2>
              <div className="flex items-center gap-3">
                {/* Botão de Favoritar */}
                <button
                  onClick={handleToggleFavorite}
                  className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                    isFavorite 
                      ? 'bg-yellow-500/20 border border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.4)]' 
                      : 'bg-gray-700/50 border border-gray-600/50 hover:bg-gray-600/50'
                  }`}
                  title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                >
                  <svg 
                    className={`w-6 h-6 transition-colors duration-300 ${
                      isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                    }`} 
                    fill={isFavorite ? 'currentColor' : 'none'} 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
                
                {/* Botão de Fechar */}
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Foto da Modelo */}
            <div className="flex justify-center p-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#F25790]/30">
                  {model.fotoPerfil ? (
                    <Image 
                      src={model.fotoPerfil} 
                      alt={model.nome} 
                      width={128} 
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">
                        {model.nome?.charAt(0) || 'M'}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Status Online */}
                <div className={`absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  model.online 
                    ? 'bg-green-500/20 border border-green-400/30 text-green-300' 
                    : 'bg-red-500/20 border border-red-400/30 text-red-300'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${model.online ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                  {model.online ? 'Online' : 'Offline'}
                </div>
              </div>
            </div>

            {/* Informações da Modelo */}
            <div className="px-6 pb-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{model.nome}</h3>
                
                {/* Avaliação */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(model.avaliacoes) ? 'text-yellow-400' : 'text-gray-600'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-yellow-400 font-bold">{model.avaliacoes}</span>
                </div>

                {/* Informações adicionais */}
                {(model.idade || model.localizacao) && (
                  <p className="text-gray-400 text-sm mb-4">
                    {model.idade && `${model.idade} anos`}
                    {model.idade && model.localizacao && ' • '}
                    {model.localizacao}
                  </p>
                )}

                {/* Preço */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 mb-4">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-1">Preço por minuto</p>
                    <p className="text-[#F25790] text-2xl font-bold">
                      {model.valorPorMinuto.toFixed(0)} <span className="text-sm text-gray-400">créditos</span>
                    </p>
                  </div>
                </div>

                {/* Categorias */}
                <div className="mb-6">
                  <p className="text-gray-400 text-sm mb-2">Especialidades</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {model.categorias.map((categoria, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full text-white/90 font-medium"
                      >
                        {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="space-y-3">
                  <Link href={`/perfil/m${model.id}`} className="block">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 rounded-xl transition-all duration-300 border border-blue-500/30">
                      Ver Perfil Completo
                    </button>
                  </Link>
                  
                  <Link href={`/chat-video?id=${model.id}`} className="block">
                    <button className="w-full bg-gradient-to-r from-[#F25790] to-[#d93d75] hover:from-[#d93d75] hover:to-[#c12d65] text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(242,87,144,0.4)] hover:shadow-[0_0_25px_rgba(242,87,144,0.6)] hover:scale-105 active:scale-95">
                      {model.online ? 'Conversar Agora' : 'Iniciar Chat'}
                    </button>
                  </Link>
                  
                  {model.online && (
                    <Link href={`/chat-video?id=${model.id}&private=true`} className="block">
                      <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-3 rounded-xl transition-all duration-300 border border-purple-500/30">
                        Chat Privado
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 