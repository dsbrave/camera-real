import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';

interface Notification {
  id: string;
  type: 'sistema' | 'pagamento' | 'videochat' | 'promo';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export default function Notificacoes() {
  // Dados de exemplo para notificações
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '001',
      type: 'pagamento',
      title: 'Pagamento aprovado',
      message: 'Sua transação para carregar sua conta no valor de R$ 100,00 foi aprovada com sucesso!',
      date: '25/07/2024 09:48:35',
      read: false
    },
    {
      id: '002',
      type: 'videochat',
      title: 'Modelo online',
      message: 'Luna Silva está online agora! Aproveite para iniciar um videochat.',
      date: '24/07/2024 18:30:22',
      read: false
    },
    {
      id: '003',
      type: 'sistema',
      title: 'Atualização do sistema',
      message: 'O Camera Real foi atualizado! Confira as novidades na página principal.',
      date: '23/07/2024 10:15:43',
      read: true
    },
    {
      id: '004',
      type: 'promo',
      title: 'Promoção relâmpago',
      message: 'Recarregue hoje e ganhe 20% extra em créditos! Promoção válida apenas hoje.',
      date: '22/07/2024 14:05:33',
      read: true
    },
    {
      id: '005',
      type: 'videochat',
      title: 'Chamada perdida',
      message: 'Você perdeu uma chamada de Maria Santos. Deseja retornar agora?',
      date: '21/07/2024 20:22:10',
      read: true
    }
  ]);

  const [activeFilter, setActiveFilter] = useState<string>('todas');

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const filteredNotifications = activeFilter === 'todas' 
    ? notifications 
    : activeFilter === 'nao-lidas' 
      ? notifications.filter(notification => !notification.read)
      : notifications.filter(notification => notification.type === activeFilter);

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'pagamento':
        return (
          <div className="w-10 h-10 rounded-full bg-green-500 bg-opacity-20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-500">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
            </svg>
          </div>
        );
      case 'videochat':
        return (
          <div className="w-10 h-10 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-500">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
            </svg>
          </div>
        );
      case 'sistema':
        return (
          <div className="w-10 h-10 rounded-full bg-yellow-500 bg-opacity-20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500">
              <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
          </div>
        );
      case 'promo':
        return (
          <div className="w-10 h-10 rounded-full bg-purple-500 bg-opacity-20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-purple-500">
              <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-gray-500 bg-opacity-20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <Layout 
      title="Notificações | Camera Real" 
      description="Suas notificações e alertas no Camera Real"
      showHeader={false}
    >
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Notificações</h1>
              <button 
                onClick={markAllAsRead} 
                className="text-sm text-[#F25790] hover:underline"
              >
                Marcar todas como lidas
              </button>
            </div>
            
            {/* Filtros */}
            <div className="flex overflow-x-auto pb-2 mb-6 gap-2">
              <button 
                onClick={() => setActiveFilter('todas')}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  activeFilter === 'todas' ? 'bg-[#F25790] text-white' : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                }`}
              >
                Todas
              </button>
              <button 
                onClick={() => setActiveFilter('nao-lidas')}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  activeFilter === 'nao-lidas' ? 'bg-[#F25790] text-white' : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                }`}
              >
                Não lidas
              </button>
              <button 
                onClick={() => setActiveFilter('pagamento')}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  activeFilter === 'pagamento' ? 'bg-[#F25790] text-white' : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                }`}
              >
                Pagamentos
              </button>
              <button 
                onClick={() => setActiveFilter('videochat')}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  activeFilter === 'videochat' ? 'bg-[#F25790] text-white' : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                }`}
              >
                Videochats
              </button>
              <button 
                onClick={() => setActiveFilter('sistema')}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  activeFilter === 'sistema' ? 'bg-[#F25790] text-white' : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                }`}
              >
                Sistema
              </button>
              <button 
                onClick={() => setActiveFilter('promo')}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  activeFilter === 'promo' ? 'bg-[#F25790] text-white' : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                }`}
              >
                Promoções
              </button>
            </div>
            
            {/* Lista de notificações */}
            <div className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-block p-4 rounded-full bg-white bg-opacity-10 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Nenhuma notificação encontrada</h3>
                  <p className="text-gray-400">Não há notificações para mostrar com os filtros selecionados.</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`bg-black ${notification.read ? 'bg-opacity-70' : 'bg-opacity-80 border-l-4 border-[#F25790]'} p-4 rounded-lg hover:bg-opacity-90 transition-all`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex gap-4">
                      {getTypeIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold">{notification.title}</h3>
                          {!notification.read && (
                            <span className="inline-block w-2 h-2 rounded-full bg-[#F25790]"></span>
                          )}
                        </div>
                        <p className="text-gray-300 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{notification.date}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
