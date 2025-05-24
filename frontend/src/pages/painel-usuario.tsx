import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PainelUsuario() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    isLoggedIn: false,
    credits: 0,
    photo: '',
    favoriteModels: [],
    recentChats: []
  });

  // Mock de dados para modelos favoritos
  const favoriteModels = [
    { id: 'm1', name: 'Ana Silva', online: true, lastSeen: new Date(), category: 'Conversa' },
    { id: 'm2', name: 'Julia Santos', online: false, lastSeen: new Date(Date.now() - 8 * 60 * 60 * 1000), category: 'Dança' },
    { id: 'm3', name: 'Marina Oliveira', online: true, lastSeen: new Date(), category: 'Fetiche' }
  ];

  // Mock de dados para conversas recentes
  const recentChats = [
    { id: 'c1', modelId: 'm1', modelName: 'Ana Silva', date: new Date(Date.now() - 2 * 60 * 60 * 1000), duration: 15, cost: 35 },
    { id: 'c2', modelId: 'm4', modelName: 'Fernanda Lima', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), duration: 25, cost: 60 },
    { id: 'c3', modelId: 'm2', modelName: 'Julia Santos', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), duration: 10, cost: 20 }
  ];

  // Mock de dados para pacotes de créditos
  const creditPackages = [
    { id: 'p1', name: 'Básico', credits: 100, price: 50, popular: false },
    { id: 'p2', name: 'Premium', credits: 400, price: 150, discount: '33%', popular: true },
    { id: 'p3', name: 'Master', credits: 1000, price: 300, discount: '50%', popular: false }
  ];

  // Verificar se o usuário está logado ao carregar a página
  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      try {
        const parsedUser = JSON.parse(userStorage);
        if (parsedUser.isLoggedIn) {
          setUserData({
            ...parsedUser,
            favoriteModels,
            recentChats
          });
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

  // Navegar para a página de adicionar saldo
  const handleNavigateToBuyCredits = () => {
    router.push('/comprar-creditos');
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hora' : 'horas'} atrás`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} ${diffDays === 1 ? 'dia' : 'dias'} atrás`;
    }
  };

  const handleBuyCredits = (packageId: string) => {
    // Simulação de compra de créditos
    const selectedPackage = creditPackages.find(pkg => pkg.id === packageId);
    if (!selectedPackage) return;
    
    const newCredits = userData.credits + selectedPackage.credits;
    
    // Atualizar dados do usuário no localStorage
    const updatedUser = {
      ...userData,
      credits: newCredits
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUserData(updatedUser);
    
    alert(`Parabéns! Você adquiriu ${selectedPackage.credits} créditos.`);
  };

  return (
    <>
      <Head>
        <title>Painel do Usuário | Camera Real</title>
        <meta name="description" content="Gerencie sua conta e créditos na Camera Real" />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Header />
        
        <main className="container mx-auto px-4 py-8 mt-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-black bg-opacity-70 border border-gray-800 rounded-xl p-6 sticky top-20">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    {userData.photo ? (
                      <Image 
                        src={userData.photo} 
                        alt={userData.name} 
                        width={60} 
                        height={60}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-[60px] h-[60px] bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-300">{userData.name ? userData.name.charAt(0).toUpperCase() : '?'}</span>
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{userData.name}</h2>
                    <p className="text-gray-400 text-sm">{userData.email}</p>
                  </div>
                </div>
                
                <div className="mb-6 bg-gradient-to-r from-[#F25790] to-[#9747FF] bg-opacity-10 rounded-lg p-4 border border-[#F25790] border-opacity-20 shadow-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white">Seus créditos:</span>
                    <span className="text-2xl font-bold text-white">{userData.credits}</span>
                  </div>
                  <button onClick={handleNavigateToBuyCredits} className="block w-full bg-white hover:bg-gray-100 text-[#F25790] font-bold py-2 rounded-full text-center transition-colors">
                    Comprar créditos
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Link href="/carteira" className="bg-black bg-opacity-70 border border-gray-800 rounded-lg p-4 hover:border-[#F25790] transition-all">
                    <div className="flex items-center mb-2">
                      <div className="bg-[#F25790] bg-opacity-20 p-2 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#F25790]">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                        </svg>
                      </div>
                      <span className="font-medium">Carteira</span>
                    </div>
                    <p className="text-sm text-gray-400 pl-10">Gerencie seus créditos e histórico de compras</p>
                  </Link>
                  
                  <Link href="/editar-perfil" className="bg-black bg-opacity-70 border border-gray-800 rounded-lg p-4 hover:border-[#F25790] transition-all">
                    <div className="flex items-center mb-2">
                      <div className="bg-[#F25790] bg-opacity-20 p-2 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#F25790]">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </div>
                      <span className="font-medium">Editar Perfil</span>
                    </div>
                    <p className="text-sm text-gray-400 pl-10">Atualize suas informações pessoais</p>
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Link href="/explorar" className="bg-black bg-opacity-70 border border-gray-800 rounded-lg p-4 hover:border-[#F25790] transition-all">
                    <div className="flex items-center mb-2">
                      <div className="bg-[#F25790] bg-opacity-20 p-2 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#F25790]">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                      </div>
                      <span className="font-medium">Explorar</span>
                    </div>
                    <p className="text-sm text-gray-400 pl-10">Descubra novos modelos e categorias</p>
                  </Link>
                  
                  <Link href="/chat-video" className="bg-black bg-opacity-70 border border-gray-800 rounded-lg p-4 hover:border-[#F25790] transition-all">
                    <div className="flex items-center mb-2">
                      <div className="bg-[#F25790] bg-opacity-20 p-2 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#F25790]">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                      </div>
                      <span className="font-medium">Iniciar Chat</span>
                    </div>
                    <p className="text-sm text-gray-400 pl-10">Converse com modelos em tempo real</p>
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <Link href="/configuracoes" className="bg-black bg-opacity-70 border border-gray-800 rounded-lg p-4 hover:border-[#F25790] transition-all">
                    <div className="flex items-center mb-2">
                      <div className="bg-[#F25790] bg-opacity-20 p-2 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#F25790]">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="font-medium">Configurações</span>
                    </div>
                    <p className="text-sm text-gray-400 pl-10">Personalize sua experiência na plataforma</p>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:w-3/4">
              <h1 className="text-3xl font-bold mb-8">Painel do Usuário</h1>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-black bg-opacity-70 border border-gray-800 rounded-xl p-6">
                  <div className="flex items-center mb-2">
                    <div className="bg-[#F25790] bg-opacity-20 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#F25790]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-medium">Créditos</h3>
                  </div>
                  <p className="text-2xl font-bold text-[#F25790]">{userData.credits}</p>
                  <p className="text-sm text-gray-400 mt-1">Disponíveis</p>
                </div>
                
                <div className="bg-black bg-opacity-70 border border-gray-800 rounded-xl p-6">
                  <div className="flex items-center mb-2">
                    <div className="bg-[#F25790] bg-opacity-20 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#F25790]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </div>
                    <h3 className="font-medium">Favoritos</h3>
                  </div>
                  <p className="text-2xl font-bold">{favoriteModels.length}</p>
                  <p className="text-sm text-gray-400 mt-1">Modelos salvos</p>
                </div>
                
                <div className="bg-black bg-opacity-70 border border-gray-800 rounded-xl p-6">
                  <div className="flex items-center mb-2">
                    <div className="bg-[#F25790] bg-opacity-20 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#F25790]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-medium">Conversas</h3>
                  </div>
                  <p className="text-2xl font-bold">{recentChats.length}</p>
                  <p className="text-sm text-gray-400 mt-1">Chats realizados</p>
                </div>
              </div>
              
              {/* Favorite Models Section */}
              <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Modelos Favoritos</h2>
                  <Link href="/favoritos" className="text-[#F25790] hover:underline text-sm flex items-center">
                    Ver todos
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                </div>
                
                {favoriteModels.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {favoriteModels.map(model => (
                      <div key={model.id} className="bg-black bg-opacity-70 border border-gray-800 rounded-xl overflow-hidden hover:border-[#F25790] transition-all">
                        <div className="relative aspect-[3/4] bg-black">
                          <div className="absolute inset-0 bg-gradient-to-t from-[#00000090] via-transparent to-[#00000060]"></div>
                          
                          <div className={`absolute top-3 right-3 flex items-center ${model.online ? 'text-green-500' : 'text-gray-500'}`}>
                            <div className={`w-3 h-3 rounded-full mr-1 ${model.online ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                            <span className="text-xs font-medium">{model.online ? 'Online' : 'Offline'}</span>
                          </div>
                          
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-xl font-bold text-white mb-1">{model.name}</h3>
                            <p className="text-sm text-gray-300">{model.category}</p>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-400">
                              {model.online ? 'Agora' : `Visto ${formatDate(model.lastSeen)}`}
                            </div>
                            <Link href={`/chat-video?id=${model.id}`}>
                              <button className="bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-2 px-4 rounded-full text-sm transition-colors">
                                {model.online ? 'Conversar' : 'Ver perfil'}
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-black bg-opacity-70 border border-gray-800 rounded-xl p-8 text-center">
                    <p className="text-gray-400 mb-4">Você ainda não tem modelos favoritos</p>
                    <Link href="/explorar" className="bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-2 px-6 rounded-full text-sm transition-colors inline-block">
                      Explorar modelos
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Recent Chats Section */}
              <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Conversas Recentes</h2>
                  <Link href="/historico" className="text-[#F25790] hover:underline text-sm flex items-center">
                    Ver histórico completo
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                </div>
                
                {recentChats.length > 0 ? (
                  <div className="bg-black bg-opacity-70 border border-gray-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-800">
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Modelo</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Data</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Duração</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Créditos</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Ação</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentChats.map(chat => (
                            <tr key={chat.id} className="border-b border-gray-800 hover:bg-white hover:bg-opacity-5">
                              <td className="px-4 py-3">
                                <Link href={`/modelo/${chat.modelId}`} className="font-medium hover:text-[#F25790]">
                                  {chat.modelName}
                                </Link>
                              </td>
                              <td className="px-4 py-3 text-gray-400">{formatDate(chat.date)}</td>
                              <td className="px-4 py-3">{chat.duration} min</td>
                              <td className="px-4 py-3 text-[#F25790]">{chat.cost}</td>
                              <td className="px-4 py-3">
                                <Link href={`/chat-video?id=${chat.modelId}`}>
                                  <button className="bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-1 px-3 rounded-full text-xs transition-colors">
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
                  <div className="bg-black bg-opacity-70 border border-gray-800 rounded-xl p-8 text-center">
                    <p className="text-gray-400 mb-4">Você ainda não realizou nenhuma conversa</p>
                    <Link href="/explorar" className="bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-2 px-6 rounded-full text-sm transition-colors inline-block">
                      Explorar modelos
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Credit Packages Section */}
              <div id="credit-packages" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Adicionar saldo</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {creditPackages.map(pkg => (
                    <div 
                      key={pkg.id} 
                      className={`bg-black bg-opacity-70 ${pkg.popular ? 'border-2 border-[#F25790]' : 'border border-gray-800'} rounded-xl p-6 relative ${pkg.popular ? 'transform hover:scale-105' : 'hover:border-[#F25790]'} transition-all`}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#F25790] text-white text-sm font-bold px-3 py-1 rounded-full">
                          MAIS POPULAR
                        </div>
                      )}
                      
                      <h3 className="text-xl font-bold mb-2 mt-2">Pacote {pkg.name}</h3>
                      <div className="text-3xl font-bold text-[#F25790] mb-2">R$ {pkg.price}</div>
                      <p className="text-sm text-gray-400 mb-4">
                        {pkg.credits} créditos 
                        {pkg.discount && <span className="text-white font-bold ml-2">({pkg.discount} de desconto)</span>}
                      </p>
                      
                      <button 
                        onClick={() => handleBuyCredits(pkg.id)}
                        className={`w-full ${pkg.popular ? 'bg-[#F25790] hover:bg-[#d93d75] text-white' : 'bg-white hover:bg-gray-200 text-black'} font-medium py-2 rounded-full transition-colors`}
                      >
                        Comprar Agora
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
