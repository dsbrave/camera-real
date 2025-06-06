import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UserPreferencesModal from '@/components/UserPreferencesModal';

interface Modelo {
  id: string;
  nome: string;
  fotoPerfil?: string;
  categorias: string[];
  online: boolean;
  destacado: boolean;
  avaliacoes: number;
  valorPorMinuto: number;
  tipo: 'Mulheres' | 'Homens' | 'Casais' | 'Trans';
  precoPrivado: number;
}

interface UserPreferences {
  modelType: ('mulheres' | 'homens' | 'casais' | 'trans' | 'todos')[];
  priceRange: {
    min: number;
    max: number;
  };
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [favoriteModels, setFavoriteModels] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    
    // Verificar login imediatamente durante a hidratação
    if (typeof window !== 'undefined') {
      try {
        const userStorage = localStorage.getItem('user');
        if (userStorage) {
          const user = JSON.parse(userStorage);
          if (user.isLoggedIn) {
            setIsLoggedIn(true);
            setUserName(user.name || '');
            
            // Verificar se é o primeiro login (sem preferências salvas)
            const savedPreferences = localStorage.getItem('userPreferences');
            if (!savedPreferences) {
              setIsFirstLogin(true);
              setShowPreferencesModal(true);
            } else {
              setUserPreferences(JSON.parse(savedPreferences));
            }
            
            // Carregar favoritos do localStorage
            const favorites = JSON.parse(localStorage.getItem('favoriteModels') || '[]');
            const favoriteIds = favorites.map((fav: any) => fav.id);
            setFavoriteModels(favoriteIds);
          }
        }
      } catch (error) {
        console.error('Erro ao verificar login durante hidratação:', error);
      }
    }
    
