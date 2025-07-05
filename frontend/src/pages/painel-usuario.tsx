import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ModelCard from "@/components/ModelCard";
import UserPreferencesModal, {
  UserPreferences,
} from "@/components/UserPreferencesModal";
import ConfiguracoesModal from "@/components/ConfiguracoesModal";
import EditarPerfilModal from "@/components/EditarPerfilModal";

export default function PainelUsuario() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    isLoggedIn: false,
    credits: 200000,
    photo: "",
    favoriteModels: [],
    recentChats: [],
    phone: "",
    username: "",
    isModel: false
  });
  const [favoriteModels, setFavoriteModels] = useState<any[]>([]);
  const [recentChats, setRecentChats] = useState<any[]>([]);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [userPreferences, setUserPreferences] =
    useState<UserPreferences | null>(null);

  // Mock de dados para conversas recentes
  const recentChatsMock = [
    {
      id: "c1",
      modelId: "m1",
      modelName: "Luna Silva",
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
      duration: 15,
      cost: 35,
    },
    {
      id: "c2",
      modelId: "m4",
      modelName: "Mia Oliveira",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      duration: 25,
      cost: 60,
    },
    {
      id: "c3",
      modelId: "m2",
      modelName: "Scarlett Moraes",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      duration: 10,
      cost: 20,
    },
  ];

  // Mock de dados para pacotes de créditos
  const creditPackages = [
    { id: "p1", name: "Básico", credits: 100, price: 50, popular: false },
    {
      id: "p2",
      name: "Premium",
      credits: 400,
      price: 150,
      discount: "33%",
      popular: true,
    },
    {
      id: "p3",
      name: "Master",
      credits: 1000,
      price: 300,
      discount: "50%",
      popular: false,
    },
  ];

  // Verificar se o usuário está logado ao carregar a página
  useEffect(() => {
    const loadUserData = () => {
      const userStorage = localStorage.getItem("user");
      if (userStorage) {
        try {
          const parsedUser = JSON.parse(userStorage);
          if (parsedUser.isLoggedIn) {
            setUserData({
              ...parsedUser,
              recentChats: recentChatsMock,
            });

            // Carregar favoritos do localStorage
            const favorites = JSON.parse(
              localStorage.getItem("favoriteModels") || "[]",
            );
            setFavoriteModels(favorites);

            // Carregar preferências do usuário
            const preferences = localStorage.getItem("userPreferences");
            if (preferences) {
              setUserPreferences(JSON.parse(preferences));
            }
          } else {
            router.push("/login");
          }
        } catch (error) {
          console.error("Erro ao carregar dados do usuário:", error);
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
    };

    loadUserData();

    // Adiciona listener para o evento customizado de atualização de dados do usuário
    window.addEventListener("userDataUpdated", loadUserData);

    return () => {
      window.removeEventListener("userDataUpdated", loadUserData);
    };
  }, [router]);

  useEffect(() => {
    // Garantir que o scroll esteja sempre habilitado
    document.body.style.overflow = "unset";
    document.body.style.paddingRight = "";
    document.documentElement.style.overflow = "unset";

    return () => {
      // Cleanup para garantir que o scroll permaneça habilitado
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "";
      document.documentElement.style.overflow = "unset";
    };
  }, []);

  // Navegar para a página de adicionar saldo
  const handleNavigateToBuyCredits = () => {
    router.push("/carteira");
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? "hora" : "horas"} atrás`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} ${diffDays === 1 ? "dia" : "dias"} atrás`;
    }
  };

  const handleBuyCredits = (packageId: string) => {
    // Simulação de compra de créditos
    const selectedPackage = creditPackages.find((pkg) => pkg.id === packageId);
    if (!selectedPackage) return;

    const newCredits = userData.credits + selectedPackage.credits;

    // Atualizar dados do usuário no localStorage
    const updatedUser = {
      ...userData,
      credits: newCredits,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUserData(updatedUser);

    alert(`Parabéns! Você adquiriu ${selectedPackage.credits} créditos.`);
  };

  const handleToggleFavorite = (model: any) => {
    const favorites = JSON.parse(
      localStorage.getItem("favoriteModels") || "[]",
    );
    const isFavorite = favorites.some((fav: any) => fav.id === model.id);

    if (isFavorite) {
      // Remover dos favoritos
      const updatedFavorites = favorites.filter(
        (fav: any) => fav.id !== model.id,
      );
      localStorage.setItem("favoriteModels", JSON.stringify(updatedFavorites));
      setFavoriteModels(updatedFavorites);
    } else {
      // Adicionar aos favoritos (caso não esteja)
      const favoriteModel = {
        id: model.id,
        name: model.nome || model.name,
        online: model.online,
        lastSeen: new Date(),
        category: model.categorias?.[0] || model.category || "Conversa",
        photo: model.fotoPerfil || model.photo,
        rating: model.avaliacoes || model.rating || 4.5,
        pricePerMinute: model.valorPorMinuto || model.pricePerMinute || 0,
        destacado: model.destacado || false,
      };
      const updatedFavorites = [...favorites, favoriteModel];
      localStorage.setItem("favoriteModels", JSON.stringify(updatedFavorites));
      setFavoriteModels(updatedFavorites);
    }
  };

  const handleOpenModal = (model: any) => {
    // Implemente a lógica para abrir o modal com o modelo selecionado
  };

  const handleSavePreferences = (preferences: UserPreferences) => {
    // Salvar preferências no localStorage
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
    setUserPreferences(preferences);
    setShowPreferencesModal(false);
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Painel do Usuário | Camera Real</title>
        <meta
          name="description"
          content="Gerencie sua conta e créditos na Camera Real"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Header />

        <main className="px-3 sm:px-4 pt-16 sm:pt-20 pb-6 sm:pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 min-h-0">
              {/* Sidebar */}
              <aside className="w-full lg:w-80 lg:flex-shrink-0">
                {/* User Card */}
                <div className="bg-gray-900 rounded-xl p-4 sm:p-6 mb-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-700 flex items-center justify-center mb-4 overflow-hidden flex-shrink-0">
                      {userData.photo && userData.photo !== "/images/default-avatar.png" ? (
                        <Image
                          src={userData.photo}
                          alt="Foto de perfil"
                          width={96}
                          height={96}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                          <span className="text-white text-xl sm:text-2xl font-bold">
                            {userData.name?.charAt(0).toUpperCase() || userData.username?.charAt(0).toUpperCase() || "U"}
                          </span>
                        </div>
                      )}
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
                      Olá, {userData.name || "Usuário"}!
                    </h2>
                    <p className="text-sm text-gray-400 mb-4 break-all">
                      {userData.email || "teste@camera.real"}
                    </p>

                    {/* Credits Card */}
                    <div className="w-full bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm border border-gray-600/50 hover:border-[#F25790]/50 rounded-xl p-4 mb-4 transition-all duration-200 hover:bg-gray-700/70 group">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-medium text-sm">
                          Seus créditos:
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="relative w-4 h-4">
                            {/* Ícone branco padrão */}
                            <Image
                              src="/icons/action/account_balance_wallet.svg"
                              alt="Créditos"
                              width={16}
                              height={16}
                              className="w-4 h-4 filter brightness-0 invert absolute top-0 left-0 group-hover:opacity-0 transition-opacity duration-200"
                            />

                            {/* Ícone rosa no hover */}
                            <Image
                              src="/icons/action/account_balance_wallet.svg"
                              alt="Créditos"
                              width={16}
                              height={16}
                              className="w-4 h-4 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                              style={{filter: 'brightness(0) saturate(100%) invert(25%) sepia(91%) saturate(7494%) hue-rotate(326deg) brightness(91%) contrast(96%)'}}
                            />
                          </div>
                          <span className="text-white font-medium text-lg">
                            {userData?.credits || 200000}
                          </span>
                          <span className="text-gray-300 text-xs">
                            Créditos
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => router.push("/carteira")}
                        className="w-full py-3 bg-gradient-to-r from-[#F25790]/40 to-[#d93d75]/40 hover:from-[#F25790]/60 hover:to-[#d93d75]/60 text-white font-bold rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(242,87,144,0.4)] hover:shadow-[0_0_25px_rgba(242,87,144,0.6)] hover:scale-105 active:scale-95 border border-[#F25790]/30"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Image
                            src="/icons/action/account_balance_wallet.svg"
                            alt="Comprar créditos"
                            width={16}
                            height={16}
                            className="w-4 h-4 filter brightness-0 invert"
                          />
                          <span>Comprar créditos</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Menu de Navegação */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4">Ações Rápidas</h3>
                  <div className="space-y-2">
                    <Link
                      href="/carteira"
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition-all group"
                    >
                      <Image
                        src="/icons/action/account_balance_wallet.svg"
                        alt="Carteira"
                        width={20}
                        height={20}
                        className="w-5 h-5 filter brightness-0 invert"
                      />
                      <span className="group-hover:text-[#F25790] transition-colors">
                        Carteira
                      </span>
                    </Link>

                    <Link
                      href="/explorar"
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition-all group"
                    >
                      <Image
                        src="/icons/action/explore.svg"
                        alt="Explorar"
                        width={20}
                        height={20}
                        className="w-5 h-5 filter brightness-0 invert"
                      />
                      <span className="group-hover:text-[#F25790] transition-colors">
                        Explorar Modelos
                      </span>
                    </Link>

                    <button
                      onClick={() => setShowEditProfileModal(true)}
                      className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition-all group text-left"
                    >
                      <Image
                        src="/icons/action/account_circle.svg"
                        alt="Editar Perfil"
                        width={20}
                        height={20}
                        className="w-5 h-5 filter brightness-0 invert"
                      />
                      <span className="group-hover:text-[#F25790] transition-colors">
                        Editar Perfil
                      </span>
                    </button>

                    <button
                      onClick={() => setShowConfigModal(true)}
                      className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition-all group text-left"
                    >
                      <Image
                        src="/icons/action/settings.svg"
                        alt="Configurações"
                        width={20}
                        height={20}
                        className="w-5 h-5 filter brightness-0 invert"
                      />
                      <span className="group-hover:text-[#F25790] transition-colors">
                        Configurações
                      </span>
                    </button>

                    <button
                      onClick={() => setShowPreferencesModal(true)}
                      className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition-all group text-left"
                    >
                      <Image
                        src="/icons/action/tune.svg"
                        alt="Preferências"
                        width={20}
                        height={20}
                        className="w-5 h-5 filter brightness-0 invert"
                      />
                      <span className="group-hover:text-[#F25790] transition-colors">
                        Editar Preferências
                      </span>
                    </button>

                    <Link
                      href="/chat-video"
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition-all group"
                    >
                      <Image
                        src="/icons/audio_video/videocam.svg"
                        alt="Iniciar Chat"
                        width={20}
                        height={20}
                        className="w-5 h-5 filter brightness-0 invert"
                      />
                      <span className="group-hover:text-[#F25790] transition-colors">
                        Iniciar Chat
                      </span>
                    </Link>
                  </div>
                </div>
              </aside>

              {/* Conteúdo Principal */}
              <div className="flex-1 space-y-8">
                {/* Cards de Estatísticas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-[#F25790] transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3">
                        <Image
                          src="/icons/action/account_balance_wallet.svg"
                          alt="Créditos"
                          width={24}
                          height={24}
                          className="w-6 h-6 filter brightness-0 invert"
                        />
                      </div>
                      <span className="text-3xl font-bold text-[#F25790]">
                        {userData.credits || 200000}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">Créditos</h3>
                    <p className="text-gray-400 text-sm">Disponíveis</p>
                  </div>

                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-[#F25790] transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3">
                        <Image
                          src="/icons/action/favorite.svg"
                          alt="Favoritos"
                          width={24}
                          height={24}
                          className="w-6 h-6 filter brightness-0 invert"
                        />
                      </div>
                      <span className="text-3xl font-bold text-yellow-500">
                        {favoriteModels.length}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">Favoritos</h3>
                    <p className="text-gray-400 text-sm">Modelos salvos</p>
                  </div>

                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-[#F25790] transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3">
                        <Image
                          src="/icons/communication/chat.svg"
                          alt="Conversas"
                          width={24}
                          height={24}
                          className="w-6 h-6 filter brightness-0 invert"
                        />
                      </div>
                      <span className="text-3xl font-bold text-blue-500">
                        {recentChats.length}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">Conversas</h3>
                    <p className="text-gray-400 text-sm">Chats realizados</p>
                  </div>
                </div>

                {/* Modelos Favoritos */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Modelos Favoritos</h2>
                    <Link
                      href="/favoritos"
                      className="text-[#F25790] hover:text-[#d93d75] text-sm font-medium transition-colors"
                    >
                      Ver todos
                    </Link>
                  </div>

                  {favoriteModels.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {favoriteModels.map((model) => (
                        <ModelCard
                          key={model.id}
                          model={model}
                          isLoggedIn={true}
                          favoriteModels={favoriteModels.map((m) => m.id)}
                          onToggleFavorite={handleToggleFavorite}
                          onOpenModal={handleOpenModal}
                          size="small"
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
                      <h3 className="text-xl font-semibold mb-2">
                        Nenhum favorito ainda
                      </h3>
                      <p className="text-gray-400 mb-6">
                        Explore nossos modelos e adicione seus favoritos
                      </p>
                      <Link
                        href="/explorar"
                        className="bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-3 px-8 rounded-xl transition-colors inline-block"
                      >
                        Explorar Modelos
                      </Link>
                    </div>
                  )}
                </div>

                {/* Conversas Recentes */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Conversas Recentes</h2>
                    <Link
                      href="/historico"
                      className="text-[#F25790] hover:text-[#d93d75] font-medium flex items-center transition-colors"
                    >
                      Ver histórico completo
                      <Image
                        src="/icons/navigation/chevron_right.svg"
                        alt="Seta"
                        width={16}
                        height={16}
                        className="w-4 h-4 ml-1 filter brightness-0 invert"
                      />
                    </Link>
                  </div>

                  {recentChats.length > 0 ? (
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                      {/* Mobile: Cards Layout */}
                      <div className="block md:hidden">
                        {recentChats.map((chat) => (
                          <div
                            key={chat.id}
                            className="border-b border-gray-800 last:border-b-0 p-4"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <Link
                                href={`/modelo/${chat.modelId}`}
                                className="font-medium hover:text-[#F25790] transition-colors"
                              >
                                {chat.modelName}
                              </Link>
                              <span className="text-[#F25790] font-semibold text-sm">
                                {chat.cost}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
                              <span>{formatDate(chat.date)}</span>
                              <span>{chat.duration} min</span>
                            </div>
                            <Link href={`/chat-video?id=${chat.modelId}`}>
                              <button className="w-full bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-2 rounded-lg text-sm transition-colors">
                                Conversar
                              </button>
                            </Link>
                          </div>
                        ))}
                      </div>

                      {/* Desktop: Table Layout */}
                      <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-800 bg-gray-800 bg-opacity-50">
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                                Modelo
                              </th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                                Data
                              </th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                                Duração
                              </th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                                Créditos
                              </th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                                Ação
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentChats.map((chat) => (
                              <tr
                                key={chat.id}
                                className="border-b border-gray-800 hover:bg-gray-800 hover:bg-opacity-30 transition-colors"
                              >
                                <td className="px-6 py-4">
                                  <Link
                                    href={`/modelo/${chat.modelId}`}
                                    className="font-medium hover:text-[#F25790] transition-colors"
                                  >
                                    {chat.modelName}
                                  </Link>
                                </td>
                                <td className="px-6 py-4 text-gray-400 text-sm">
                                  {formatDate(chat.date)}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                  {chat.duration} min
                                </td>
                                <td className="px-6 py-4 text-[#F25790] font-semibold text-sm">
                                  {chat.cost}
                                </td>
                                <td className="px-6 py-4">
                                  <Link href={`/chat-video?id=${chat.modelId}`}>
                                    <button className="bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors">
                                      Conversar
                                    </button>
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
                      <div className="p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                        <Image
                          src="/icons/communication/chat_bubble_outline.svg"
                          alt="Sem conversas"
                          width={32}
                          height={32}
                          className="w-8 h-8 filter brightness-0 invert"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Nenhuma conversa ainda
                      </h3>
                      <p className="text-gray-400 mb-6">
                        Comece a conversar com nossos modelos
                      </p>
                      <Link
                        href="/explorar"
                        className="bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-3 px-8 rounded-xl transition-colors inline-block"
                      >
                        Explorar Modelos
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {/* Modal de Preferências do Usuário */}
      <UserPreferencesModal
        isOpen={showPreferencesModal}
        onClose={() => setShowPreferencesModal(false)}
        onSavePreferences={handleSavePreferences}
      />

      {/* Modal de Configurações */}
      <ConfiguracoesModal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
      />

      {/* Modal de Edição de Perfil */}
      <EditarPerfilModal
        isOpen={showEditProfileModal}
        onClose={() => setShowEditProfileModal(false)}
        profileData={{
          name: userData.name,
          username: userData.username,
          profilePic: userData.photo,
          bio: (userData as any).bio || ""
        }}
        onSave={(data) => {
          const updatedUser = {
            ...userData,
            ...data
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUserData(updatedUser);
          
          // Disparar evento para atualizar outros componentes
          window.dispatchEvent(new Event("userDataUpdated"));
        }}
      />
    </>
  );
}
