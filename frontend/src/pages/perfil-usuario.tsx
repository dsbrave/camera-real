import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserAvatar from "@/components/UserAvatar";
import EditarPerfilModal from "@/components/EditarPerfilModal";

export default function PerfilUsuario() {
  const router = useRouter();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBadgeInfo, setShowBadgeInfo] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<number | null>(null);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Usuário Exemplo",
    username: "usuario123",
    email: "usuario@email.com",
    phone: "",
    photo: "/images/default-avatar.png",
    bio: "Aqui vai a sua biografia! Fale um pouco sobre você...",
    credits: 200000,
    rating: 4.8,
    // Sistema de badges com coroas
    currentBadge: 2, // 0=Bronze, 1=Prata, 2=Ouro, 3=Platina, 4=Diamante
    badgeProgress: 65, // porcentagem para próxima badge
    totalPoints: 5500, // pontos totais acumulados (50% da badge Ouro)
    // Métricas para cálculo de badges
    timeOnline: 75, // horas online
    creditsSpent: 25000, // créditos gastos
    favoriteCount: 12, // modelos favoritadas
    purchaseCount: 18, // compras realizadas
    chatSessions: 35, // sessões de chat
    followers: 12,
    following: 8,
    // Badges conquistadas
    badges: [
      { id: 1, name: "VIP", icon: "/icons/badges/vip.svg", earned: true },
      { id: 2, name: "Top 10", icon: "/icons/badges/top10.svg", earned: true },
      { id: 3, name: "Cliente Antigo", icon: "/icons/badges/old.svg", earned: false },
    ],
    ranking: "Top 10 do mês",
    activities: [
      { id: 1, type: "gift", text: "Você enviou uma coroa para Luna", date: "Ontem", points: 50 },
      { id: 2, type: "comment", text: "Recebeu comentário de Jade: 'Ótimo cliente!'", date: "2 dias atrás", points: 25 },
      { id: 3, type: "badge", text: "Ganhou badge: Cliente VIP", date: "3 dias atrás", points: 500 },
      { id: 4, type: "purchase", text: "Comprou 5000 créditos", date: "4 dias atrás", points: 100 },
      { id: 5, type: "favorite", text: "Adicionou Maya às favoritas", date: "5 dias atrás", points: 25 },
      { id: 6, type: "chat", text: "Sessão de chat com Sophia (45 min)", date: "6 dias atrás", points: 75 },
    ],
    favoriteModels: [],
    comments: [
      { id: 1, author: "Luna Silva", avatar: "/images/high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_zogrxbsso7f5cot9iywg_3.png", text: "Ótimo cliente!", badge: 3 },
      { id: 2, author: "Jade Almeida", avatar: "/images/high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_xcuvvf5mb98aiguyg0ar_3.png", text: "Muito educado e divertido!", badge: 2 },
    ],
  });

  // Sistema de badges com coroas
  const badgeSystem = [
    { 
      level: 0, 
      name: "Bronze", 
      icon: "/icons/Vector.svg", 
      color: "#6E4D25", // Bronze mais escuro
      minPoints: 0,
      maxPoints: 999,
      description: "Iniciante explorando a plataforma"
    },
    { 
      level: 1, 
      name: "Prata", 
      icon: "/icons/Vector.svg", 
      color: "#C0C0C0",
      minPoints: 1000,
      maxPoints: 2999,
      description: "Usuário ativo e engajado"
    },
    { 
      level: 2, 
      name: "Ouro", 
      icon: "/icons/Vector.svg", 
      color: "#DAA520", // Ouro melhorado (goldenrod)
      minPoints: 3000,
      maxPoints: 7999,
      description: "Cliente premium com experiência"
    },
    { 
      level: 3, 
      name: "Platina", 
      icon: "/icons/Vector.svg", 
      color: "#E5E4E2",
      minPoints: 8000,
      maxPoints: 19999,
      description: "VIP com acesso a recursos exclusivos"
    },
    { 
      level: 4, 
      name: "Diamante", 
      icon: "/icons/Vector.svg", 
      color: "#B9F2FF",
      minPoints: 20000,
      maxPoints: 99999,
      description: "Elite máxima da plataforma"
    }
  ];

  // Calcular progresso da badge atual
  const getCurrentBadgeInfo = () => {
    const current = badgeSystem[userData.currentBadge];
    const next = badgeSystem[userData.currentBadge + 1];
    
    if (!next) {
      return {
        current,
        next: null,
        progress: 100,
        pointsToNext: 0
      };
    }
    
    // Calcular progresso dentro da badge atual
    const pointsInCurrentRange = userData.totalPoints - current.minPoints;
    const rangeSize = next.minPoints - current.minPoints;
    const progress = Math.min(100, Math.max(0, (pointsInCurrentRange / rangeSize) * 100));
    const pointsToNext = Math.max(0, next.minPoints - userData.totalPoints);
    
    return {
      current,
      next,
      progress,
      pointsToNext
    };
  };

  const badgeInfo = getCurrentBadgeInfo();

  // Mock de modelos favoritas
  const favoriteModels = [
    { id: "m1", name: "Luna Silva", photo: "/images/high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_zogrxbsso7f5cot9iywg_3.png" },
    { id: "m2", name: "Jade Almeida", photo: "/images/high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_xcuvvf5mb98aiguyg0ar_3.png" },
    { id: "m3", name: "Mia Oliveira", photo: "/images/high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_qhcvmpojebov1lic1cwu_0.png" },
  ];

  // Mock de seguidores
  const followersData = [
    { id: "1", name: "Carlos Silva", photo: "/images/default-avatar.png", badge: 1 },
    { id: "2", name: "Ana Costa", photo: "/images/default-avatar.png", badge: 2 },
    { id: "3", name: "Pedro Santos", photo: "/images/default-avatar.png", badge: 0 },
    { id: "4", name: "Maria Oliveira", photo: "/images/default-avatar.png", badge: 1 },
    { id: "5", name: "João Pereira", photo: "/images/default-avatar.png", badge: 2 },
    { id: "1", name: "Carlos Silva", photo: "/images/default-avatar.png", badge: 1 },
    { id: "2", name: "Ana Costa", photo: "/images/default-avatar.png", badge: 2 },
    { id: "3", name: "Pedro Santos", photo: "/images/default-avatar.png", badge: 0 },
    { id: "4", name: "Maria Oliveira", photo: "/images/default-avatar.png", badge: 1 },
    { id: "5", name: "João Pereira", photo: "/images/default-avatar.png", badge: 2 },
    { id: "1", name: "Carlos Silva", photo: "/images/default-avatar.png", badge: 1 },
    { id: "2", name: "Ana Costa", photo: "/images/default-avatar.png", badge: 2 },
  ];

  // Mock de seguindo
  const followingData = [
    { id: "1", name: "Luna Silva", photo: "/images/high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_zogrxbsso7f5cot9iywg_3.png", badge: 3, isModel: true },
    { id: "2", name: "Jade Almeida", photo: "/images/high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_xcuvvf5mb98aiguyg0ar_3.png", badge: 2, isModel: true },
    { id: "3", name: "Mia Oliveira", photo: "/images/high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_qhcvmpojebov1lic1cwu_0.png", badge: 3, isModel: true },
    { id: "1", name: "Carlos Silva", photo: "/images/default-avatar.png", badge: 1, isModel: false },
    { id: "2", name: "Ana Costa", photo: "/images/default-avatar.png", badge: 2, isModel: false },
    { id: "3", name: "Pedro Santos", photo: "/images/default-avatar.png", badge: 0, isModel: false },
    { id: "4", name: "Maria Oliveira", photo: "/images/default-avatar.png", badge: 1, isModel: false },
    { id: "5", name: "João Pereira", photo: "/images/default-avatar.png", badge: 2, isModel: false },
  ];

  // Carregar dados reais do usuário do localStorage ao montar
  useEffect(() => {
    function loadUserData() {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            const parsed = JSON.parse(storedUser);
            setUserData((prev) => ({
              ...prev,
              ...parsed,
              name: parsed.name || prev.name,
              username: parsed.username || prev.username,
              email: parsed.email || prev.email,
              phone: parsed.phone || prev.phone,
              photo: parsed.photo || prev.photo,
              bio: parsed.bio || prev.bio,
            }));
          } catch (e) {
            // fallback para mock
          }
        }
      }
    }
    loadUserData();
    window.addEventListener("userDataUpdated", loadUserData);
    return () => window.removeEventListener("userDataUpdated", loadUserData);
  }, []);

  return (
    <>
      <Head>
        <title>Meu Perfil | Camera Real</title>
      </Head>
      <Header />
      <main className="max-w-3xl mx-auto py-10 px-4">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 p-8 flex flex-col items-center">
          {/* Foto, nome, badges e barra de nível */}
          <div className="relative mb-4 flex flex-col items-center w-full">
            {/* Botão Editar no canto superior direito */}
            <button 
              onClick={() => setShowEditModal(true)} 
              className="absolute top-0 right-0 bg-[#F25790] text-white text-sm py-2 px-4 rounded-xl shadow hover:bg-[#d93d75] transition-all flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
              </svg>
              Editar
            </button>
            
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#F25790] bg-gray-700 flex items-center justify-center mb-2">
              {userData.photo && userData.photo !== "/images/default-avatar.png" ? (
                <Image src={userData.photo} alt="Foto de perfil" width={128} height={128} className="object-cover w-full h-full" />
              ) : (
                <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">
                    {userData.name?.charAt(0).toUpperCase() || userData.username?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold text-white mt-2 mb-4">{userData.name}</h2>
            
            {/* Bio */}
            <p className="text-gray-300 text-center mb-6 max-w-xl text-sm">{userData.bio}</p>
            
            {/* Badges */}
            <div className="flex gap-2 mb-2 items-center justify-center">
              {badgeSystem.map((badge, index) => (
                <div key={badge.level} className="flex flex-col items-center">
                  <button
                    onClick={() => setSelectedBadge(selectedBadge === index ? null : index)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                      index <= userData.currentBadge ? 'cursor-pointer' : 'opacity-20 grayscale cursor-not-allowed'
                    } ${index < userData.currentBadge ? 'opacity-60' : ''}`}
                    disabled={index > userData.currentBadge}
                  >
                    <Image 
                      src={badge.icon} 
                      alt={badge.name} 
                      width={index === userData.currentBadge ? 36 : 32} 
                      height={index === userData.currentBadge ? 36 : 32}
                      className={`${index === userData.currentBadge ? 'animate-pulse drop-shadow-lg' : ''}`}
                      style={{
                        filter: index <= userData.currentBadge 
                          ? badge.level === 0 
                            ? 'brightness(0) saturate(100%) invert(29%) sepia(19%) saturate(1077%) hue-rotate(23deg) brightness(95%) contrast(90%)' // Bronze #6E4D25 ajustado
                            : badge.level === 1 
                            ? 'brightness(0) saturate(100%) invert(89%) sepia(0%) saturate(0%) hue-rotate(223deg) brightness(100%) contrast(100%)' // Prata
                            : badge.level === 2 
                            ? 'brightness(0) saturate(100%) invert(77%) sepia(56%) saturate(1392%) hue-rotate(3deg) brightness(103%) contrast(103%)' // Ouro
                            : badge.level === 3 
                            ? 'brightness(0) saturate(100%) invert(93%) sepia(3%) saturate(0%) hue-rotate(223deg) brightness(100%) contrast(100%)' // Platina
                            : 'brightness(0) saturate(100%) invert(85%) sepia(58%) saturate(350%) hue-rotate(170deg) brightness(108%) contrast(108%)' // Diamante
                          : 'brightness(0) saturate(100%) invert(50%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)' // Cinza para não conquistadas
                      }}
                    />
                  </button>
                  <span className={`text-xs mt-1 ${
                    index === userData.currentBadge 
                      ? 'text-white font-bold' 
                      : index < userData.currentBadge 
                        ? 'text-gray-300' 
                        : 'text-gray-500'
                  }`}>
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>
            {/* Barra de progresso de badge */}
            <div className="w-full max-w-xs mb-2">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Badge: {badgeInfo.current.name}</span>
                <span>{badgeInfo.next ? `${badgeInfo.pointsToNext} pts para ${badgeInfo.next.name}` : "Máximo!"}</span>
              </div>
              <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden relative">
                <div 
                  className="h-full rounded-full transition-all duration-500" 
                  style={{ 
                    width: `${badgeInfo.progress}%`,
                    background: `linear-gradient(90deg, #F25790, #FF6B9D, #F25790)`
                  }}
                ></div>
              </div>
              <div className="text-xs text-center text-gray-400 mt-1">
                {userData.totalPoints} pontos totais • {Math.round(badgeInfo.progress)}% completo
              </div>
            </div>
            <span className="text-xs text-yellow-400 font-bold mb-2">{userData.ranking}</span>
            
            {/* Informações detalhadas das badges - aparecem quando clicadas */}
            {selectedBadge !== null && (
              <div className="w-full max-w-md mb-4 animate-in slide-in-from-top">
                {/* Badge atual - viva com progresso */}
                {selectedBadge === userData.currentBadge && (
                  <div className="bg-gray-800/90 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-center gap-3 mb-3">
                      <Image 
                        src={badgeSystem[selectedBadge].icon} 
                        alt={badgeSystem[selectedBadge].name} 
                        width={24} 
                        height={24}
                        className="animate-pulse"
                        style={{
                          filter: selectedBadge === 0 
                            ? 'brightness(0) saturate(100%) invert(29%) sepia(19%) saturate(1077%) hue-rotate(23deg) brightness(95%) contrast(90%)'
                            : selectedBadge === 1 
                            ? 'brightness(0) saturate(100%) invert(89%) sepia(0%) saturate(0%) hue-rotate(223deg) brightness(100%) contrast(100%)'
                            : selectedBadge === 2 
                            ? 'brightness(0) saturate(100%) invert(77%) sepia(56%) saturate(1392%) hue-rotate(3deg) brightness(103%) contrast(103%)'
                            : selectedBadge === 3 
                            ? 'brightness(0) saturate(100%) invert(93%) sepia(3%) saturate(0%) hue-rotate(223deg) brightness(100%) contrast(100%)'
                            : 'brightness(0) saturate(100%) invert(85%) sepia(58%) saturate(350%) hue-rotate(170deg) brightness(108%) contrast(108%)'
                        }}
                      />
                      <div>
                        <h4 className="text-white font-bold text-sm">{badgeSystem[selectedBadge].name}</h4>
                        <p className="text-gray-300 text-xs">{badgeSystem[selectedBadge].description}</p>
                      </div>
                    </div>

                    {/* Progresso para próxima badge */}
                    {badgeInfo.next && (
                      <div className="text-center">
                        <p className="text-gray-400 text-xs mb-1">Próxima: {badgeInfo.next.name}</p>
                        <p className="text-[#F25790] font-bold text-sm">{badgeInfo.pointsToNext} pontos restantes</p>
                      </div>
                    )}
                    
                    <button 
                      onClick={() => setSelectedBadge(null)}
                      className="w-full mt-3 bg-gray-700 hover:bg-gray-600 text-white text-xs py-2 px-3 rounded transition-all"
                    >
                      Fechar
                    </button>
                  </div>
                )}

                {/* Badges conquistadas - histórico simples */}
                {selectedBadge !== null && selectedBadge < userData.currentBadge && (
                  <div className="bg-gray-900/70 rounded-lg p-4 border border-gray-700/50 opacity-80">
                    <div className="flex items-center gap-3 mb-3">
                      <Image 
                        src={badgeSystem[selectedBadge].icon} 
                        alt={badgeSystem[selectedBadge].name} 
                        width={20} 
                        height={20}
                        className="opacity-60"
                        style={{
                          filter: selectedBadge === 0 
                            ? 'brightness(0) saturate(100%) invert(29%) sepia(19%) saturate(1077%) hue-rotate(23deg) brightness(95%) contrast(90%)'
                            : 'brightness(0) saturate(100%) invert(89%) sepia(0%) saturate(0%) hue-rotate(223deg) brightness(100%) contrast(100%)'
                        }}
                      />
                      <div>
                        <h4 className="text-gray-300 font-bold text-sm">{badgeSystem[selectedBadge].name}</h4>
                        <p className="text-gray-400 text-xs">
                          {selectedBadge === 0 ? 'Seus primeiros passos' : 'Usuário engajado'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-gray-500 text-xs">
                        ✓ Conquistada em {selectedBadge === 0 ? 'Jan 2024' : 'Mar 2024'}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => setSelectedBadge(null)}
                      className="w-full mt-3 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs py-2 px-3 rounded transition-all"
                    >
                      Fechar
                    </button>
                  </div>
                )}

                {/* Badges futuras - requisitos simples */}
                {selectedBadge !== null && selectedBadge > userData.currentBadge && (
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/30 opacity-70">
                    <div className="flex items-center gap-3 mb-3">
                      <Image 
                        src={badgeSystem[selectedBadge].icon} 
                        alt={badgeSystem[selectedBadge].name} 
                        width={20} 
                        height={20}
                        className="opacity-40"
                        style={{
                          filter: 'brightness(0) saturate(100%) invert(50%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
                        }}
                      />
                      <div>
                        <h4 className="text-gray-400 font-bold text-sm">{badgeSystem[selectedBadge].name}</h4>
                        <p className="text-gray-500 text-xs">{badgeSystem[selectedBadge].description}</p>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 font-bold text-sm">
                        {badgeSystem[selectedBadge].minPoints - userData.totalPoints} pontos necessários
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {selectedBadge === 3 ? 'Acesso VIP + descontos' : 'Nível máximo + benefícios exclusivos'}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => setSelectedBadge(null)}
                      className="w-full mt-3 bg-gray-800 hover:bg-gray-700 text-gray-400 text-xs py-2 px-3 rounded transition-all"
                    >
                      Fechar
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Métricas sociais */}
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="flex flex-col items-center">
              <span className="text-white text-2xl font-bold">{userData.credits}</span>
              <span className="text-xs text-gray-400">créditos</span>
              <Link href="/carteira" className="text-[#F25790] text-xs font-bold mt-1 hover:underline">Comprar +</Link>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-yellow-400 text-2xl font-bold">{userData.rating} ★</span>
              <span className="text-xs text-gray-400">Nota das modelos</span>
            </div>
            <button 
              onClick={() => {
                setShowFollowers(!showFollowers);
                setShowFollowing(false); // Fecha o painel de seguindo
              }}
              className="flex flex-col items-center hover:bg-gray-800 rounded-lg p-2 transition-colors cursor-pointer"
            >
              <div className="text-2xl font-bold text-white">{userData.followers}</div>
              <div className="text-xs text-gray-400">Seguidores</div>
            </button>
            <button 
              onClick={() => {
                setShowFollowing(!showFollowing);
                setShowFollowers(false); // Fecha o painel de seguidores
              }}
              className="flex flex-col items-center hover:bg-gray-800 rounded-lg p-2 transition-colors cursor-pointer"
            >
              <div className="text-2xl font-bold text-white">{userData.following}</div>
              <div className="text-xs text-gray-400">Seguindo</div>
            </button>
          </div>
          
          {/* Painel de Seguidores */}
          {showFollowers && (
            <div className="w-full mb-6 animate-in slide-in-from-top duration-300">
              <div className="bg-gray-800/90 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold text-lg">
                    Seguidores ({followersData.length})
                  </h3>
                  <button
                    onClick={() => setShowFollowers(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {followersData.map((follower) => (
                    <Link key={follower.id} href={`/perfil/u${follower.id}`} className="flex items-center gap-3 bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:bg-gray-700/50 transition-colors">
                      <UserAvatar 
                        photo={follower.photo} 
                        name={follower.name} 
                        size="lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium">{follower.name}</span>
                          <Image 
                            src={badgeSystem[follower.badge].icon} 
                            alt={badgeSystem[follower.badge].name} 
                            width={16} 
                            height={16}
                            style={{
                              filter: follower.badge === 0 
                                ? 'brightness(0) saturate(100%) invert(29%) sepia(19%) saturate(1077%) hue-rotate(23deg) brightness(95%) contrast(90%)'
                                : follower.badge === 1 
                                ? 'brightness(0) saturate(100%) invert(89%) sepia(0%) saturate(0%) hue-rotate(223deg) brightness(100%) contrast(100%)'
                                : 'brightness(0) saturate(100%) invert(77%) sepia(56%) saturate(1392%) hue-rotate(3deg) brightness(103%) contrast(103%)'
                            }}
                          />
                        </div>
                        <p className="text-gray-400 text-sm">Badge: {badgeSystem[follower.badge].name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <button 
                  onClick={() => setShowFollowers(false)}
                  className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white text-sm py-2 px-4 rounded-lg transition-all"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}

          {/* Painel de Seguindo */}
          {showFollowing && (
            <div className="w-full mb-6 animate-in slide-in-from-top duration-300">
              <div className="bg-gray-800/90 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold text-lg">
                    Seguindo ({followingData.length})
                  </h3>
                  <button
                    onClick={() => setShowFollowing(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {followingData.map((following) => (
                    <Link key={following.id} href={`/perfil/${following.isModel ? 'm' : 'u'}${following.id}`} className="flex items-center gap-3 bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:bg-gray-700/50 transition-colors">
                      <UserAvatar 
                        photo={following.photo} 
                        name={following.name} 
                        size="lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium">{following.name}</span>
                          <Image 
                            src={badgeSystem[following.badge].icon} 
                            alt={badgeSystem[following.badge].name} 
                            width={16} 
                            height={16}
                            style={{
                              filter: following.badge === 0 
                                ? 'brightness(0) saturate(100%) invert(29%) sepia(19%) saturate(1077%) hue-rotate(23deg) brightness(95%) contrast(90%)'
                                : following.badge === 1 
                                ? 'brightness(0) saturate(100%) invert(89%) sepia(0%) saturate(0%) hue-rotate(223deg) brightness(100%) contrast(100%)'
                                : following.badge === 2 
                                ? 'brightness(0) saturate(100%) invert(77%) sepia(56%) saturate(1392%) hue-rotate(3deg) brightness(103%) contrast(103%)'
                                : 'brightness(0) saturate(100%) invert(93%) sepia(3%) saturate(0%) hue-rotate(223deg) brightness(100%) contrast(100%)'
                            }}
                          />
                          {following.isModel && (
                            <span className="bg-[#F25790] text-white text-xs px-2 py-0.5 rounded-full font-medium">
                              Modelo
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">Badge: {badgeSystem[following.badge].name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <button 
                  onClick={() => setShowFollowing(false)}
                  className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white text-sm py-2 px-4 rounded-lg transition-all"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
          
          {/* Métricas de atividade para badges */}
          <div className="w-full mb-6">
            <h3 className="text-white font-bold mb-3 text-lg text-center">Atividade & Progresso</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 rounded-xl p-3 text-center border border-gray-700">
                <div className="text-blue-400 text-sm font-bold">{userData.timeOnline}h</div>
                <div className="text-xs text-gray-400">Tempo Online</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-3 text-center border border-gray-700">
                <div className="text-green-400 text-sm font-bold">{userData.creditsSpent.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Créditos Gastos</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-3 text-center border border-gray-700">
                <div className="text-pink-400 text-sm font-bold">{userData.favoriteCount}</div>
                <div className="text-xs text-gray-400">Favoritas</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-3 text-center border border-gray-700">
                <div className="text-purple-400 text-sm font-bold">{userData.purchaseCount}</div>
                <div className="text-xs text-gray-400">Compras</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-3 text-center border border-gray-700">
                <div className="text-orange-400 text-sm font-bold">{userData.chatSessions}</div>
                <div className="text-xs text-gray-400">Chats</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-3 text-center border border-gray-700">
                <div className="text-yellow-400 text-sm font-bold">{userData.totalPoints.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Pontos Totais</div>
              </div>
            </div>
          </div>
          {/* Modelos favoritas */}
          <div className="w-full mb-8">
            <h3 className="text-white font-bold mb-2 text-lg">Modelos Favoritas</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {favoriteModels.map((model) => (
                <Link key={model.id} href={`/perfil/m${model.id}`} className="flex flex-col items-center hover:opacity-75 transition-opacity">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#F25790] mb-1">
                    <Image src={model.photo} alt={model.name} width={64} height={64} className="object-cover w-full h-full" />
                  </div>
                  <span className="text-xs text-white text-center max-w-[60px] truncate">{model.name}</span>
                </Link>
              ))}
            </div>
          </div>
          {/* Atividades recentes */}
          <div className="w-full mb-6">
            <h3 className="text-white font-bold mb-3 text-lg text-center">Atividades Recentes</h3>
            <div className="space-y-2">
              {userData.activities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 bg-gray-800/50 rounded-xl p-3 border border-gray-700">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'gift' ? 'bg-pink-500/20' :
                    activity.type === 'comment' ? 'bg-blue-500/20' :
                    activity.type === 'badge' ? 'bg-yellow-500/20' :
                    activity.type === 'purchase' ? 'bg-green-500/20' :
                    activity.type === 'favorite' ? 'bg-purple-500/20' :
                    'bg-orange-500/20'
                  }`}>
                    {activity.type === 'gift' && (
                      <Image 
                        src="/icons/Vector.svg" 
                        alt="Coroa" 
                        width={20} 
                        height={20} 
                        className="w-5 h-5"
                        style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
                      />
                    )}
                    {activity.type === 'comment' && (
                      <Image src="/icons/communication/comment.svg" alt="Comentário" width={20} height={20} className="w-5 h-5 filter invert" />
                    )}
                    {activity.type === 'badge' && (
                      <Image 
                        src="/icons/Vector.svg" 
                        alt="Badge" 
                        width={20} 
                        height={20} 
                        className="w-5 h-5"
                        style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
                      />
                    )}
                    {activity.type === 'purchase' && (
                      <Image src="/icons/action/shopping_cart.svg" alt="Compra" width={20} height={20} className="w-5 h-5 filter invert" />
                    )}
                    {activity.type === 'favorite' && (
                      <Image src="/icons/action/turned_in.svg" alt="Favorito" width={20} height={20} className="w-5 h-5 filter invert" />
                    )}
                    {activity.type === 'chat' && (
                      <Image src="/icons/communication/chat.svg" alt="Chat" width={20} height={20} className="w-5 h-5 filter invert" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-200 text-sm">{activity.text}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400">{activity.date}</span>
                      <span className="text-xs text-green-400 font-bold">+{activity.points} pts</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Comentários das modelos */}
          <div className="w-full mb-6">
            <h3 className="text-white font-bold mb-3 text-lg text-center">Comentários das Modelos</h3>
            <div className="space-y-3">
              {userData.comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3 bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    {comment.avatar && comment.avatar !== "/images/default-avatar.png" ? (
                      <img 
                        src={comment.avatar} 
                        alt={comment.author}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {comment.author.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white font-medium">{comment.author}</span>
                      <Image 
                        src={badgeSystem[comment.badge].icon} 
                        alt={badgeSystem[comment.badge].name} 
                        width={16} 
                        height={16}
                        style={{
                          filter: badgeSystem[comment.badge].level === 0 
                            ? 'brightness(0) saturate(100%) invert(29%) sepia(19%) saturate(1077%) hue-rotate(23deg) brightness(95%) contrast(90%)'
                            : badgeSystem[comment.badge].level === 1 
                            ? 'brightness(0) saturate(100%) invert(89%) sepia(0%) saturate(0%) hue-rotate(223deg) brightness(100%) contrast(100%)'
                            : badgeSystem[comment.badge].level === 2 
                            ? 'brightness(0) saturate(100%) invert(77%) sepia(56%) saturate(1392%) hue-rotate(3deg) brightness(103%) contrast(103%)'
                            : badgeSystem[comment.badge].level === 3 
                            ? 'brightness(0) saturate(100%) invert(93%) sepia(3%) saturate(0%) hue-rotate(223deg) brightness(100%) contrast(100%)'
                            : 'brightness(0) saturate(100%) invert(85%) sepia(58%) saturate(350%) hue-rotate(170deg) brightness(108%) contrast(108%)'
                        }}
                      />
                      <span className="bg-[#F25790] text-white text-xs px-2 py-0.5 rounded-full font-medium">
                        Modelo
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{comment.text}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-400">2 dias atrás</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-400">Badge: {badgeSystem[comment.badge].name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Ações rápidas */}
          <div className="flex gap-4 w-full justify-center mt-4">
            <Link href="/painel-usuario" className="bg-[#F25790] hover:bg-[#d93d75] text-white font-bold py-2 px-4 rounded-xl transition-all">Painel</Link>
            <Link href="/carteira" className="bg-[#F25790] hover:bg-[#d93d75] text-white font-bold py-2 px-4 rounded-xl transition-all">Carteira</Link>
            <button onClick={() => router.push('/login')} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-xl transition-all">Sair</button>
          </div>
        </div>
        {/* Modal de edição de perfil */}
        <EditarPerfilModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          profileData={{
            name: userData.name,
            username: userData.username,
            profilePic: userData.photo,
            bio: (userData as any).bio || "",
          }}
          onSave={(data) => {
            const newPhoto = data.profilePic || data.photo;
            setUserData((prev) => ({ ...prev, ...data, photo: newPhoto, profilePic: newPhoto }));
            if (typeof window !== "undefined") {
              const storedUser = localStorage.getItem("user");
              if (storedUser) {
                const parsed = JSON.parse(storedUser);
                const updated = { ...parsed, ...data, photo: newPhoto, profilePic: newPhoto };
                localStorage.setItem("user", JSON.stringify(updated));
                window.dispatchEvent(new CustomEvent("userDataUpdated"));
              }
            }
          }}
        />
      </main>
    </>
  );
} 