    // Marcar como hidratado após verificar o login
    setIsHydrated(true);
  }, []);
  
  useEffect(() => {
    // Função para verificar login
    const checkLogin = () => {
      if (!isClient) return;
      
      try {
        const userStorage = localStorage.getItem('user');
        if (userStorage) {
          const user = JSON.parse(userStorage);
          setIsLoggedIn(!!user.isLoggedIn);
          if (user.isLoggedIn && user.name) {
            setUserName(user.name);
            
            // Carregar favoritos do localStorage
            const favorites = JSON.parse(localStorage.getItem('favoriteModels') || '[]');
            const favoriteIds = favorites.map((fav: any) => fav.id);
            setFavoriteModels(favoriteIds);
          } else {
            setUserName('');
          }
        } else {
          setIsLoggedIn(false);
          setUserName('');
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUserName('');
        console.error('Erro ao verificar login:', error);
      }
    };
    
    if (isClient) {
      // Adiciona eventListener para mudanças no localStorage (logout em qualquer aba)
      window.addEventListener('storage', checkLogin);
      // Adiciona listener para o evento customizado de atualização de dados do usuário
      window.addEventListener('userDataUpdated', checkLogin);
      
      return () => {
        window.removeEventListener('storage', checkLogin);
        window.removeEventListener('userDataUpdated', checkLogin);
      };
    }
  }, [isClient]);

  const handleToggleFavorite = (modelo: Modelo) => {
    if (!isLoggedIn) {
      alert('Faça login para adicionar favoritos');
      return;
    }

    const favorites = JSON.parse(localStorage.getItem('favoriteModels') || '[]');
    const isFavorite = favoriteModels.includes(modelo.id);
    
    if (isFavorite) {
      // Remover dos favoritos
      const updatedFavorites = favorites.filter((fav: any) => fav.id !== modelo.id);
      localStorage.setItem('favoriteModels', JSON.stringify(updatedFavorites));
      setFavoriteModels(favoriteModels.filter(id => id !== modelo.id));
    } else {
      // Adicionar aos favoritos
      const favoriteModel = {
        id: modelo.id,
        name: modelo.nome,
        online: modelo.online,
        lastSeen: new Date(),
        category: modelo.categorias[0] || 'Conversa',
        photo: modelo.fotoPerfil,
        rating: modelo.avaliacoes,
        pricePerMinute: modelo.valorPorMinuto,
        destacado: modelo.destacado || false
      };
      const updatedFavorites = [...favorites, favoriteModel];
      localStorage.setItem('favoriteModels', JSON.stringify(updatedFavorites));
      setFavoriteModels([...favoriteModels, modelo.id]);
    }
  };

  const handleSavePreferences = (preferences: UserPreferences) => {
    setUserPreferences(preferences);
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    setShowPreferencesModal(false);
    setIsFirstLogin(false);
  };

  // Modelos em destaque com novos campos
  const modelosDestaque: Modelo[] = [
    {
      id: 'm1',
      nome: 'Ana Silva',
      fotoPerfil: '/images/high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_ko2t9z7547m30wzu3dsv_1.png',
      categorias: ['conversa', 'dança'],
      online: true,
      destacado: true,
      avaliacoes: 4.8,
      valorPorMinuto: 1, // Chat simples sempre 1 crédito
      tipo: 'Mulheres',
      precoPrivado: 3 // Chat privado configurável
    },
    {
      id: 'm4',
      nome: 'Marina Pereira',
      fotoPerfil: '/images/high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_2wu5n7gdr6dsrmj98ak9_2.png',
      categorias: ['conversa', 'artes'],
      online: true,
      destacado: true,
      avaliacoes: 4.7,
      valorPorMinuto: 1, // Chat simples sempre 1 crédito
      tipo: 'Mulheres',
      precoPrivado: 4 // Chat privado configurável
    },
    {
      id: 'm7',
      nome: 'Bianca',
      fotoPerfil: '/images/high-resolution_studio_photo_of_a_confident_brazilian-inspired_model_wearing_an_elegant_black_lace__i7mo7j07sng27o0fv86l_2.png',
      categorias: ['conversa', 'jogos'],
      online: true,
      destacado: true,
      avaliacoes: 4.9,
      valorPorMinuto: 1, // Chat simples sempre 1 crédito
      tipo: 'Mulheres',
      precoPrivado: 5 // Chat privado configurável
    },
    {
      id: 'm8',
      nome: 'Carlos Mendes',
      fotoPerfil: '/images/high-quality_studio_photo_of_a_fit_male_model_posing_in_a_modern_streaming_setup_emphasis_on_body_1.png',
      categorias: ['conversa', 'fitness'],
      online: true,
      destacado: true,
      avaliacoes: 4.6,
      valorPorMinuto: 1, // Chat simples sempre 1 crédito
      tipo: 'Homens',
      precoPrivado: 3 // Chat privado configurável
    },
    {
      id: 'm9',
      nome: 'Alex & Sam',
      fotoPerfil: '/images/high-quality_studio_photo_of_a_couple_posing_in_a_modern_streaming_setup_1.png',
      categorias: ['conversa', 'entretenimento'],
      online: true,
      destacado: true,
      avaliacoes: 4.8,
      valorPorMinuto: 1, // Chat simples sempre 1 crédito
      tipo: 'Casais',
      precoPrivado: 4 // Chat privado configurável
    },
    {
      id: 'm10',
      nome: 'Luna',
      fotoPerfil: '/images/high-quality_studio_photo_of_a_trans_model_posing_in_a_modern_streaming_setup_1.png',
      categorias: ['conversa', 'arte'],
      online: true,
      destacado: true,
      avaliacoes: 4.7,
      valorPorMinuto: 1, // Chat simples sempre 1 crédito
      tipo: 'Trans',
      precoPrivado: 4 // Chat privado configurável
    }
  ];

  // Filtrar modelos baseado nas preferências do usuário
  const getFilteredModels = () => {
    // Se não estiver logado ou não tiver preferências, mostra apenas 2 modelos
    if (!userPreferences || !isLoggedIn) {
      return modelosDestaque.slice(0, 2);
    }

    let filteredModels = [...modelosDestaque];

    // Filtrar por tipo de modelo
    if (!userPreferences.modelType.includes('todos')) {
      const typeMap = {
        'mulheres': 'mulher',
        'homens': 'homem', 
        'casais': 'casal',
        'trans': 'trans'
      };
      
      filteredModels = filteredModels.filter(modelo => 
        userPreferences.modelType.some(selectedType => 
          modelo.tipo === typeMap[selectedType as keyof typeof typeMap]
        )
      );
    }

    // Filtrar por preço
    filteredModels = filteredModels.filter(modelo => 
      modelo.precoPrivado >= userPreferences.priceRange.min &&
      modelo.precoPrivado <= userPreferences.priceRange.max
    );

    return filteredModels;
  };

  // Definir a imagem de fundo baseada no status de login
  const backgroundImage = isLoggedIn 
    ? "url('/images/intimate_abstract_neon-lit_room_designed_for_cam_girls_and_digital_content_creators_no_models_no_be_ciz4ls7h0mms3epzpkxr_1.png')" // Imagem do quarto para usuários logados
    : "url('/images/high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_l1g01p6hm0p1kyxw2q42_0.png')"; // Imagem da modelo para usuários deslogados

  // Carregamento progressivo de imagens de fundo
  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      // Pré-carregamento de imagens para transição mais suave
      const preloadImages = [
        '/images/high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_l1g01p6hm0p1kyxw2q42_0.png',
        '/images/intimate_abstract_neon-lit_room_designed_for_cam_girls_and_digital_content_creators_no_models_no_be_ciz4ls7h0mms3epzpkxr_1.png'
      ];
      
      preloadImages.forEach(src => {
        const img = new window.Image();
        img.src = src;
      });
    }
  }, [isClient]);
  
  // Renderização condicional com fade-in para o conteúdo
  if (!isHydrated) {
    return (
      <>
        <Head>
          <title>Camera Real - Plataforma de Videochat</title>
          <meta name="description" content="A melhor plataforma de videochat ao vivo. Converse com modelos em tempo real." />
        </Head>
        
        <div 
          className="min-h-screen bg-black text-white flex flex-col"
          style={{
            backgroundImage: "url('/images/high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_l1g01p6hm0p1kyxw2q42_0.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.3,
            transition: 'opacity 0.5s ease-in'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-80 z-0"></div>
          
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <div className="h-10 sm:h-16 md:h-20" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 z-10 relative flex-1">
              {/* Placeholder sutil durante hidratação */}
              <div className="flex justify-center lg:justify-start items-center min-h-full opacity-30">
                <div className="w-full max-w-3xl text-center lg:text-left">
                  <div className="w-3/4 h-10 bg-gray-700/30 rounded animate-pulse mb-6"></div>
                  <div className="w-2/3 h-5 bg-gray-700/30 rounded animate-pulse mb-4"></div>
                  <div className="w-1/2 h-5 bg-gray-700/30 rounded animate-pulse mb-8"></div>
                  <div className="w-36 h-10 bg-pink-700/30 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <Footer />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Camera Real - Plataforma de Videochat</title>
        <meta name="description" content="A melhor plataforma de videochat ao vivo. Converse com modelos em tempo real." />
      </Head>
      
      <div className="min-h-screen bg-black text-white flex flex-col" style={{ backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center 15%', transform: 'scaleX(-1)' }}>
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>
        
        <div className="relative z-10 flex flex-col min-h-screen" style={{ transform: 'scaleX(-1)' }}> {/* Contra-flipa os elementos para ficarem corretos */}
          <Header />
          <div className="h-10 sm:h-16 md:h-20" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 z-10 relative flex-1">
            {isLoggedIn ? (
              // Layout para usuários logados - texto à esquerda, carrossel à direita
              <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 xl:gap-12 min-h-full">
                {/* Seção de texto à esquerda */}
                <div className="flex-1 lg:max-w-xl text-center lg:text-left">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 leading-tight">
                    Olá <span className="text-[#F25790]">{userName}</span>!<br/>
                    Seus videochats personalizados<br/>
                    te aguardam em <span className="text-[#F25790]">tempo real</span>.
                  </h1>
                  
                  <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 leading-relaxed">
                    Experiências selecionadas especialmente para você.<br className="hidden sm:block"/>
                    Conecte-se agora e descubra seu match perfeito.
                  </p>
                  
                  <div className="mb-8 lg:mb-0">
                    <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
                      <Link href="/explorar" className="bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-3 sm:py-4 px-8 sm:px-10 rounded-full inline-block text-center transition-colors duration-200 text-sm sm:text-base">
                        Explorar Agora
                      </Link>
                      <Link 
                        href="/carteira" 
                        className="btn-secondary px-6 py-3 text-center"
                      >
                        Comprar Créditos
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Carrossel de Modelos em Destaque à direita */}
                <div className="flex-1 lg:max-w-xl">
                  <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center lg:text-left text-white flex items-center justify-center lg:justify-start gap-2">
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                    >
                      <path 
                        d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" 
                        fill="#FFD700" 
                      />
                    </svg>
                    <span className="text-white">Modelos em Destaque</span>
                  </h2>
                  
                  <div className="overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <div className="flex gap-4 pb-4 min-w-max">
                      {getFilteredModels().map(modelo => (
                        <div 
                          key={modelo.id} 
                          className="flex-shrink-0 w-64 sm:w-72 bg-gradient-to-br from-[#F25790]/10 via-purple-500/5 to-blue-500/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:from-[#F25790]/15 hover:via-purple-500/10 hover:to-blue-500/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/20 hover:border-[#F25790]/50 group"
                        >
                          <div className="relative h-64 sm:h-72 bg-gradient-to-br from-black/30 to-black/50">
                            {/* Imagem da modelo */}
                            {modelo.fotoPerfil && (
                              <Image
                                src={modelo.fotoPerfil}
                                alt={modelo.nome}
                                fill
                                className="object-cover opacity-95"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            )}
                            
                            {/* Overlay gradiente sutil */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                            
                            {/* Status e Destaque */}
                            <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                              {modelo.destacado && (
                                <div className="bg-gradient-to-r from-[#F25790] to-[#d93d75] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="#FCD34D" viewBox="0 0 24 24" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25l-5.197 3.102 1.4-5.92-4.203-3.632 5.962-.513L12 4l2.038 6.287 5.962.513-4.203 3.632 1.4 5.92z" />
                                  </svg>
                                  DESTAQUE
                                </div>
                              )}
                              <div className={`flex items-center gap-1.5 px-4 py-1 rounded-full backdrop-blur-md bg-green-500/20 border border-green-400/30`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${modelo.online ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                                <span className="text-xs font-medium text-green-300">
                                  {modelo.online ? 'Online' : 'Offline'}
                                </span>
                              </div>
                            </div>
                            
                            <div className="absolute bottom-3 left-3 right-3">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1 pr-3">
                                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 drop-shadow-lg max-w-[140px]">{modelo.nome}</h3>
                                  <div className="flex items-center gap-2">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <svg 
                                          key={i} 
                                          className={`w-3.5 h-3.5 ${i < Math.floor(modelo.avaliacoes) ? 'text-yellow-400' : 'text-white/30'}`} 
                                          fill="currentColor" 
                                          viewBox="0 0 20 20"
                                        >
                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                      ))}
                                    </div>
                                    <span className="text-sm text-white/80 font-medium drop-shadow">{modelo.avaliacoes}</span>
                                  </div>
                                </div>
                                
                                {/* Botão de Favoritar */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleFavorite(modelo);
                                  }}
                                  className="p-2 rounded-full transition-all duration-200 hover:scale-110"
                                  title={favoriteModels.includes(modelo.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                                >
                                  <Image
                                    src={favoriteModels.includes(modelo.id) ? '/icons/action/favorite.svg' : '/icons/action/favorite_border.svg'}
                                    alt="Favoritar"
                                    width={20}
                                    height={20}
                                    className={`w-5 h-5 ${favoriteModels.includes(modelo.id) ? 'filter brightness-0 saturate-100' : 'filter brightness-0 invert'}`}
                                    style={favoriteModels.includes(modelo.id) ? { filter: 'brightness(0) saturate(100%) invert(77%) sepia(86%) saturate(2476%) hue-rotate(2deg) brightness(119%) contrast(99%)' } : {}}
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-3 sm:p-4 bg-gradient-to-br from-white/5 via-white/3 to-transparent backdrop-blur-sm">
                            {/* Categorias */}
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {modelo.categorias.slice(0, 2).map((categoria, index) => (
                                <span 
                                  key={index} 
                                  className="text-xs bg-white/10 backdrop-blur-sm border border-white/20 px-2 py-0.5 rounded-full text-white/90 font-medium"
                                >
                                  {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                                </span>
                              ))}
                            </div>
                            
                            {/* Preço e botão */}
                            <div className="flex items-center justify-between">
                              <div className="text-[#F25790] font-bold text-lg drop-shadow">
                                {modelo.valorPorMinuto.toFixed(0)} <span className="text-sm text-white/70">Créditos/min</span>
                              </div>
                              <Link href={`/chat-video?id=${modelo.id}`}>
                                <button className="bg-gradient-to-r from-[#F25790] to-[#d93d75] hover:from-[#d93d75] hover:to-[#c12d65] text-white font-medium py-2 px-4 rounded-full text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#F25790]/25 backdrop-blur-sm">
                                  Conversar
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Indicador de scroll mais sutil */}
                  <div className="flex justify-center mt-4">
                    <div className="text-sm text-white/50 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                      </svg>
                      Deslize para ver mais
                    </div>
                  </div>

                  {/* Mensagem sobre preferências */}
                  {userPreferences && (
                    <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="flex items-start gap-2">
                        <Image
                          src="/icons/action/settings.svg"
                          alt="Preferências"
                          width={16}
                          height={16}
                          className="filter brightness-0 saturate-100 invert(59%) sepia(98%) saturate(1946%) hue-rotate(201deg) brightness(97%) contrast(94%) mt-0.5"
                        />
                        <div>
                          <p className="text-blue-300 text-xs font-medium mb-1">
                            Modelos personalizados para você
                          </p>
                          <p className="text-gray-400 text-xs">
                            ({userPreferences.modelType.includes('todos') ? 'Todos os tipos' : userPreferences.modelType.join(', ')}, 
                            até {userPreferences.priceRange.max} créditos/min para chat privado).
                            <br />
                            <Link href="/painel-usuario" className="text-blue-400 hover:text-blue-300 underline">
                              Alterar no Meu Painel
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Layout para usuários não logados - centralizado
              <div className="flex justify-center lg:justify-start items-center min-h-full">
                <div className="w-full max-w-3xl text-center lg:text-left">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 leading-tight">
                  Videochats: explore o<br/>
                  <span className="text-[#F25790]">prazer</span> em tempo real.
                </h1>
                
                  <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    Conheça nossa plataforma inovadora de chat por vídeo.<br className="hidden sm:block"/>
                    Em apenas um clique descubra um novo jeito de interagir.<br className="hidden sm:block"/>
                  Junte-se a nós e conecte-se de forma genuína.
                </p>
                
                <div className="mb-12">
                    <Link href="/cadastro" className="bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-3 sm:py-4 px-8 sm:px-10 rounded-full inline-block text-center transition-colors duration-200 text-sm sm:text-base">
                      Cadastre-se agora
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <Footer />
        </div>

        {/* Modal de Preferências do Usuário */}
        {showPreferencesModal && (
          <UserPreferencesModal
            isOpen={showPreferencesModal}
            onClose={() => {
              if (!isFirstLogin) {
                setShowPreferencesModal(false);
              }
            }}
            onSavePreferences={handleSavePreferences}
          />
        )}
      </div>
    </>
  );
}
