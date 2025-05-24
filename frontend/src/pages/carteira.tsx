import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutController from '../components/checkout/CheckoutController';

const Carteira: React.FC = () => {
  const router = useRouter();
  const { pagamento } = router.query;
  
  const [isAddCreditsModalOpen, setIsAddCreditsModalOpen] = useState(false);
  const [saldoAtual, setSaldoAtual] = useState(0);
  const [transacoes, setTransacoes] = useState([
    { data: '22/05/2025', tipo: 'Adição de créditos', valor: 'R$ 100,00', saldoFinal: 'R$ 150,00' },
    { data: '20/05/2025', tipo: 'Chat privado com Julia', valor: 'R$ 50,00-', saldoFinal: 'R$ 50,00' },
    { data: '15/05/2025', tipo: 'Adição de créditos', valor: 'R$ 50,00', saldoFinal: 'R$ 100,00' },
    { data: '10/05/2025', tipo: 'Chat privado com Amanda', valor: 'R$ 30,00-', saldoFinal: 'R$ 50,00' },
    { data: '05/05/2025', tipo: 'Adição de créditos', valor: 'R$ 80,00', saldoFinal: 'R$ 80,00' },
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSucessoBanner, setShowSucessoBanner] = useState(false);
  
  useEffect(() => {
    // Verifica se o usuário está logado
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      try {
        const userData = JSON.parse(userStorage);
        setIsLoggedIn(!!userData.isLoggedIn);
        setSaldoAtual(userData.credits || 0);
      } catch (error) {
        console.error('Erro ao verificar login:', error);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
    
    // Verifica se a página foi carregada após um pagamento bem-sucedido
    if (pagamento === 'sucesso') {
      setShowSucessoBanner(true);
      // Esconde o banner após 5 segundos
      const timer = setTimeout(() => {
        setShowSucessoBanner(false);
        router.replace('/carteira', undefined, { shallow: true });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [pagamento, router]);

  const handleAddCredits = (amount: number) => {
    const novoSaldo = saldoAtual + amount;
    setSaldoAtual(novoSaldo);
    
    // Adiciona transação ao histórico
    const novaTransacao = {
      data: new Date().toLocaleDateString('pt-BR'),
      tipo: 'Adição de créditos',
      valor: `R$ ${amount.toFixed(2).replace('.', ',')}`,
      saldoFinal: `R$ ${novoSaldo.toFixed(2).replace('.', ',')}`,
    };
    
    setTransacoes([novaTransacao, ...transacoes]);
    
    // Atualiza os créditos no localStorage
    try {
      const userStorage = localStorage.getItem('user');
      if (userStorage) {
        const userData = JSON.parse(userStorage);
        const updatedUser = {
          ...userData,
          credits: novoSaldo
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Erro ao atualizar créditos:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Carteira | Camera Real</title>
        <meta name="description" content="Gerencie seus créditos e compras" />
      </Head>

      <div className="min-h-screen text-white page-with-bg-image" style={{ background: 'linear-gradient(135deg, #1a0033 0%, #330033 50%, #220022 100%)' }}>
        <Header />
        
        <main className="container mx-auto px-4 pt-32 pb-8 content-after-header">
          {/* Banner de sucesso */}
          {showSucessoBanner && (
            <div className="mb-6 bg-[#1a8a3d] rounded-lg p-4 flex items-center shadow-lg animate-fade-in">
              <div className="mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold">Pagamento realizado com sucesso!</p>
                <p className="text-white text-sm">Seus créditos foram adicionados à sua conta.</p>
              </div>
            </div>
          )}
          
          <h1 className="text-4xl font-bold mb-8">Minha Carteira</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Card de Saldo */}
            <div className="bg-black bg-opacity-80 border border-gray-800 rounded-lg p-6 col-span-1">
              <h2 className="text-xl font-medium mb-2">Seu saldo atual</h2>
              <p className="text-4xl font-bold mb-4 text-[#F25790]">R$ {saldoAtual.toFixed(2).replace('.', ',')}</p>
              <button 
                onClick={() => setIsAddCreditsModalOpen(true)}
                className="w-full flex items-center justify-center px-4 py-2 bg-[#F25790] hover:bg-[#d93d75] text-white rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Adicionar saldo
              </button>
            </div>

            {/* Card de Benefícios */}
            <div className="bg-black bg-opacity-80 border border-gray-800 rounded-lg p-6 col-span-2">
              <h2 className="text-xl font-medium mb-4">Benefícios da carteira</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-[#F25790] bg-opacity-20 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#F25790]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Chat privado com modelos</h3>
                    <p className="text-sm text-gray-400">Converse diretamente com os modelos em um ambiente privado.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#F25790] bg-opacity-20 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#F25790]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Acesso a shows exclusivos</h3>
                    <p className="text-sm text-gray-400">Assista a apresentações únicas de nossos modelos.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#F25790] bg-opacity-20 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#F25790]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Presentes virtuais</h3>
                    <p className="text-sm text-gray-400">Envie presentes para demonstrar seu carinho pelos modelos.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Histórico de Transações */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Histórico de transações</h2>
            <div className="bg-black bg-opacity-80 border border-gray-800 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="py-3 px-4">Data</th>
                    <th className="py-3 px-4">Descrição</th>
                    <th className="py-3 px-4">Valor</th>
                    <th className="py-3 px-4">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {transacoes.map((transacao, index) => (
                    <tr key={index} className="border-t border-gray-800">
                      <td className="py-3 px-4">{transacao.data}</td>
                      <td className="py-3 px-4">{transacao.tipo}</td>
                      <td className="py-3 px-4" style={{ color: transacao.valor.includes('-') ? '#ff6b6b' : '#4cd964' }}>
                        {transacao.valor}
                      </td>
                      <td className="py-3 px-4">{transacao.saldoFinal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pacotes de Crédito */}
          <h2 className="text-2xl font-bold mb-6">Comprar créditos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Pacote Básico */}
            <div className="bg-black bg-opacity-80 border border-gray-800 rounded-lg p-6 hover:shadow-xl transition-shadow">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs bg-[#F25790] text-white rounded-full">Básico</span>
              </div>
              <p className="text-3xl font-bold mb-2">R$ 50,00</p>
              <p className="text-sm text-gray-300 mb-4">Ideal para novos usuários experimentarem a plataforma.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#F25790] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-sm">15 minutos em chat privado</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#F25790] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-sm">5 presentes virtuais</span>
                </li>
              </ul>
              <button 
                onClick={() => setIsAddCreditsModalOpen(true)}
                className="w-full py-2 bg-[#F25790] hover:bg-[#d93d75] text-white rounded-full transition-colors"
              >
                Comprar pacote
              </button>
            </div>

            {/* Pacote Popular */}
            <div className="bg-black bg-opacity-80 border-2 border-[#F25790] rounded-lg p-6 hover:shadow-xl transition-shadow relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#F25790] text-white text-xs px-4 py-1 rounded-full">
                MAIS POPULAR
              </div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs bg-[#F25790] text-white rounded-full">Popular</span>
              </div>
              <p className="text-3xl font-bold mb-2">R$ 150,00</p>
              <p className="text-sm text-gray-300 mb-4">Nossa opção mais popular com ótimo custo-benefício.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#F25790] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-sm">45 minutos em chat privado</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#F25790] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-sm">20 presentes virtuais</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#F25790] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-sm">Acesso a shows exclusivos</span>
                </li>
              </ul>
              <button 
                onClick={() => setIsAddCreditsModalOpen(true)}
                className="w-full py-2 bg-[#F25790] hover:bg-[#d93d75] text-white rounded-full transition-colors"
              >
                Comprar pacote
              </button>
            </div>

            {/* Pacote Premium */}
            <div className="bg-black bg-opacity-80 border border-gray-800 rounded-lg p-6 hover:shadow-xl transition-shadow">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs bg-[#F25790] text-white rounded-full">Premium</span>
              </div>
              <p className="text-3xl font-bold mb-2">R$ 300,00</p>
              <p className="text-sm text-gray-300 mb-4">A experiência completa para os usuários mais exigentes.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#F25790] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-sm">90 minutos em chat privado</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#F25790] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-sm">50 presentes virtuais premium</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#F25790] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-sm">Acesso a todos os shows exclusivos</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#F25790] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-sm">Badge VIP em seu perfil</span>
                </li>
              </ul>
              <button 
                onClick={() => setIsAddCreditsModalOpen(true)}
                className="w-full py-2 bg-[#F25790] hover:bg-[#d93d75] text-white rounded-full transition-colors"
              >
                Comprar pacote
              </button>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>

      {/* Fluxo de Checkout */}
      <CheckoutController
        isOpen={isAddCreditsModalOpen} 
        onClose={() => setIsAddCreditsModalOpen(false)} 
        onSuccess={handleAddCredits}
      />
    </>
  );
};

export default Carteira;
