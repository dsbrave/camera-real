import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UserPreferencesModal from '@/components/UserPreferencesModal';
import ModelCard from '@/components/ModelCard';
import PainelModelo from './painel-modelo';

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
  const [isModel, setIsModel] = useState(false);
  
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
            setIsModel(!!user.isModel);
            
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
            setIsModel(!!user.isModel);
            
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
      nome: 'SweetNaty',
      fotoPerfil: '/images/high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_ko2t9z7547m30wzu3dsv_1.png',
      categorias: ['conversa', 'dança'],
      online: true,
      destacado: true,
      avaliacoes: 4.8,
      valorPorMinuto: 1,
      tipo: 'Mulheres',
      precoPrivado: 3
    },
    {
      id: 'm4',
      nome: 'GabiDreams',
      fotoPerfil: '/images/high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_jdasqbio3vvca5k92ebh_2.png',
      categorias: ['conversa', 'artes'],
      online: true,
      destacado: true,
      avaliacoes: 4.7,
      valorPorMinuto: 1,
      tipo: 'Mulheres',
      precoPrivado: 4
    },
    {
      id: 'm7',
      nome: 'IsaPink',
      fotoPerfil: '/images/high-resolution_studio_photo_of_a_confident_brazilian-inspired_model_wearing_an_elegant_black_lace__i7mo7j07sng27o0fv86l_2.png',
      categorias: ['conversa', 'jogos'],
      online: true,
      destacado: true,
      avaliacoes: 4.9,
      valorPorMinuto: 1,
      tipo: 'Mulheres',
      precoPrivado: 5
    },
    {
      id: 'm8',
      nome: 'CarolSexy',
      fotoPerfil: '/images/realistic_photo_of_a_brazilian_latino_man_with_everyday_natural_looks__regular_including_body_diver_ecf9z2bp6ac4zulo1fmw_3.png',
      categorias: ['conversa', 'fitness'],
      online: true,
      destacado: true,
      avaliacoes: 4.6,
      valorPorMinuto: 1,
      tipo: 'Homens',
      precoPrivado: 3
    },
    {
      id: 'm9',
      nome: 'Alex & Sam',
      fotoPerfil: '/images/realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_beauty_real-life__b3uv0efkhgp35404n7ab_0.png',
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
      fotoPerfil: '/images/high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_zg1iy2w7g4x4j2pm3925_0.png',
      categorias: ['conversa', 'arte'],
      online: true,
      destacado: true,
      avaliacoes: 4.7,
      valorPorMinuto: 1, // Chat simples sempre 1 crédito
      tipo: 'Trans',
      precoPrivado: 4 // Chat privado configurável
    },
    {
      id: 't1',
      nome: 'Valentina',
      fotoPerfil: '/images/high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_r68jd84c1uv21o2ehzgj_3.png',
      categorias: ['conversa', 'dança'],
      online: true,
      destacado: true,
      avaliacoes: 4.5,
      valorPorMinuto: 1, // Chat simples sempre 1 crédito
      tipo: 'Trans',
      precoPrivado: 3 // Chat privado configurável
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
        'mulheres': 'Mulheres',
        'homens': 'Homens', 
        'casais': 'Casais',
        'trans': 'Trans'
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
  
  // MOCKS para painel de modelo
  const saldoDisponivel = 1200.50;
  const ganhosHoje = 150.00;
  const ganhosMes = 3200.00;
  const minutosHoje = 87;
  const sessoesHoje = 6;
  const rankingDia = 8;
  const metaMinutos = 120;
  const faltamParaMeta = metaMinutos - minutosHoje;
  const feedbacks = [
    { nome: 'Cliente123', comentario: 'Adorei a transmissão, muito simpática!', nota: 5 },
    { nome: 'VIP2024', comentario: 'Ótima energia, voltarei mais vezes!', nota: 5 },
    { nome: 'Anônimo', comentario: 'Atendimento excelente!', nota: 4 }
  ];
  const notificacoes = [
    { tipo: 'info', texto: 'Nova campanha: Bônus de 10% para quem ficar mais de 2h online hoje!' },
    { tipo: 'alerta', texto: 'Complete seu perfil para liberar saques.' },
    { tipo: 'sucesso', texto: 'Seu documento foi aprovado! Parabéns.' }
  ];
  
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
          <div className="fixed inset-0 bg-black bg-opacity-80 z-0"></div>
          
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

  // Home especial para modelo logada, mantendo layout e estilos
  if (isLoggedIn && isModel) {
    // MOCKS para agenda e feedbacks
    const compromissos = [
      { data: '05/07', hora: '20h', tipo: 'Show ao vivo' },
      { data: '07/07', hora: '18h', tipo: 'Live especial' }
    ];
    const feedbacks = [
      { usuario: 'ClienteTeste', foto: '/images/avatar1.png', texto: 'Linda transmissão, adorei!', nota: 5, perfil: '/perfil/cliente-teste' },
      { usuario: 'VIP2024', foto: '/images/avatar2.png', texto: 'Muito simpática e divertida!', nota: 5, perfil: '/perfil/vip2024' }
    ];
    return (
      <>
        <Head>
          <title>Bem-vinda, {userName} | Camera Real</title>
          <meta name="description" content="Página inicial da modelo - Camera Real" />
        </Head>
        <div className="min-h-screen w-full bg-black text-white flex flex-col overflow-hidden" style={{ backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center 15%' }}>
          <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/80 via-black/70 to-[#200310]/80 backdrop-blur-[2px]"></div>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <div className="h-10 sm:h-16 md:h-20" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 z-10 relative flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8 xl:gap-12 min-h-full">
                {/* Esquerda: Foto, saudação e botões */}
                <div className="flex-1 lg:max-w-xl text-center lg:text-left flex flex-col items-center lg:items-start">
                  {/* Foto de perfil */}
                  <div className="mb-6">
                    <div className="w-28 h-28 rounded-full bg-gray-700 overflow-hidden border-4 border-[#F25790] flex items-center justify-center">
                      {userName && isModel && (typeof window !== 'undefined') ? (
                        <img
                          src={JSON.parse(localStorage.getItem('user') || '{}').fotoPerfil || '/images/avatar-default.png'}
                          alt="Foto de perfil"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img src="/images/avatar-default.png" alt="Avatar" className="w-full h-full object-cover" />
                      )}
                    </div>
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 leading-tight">
                    Bem-vinda, <span className="text-[#F25790]">{userName}</span>!<br/>
                    Pronta para arrasar hoje?
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 leading-relaxed">
                    Acompanhe suas metas, fique online e aumente seus ganhos.<br className="hidden sm:block"/>
                    Aproveite as campanhas e dicas para se destacar ainda mais!
                  </p>
                  <div className="mb-8 lg:mb-0 w-full flex flex-col sm:flex-row gap-4 items-center lg:items-start justify-center lg:justify-start">
                    <button className="bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-3 sm:py-4 px-8 sm:px-10 rounded-full inline-block text-center transition-colors duration-200 text-sm sm:text-base">
                      Entrar ao Vivo
                    </button>
                    <Link href="/extrato" className="btn-secondary px-6 py-3 text-center">
                      Ver Extrato
                    </Link>
                    <button className="btn-secondary px-6 py-3 text-center">
                      Solicitar Saque
                    </button>
                  </div>
                </div>
                {/* Direita: Agenda, Feedbacks, Metas/Dicas/Campanhas */}
                <div className="flex-1 lg:max-w-xl flex flex-col gap-6 mt-10 lg:mt-0">
                  {/* Bloco Agenda */}
                  <div className="bg-gray-900/80 rounded-2xl p-6 shadow-lg mb-2">
                    <h2 className="text-lg font-bold mb-4 text-[#F25790] flex items-center gap-2">
                      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="inline-block"><path d="M8 7V3M16 7V3M3 11h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" stroke="#F25790" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Agenda
                    </h2>
                    {/* Mini calendário mock */}
                    <div className="flex gap-4 items-center mb-4">
                      <div className="bg-gray-800 rounded-lg p-3 text-center text-sm text-gray-300">
                        <div className="font-bold text-lg text-[#F25790]">JUL</div>
                        <div className="flex gap-1 mt-2">
                          <span className="bg-[#F25790] text-white rounded px-2">5</span>
                          <span className="bg-gray-700 text-gray-200 rounded px-2">7</span>
                          <span className="bg-gray-700 text-gray-200 rounded px-2">12</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        {compromissos.map((c, i) => (
                          <div key={i} className="flex items-center gap-2 mb-1 text-sm text-gray-200">
                            <span className="text-[#F25790] font-semibold">{c.data}</span>
                            <span>{c.tipo}</span>
                            <span className="text-gray-400">{c.hora}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button className="btn-secondary px-4 py-2 text-sm mt-2">Ver Agenda Completa</button>
                  </div>
                  {/* Bloco Feedbacks */}
                  <div className="bg-gray-900/80 rounded-2xl p-6 shadow-lg mb-2">
                    <h2 className="text-lg font-bold mb-4 text-[#F25790] flex items-center gap-2">
                      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="inline-block"><path d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2M12 15v.01M12 11v2m0 4a9 9 0 100-18 9 9 0 000 18z" stroke="#F25790" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Feedbacks Recentes
                    </h2>
                    <div className="flex flex-col gap-3">
                      {feedbacks.map((f, i) => (
                        <div key={i} className="flex items-center gap-3 bg-gray-800/60 rounded-lg p-3">
                          <img src={f.foto} alt={f.usuario} className="w-10 h-10 rounded-full object-cover border-2 border-[#F25790]" />
                          <div className="flex-1">
                            <Link href={f.perfil} className="text-[#F25790] font-semibold hover:underline">{f.usuario}</Link>
                            <div className="text-gray-200 text-sm">{f.texto}</div>
                          </div>
                          <span className="text-yellow-400 font-bold">★ {f.nota}</span>
                        </div>
                      ))}
                    </div>
                    <button className="btn-secondary px-4 py-2 text-sm mt-4">Ver Todos os Feedbacks</button>
                  </div>
                  {/* Bloco Metas/Dicas/Campanhas */}
                  <div className="bg-gray-900/80 rounded-2xl p-6 shadow-lg">
                    <div className="mb-3">
                      <h3 className="text-[#F25790] font-bold mb-1">Meta diária</h3>
                      <p className="text-white text-base">Faltam <span className="text-green-400">20 min</span> para bater sua meta e ganhar bônus!</p>
                    </div>
                    <div className="mb-3">
                      <h3 className="text-[#F25790] font-bold mb-1">Dica do dia</h3>
                      <p className="text-gray-200 text-base">Perfis com foto e descrição completa recebem até <span className="text-[#F25790] font-semibold">30% mais chamadas</span>.</p>
                    </div>
                    <div>
                      <h3 className="text-[#F25790] font-bold mb-1">Campanha ativa</h3>
                      <p className="text-gray-200 text-base">Bônus de <span className="text-green-400 font-semibold">10%</span> para quem ficar mais de 2h online hoje!</p>
                    </div>
                  </div>
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
      
      <div className="min-h-screen w-full bg-black text-white flex flex-col overflow-hidden" style={{ backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center 15%' }}>
        {/* Background Overlay com gradiente aprimorado - movido para cobrir toda a página */}
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/80 via-black/70 to-[#200310]/80 backdrop-blur-[2px]"></div>
        
        <div className="relative z-10 flex flex-col min-h-screen">
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
                        <div key={modelo.id} className="flex-shrink-0">
                          <ModelCard
                            model={{
                              id: modelo.id,
                              nome: modelo.nome,
                              fotoPerfil: modelo.fotoPerfil,
                              categorias: modelo.categorias,
                              online: modelo.online,
                              destacado: modelo.destacado,
                              avaliacoes: modelo.avaliacoes,
                              valorPorMinuto: modelo.valorPorMinuto,
                              chatPrivadoPreco: modelo.precoPrivado
                            }}
                            isLoggedIn={isLoggedIn}
                            favoriteModels={favoriteModels}
                            onToggleFavorite={handleToggleFavorite}
                            size="small"
                          />
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
