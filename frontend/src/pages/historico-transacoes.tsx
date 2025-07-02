import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';

interface Transaction {
  id: string;
  date: string;
  type: 'entrada' | 'saida';
  description: string;
  value: number;
  status: 'concluido' | 'pendente' | 'recusado';
}

export default function HistoricoTransacoes() {
  // Dados de exemplo para histórico de transações
  const transactions: Transaction[] = [
    {
      id: '66A24-9A3A0-C76-987',
      date: '25/07/2024 09:48:35',
      type: 'entrada',
      description: 'Recarga via PIX',
      value: 100.00,
      status: 'concluido'
    },
    {
      id: '55B13-8B2C1-D45-654',
      date: '20/07/2024 15:30:22',
      type: 'saida',
      description: 'Videochat com Luna Silva',
      value: 50.00,
      status: 'concluido'
    },
    {
      id: '44C02-7D1B2-E34-321',
      date: '15/07/2024 10:15:43',
      type: 'entrada',
      description: 'Recarga via PIX',
      value: 200.00,
      status: 'concluido'
    },
    {
      id: '33D91-6E0A3-F23-789',
      date: '10/07/2024 18:22:10',
      type: 'saida',
      description: 'Videochat com Maria Santos',
      value: 75.00,
      status: 'concluido'
    },
    {
      id: '22E80-5F9B4-G12-456',
      date: '05/07/2024 14:05:33',
      type: 'entrada',
      description: 'Estorno - Videochat cancelado',
      value: 30.00,
      status: 'concluido'
    }
  ];

  return (
    <Layout 
      title="Histórico de Transações | Camera Real" 
      description="Acompanhe seu histórico de transações no Camera Real"
      showHeader={false}
    >
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Histórico de Transações</h1>
            
            {/* Filtros */}
            <div className="bg-black bg-opacity-70 p-4 rounded-lg mb-6 flex flex-wrap gap-4">
              <div className="flex-grow min-w-[200px]">
                <label htmlFor="dateRange" className="block mb-1 text-sm">Período</label>
                <select id="dateRange" className="input-field h-10 text-sm">
                  <option value="30days">Últimos 30 dias</option>
                  <option value="90days">Últimos 90 dias</option>
                  <option value="year">Este ano</option>
                  <option value="all">Todo o histórico</option>
                </select>
              </div>
              <div className="flex-grow min-w-[200px]">
                <label htmlFor="type" className="block mb-1 text-sm">Tipo</label>
                <select id="type" className="input-field h-10 text-sm">
                  <option value="all">Todos</option>
                  <option value="entrada">Entradas</option>
                  <option value="saida">Saídas</option>
                </select>
              </div>
              <div className="flex-grow min-w-[200px]">
                <label htmlFor="status" className="block mb-1 text-sm">Status</label>
                <select id="status" className="input-field h-10 text-sm">
                  <option value="all">Todos</option>
                  <option value="concluido">Concluído</option>
                  <option value="pendente">Pendente</option>
                  <option value="recusado">Recusado</option>
                </select>
              </div>
            </div>
            
            {/* Lista de transações */}
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div 
                  key={transaction.id} 
                  className="bg-black bg-opacity-70 p-4 rounded-lg border border-gray-800 hover:border-[#F25790] transition-colors"
                >
                  <div className="flex flex-wrap justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'entrada' ? 'bg-green-500 bg-opacity-20' : 'bg-red-500 bg-opacity-20'
                      }`}>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="currentColor" 
                          className={`w-6 h-6 ${
                            transaction.type === 'entrada' ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {transaction.type === 'entrada' 
                            ? <path d="M12 4V20M12 4L18 10M12 4L6 10" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            : <path d="M12 20V4M12 20L18 14M12 20L6 14" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          }
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">{transaction.description}</h3>
                        <p className="text-sm text-gray-400">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right mt-2 sm:mt-0">
                      <p className={`font-bold ${
                        transaction.type === 'entrada' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {transaction.type === 'entrada' ? '+' : '-'} R$ {transaction.value.toFixed(2)}
                      </p>
                      <p className="text-sm">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          transaction.status === 'concluido' ? 'bg-green-500 bg-opacity-20 text-green-500' :
                          transaction.status === 'pendente' ? 'bg-yellow-500 bg-opacity-20 text-yellow-500' :
                          'bg-red-500 bg-opacity-20 text-red-500'
                        }`}>
                          {transaction.status === 'concluido' ? 'Concluído' :
                           transaction.status === 'pendente' ? 'Pendente' : 'Recusado'}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-800 text-sm text-gray-400">
                    <p>ID: {transaction.id}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Paginação */}
            <div className="mt-8 flex justify-center">
              <div className="flex space-x-2">
                <button className="btn-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-[#F25790] text-white flex items-center justify-center">1</button>
                <button className="btn-icon">2</button>
                <button className="btn-icon">3</button>
                <button className="btn-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
