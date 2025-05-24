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
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
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
      fotoPerfil: '/images/Tutto Ricco - Pride Month 1.png',
      categorias: ['conversa', 'dança'],
      online: true,
      destacado: true,
      avaliacoes: 4.8,
      valorPorMinuto: 2.5
    },
    {
      id: 'm2',
      nome: 'Júlia Santos',
      fotoPerfil: '/images/Tutto Ricco - Alone Time 1.png',
      categorias: ['conversa', 'música'],
      online: true,
      destacado: false,
      avaliacoes: 4.6,
      valorPorMinuto: 2.0
    },
    {
      id: 'm3',
      nome: 'Carla Oliveira',
      fotoPerfil: '/images/Open Doodles - Loving 1.png',
      categorias: ['dança', 'fitness'],
      online: false,
      destacado: false,
      avaliacoes: 4.9,
      valorPorMinuto: 3.0
    },
    {
      id: 'm4',
      nome: 'Marina Pereira',
      fotoPerfil: '/images/Tutto Ricco - Walking In the Park 1.png',
      categorias: ['conversa', 'artes'],
      online: true,
      destacado: true,
      avaliacoes: 4.7,
      valorPorMinuto: 2.2
    },
    {
      id: 'm5',
      nome: 'Larissa Costa',
      fotoPerfil: '/images/Open Doodles - Coffee 1.png',
      categorias: ['música', 'jogos'],
      online: false,
      destacado: false,
      avaliacoes: 4.5,
      valorPorMinuto: 1.8
    },
    {
      id: 'm6',
      nome: 'Natália Souza',
      fotoPerfil: '/images/Open Doodles - Meditating 1.png',
      categorias: ['fitness', 'conversa'],
      online: true,
      destacado: false,
      avaliacoes: 4.4,
      valorPorMinuto: 2.1
    },
    {
      id: 'm7',
      nome: 'Fernanda Lima',
      fotoPerfil: '/images/Open Doodles - Studying 1.png',
      categorias: ['conversa', 'jogos'],
      online: true,
      destacado: true,
      avaliacoes: 4.9,
      valorPorMinuto: 3.2
    },
    {
      id: 'm8',
      nome: 'Camila Mendes',
      fotoPerfil: '/images/Tutto Ricco - Layered Flower 1.png',
      categorias: ['artes', 'música'],
      online: false,
      destacado: false,
      avaliacoes: 4.3,
      valorPorMinuto: 1.9
    }
  ];

  const categorias = [
    { id: 'todas', nome: 'Todas' },
    { id: 'hétero', nome: 'Hétero' },
    { id: 'travesti', nome: 'Travesti' },
    { id: 'gay', nome: 'Gay' },
    { id: 'peitos-grandes', nome: 'Peitos Grandes' },
    { id: 'bunda-grande', nome: 'Bunda Grande' },
    { id: 'asiática', nome: 'Asiática' },
    { id: 'latina', nome: 'Latina' },
    { id: 'loira', nome: 'Loira' },
    { id: 'fetiche', nome: 'Fetiche' }
  ];

  // Filtrar e ordenar modelos
  const modelosFiltrados = modelos
    .filter(modelo => {
      // Filtro de pesquisa por nome
      const pesquisaMatch = modelo.nome.toLowerCase().includes(pesquisa.toLowerCase());
      
      // Filtro de categoria
      const categoriaMatch = filtroCategoria === 'todas' || modelo.categorias.includes(filtroCategoria);
      
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

      <div className="min-h-screen text-white page-with-bg-image" style={{ background: 'linear-gradient(135deg, #1a0033 0%, #330033 50%, #220022 100%)' }}>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {modelosFiltrados.map(modelo => (
                  <div 
                    key={modelo.id} 
                    className="bg-black border border-gray-800 rounded-xl overflow-hidden hover:border-[#F25790] transition-all hover:shadow-lg hover:shadow-[#F25790]/20"
                  >
                    <div className="relative aspect-[3/4] bg-black">
                      {/* Sem imagem - fundo preto conforme solicitado */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00000090] via-transparent to-[#00000060] z-10"></div>
                      
                      {modelo.destacado && (
                        <div className="absolute top-3 left-3 bg-[#F25790] text-white text-xs font-bold px-2 py-1 rounded z-20">
                          DESTAQUE
                        </div>
                      )}
                      
                      <div className={`absolute top-3 right-3 flex items-center z-20 ${modelo.online ? 'text-green-500' : 'text-gray-500'}`}>
                        <div className={`w-3 h-3 rounded-full mr-1 ${modelo.online ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        <span className="text-xs font-medium">{modelo.online ? 'Online' : 'Offline'}</span>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                        <h3 className="text-xl font-bold text-white mb-1">{modelo.nome}</h3>
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(modelo.avaliacoes) ? 'text-yellow-400' : 'text-gray-500'}`} 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-1 text-sm">{modelo.avaliacoes}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {modelo.categorias.map((categoria, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-black border border-gray-800 px-2 py-1 rounded-full"
                          >
                            {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-col space-y-3">
                        <div className="text-[#F25790] font-bold">
                          R$ {modelo.valorPorMinuto.toFixed(2)}/min
                        </div>
                        <Link href={`/chat-video?id=${modelo.id}`} className="w-full">
                          <button className="bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-2 px-4 rounded-full text-sm transition-colors w-full">Conversar</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-block p-4 rounded-full bg-white bg-opacity-10 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Nenhum modelo encontrado</h3>
                <p className="text-gray-400">Tente outro termo de pesquisa ou filtro.</p>
              </div>
            )}
            
            {/* Paginação */}
            <div className="mt-10 flex justify-center">
              <div className="flex space-x-2">
                <button className="w-10 h-10 rounded-full bg-black bg-opacity-70 border border-gray-700 flex items-center justify-center text-white hover:bg-opacity-90 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-[#F25790] text-white flex items-center justify-center">1</button>
                <button className="w-10 h-10 rounded-full bg-black bg-opacity-70 border border-gray-700 flex items-center justify-center text-white hover:bg-opacity-90 hover:border-[#F25790] transition-colors">2</button>
                <button className="w-10 h-10 rounded-full bg-black bg-opacity-70 border border-gray-700 flex items-center justify-center text-white hover:bg-opacity-90 hover:border-[#F25790] transition-colors">3</button>
                <button className="w-10 h-10 rounded-full bg-black bg-opacity-70 border border-gray-700 flex items-center justify-center text-white hover:bg-opacity-90 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}
