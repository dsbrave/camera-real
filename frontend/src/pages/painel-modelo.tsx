import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PainelModelo() {
  const router = useRouter();
  const [modelData, setModelData] = useState({
    name: '',
    email: '',
    isLoggedIn: false,
    isModel: true,
    photo: '',
    earnings: 0,
    totalSessions: 0,
    rating: 4.5,
    online: false,
    phone: '',
    username: ''
  });
  const [recentSessions, setRecentSessions] = useState<any[]>([]);
  const [earningsHistory, setEarningsHistory] = useState<any[]>([]);

  // Mock de dados para sessões recentes
  const recentSessionsMock = [
    { id: 's1', userId: 'u1', userName: 'João Silva', date: new Date(Date.now() - 2 * 60 * 60 * 1000), duration: 15, earnings: 35 },
    { id: 's2', userId: 'u4', userName: 'Maria Santos', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), duration: 25, earnings: 60 },
    { id: 's3', userId: 'u2', userName: 'Pedro Costa', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), duration: 10, earnings: 20 }
  ];

  // Mock de dados para histórico de ganhos
  const earningsHistoryMock = [
    { id: 'e1', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), amount: 120, sessions: 3 },
    { id: 'e2', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), amount: 85, sessions: 2 },
    { id: 'e3', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), amount: 200, sessions: 4 }
  ];

  // Verificar se o modelo está logado ao carregar a página
  useEffect(() => {
    const loadModelData = () => {
      const userStorage = localStorage.getItem('user');
      if (userStorage) {
        try {
          const parsedUser = JSON.parse(userStorage);
          if (parsedUser.isLoggedIn && parsedUser.isModel) {
            setModelData({
              ...parsedUser,
              recentSessions: recentSessionsMock
            });
            setRecentSessions(recentSessionsMock);
            setEarningsHistory(earningsHistoryMock);
          } else {
            router.push('/login');
          }
        } catch (error) {
          console.error('Erro ao carregar dados do modelo:', error);
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    };

    loadModelData();

    // Adiciona listener para o evento customizado de atualização de dados do usuário
    window.addEventListener('userDataUpdated', loadModelData);
    
    return () => {
      window.removeEventListener('userDataUpdated', loadModelData);
    };
  }, [router]);

  useEffect(() => {
    // Garantir que o scroll esteja sempre habilitado
    document.body.style.overflow = 'unset';
    document.body.style.paddingRight = '';
    document.documentElement.style.overflow = 'unset';
    
    return () => {
      // Cleanup para garantir que o scroll permaneça habilitado
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = 'unset';
    };
  }, []);

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

  const toggleOnlineStatus = () => {
    setModelData(prev => ({
      ...prev,
      online: !prev.online
    }));
  };

  if (!modelData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Painel da Modelo | Camera Real</title>
        <meta name="description" content="Gerencie sua conta e sessões na Camera Real" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Header />
        
        <main className="px-3 sm:px-4 pt-16 sm:pt-20 pb-6 sm:pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 min-h-0">
              {/* Sidebar */}
              <aside className="w-full lg:w-80 lg:flex-shrink-0">
                {/* Model Card */}
                <div className="bg-gray-900 rounded-xl p-4 sm:p-6 mb-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-700 flex items-center justify-center mb-4 overflow-hidden flex-shrink-0">
                      {modelData.photo ? (
                        <Image 
                          src={modelData.photo} 
                          alt={modelData.name || 'Modelo'} 
                          width={96} 
                          height={96}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-white text-xl sm:text-2xl font-bold">
                          {modelData.name?.charAt(0) || 'M'}
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
                      Olá, {modelData.name || 'Modelo'}!
                    </h2>
                    <p className="text-sm text-gray-400 mb-4 break-all">
                      {modelData.email || 'modelo@camera.real'}
                    </p>
                    
                    {/* Status Online/Offline */}
                    <div className="flex items-center space-x-2 mb-4">
                      <div className={`w-3 h-3 rounded-full ${modelData.online ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className={`text-sm ${modelData.online ? 'text-green-400' : 'text-red-400'}`}>
                        {modelData.online ? 'Online' : 'Offline'}
                      </span>
                    </div>
                    
                    {/* Toggle Online Status */}
                    <button
                      onClick={toggleOnlineStatus}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        modelData.online 
                          ? 'bg-red-600 hover:bg-red-700 text-white' 
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      {modelData.online ? 'Ficar Offline' : 'Ficar Online'}
                    </button>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4">Ações Rápidas</h3>
                  <div className="space-y-2">
                    <Link href="/financeiro" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition-all group">
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-white"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="white"/>
                      </svg>
                      <span className="group-hover:text-[#F25790] transition-colors">Financeiro</span>
                    </Link>
                    
                    <Link href="/notificacoes" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition-all group">
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-white"
                      >
                        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="white"/>
                      </svg>
                      <span className="group-hover:text-[#F25790] transition-colors">Notificações</span>
                    </Link>
                    
                    <Link href="/configuracoes" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition-all group">
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-white"
                      >
                        <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" fill="white"/>
                      </svg>
                      <span className="group-hover:text-[#F25790] transition-colors">Configurações</span>
                    </Link>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-[#F25790] transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3">
                        <svg 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-white"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="white"/>
                        </svg>
                      </div>
                      <span className="text-3xl font-bold text-[#F25790]">R$ {modelData.earnings || 0}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">Ganhos</h3>
                    <p className="text-gray-400 text-sm">Total recebido</p>
                  </div>
                  
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-[#F25790] transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3">
                        <svg 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-white"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="white"/>
                        </svg>
                      </div>
                      <span className="text-3xl font-bold text-blue-500">{modelData.totalSessions || 0}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">Sessões</h3>
                    <p className="text-gray-400 text-sm">Total realizadas</p>
                  </div>
                  
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-[#F25790] transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3">
                        <svg 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-white"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="white"/>
                        </svg>
                      </div>
                      <span className="text-3xl font-bold text-yellow-500">{modelData.rating || 4.5}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">Avaliação</h3>
                    <p className="text-gray-400 text-sm">Média geral</p>
                  </div>
                </div>

                {/* Recent Sessions */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Sessões Recentes</h2>
                    <Link href="/historico-transacoes" className="text-[#F25790] hover:text-[#d93d75] text-sm font-medium transition-colors">
                      Ver todas
                    </Link>
                  </div>
                  
                  {recentSessions.length > 0 ? (
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                      {/* Mobile: Card Layout */}
                      <div className="block md:hidden">
                        {recentSessions.map(session => (
                          <div key={session.id} className="border-b border-gray-800 last:border-b-0 p-4">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-medium text-white">{session.userName}</span>
                              <span className="text-[#F25790] font-semibold text-sm">R$ {session.earnings}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
                              <span>{formatDate(session.date)}</span>
                              <span>{session.duration} min</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Desktop: Table Layout */}
                      <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-800 bg-gray-800 bg-opacity-50">
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Usuário</th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Data</th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Duração</th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Ganhos</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentSessions.map(session => (
                              <tr key={session.id} className="border-b border-gray-800 last:border-b-0 hover:bg-gray-800 hover:bg-opacity-50 transition-colors">
                                <td className="px-6 py-4 text-white">{session.userName}</td>
                                <td className="px-6 py-4 text-gray-300">{formatDate(session.date)}</td>
                                <td className="px-6 py-4 text-gray-300">{session.duration} min</td>
                                <td className="px-6 py-4 text-[#F25790] font-semibold">R$ {session.earnings}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
                      <div className="p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                        <svg 
                          width="32" 
                          height="32" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-8 h-8 text-gray-400"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Nenhuma sessão ainda</h3>
                      <p className="text-gray-400 mb-6">Fique online para receber chamadas</p>
                      <button
                        onClick={toggleOnlineStatus}
                        className="bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-3 px-8 rounded-xl transition-colors inline-block"
                      >
                        Ficar Online
                      </button>
                    </div>
                  )}
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