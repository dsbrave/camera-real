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
  valorPorMinuto: number; // Chat simples sempre 1 crédito
  chatPrivadoPreco: number; // Chat privado de 1-5 créditos
  tipo: 'mulher' | 'homem' | 'casal' | 'trans';
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

  // Lista completa de modelos com novos preços
  const todosModelos: Modelo[] = [
    {
      id: 'm1',
      nome: 'Luna Silva',
      fotoPerfil: '/images/high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_ko2t9z7547m30wzu3dsv_1.png',
      categorias: ['conversa', 'dança'],
      online: true,
      destacado: true,
      avaliacoes: 4.8,
      valorPorMinuto: 1,
      chatPrivadoPreco: 2,
      tipo: 'mulher'
    },
    {
      id: 'm2',
      nome: 'Scarlett Moraes',
      fotoPerfil: '/images/high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_2wu5n7gdr6dsrmj98ak9_2.png',
      categorias: ['conversa', 'música'],
      online: false,
      destacado: false,
      avaliacoes: 4.5,
      valorPorMinuto: 1,
      chatPrivadoPreco: 2,
      tipo: 'mulher'
    },
    {
      id: 'm3',
      nome: 'Valentina Costa',
      fotoPerfil: '/images/high-resolution_studio_photo_of_a_confident_brazilian-inspired_model_wearing_an_elegant_black_lace__i7mo7j07sng27o0fv86l_2.png',
      categorias: ['conversa', 'arte'],
      online: true,
      destacado: false,
      avaliacoes: 4.6,
      valorPorMinuto: 1,
      chatPrivadoPreco: 3,
      tipo: 'mulher'
    },
    {
      id: 'm4',
      nome: 'Sophia Reis',
      fotoPerfil: '/images/high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_2wu5n7gdr6dsrmj98ak9_2.png',
      categorias: ['conversa', 'artes'],
      online: true,
      destacado: true,
      avaliacoes: 4.7,
      valorPorMinuto: 1,
      chatPrivadoPreco: 3,
      tipo: 'mulher'
    },
    {
      id: 'm5',
      nome: 'Isabella Santos',
      fotoPerfil: '/images/high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_jdasqbio3vvca5k92ebh_2.png',
      categorias: ['conversa', 'fitness'],
      online: false,
      destacado: false,
      avaliacoes: 4.4,
      valorPorMinuto: 1,
      chatPrivadoPreco: 2,
      tipo: 'mulher'
    },
    {
      id: 'm6',
      nome: 'Lara Ferreira',
      fotoPerfil: '/images/high-resolution_studio_photo_of_a_confident_brazilian-inspired_model_wearing_an_elegant_black_lace__i7mo7j07sng27o0fv86l_3.png',
      categorias: ['conversa', 'culinária'],
      online: true,
      destacado: false,
      avaliacoes: 4.3,
      valorPorMinuto: 1,
      chatPrivadoPreco: 2,
      tipo: 'mulher'
    },
    {
      id: 'm7',
      nome: 'Mia Oliveira',
      fotoPerfil: '/images/high-resolution_studio_photo_of_a_confident_brazilian-inspired_model_wearing_an_elegant_black_lace__i7mo7j07sng27o0fv86l_2.png',
      categorias: ['conversa', 'jogos'],
      online: true,
      destacado: true,
      avaliacoes: 4.9,
      valorPorMinuto: 1,
      chatPrivadoPreco: 4,
      tipo: 'mulher'
    },
    {
      id: 'm8',
      nome: 'Diego Fire',
      fotoPerfil: '/images/realistic_photo_of_a_brazilian_latino_man_with_everyday_natural_looks__regular_including_body_diver_ecf9z2bp6ac4zulo1fmw_3.png',
      categorias: ['conversa', 'fitness'],
      online: true,
      destacado: true,
      avaliacoes: 4.6,
      valorPorMinuto: 1,
      chatPrivadoPreco: 3,
      tipo: 'homem'
    },
    {
      id: 'm9',
      nome: 'Luna & Diego',
      fotoPerfil: '/images/realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_beauty_real-life__b3uv0efkhgp35404n7ab_0.png',
      categorias: ['conversa', 'casal'],
      online: true,
      destacado: true,
      avaliacoes: 4.8,
      valorPorMinuto: 1,
      chatPrivadoPreco: 5,
      tipo: 'casal'
    },
    {
      id: 'm10',
      nome: 'Jade Almeida',
      fotoPerfil: '/images/high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_zg1iy2w7g4x4j2pm3925_0.png',
      categorias: ['conversa', 'arte'],
      online: true,
      destacado: true,
      avaliacoes: 4.7,
      valorPorMinuto: 1,
      chatPrivadoPreco: 3,
      tipo: 'trans'
    },
    {
      id: 'm11',
      nome: 'Lucas Steel',
      fotoPerfil: '/images/realistic_photo_of_a_brazilian_latino_man_with_everyday_natural_looks__regular_including_body_diver_ahdu5rvu1ocli3txwuq6_1.png',
      categorias: ['conversa', 'música'],
      online: false,
      destacado: false,
      avaliacoes: 4.2,
      valorPorMinuto: 1,
      chatPrivadoPreco: 2,
      tipo: 'homem'
    },
    {
      id: 'm12',
      nome: 'Bella & Rafael',
      fotoPerfil: '/images/realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_beauty_real-life__cd6lq4r3sp44ox2d43bc_3.png',
      categorias: ['conversa', 'casal'],
      online: false,
      destacado: false,
      avaliacoes: 4.5,
      valorPorMinuto: 1,
      chatPrivadoPreco: 4,
      tipo: 'casal'
    },
    {
      id: 'm13',
      nome: 'Rafael King',
      fotoPerfil: '/images/realistic_photo_of_a_brazilian_latino_man_with_everyday_natural_looks__regular_including_body_diver_bk3xzapp8bfl1f6z0o1a_0.png',
      categorias: ['conversa', 'esportes'],
      online: true,
      destacado: false,
      avaliacoes: 4.3,
      valorPorMinuto: 1,
      chatPrivadoPreco: 3,
      tipo: 'homem'
    },
    {
      id: 'm14',
      nome: 'Mia & Lucas',
      fotoPerfil: '/images/realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_beauty_real-life__wi4ecukg5q3clcziptks_0.png',
      categorias: ['conversa', 'entretenimento'],
      online: true,
      destacado: false,
      avaliacoes: 4.4,
      valorPorMinuto: 1,
      chatPrivadoPreco: 4,
      tipo: 'casal'
    },
    {
      id: 'm15',
      nome: 'Bruno Wolf',
      fotoPerfil: '/images/realistic_photo_of_a_brazilian_latino_man_with_everyday_natural_looks__regular_including_body_diver_57c32r6blmkzgrl282d1_1.png',
      categorias: ['conversa', 'arte'],
      online: false,
      destacado: false,
      avaliacoes: 4.1,
      valorPorMinuto: 1,
      chatPrivadoPreco: 2,
      tipo: 'homem'
    },
    {
      id: 'm16',
      nome: 'Jade & Bruno',
      fotoPerfil: '/images/realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_beauty_real-life__tuqx4h29gu7wo0b1fr92_3.png',
      categorias: ['conversa', 'música'],
      online: true,
      destacado: false,
      avaliacoes: 4.6,
      valorPorMinuto: 1,
      chatPrivadoPreco: 3,
      tipo: 'casal'
    },
    {
      id: 't1',
      nome: 'Kiara Lima',
      fotoPerfil: '/images/high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_r68jd84c1uv21o2ehzgj_3.png',
      categorias: ['conversa', 'dança'],
      online: true,
      destacado: false,
      avaliacoes: 4.5,
      valorPorMinuto: 1,
      chatPrivadoPreco: 3,
      tipo: 'trans'
    },
    {
      id: 't2',
      nome: 'Bella Martins',
      fotoPerfil: '/images/high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_jdasqbio3vvca5k92ebh_2.png',
      categorias: ['conversa', 'música'],
      online: false,
      destacado: false,
      avaliacoes: 4.3,
      valorPorMinuto: 1,
      chatPrivadoPreco: 2,
      tipo: 'trans'
    },
    {
      id: 't3',
      nome: 'Yasmin Rocha',
      fotoPerfil: '/images/high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_hgg1km82rvo2tgmhd39a_3.png',
      categorias: ['conversa', 'arte'],
      online: true,
      destacado: false,
      avaliacoes: 4.6,
      valorPorMinuto: 1,
      chatPrivadoPreco: 4,
      tipo: 'trans'
    },
    {
      id: 't4',
      nome: 'Camila Fox',
      fotoPerfil: '/images/high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_bwiwj44iuhfpxz2tlzha_1.png',
      categorias: ['conversa', 'fitness'],
      online: true,
      destacado: false,
      avaliacoes: 4.4,
      valorPorMinuto: 1,
      chatPrivadoPreco: 3,
      tipo: 'trans'
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
  const modelosFiltrados = todosModelos
    .filter(modelo => {
      // Filtro de pesquisa por nome
      const pesquisaMatch = modelo.nome.toLowerCase().includes(pesquisa.toLowerCase());
      
      // Filtro de categoria
      let categoriaMatch = true;
      if (filtroCategoria === 'destaque') {
        categoriaMatch = modelo.destacado;
      } else if (filtroCategoria === 'mulheres') {
        categoriaMatch = modelo.tipo === 'mulher';
      } else if (filtroCategoria === 'homens') {
        categoriaMatch = modelo.tipo === 'homem';
      } else if (filtroCategoria === 'casais') {
        categoriaMatch = modelo.tipo === 'casal';
      } else if (filtroCategoria === 'trans') {
        categoriaMatch = modelo.tipo === 'trans';
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
