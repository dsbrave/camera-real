import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserAvatar from "@/components/UserAvatar";

interface ProfileData {
  id: string;
  name: string;
  username?: string;
  email?: string;
  photo?: string;
  bio?: string;
  type: 'model' | 'user';
  
  // Dados específicos de modelos
  online?: boolean;
  categories?: string[];
  rating?: number;
  pricePerMinute?: number;
  privateCallPrice?: number;
  age?: number;
  location?: string;
  featured?: boolean;
  
  // Dados específicos de usuários
  credits?: number;
  followers?: number;
  following?: number;
  badge?: number;
  totalPoints?: number;
  
  // Dados sociais
  joinDate?: string;
  lastActive?: string;
  profileViews?: number;
  
  // Estatísticas
  totalChats?: number;
  totalSpent?: number;
  favoriteCount?: number;
}

export default function PerfilDinamico() {
  const router = useRouter();
  const { id } = router.query;
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Sistema de badges
  const badgeSystem = [
    { level: 0, name: "Bronze", icon: "/icons/Vector.svg", color: "#6E4D25" },
    { level: 1, name: "Prata", icon: "/icons/Vector.svg", color: "#C0C0C0" },
    { level: 2, name: "Ouro", icon: "/icons/Vector.svg", color: "#DAA520" },
    { level: 3, name: "Platina", icon: "/icons/Vector.svg", color: "#E5E4E2" },
    { level: 4, name: "Diamante", icon: "/icons/Vector.svg", color: "#B9F2FF" }
  ];

  // Mock de dados de perfis (em produção, isso viria de uma API)
  const mockProfiles: { [key: string]: ProfileData } = {
    'm1': {
      id: 'm1',
      name: 'Luna Silva',
      username: 'luna_silva',
      email: 'luna@camerareal.com',
      photo: '/images/high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_ko2t9z7547m30wzu3dsv_1.png',
      bio: 'Modelo profissional apaixonada por dança e conversas interessantes. Adoro conhecer pessoas novas e compartilhar momentos únicos! 💃✨',
      type: 'model',
      online: true,
      categories: ['conversa', 'dança', 'música'],
      rating: 4.8,
      pricePerMinute: 1,
      privateCallPrice: 2,
      age: 24,
      location: 'São Paulo, SP',
      featured: true,
      followers: 1250,
      following: 180,
      joinDate: '2023-06-15',
      lastActive: 'Online agora',
      profileViews: 15420,
      totalChats: 890,
      favoriteCount: 450
    },
    'm2': {
      id: 'm2',
      name: 'Jade Almeida',
      username: 'jade_almeida',
      photo: '/images/high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_xcuvvf5mb98aiguyg0ar_3.png',
      bio: 'Artista e modelo, sempre em busca de novas experiências. Vamos conversar sobre arte, vida e tudo que nos inspira! 🎨❤️',
      type: 'model',
      online: false,
      categories: ['conversa', 'arte', 'filosofia'],
      rating: 4.7,
      pricePerMinute: 1,
      privateCallPrice: 3,
      age: 26,
      location: 'Rio de Janeiro, RJ',
      featured: false,
      followers: 980,
      following: 220,
      joinDate: '2023-04-20',
      lastActive: '2 horas atrás',
      profileViews: 12300,
      totalChats: 650,
      favoriteCount: 320
    },
    'm3': {
      id: 'm3',
      name: 'Mia Oliveira',
      username: 'mia_oliveira',
      photo: '/images/high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_qhcvmpojebov1lic1cwu_0.png',
      bio: 'Modelo e influencer. Adoro jogos, tecnologia e boas conversas. Vamos nos divertir juntos! 🎮💜',
      type: 'model',
      online: true,
      categories: ['conversa', 'jogos', 'tecnologia'],
      rating: 4.9,
      pricePerMinute: 1,
      privateCallPrice: 4,
      age: 22,
      location: 'Belo Horizonte, MG',
      featured: true,
      followers: 2100,
      following: 350,
      joinDate: '2023-08-10',
      lastActive: 'Online agora',
      profileViews: 25600,
      totalChats: 1200,
      favoriteCount: 780
    },
    'u1': {
      id: 'u1',
      name: 'Carlos Silva',
      username: 'carlos_silva',
      email: 'carlos@email.com',
      photo: '/images/default-avatar.png',
      bio: 'Apaixonado por tecnologia e boas conversas. Sempre em busca de novas experiências!',
      type: 'user',
      credits: 5000,
      followers: 45,
      following: 120,
      badge: 2,
      totalPoints: 3500,
      joinDate: '2023-03-12',
      lastActive: '1 hora atrás',
      profileViews: 230,
      totalChats: 85,
      totalSpent: 12000,
      favoriteCount: 15
    },
    'u2': {
      id: 'u2',
      name: 'Ana Costa',
      username: 'ana_costa',
      email: 'ana@email.com',
      photo: '/images/default-avatar.png',
      bio: 'Amante da arte e da música. Adoro conhecer pessoas interessantes!',
      type: 'user',
      credits: 2500,
      followers: 32,
      following: 89,
      badge: 1,
      totalPoints: 1800,
      joinDate: '2023-07-25',
      lastActive: '3 horas atrás',
      profileViews: 156,
      totalChats: 42,
      totalSpent: 8500,
      favoriteCount: 8
    },
    'u3': {
      id: 'u3',
      name: 'Pedro Santos',
      username: 'pedro_santos',
      email: 'pedro@email.com',
      photo: '/images/default-avatar.png',
      bio: 'Desenvolvedor apaixonado por tecnologia e inovação. Sempre em busca de novos desafios!',
      type: 'user',
      credits: 3200,
      followers: 28,
      following: 65,
      badge: 0,
      totalPoints: 1200,
      joinDate: '2023-09-10',
      lastActive: '30 minutos atrás',
      profileViews: 89,
      totalChats: 25,
      totalSpent: 4500,
      favoriteCount: 5
    },
    'u4': {
      id: 'u4',
      name: 'Maria Oliveira',
      username: 'maria_oliveira',
      email: 'maria@email.com',
      photo: '/images/default-avatar.png',
      bio: 'Professora e entusiasta da educação. Adoro compartilhar conhecimento!',
      type: 'user',
      credits: 1800,
      followers: 55,
      following: 95,
      badge: 1,
      totalPoints: 2100,
      joinDate: '2023-05-18',
      lastActive: '2 horas atrás',
      profileViews: 145,
      totalChats: 38,
      totalSpent: 6200,
      favoriteCount: 12
    },
    'u5': {
      id: 'u5',
      name: 'João Pereira',
      username: 'joao_pereira',
      email: 'joao@email.com',
      photo: '/images/default-avatar.png',
      bio: 'Empresário e investidor. Sempre em busca de boas oportunidades e conversas interessantes!',
      type: 'user',
      credits: 8500,
      followers: 78,
      following: 145,
      badge: 2,
      totalPoints: 4200,
      joinDate: '2023-02-28',
      lastActive: '45 minutos atrás',
      profileViews: 320,
      totalChats: 95,
      totalSpent: 18500,
      favoriteCount: 25
    }
  };

  useEffect(() => {
    if (id) {
      // Simular carregamento de dados
      setIsLoading(true);
      setTimeout(() => {
        const profile = mockProfiles[id as string];
        if (profile) {
          setProfileData(profile);
        }
        setIsLoading(false);
      }, 500);
    }

    // Carregar dados do usuário atual
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setCurrentUser(parsed);
        } catch (e) {
          console.error("Erro ao carregar dados do usuário:", e);
        }
      }
    }
  }, [id]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    // Aqui você implementaria a lógica de seguir/deixar de seguir
  };

  const handleStartChat = () => {
    if (profileData?.type === 'model') {
      router.push(`/chat-video?model=${profileData.id}`);
    }
  };

  const handlePrivateCall = () => {
    if (profileData?.type === 'model') {
      router.push(`/chat-video?model=${profileData.id}&private=true`);
    }
  };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Carregando Perfil | Camera Real</title>
        </Head>
        <Header />
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F25790] mx-auto mb-4"></div>
            <p className="text-gray-400">Carregando perfil...</p>
          </div>
        </main>
      </>
    );
  }

  if (!profileData) {
    return (
      <>
        <Head>
          <title>Perfil não encontrado | Camera Real</title>
        </Head>
        <Header />
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Perfil não encontrado</h1>
            <p className="text-gray-400 mb-6">O perfil que você está procurando não existe ou foi removido.</p>
            <Link href="/" className="bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-3 px-6 rounded-xl transition-colors">
              Voltar ao início
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{profileData.name} | Camera Real</title>
        <meta name="description" content={profileData.bio} />
      </Head>
      <Header />
      <main className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto py-10 px-4">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
            
            {/* Header do perfil */}
            <div className="relative h-48 bg-gradient-to-r from-[#F25790]/20 to-purple-600/20">
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div className="flex items-end gap-4">
                  <div className="relative">
                    <UserAvatar 
                      photo={profileData.photo} 
                      name={profileData.name} 
                      size="xl"
                      className="border-4 border-white/20"
                    />
                    {profileData.type === 'model' && (
                      <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-2 border-white ${
                        profileData.online ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                    )}
                  </div>
                  <div className="pb-2">
                    <h1 className="text-3xl font-bold text-white">{profileData.name}</h1>
                    {profileData.username && (
                      <p className="text-gray-300">@{profileData.username}</p>
                    )}
                    {profileData.type === 'model' && profileData.location && (
                      <p className="text-gray-400 text-sm">{profileData.location}</p>
                    )}
                  </div>
                </div>
                
                {/* Badges e status */}
                <div className="flex flex-col items-end gap-2">
                  {profileData.type === 'model' && profileData.featured && (
                    <div className="bg-gradient-to-r from-[#F25790] to-[#d93d75] text-white text-xs font-bold px-3 py-1 rounded-full">
                      ⭐ DESTAQUE
                    </div>
                  )}
                  {profileData.type === 'model' && (
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      profileData.online 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${profileData.online ? 'bg-green-400' : 'bg-red-400'}`}></div>
                      {profileData.online ? 'Online' : 'Offline'}
                    </div>
                  )}
                  {profileData.type === 'user' && profileData.badge !== undefined && (
                    <div className="flex items-center gap-1 bg-gray-800/50 px-3 py-1 rounded-full">
                      <Image 
                        src={badgeSystem[profileData.badge].icon} 
                        alt={badgeSystem[profileData.badge].name} 
                        width={16} 
                        height={16}
                        style={{
                          filter: profileData.badge === 0 
                            ? 'brightness(0) saturate(100%) invert(29%) sepia(19%) saturate(1077%) hue-rotate(23deg) brightness(95%) contrast(90%)'
                            : profileData.badge === 1 
                            ? 'brightness(0) saturate(100%) invert(89%) sepia(0%) saturate(0%) hue-rotate(223deg) brightness(100%) contrast(100%)'
                            : 'brightness(0) saturate(100%) invert(77%) sepia(56%) saturate(1392%) hue-rotate(3deg) brightness(103%) contrast(103%)'
                        }}
                      />
                      <span className="text-xs text-gray-300">{badgeSystem[profileData.badge].name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Informações básicas */}
              <div className="mb-8">
                {profileData.bio && (
                  <p className="text-gray-300 mb-4 leading-relaxed">{profileData.bio}</p>
                )}
                
                {/* Estatísticas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">{profileData.followers || 0}</div>
                    <div className="text-xs text-gray-400">Seguidores</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">{profileData.following || 0}</div>
                    <div className="text-xs text-gray-400">Seguindo</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">{profileData.profileViews || 0}</div>
                    <div className="text-xs text-gray-400">Visualizações</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">{profileData.totalChats || 0}</div>
                    <div className="text-xs text-gray-400">Conversas</div>
                  </div>
                </div>

                {/* Informações específicas do tipo */}
                {profileData.type === 'model' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <h3 className="text-white font-semibold mb-3">Informações da Modelo</h3>
                      <div className="space-y-2 text-sm">
                        {profileData.age && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Idade:</span>
                            <span className="text-white">{profileData.age} anos</span>
                          </div>
                        )}
                        {profileData.rating && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Avaliação:</span>
                            <span className="text-yellow-400">★ {profileData.rating}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-400">Chat Simples:</span>
                          <span className="text-green-400">{profileData.pricePerMinute} crédito/min</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Chat Privado:</span>
                          <span className="text-purple-400">{profileData.privateCallPrice} créditos/min</span>
                        </div>
                      </div>
                    </div>
                    
                    {profileData.categories && (
                      <div className="bg-gray-800/50 rounded-xl p-4">
                        <h3 className="text-white font-semibold mb-3">Categorias</h3>
                        <div className="flex flex-wrap gap-2">
                          {profileData.categories.map((category, index) => (
                            <span key={index} className="bg-[#F25790]/20 text-[#F25790] px-3 py-1 rounded-full text-xs font-medium">
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {profileData.type === 'user' && (
                  <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
                    <h3 className="text-white font-semibold mb-3">Informações do Usuário</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {profileData.credits !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Créditos:</span>
                          <span className="text-green-400">{profileData.credits}</span>
                        </div>
                      )}
                      {profileData.totalPoints !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Pontos:</span>
                          <span className="text-yellow-400">{profileData.totalPoints}</span>
                        </div>
                      )}
                      {profileData.totalSpent !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Gasto:</span>
                          <span className="text-white">{profileData.totalSpent} créditos</span>
                        </div>
                      )}
                      {profileData.favoriteCount !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Favoritos:</span>
                          <span className="text-pink-400">{profileData.favoriteCount}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Informações adicionais */}
                <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
                  <h3 className="text-white font-semibold mb-3">Informações Adicionais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Membro desde:</span>
                      <span className="text-white">{new Date(profileData.joinDate || '').toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Última atividade:</span>
                      <span className="text-white">{profileData.lastActive}</span>
                    </div>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={handleFollow}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                      isFollowing 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-[#F25790] hover:bg-[#d93d75] text-white'
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Seguindo
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Seguir
                      </>
                    )}
                  </button>

                  {profileData.type === 'model' && (
                    <>
                      <button 
                        onClick={handleStartChat}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Chat Simples ({profileData.pricePerMinute} crédito/min)
                      </button>
                      
                      <button 
                        onClick={handlePrivateCall}
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Chat Privado ({profileData.privateCallPrice} créditos/min)
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 