import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ModelProfileModal from '@/components/ModelProfileModal';
import ModelCard from '@/components/ModelCard';

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
  const [favoriteModels, setFavoriteModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<Modelo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Verificar se o usuário está logado ao carregar a página
  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      try {
        const userData = JSON.parse(userStorage);
        setIsLoggedIn(!!userData.isLoggedIn);
        
        // Carregar favoritos do localStorage
        const favorites = JSON.parse(localStorage.getItem('favoriteModels') || '[]');
        const favoriteIds = favorites.map((fav: any) => fav.id);
        setFavoriteModels(favoriteIds);
      } catch (error) {
        console.error('Erro ao verificar login:', error);
      }
    }
  }, []);

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
      nome: 'Bianca',
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

  const handleOpenModal = (modelo: Modelo) => {
    setSelectedModel(modelo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedModel(null);
  };

  return (
    <>
      <Head>
        <title>Explorar Modelos | Camera Real</title>
        <meta name="description" content="Encontre os melhores modelos para conversar em tempo real" />
      </Head>

      <div className="min-h-screen text-white bg-black">
        <Header />
        
        <div className="pt-8 pb-8 px-4 content-after-header">
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
            <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto">
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
                    <div key={modelo.id} className="flex-shrink-0">
                      <ModelCard
                        model={modelo}
                        isLoggedIn={isLoggedIn}
                        favoriteModels={favoriteModels}
                        onToggleFavorite={handleToggleFavorite}
                        onOpenModal={handleOpenModal}
                        size="medium"
                      />
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
        
        {/* Modal de Perfil da Modelo */}
        {selectedModel && (
          <ModelProfileModal 
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            model={selectedModel}
          />
        )}
      </div>
    </>
  );
}
