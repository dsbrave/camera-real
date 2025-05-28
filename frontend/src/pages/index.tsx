import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Modelo {
  id: string;
  nome: string;
  fotoPerfil?: string;
  categorias: string[];
  online: boolean;
  destacado: boolean;
  avaliacoes: number;
  valorPorMinuto: number;
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  
  useEffect(() => {
    // Função para verificar login
    const checkLogin = () => {
      try {
        const userStorage = localStorage.getItem('user');
        if (userStorage) {
          const user = JSON.parse(userStorage);
          setIsLoggedIn(!!user.isLoggedIn);
          if (user.isLoggedIn && user.name) {
            setUserName(user.name);
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
    checkLogin();
    // Adiciona eventListener para mudanças no localStorage (logout em qualquer aba)
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  // Modelos em destaque (mesmos dados da página explorar)
  const modelosDestaque: Modelo[] = [
    {
      id: 'm1',
      nome: 'Ana Silva',
      fotoPerfil: '/images/high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_ko2t9z7547m30wzu3dsv_1.png',
      categorias: ['conversa', 'dança'],
      online: true,
      destacado: true,
      avaliacoes: 4.8,
      valorPorMinuto: 2.5
    },
    {
      id: 'm4',
      nome: 'Marina Pereira',
      fotoPerfil: '/images/high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_2wu5n7gdr6dsrmj98ak9_2.png',
      categorias: ['conversa', 'artes'],
      online: true,
      destacado: true,
      avaliacoes: 4.7,
      valorPorMinuto: 2.2
    },
    {
      id: 'm7',
      nome: 'Fernanda Lima',
      fotoPerfil: '/images/high-resolution_studio_photo_of_a_confident_brazilian-inspired_model_wearing_an_elegant_black_lace__i7mo7j07sng27o0fv86l_2.png',
      categorias: ['conversa', 'jogos'],
      online: true,
      destacado: true,
      avaliacoes: 4.9,
      valorPorMinuto: 3.2
    }
  ];

  // Definir a imagem de fundo baseada no status de login
  const backgroundImage = isLoggedIn 
    ? "url('/images/intimate_abstract_neon-lit_room_designed_for_cam_girls_and_digital_content_creators_no_models_no_be_ciz4ls7h0mms3epzpkxr_1.png')" // Imagem do quarto para usuários logados
    : "url('/images/high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_l1g01p6hm0p1kyxw2q42_0.png')"; // Imagem da modelo para usuários deslogados

  return (
    <>
      <Head>
        <title>Camera Real - Plataforma de Videochat</title>
        <meta name="description" content="A melhor plataforma de videochat ao vivo. Converse com modelos em tempo real." />
      </Head>
      
      <div className="min-h-screen bg-black text-white" style={{ backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center 15%', transform: 'scaleX(-1)' }}>
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>
        
        <div className="relative z-10" style={{ transform: 'scaleX(-1)' }}> {/* Contra-flipa os elementos para ficarem corretos */}
          <Header />
          <div className="h-10 sm:h-16 md:h-20" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 z-10 relative">
            {isLoggedIn ? (
              // Layout para usuários logados - texto à esquerda, carrossel à direita
              <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 xl:gap-12">
                {/* Seção de texto à esquerda */}
                <div className="flex-1 lg:max-w-xl text-center lg:text-left">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 leading-tight">
                    Olá <span className="text-[#F25790]">João</span>!<br/>
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
                    <Image 
                      src="/icons/toggle/star.svg"
                      alt="Estrela"
                      width={24}
                      height={24}
                      className="w-6 h-6 text-white filter invert"
                    />
                    <span className="text-white">Modelos em Destaque</span>
                  </h2>
                  
                  <div className="overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <div className="flex gap-4 pb-4 min-w-max">
                      {modelosDestaque.slice(0, 2).map(modelo => (
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
                              <div className="bg-gradient-to-r from-[#F25790] to-[#d93d75] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#FCD34D" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FCD34D" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25l-5.197 3.102 1.4-5.92-4.203-3.632 5.962-.513L12 4l2.038 6.287 5.962.513-4.203 3.632 1.4 5.92z" />
</svg> 
                                DESTAQUE
                              </div>
                              <div className="flex items-center gap-1.5 px-4 py-1 rounded-full backdrop-blur-md bg-green-500/20 border border-green-400/30">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                                <span className="text-xs font-medium text-green-300">Online</span>
                              </div>
                            </div>
                            
                            {/* Nome e avaliação */}
                            <div className="absolute bottom-3 left-3 right-3">
                              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 drop-shadow-lg">{modelo.nome}</h3>
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

                            {/* Botão Ver Perfil */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center group-hover:backdrop-blur-sm">
                              <button className="bg-gradient-to-r from-[#F25790] to-[#d93d75] text-white px-4 py-2 rounded-lg font-medium text-sm hover:scale-105 transition-all duration-200 shadow-lg">
                                Ver Perfil
                              </button>
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
                              <div className="text-[#F25790] font-bold text-base drop-shadow">
                                {modelo.valorPorMinuto.toFixed(0)} <span className="text-xs text-white/70">Créditos/min</span>
                              </div>
                              <Link href={`/chat-video?id=${modelo.id}`}>
                                <button className="bg-gradient-to-r from-[#F25790] to-[#d93d75] hover:from-[#d93d75] hover:to-[#c12d65] text-white font-medium py-1.5 px-4 rounded-full text-xs transition-all duration-300 hover:shadow-lg hover:shadow-[#F25790]/25 backdrop-blur-sm">
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
                </div>
              </div>
            ) : (
              // Layout para usuários não logados - centralizado
              <div className="flex justify-center lg:justify-start">
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
      </div>
    </>
  );
}
