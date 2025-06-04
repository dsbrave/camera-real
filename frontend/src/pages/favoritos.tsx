import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ModelProfileModal from '@/components/ModelProfileModal';
import ModelCard from '@/components/ModelCard';

interface FavoriteModel {
  id: string;
  name: string;
  online: boolean;
  lastSeen: Date;
  category: string;
  photo?: string;
  rating: number;
  pricePerMinute: number;
}

export default function Favoritos() {
  const router = useRouter();
  const [favoriteModels, setFavoriteModels] = useState<FavoriteModel[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Verificar se o usuário está logado
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      try {
        const userData = JSON.parse(userStorage);
        if (userData.isLoggedIn) {
          setIsLoggedIn(true);
          // Carregar favoritos do localStorage
          const favorites = JSON.parse(localStorage.getItem('favoriteModels') || '[]');
          setFavoriteModels(favorites);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleOpenModal = (model: FavoriteModel) => {
    // Converter o modelo favorito para o formato esperado pelo modal
    const modelForModal = {
      id: model.id,
      nome: model.name,
      fotoPerfil: model.photo,
      categorias: [model.category],
      online: model.online,
      destacado: false,
      avaliacoes: model.rating,
      valorPorMinuto: model.pricePerMinute,
      idade: undefined,
      localizacao: undefined
    };
    setSelectedModel(modelForModal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedModel(null);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      return 'Agora mesmo';
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hora' : 'horas'} atrás`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} ${diffDays === 1 ? 'dia' : 'dias'} atrás`;
    }
  };

  const handleToggleFavorite = (model: any) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteModels') || '[]');
    const isFavorite = favorites.some((fav: any) => fav.id === model.id);
    
    if (isFavorite) {
      // Remover dos favoritos
      const updatedFavorites = favorites.filter((fav: any) => fav.id !== model.id);
      localStorage.setItem('favoriteModels', JSON.stringify(updatedFavorites));
      setFavoriteModels(updatedFavorites);
    } else {
      // Adicionar aos favoritos (caso não esteja)
      const favoriteModel = {
        id: model.id,
        name: model.nome || model.name,
        online: model.online,
        lastSeen: new Date(),
        category: model.categorias?.[0] || model.category || 'Conversa',
        photo: model.fotoPerfil || model.photo,
        rating: model.avaliacoes || model.rating || 4.5,
        pricePerMinute: model.valorPorMinuto || model.pricePerMinute || 0,
        destacado: model.destacado || false
      };
      const updatedFavorites = [...favorites, favoriteModel];
      localStorage.setItem('favoriteModels', JSON.stringify(updatedFavorites));
      setFavoriteModels(updatedFavorites);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Modelos Favoritos | Camera Real</title>
        <meta name="description" content="Seus modelos favoritos na Camera Real" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Header />
        
        <main className="px-3 sm:px-4 pt-16 sm:pt-20 pb-6 sm:pb-8">
          <div className="max-w-7xl mx-auto">
            {/* Header da página */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Link href="/painel-usuario" className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                  <Image 
                    src="/icons/navigation/arrow_back.svg"
                    alt="Voltar"
                    width={24}
                    height={24}
                    className="w-6 h-6 filter brightness-0 invert"
                  />
                </Link>
                <h1 className="text-3xl font-bold">Modelos Favoritos</h1>
              </div>
              <p className="text-gray-400">
                {favoriteModels.length > 0 
                  ? `Você tem ${favoriteModels.length} ${favoriteModels.length === 1 ? 'modelo favorito' : 'modelos favoritos'}`
                  : 'Você ainda não tem modelos favoritos'
                }
              </p>
            </div>

            {favoriteModels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteModels.map(model => (
                  <ModelCard
                    key={model.id}
                    model={model}
                    isLoggedIn={isLoggedIn}
                    favoriteModels={favoriteModels.map(m => m.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onOpenModal={handleOpenModal}
                    size="medium"
                  />
                ))}
              </div>
            ) : (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
                <div className="p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Image 
                    src="/icons/action/favorite_border.svg"
                    alt="Sem favoritos"
                    width={32}
                    height={32}
                    className="w-8 h-8 filter brightness-0 invert"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Nenhum favorito ainda</h3>
                <p className="text-gray-400 mb-6">Explore nossos modelos e adicione seus favoritos</p>
                <Link href="/explorar" className="bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-3 px-8 rounded-xl transition-colors inline-block">
                  Explorar Modelos
                </Link>
              </div>
            )}
          </div>
        </main>
        
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