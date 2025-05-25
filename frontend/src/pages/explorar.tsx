import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
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
  idade?: number;
  localizacao?: string;
}

export default function Explorar() {
  const [filtroCategoria, setFiltroCategoria] = useState('destaque');
  const [pesquisa, setPesquisa] = useState('');
  const [ordenarPor, setOrdenarPor] = useState('popularidade');
  const [apenasOnline, setApenasOnline] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verificar se o usuário está logado ao carregar a página
  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      try {
        const userData = JSON.parse(userStorage);
        setIsLoggedIn(!!userData.isLoggedIn);
      } catch (error) {
        console.error('Erro ao verificar login:', error);
      }
    }
  }, []);

  // Dados de exemplo
  const modelos: Modelo[] = [
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
      id: 'm2',
      nome: 'Júlia Santos',
      fotoPerfil: '/images/high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_hgg1km82rvo2tgmhd39a_3.png',
      categorias: ['conversa', 'música'],
      online: true,
      destacado: false,
      avaliacoes: 4.6,
      valorPorMinuto: 2.0
    },
    {
      id: 'm3',
      nome: 'Carla Oliveira',
      fotoPerfil: '/images/high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_xcuvvf5mb98aiguyg0ar_3.png',
      categorias: ['dança', 'fitness'],
      online: false,
      destacado: false,
      avaliacoes: 4.9,
      valorPorMinuto: 3.0
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
      id: 'm5',
      nome: 'Larissa Costa',
      fotoPerfil: '/images/high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_pbqy208mxdxlbokwwd6m_1.png',
      categorias: ['música', 'jogos'],
      online: false,
      destacado: false,
      avaliacoes: 4.5,
      valorPorMinuto: 1.8
    },
    {
      id: 'm6',
      nome: 'Natália Souza',
      fotoPerfil: '/images/high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_8dcmfx9cfacmkla3y56r_3.png',
      categorias: ['fitness', 'conversa'],
      online: true,
      destacado: false,
      avaliacoes: 4.4,
      valorPorMinuto: 2.1
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
    },
    {
      id: 'm8',
      nome: 'Camila Mendes',
      fotoPerfil: '/images/high-resolution_studio_photo_of_a_confident_brazilian-inspired_model_wearing_an_elegant_black_lace__qxnhg17arbpzwvqdae8r_1.png',
      categorias: ['artes', 'música'],
      online: false,
      destacado: false,
      avaliacoes: 4.3,
      valorPorMinuto: 1.9
    }
  ];

  const categorias = [
    { id: 'destaque', nome: 'Em Destaque' },
    { id: 'mulheres', nome: 'Mulheres' },
    { id: 'homens', nome: 'Homens' },
    { id: 'casais', nome: 'Casais' },
    { id: 'trans', nome: 'Trans' }
  ];

  // Filtrar e ordenar modelos
  const modelosFiltrados = modelos
    .filter(modelo => {
      // Filtro de pesquisa por nome
      const pesquisaMatch = modelo.nome.toLowerCase().includes(pesquisa.toLowerCase());
      
      // Filtro de categoria
      let categoriaMatch = true;
      if (filtroCategoria === 'destaque') {
        categoriaMatch = modelo.destacado;
      } else if (filtroCategoria === 'mulheres') {
        categoriaMatch = modelo.categorias.includes('mulher') || modelo.categorias.includes('conversa');
      } else if (filtroCategoria === 'homens') {
        categoriaMatch = modelo.categorias.includes('homem');
      } else if (filtroCategoria === 'casais') {
        categoriaMatch = modelo.categorias.includes('casal');
      } else if (filtroCategoria === 'trans') {
        categoriaMatch = modelo.categorias.includes('trans');
      }
      
      // Filtro de status online
      const onlineMatch = !apenasOnline || modelo.online;
      
      return pesquisaMatch && categoriaMatch && onlineMatch;
    })
    .sort((a, b) => {
      // Ordenação
      if (ordenarPor === 'popularidade') {
        return b.avaliacoes - a.avaliacoes;
      } else if (ordenarPor === 'preço-menor') {
        return a.valorPorMinuto - b.valorPorMinuto;
      } else if (ordenarPor === 'preço-maior') {
        return b.valorPorMinuto - a.valorPorMinuto;
      }
      return 0;
    });

  // Destacar modelos no topo
  const modelosDestacados = modelosFiltrados.filter(modelo => modelo.destacado);
  const modelosRegulares = modelosFiltrados.filter(modelo => !modelo.destacado);
  const modelosOrdenados = [...modelosDestacados, ...modelosRegulares];

  return (
    <>
      <Head>
        <title>Explorar Modelos | Camera Real</title>
        <meta name="description" content="Encontre os melhores modelos para conversar em tempo real" />
      </Head>

      <div className="min-h-screen text-white bg-black">
        <Header />
        
        <div className="pt-16 pb-12 px-4 content-after-header">
          <div className="container mx-auto flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-8 text-center text-white">Explore Modelos</h1>
            
            {/* Barra de pesquisa */}
            <div className="w-full max-w-md mx-auto mb-6 relative">
              <input
                type="text"
                className="w-full bg-black bg-opacity-70 border border-gray-700 rounded-full py-3 px-5 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-transparent"
                placeholder="Buscar modelos"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
            </div>
            
            {/* Categorias */}
            <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-4xl mx-auto">
              {categorias.map((categoria) => (
                <button
                  key={categoria.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${filtroCategoria === categoria.id ? 'bg-[#F25790] text-white' : 'bg-black bg-opacity-70 border border-gray-700 text-white hover:bg-opacity-90 hover:border-[#F25790] transition-colors'}`}
                  onClick={() => setFiltroCategoria(categoria.id)}
                >
                  {categoria.nome}
                </button>
              ))}
            </div>
            
            {/* Lista de modelos */}
            {modelosFiltrados.length > 0 ? (
              <div className="w-full">
                <div className="flex overflow-x-auto scrollbar-hide gap-6 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {modelosFiltrados.map(modelo => (
                    <div 
                      key={modelo.id} 
                      className="flex-shrink-0 w-64 sm:w-72 bg-gradient-to-br from-[#F25790]/10 via-purple-500/5 to-blue-500/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:from-[#F25790]/15 hover:via-purple-500/10 hover:to-blue-500/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/20 hover:border-[#F25790]/50"
                    >
                      <div className="relative h-64 sm:h-80 bg-gradient-to-br from-black/30 to-black/50">
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
                        <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
                          {modelo.destacado && (
                            <div className="bg-gradient-to-r from-[#F25790] to-[#d93d75] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M15.75 4.5c0-1.38-1.12-2.5-2.5-2.5s-2.5 1.12-2.5 2.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5Z" />
                              </svg>
                              DESTAQUE
                            </div>
                          )}
                          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border ${modelo.online ? 'bg-green-500/20 border-green-400/30' : 'bg-red-500/20 border-red-400/30'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${modelo.online ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                            <span className={`text-xs font-medium ${modelo.online ? 'text-green-300' : 'text-red-300'}`}>
                              {modelo.online ? 'Online' : 'Offline'}
                            </span>
                          </div>
                        </div>
                        
                        {/* Nome e avaliação */}
                        <div className="absolute bottom-3 left-3 right-3">
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words truncate max-w-[120px]">{modelo.nome}</h2>
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
                            <p className="text-gray-400 text-sm break-words truncate max-w-[120px]">{modelo.idade ? `${modelo.idade} anos` : ''} {modelo.localizacao ? `• ${modelo.localizacao}` : ''}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 sm:p-5 bg-gradient-to-br from-white/5 via-white/3 to-transparent backdrop-blur-sm">
                        {/* Categorias */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {modelo.categorias.slice(0, 2).map((categoria, index) => (
                            <span 
                              key={index} 
                              className="text-xs bg-white/10 backdrop-blur-sm border border-white/20 px-2.5 py-1 rounded-full text-white/90 font-medium break-words truncate max-w-[80px]"
                            >
                              {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                            </span>
                          ))}
                        </div>
                        
                        {/* Preço e botão lado a lado */}
                        <div className="flex items-center justify-between">
                          <div className="text-[#F25790] font-bold text-lg drop-shadow">
                            {modelo.valorPorMinuto.toFixed(0)} <span className="text-sm text-white/70">ChatCoins/min</span>
                          </div>
                          <Link href={`/chat-video?id=${modelo.id}`}>
                            <button className="bg-gradient-to-r from-[#F25790] to-[#d93d75] hover:from-[#d93d75] hover:to-[#c12d65] text-white font-medium py-2 px-5 rounded-full text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#F25790]/25 backdrop-blur-sm">
                              Conversar
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Indicador de scroll */}
                <div className="flex justify-center mt-6">
                  <div className="text-sm text-gray-400 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>
                    Deslize para ver mais modelos
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">Nenhum modelo encontrado</h3>
                <p className="text-gray-400">Tente outro termo de pesquisa ou filtro.</p>
              </div>
            )}
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}
