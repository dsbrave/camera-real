import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import EditarPerfilModal from "@/components/EditarPerfilModal";

export default function PerfilUsuario() {
  const router = useRouter();
  const [showEditModal, setShowEditModal] = useState(false);
  const [userData, setUserData] = useState({
    name: "Usuário Exemplo",
    username: "usuario123",
    email: "usuario@email.com",
    phone: "",
    photo: "/images/default-avatar.png",
    bio: "Aqui vai a sua biografia! Fale um pouco sobre você...",
    credits: 200000,
    rating: 4.8,
    level: 3,
    levelName: "Ouro",
    levelProgress: 70, // porcentagem
    nextLevel: "Platina",
    followers: 12,
    following: 8,
    badges: [
      { id: 1, name: "VIP", icon: "/icons/badges/vip.svg" },
      { id: 2, name: "Top 10", icon: "/icons/badges/top10.svg" },
      { id: 3, name: "Cliente Antigo", icon: "/icons/badges/old.svg" },
    ],
    ranking: "Top 10 do mês",
    activities: [
      { id: 1, type: "gift", text: "Você enviou uma coroa para Luna", date: "Ontem" },
      { id: 2, type: "comment", text: "Recebeu comentário de Jade: 'Ótimo cliente!'", date: "2 dias atrás" },
      { id: 3, type: "badge", text: "Ganhou badge: Cliente VIP", date: "3 dias atrás" },
    ],
    favoriteModels: [],
    comments: [
      { id: 1, author: "Luna Silva", avatar: "/images/model1.jpg", text: "Ótimo cliente!" },
      { id: 2, author: "Jade Almeida", avatar: "/images/model2.jpg", text: "Muito educado e divertido!" },
    ],
  });

  // Mock de modelos favoritas
  const favoriteModels = [
    { id: "m1", name: "Luna Silva", photo: "/images/model1.jpg" },
    { id: "m2", name: "Jade Almeida", photo: "/images/model2.jpg" },
    { id: "m3", name: "Mia Oliveira", photo: "/images/model3.jpg" },
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
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#F25790] bg-gray-700 flex items-center justify-center mb-2">
              <Image src={userData.photo || "/images/default-avatar.png"} alt="Foto de perfil" width={128} height={128} className="object-cover w-full h-full" />
            </div>
            <button onClick={() => setShowEditModal(true)} className="absolute bottom-2 right-1/3 bg-[#F25790] text-white text-xs py-1 px-3 rounded-full shadow hover:bg-[#d93d75] transition-all">Editar</button>
            <h2 className="text-2xl font-bold text-white mt-2 mb-1">{userData.name}</h2>
            {/* Badges */}
            <div className="flex gap-2 mb-2">
              {userData.badges.map((badge) => (
                <div key={badge.id} className="flex flex-col items-center">
                  <Image src={badge.icon} alt={badge.name} width={28} height={28} />
                  <span className="text-xs text-gray-400">{badge.name}</span>
                </div>
              ))}
            </div>
            {/* Barra de progresso de nível */}
            <div className="w-full max-w-xs mb-2">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Nível: {userData.levelName}</span>
                <span>Próx: {userData.nextLevel}</span>
              </div>
              <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden relative">
                <div className="h-full bg-gradient-to-r from-[#F25790] to-[#d93d75] rounded-full" style={{ width: `${userData.levelProgress}%` }}></div>
              </div>
            </div>
            <span className="text-xs text-yellow-400 font-bold mb-2">{userData.ranking}</span>
          </div>
          {/* Métricas sociais */}
          <div className="flex items-center gap-8 mb-6">
            <div className="flex flex-col items-center">
              <span className="text-white text-lg font-bold">{userData.credits}</span>
              <span className="text-xs text-gray-400">créditos</span>
              <Link href="/carteira" className="text-[#F25790] text-xs font-bold mt-1 hover:underline">Comprar +</Link>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-yellow-400 text-lg font-bold">{userData.rating} ★</span>
              <span className="text-xs text-gray-400">Nota das modelos</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white text-lg font-bold">{userData.followers}</span>
              <span className="text-xs text-gray-400">seguidores</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white text-lg font-bold">{userData.following}</span>
              <span className="text-xs text-gray-400">seguindo</span>
            </div>
          </div>
          {/* Bio */}
          <p className="text-gray-300 text-center mb-4 max-w-xl">{userData.bio}</p>
          {/* Modelos favoritas */}
          <div className="w-full mb-8">
            <h3 className="text-white font-bold mb-2 text-lg">Modelos Favoritas</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {favoriteModels.map((model) => (
                <div key={model.id} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#F25790] mb-1">
                    <Image src={model.photo} alt={model.name} width={64} height={64} className="object-cover w-full h-full" />
                  </div>
                  <span className="text-xs text-white text-center max-w-[60px] truncate">{model.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Feed de atividades */}
          <div className="w-full mb-8">
            <h3 className="text-white font-bold mb-2 text-lg">Feed de Atividades</h3>
            <div className="space-y-2">
              {userData.activities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-2 bg-gray-800/80 rounded-xl p-2 border border-gray-700 text-sm text-gray-200">
                  <span className="text-[#F25790] font-bold">•</span> {activity.text} <span className="text-xs text-gray-400 ml-2">{activity.date}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Comentários recebidos */}
          <div className="w-full mb-8">
            <h3 className="text-white font-bold mb-2 text-lg">Comentários Recebidos</h3>
            <div className="space-y-3">
              {userData.comments.map((comment) => (
                <div key={comment.id} className="flex items-center gap-3 bg-gray-800/80 rounded-xl p-3 border border-gray-700">
                  <Image src={comment.avatar} alt={comment.author} width={32} height={32} className="rounded-full object-cover" />
                  <div>
                    <span className="text-[#F25790] font-bold text-sm">{comment.author}</span>
                    <p className="text-gray-200 text-sm">{comment.text}</p>
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
            email: userData.email,
            phone: userData.phone,
            profilePic: userData.photo,
            bio: userData.bio,
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