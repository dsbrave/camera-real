import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BaseModal from '@/components/BaseModal';
import SelectPaymentMethodModal from '@/components/checkout/SelectPaymentMethodModal';
import PixPaymentForm from '@/components/checkout/PixPaymentForm';
import CreditCardForm from '@/components/checkout/CreditCardForm';
import SimpleModal from '../components/SimpleModal';
// import CheckoutController from '@/components/checkout/CheckoutController';

const Carteira: React.FC = () => {
  const router = useRouter();
  const { pagamento } = router.query;
  
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isAddCreditsModalOpen, setIsAddCreditsModalOpen] = useState(false);
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = useState(false);
  const [isPixModalOpen, setIsPixModalOpen] = useState(false);
  const [isCreditCardModalOpen, setIsCreditCardModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [withdrawData, setWithdrawData] = useState({
    amount: '',
    bank: '',
    agency: '',
    account: '',
    accountType: 'corrente',
    cpf: '',
    name: ''
  });
  const [creditos, setCreditos] = useState(200000); // Mudança de chatCoins para creditos
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    photo: '',
    credits: 200000
  });
  const [transacoes, setTransacoes] = useState([
    { data: '22/05/2025', tipo: 'Adição de créditos', valor: '200 Créditos', saldoFinal: '150 Créditos' },
    { data: '20/05/2025', tipo: 'Chat privado com Julia', valor: '100 Créditos-', saldoFinal: '50 Créditos' },
    { data: '15/05/2025', tipo: 'Adição de créditos', valor: '100 Créditos', saldoFinal: '150 Créditos' },
    { data: '10/05/2025', tipo: 'Chat privado com Amanda', valor: '60 Créditos-', saldoFinal: '50 Créditos' },
    { data: '05/05/2025', tipo: 'Adição de créditos', valor: '160 Créditos', saldoFinal: '110 Créditos' },
  ]);
  const [showSucessoBanner, setShowSucessoBanner] = useState(false);
  
  // Conversão: 1 Crédito = R$ 1,00
  const creditValue = 1.00;
  const totalValueInReais = creditos * creditValue;
  
  // Pacotes de Crédito (com 20 bônus em cada)
  const creditPackages = [
    {
      label: 'Básico',
      price: 29,
      credits: 40,
      bonus: 20,
      total: 60,
      minutes: 60,
      highlight: false
    },
    {
      label: 'Popular',
      price: 79,
      credits: 100,
      bonus: 20,
      total: 120,
      minutes: 120,
      highlight: true
    },
    {
      label: 'Master',
      price: 199,
      credits: 300,
      bonus: 20,
      total: 320,
      minutes: 320,
      highlight: false
    }
  ];
  
  useEffect(() => {
    // Verifica se o usuário está logado
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      try {
        const parsedUserData = JSON.parse(userStorage);
        setCreditos(parsedUserData.creditos || 200000); // Usar Créditos em vez de chatCoins
        setUserData({
          name: parsedUserData.name || '',
          email: parsedUserData.email || '',
          photo: parsedUserData.photo || '',
          credits: parsedUserData.creditos || 200000
        });
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
    // Converter o valor em reais para Créditos (1:1)
    const creditosToAdd = amount;
    const novoSaldo = creditos + creditosToAdd;
    setCreditos(novoSaldo);
    
    // Adiciona transação ao histórico
    const novaTransacao = {
      data: new Date().toLocaleDateString('pt-BR'),
      tipo: 'Adição de créditos',
      valor: `${creditosToAdd} Créditos`,
      saldoFinal: `${novoSaldo} Créditos`,
    };
    
    setTransacoes([novaTransacao, ...transacoes]);
    
    // Atualiza os Créditos no localStorage
    try {
      const userStorage = localStorage.getItem('user');
      if (userStorage) {
        const userData = JSON.parse(userStorage);
        const updatedUser = {
          ...userData,
          creditos: novoSaldo
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Erro ao atualizar Créditos:', error);
    }
    
    // Fechar modal se estiver aberto
    setIsWithdrawModalOpen(false);
    
    // Mostrar mensagem de sucesso
    alert(`${creditosToAdd} Créditos adicionados com sucesso!`);
  };

  const handleWithdrawInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setWithdrawData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmount = parseInt(withdrawData.amount);
    
    if (withdrawAmount > creditos) {
      alert('Saldo insuficiente para saque!');
      return;
    }

    if (withdrawAmount < 50) {
      alert('Valor mínimo para saque é de 50 Créditos (R$ 50,00)');
      return;
    }

    const novoSaldo = creditos - withdrawAmount;
    setCreditos(novoSaldo);
    
    // Adiciona transação ao histórico
    const novaTransacao = {
      data: new Date().toLocaleDateString('pt-BR'),
      tipo: 'Saque para conta bancária',
      valor: `${withdrawAmount} Créditos-`,
      saldoFinal: `${novoSaldo} Créditos`,
    };
    
    setTransacoes([novaTransacao, ...transacoes]);
    
    // Atualiza os Créditos no localStorage
    try {
      const userStorage = localStorage.getItem('user');
      if (userStorage) {
        const userData = JSON.parse(userStorage);
        const updatedUser = {
          ...userData,
          creditos: novoSaldo
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Erro ao atualizar Créditos:', error);
    }

    // Reset form and close modal
    setWithdrawData({
      amount: '',
      bank: '',
      agency: '',
      account: '',
      accountType: 'corrente',
      cpf: '',
      name: ''
    });
    setIsWithdrawModalOpen(false);
    
    alert(`Solicitação de saque de R$ ${(withdrawAmount * creditValue).toFixed(2).replace('.', ',')} enviada! O valor será processado em até 3 dias úteis.`);
  };

  const handleSelectPaymentMethod = (method: string) => {
    setSelectedAmount(100);
    setIsPaymentMethodModalOpen(false);
    if (method === 'pix') {
      setIsPixModalOpen(true);
    } else if (method === 'credit-card') {
      setIsCreditCardModalOpen(true);
    }
  };

  const handlePaymentMethodNext = (selectedMethod: 'pix' | 'credit-card') => {
    setIsPaymentMethodModalOpen(false);
    if (selectedMethod === 'pix') {
      setIsPixModalOpen(true);
    } else if (selectedMethod === 'credit-card') {
      setIsCreditCardModalOpen(true);
    }
  };

  const handlePaymentMethodBack = () => {
    setIsPaymentMethodModalOpen(false);
    setIsAddCreditsModalOpen(true);
  };

  const handlePixBack = () => {
    setIsPixModalOpen(false);
    setIsPaymentMethodModalOpen(true);
  };

  const handleCreditCardBack = () => {
    setIsCreditCardModalOpen(false);
    setIsPaymentMethodModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPixModalOpen(false);
    setIsCreditCardModalOpen(false);
    handleAddCredits(selectedAmount);
  };

  return (
    <>
      <Head>
        <title>Carteira | Camera Real</title>
        <meta name="description" content="Gerencie seus Créditos e compras" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Header />
        
        <main className="px-3 sm:px-4 pt-16 sm:pt-20 pb-6 sm:pb-8">
          <div className="max-w-7xl mx-auto">
            {/* Banner de sucesso */}
            {showSucessoBanner && (
              <div className="mb-6 bg-[#1a8a3d] rounded-lg p-4 flex items-center shadow-lg animate-fade-in">
                <div className="mr-4">
                  <Image
                    src="/icons/action/check_circle.svg"
                    alt="Sucesso"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                    style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
                  />
                </div>
                <div>
                  <p className="text-white font-bold">Pagamento realizado com sucesso!</p>
                  <p className="text-white text-sm">Seus Créditos foram adicionados à sua conta.</p>
                </div>
              </div>
            )}

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
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
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-600 flex items-center justify-center border-2 border-[#F25790]/50">
                          <span className="text-white text-xl sm:text-2xl font-bold">
                            {userData.name?.charAt(0).toUpperCase() || "U"}
                          </span>
                        </div>
                      )}
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
                      Olá, {userData.name || 'Usuário'}!
                    </h2>
                    <p className="text-sm text-gray-400 mb-4 break-all">
                      {userData.email || 'teste@camera.real'}
                    </p>
                    
                    {/* Credits Card */}
                    <div className="w-full bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm border border-gray-600/50 hover:border-[#F25790]/50 rounded-xl p-4 mb-4 transition-all duration-200 hover:bg-gray-700/70 group">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-medium text-sm">Seus créditos:</span>
                        <div className="flex items-center space-x-2">
                          <div className="relative w-4 h-4">
                            <svg 
                              width="16" 
                              height="16" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 text-white absolute top-0 left-0 group-hover:opacity-0 transition-opacity duration-200"
                            >
                              <path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z" fill="white"/>
                            </svg>
                            
                            <svg 
                              width="16" 
                              height="16" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 text-[#F25790] absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                              <path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z" fill="#F25790"/>
                            </svg>
                          </div>
                          <span className="text-white font-medium text-lg">
                            {creditos}
                          </span>
                          <span className="text-gray-300 text-xs">Créditos</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mb-3">≈ R$ {totalValueInReais.toFixed(2).replace('.', ',')}</p>
                      <div className="space-y-2">
                        <button 
                          onClick={() => setIsAddCreditsModalOpen(true)}
                          className="w-full py-3 bg-gradient-to-r from-[#F25790]/40 to-[#d93d75]/40 hover:from-[#F25790]/60 hover:to-[#d93d75]/60 text-white font-bold rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(242,87,144,0.4)] hover:shadow-[0_0_25px_rgba(242,87,144,0.6)] hover:scale-105 active:scale-95 border border-[#F25790]/30"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <Image 
                              src="/icons/content/add.svg"
                              alt="Adicionar"
                              width={16}
                              height={16}
                              className="w-4 h-4"
                              style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
                            />
                            <span>Adicionar Crédito</span>
                          </div>
                        </button>
                        <button 
                          onClick={() => setIsWithdrawModalOpen(true)}
                          className="w-full flex items-center justify-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors text-sm"
                        >
                          <Image 
                            src="/icons/action/account_balance.svg"
                            alt="Sacar"
                            width={16}
                            height={16}
                            className="w-4 h-4 mr-2"
                            style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
                          />
                          Sacar para conta
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu de Navegação */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4">Ações Rápidas</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800 border border-[#F25790]">
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-[#F25790]"
                      >
                        <path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z" fill="#F25790"/>
                      </svg>
                      <span className="text-[#F25790] font-medium">Carteira</span>
                    </div>
                    
                    <Link href="/painel-usuario" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition-all group">
                      <Image 
                        src="/icons/action/dashboard.svg"
                        alt="Painel"
                        width={20}
                        height={20}
                        className="w-5 h-5 filter brightness-0 invert"
                      />
                      <span className="group-hover:text-[#F25790] transition-colors">Painel</span>
                    </Link>
                    
                    <Link href="/explorar" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition-all group">
                      <Image 
                        src="/icons/action/search.svg"
                        alt="Explorar"
                        width={20}
                        height={20}
                        className="w-5 h-5 filter brightness-0 invert"
                      />
                      <span className="group-hover:text-[#F25790] transition-colors">Explorar Modelos</span>
                    </Link>
                    
                    <Link href="/chat-video" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition-all group">
                      <Image 
                        src="/icons/audio_video/videocam.svg"
                        alt="Iniciar Chat"
                        width={20}
                        height={20}
                        className="w-5 h-5 filter brightness-0 invert"
                      />
                      <span className="group-hover:text-[#F25790] transition-colors">Iniciar Chat</span>
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
                        <svg 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-white"
                        >
                          <path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z" fill="white"/>
                        </svg>
                      </div>
                      <span className="text-3xl font-bold text-[#F25790]">{creditos}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">Créditos</h3>
                    <p className="text-gray-400 text-sm">Saldo atual</p>
                  </div>
                  
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-[#F25790] transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3">
                        <Image 
                          src="/icons/action/trending_up.svg"
                          alt="Valor em Reais"
                          width={24}
                          height={24}
                          className="w-6 h-6 filter brightness-0 invert"
                        />
                      </div>
                      <span className="text-3xl font-bold text-green-500">R$ {totalValueInReais.toFixed(0)}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">Valor Total</h3>
                    <p className="text-gray-400 text-sm">Em reais</p>
                  </div>
                  
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-[#F25790] transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3">
                        <Image 
                          src="/icons/action/history.svg"
                          alt="Transações"
                          width={24}
                          height={24}
                          className="w-6 h-6 filter brightness-0 invert"
                        />
                      </div>
                      <span className="text-3xl font-bold text-blue-500">{transacoes.length}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">Transações</h3>
                    <p className="text-gray-400 text-sm">Histórico</p>
                  </div>
                </div>

                {/* Benefícios da Carteira */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Benefícios da carteira</h2>
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="p-2 mr-3">
                          <svg 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-[#F25790]"
                          >
                            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" fill="#F25790"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">Chat privado com modelos</h3>
                          <p className="text-sm text-gray-400">Converse diretamente com os modelos em um ambiente privado.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="p-2 mr-3">
                          <svg 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-[#F25790]"
                          >
                            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z" fill="#F25790"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">Acesso a shows exclusivos</h3>
                          <p className="text-sm text-gray-400">Assista a apresentações únicas de nossos modelos.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="p-2 mr-3">
                          <svg 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-[#F25790]"
                          >
                            <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" fill="#F25790"/>
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

                {/* Pacotes de Crédito */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Comprar Créditos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {creditPackages.map((pkg, idx) => (
                      <div
                        key={pkg.label}
                        className={`bg-gray-900 border ${pkg.highlight ? 'border-2 border-[#F25790]' : 'border-gray-800'} rounded-2xl p-6 hover:border-[#F25790] hover:shadow-xl transition-all relative`}
                      >
                        {pkg.highlight && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#F25790] text-white text-xs px-4 py-1 rounded-full">
                            MAIS VENDIDO!
                          </div>
                        )}
                        <div className="mb-4">
                          <span className="inline-block px-3 py-1 text-xs bg-[#F25790] text-white rounded-full">{pkg.label}</span>
                        </div>
                        <p className="text-3xl font-bold mb-2">R$ {pkg.price}</p>
                        <p className="text-sm text-gray-300 mb-4">{pkg.credits} créditos <span className="text-green-400 font-bold">+ {pkg.bonus} bônus</span></p>
                        <ul className="space-y-2 mb-6">
                          <li className="flex items-center">
                            <svg 
                              width="20" 
                              height="20" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 mr-2"
                            >
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#F25790"/>
                            </svg>
                            <span className="text-sm">Aproximadamente {pkg.minutes} minutos</span>
                          </li>
                        </ul>
                        <button 
                          onClick={() => handleAddCredits(pkg.total)}
                          className="w-full py-3 bg-[#F25790] hover:bg-[#d93d75] text-white rounded-xl transition-colors font-medium"
                        >
                          Comprar R$ {pkg.price}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Histórico de Transações */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Histórico de transações</h2>
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                    {/* Mobile: Cards Layout */}
                    <div className="block md:hidden">
                      {transacoes.map((transacao, index) => (
                        <div key={index} className="border-b border-gray-800 last:border-b-0 p-4">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium">{transacao.tipo}</span>
                            <span className={`font-semibold text-sm ${transacao.valor.includes('-') ? 'text-red-400' : 'text-green-400'}`}>
                              {transacao.valor}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-400">
                            <span>{transacao.data}</span>
                            <span>Saldo: {transacao.saldoFinal}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Desktop: Table Layout */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-800 bg-gray-800 bg-opacity-50">
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Data</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Descrição</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Valor</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Saldo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transacoes.map((transacao, index) => (
                            <tr key={index} className="border-b border-gray-800 hover:bg-gray-800 hover:bg-opacity-30 transition-colors">
                              <td className="px-6 py-4 text-gray-400 text-sm">{transacao.data}</td>
                              <td className="px-6 py-4 font-medium">{transacao.tipo}</td>
                              <td className="px-6 py-4 text-sm" style={{ color: transacao.valor.includes('-') ? '#ff6b6b' : '#4cd964' }}>
                                {transacao.valor}
                              </td>
                              <td className="px-6 py-4 text-sm">{transacao.saldoFinal}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>

      {/* Modal de Seleção de Método de Pagamento */}
      <SelectPaymentMethodModal
        isOpen={isPaymentMethodModalOpen}
        onClose={() => setIsPaymentMethodModalOpen(false)}
        onBack={handlePaymentMethodBack}
        selectedAmount={selectedAmount}
        onSelectMethod={handleSelectPaymentMethod}
        onNext={handlePaymentMethodNext}
      />

      {/* Modal PIX */}
      <PixPaymentForm
        isOpen={isPixModalOpen}
        onClose={() => setIsPixModalOpen(false)}
        onBack={handlePixBack}
        selectedAmount={selectedAmount}
        onSubmit={handlePaymentSuccess}
      />

      {/* Modal Cartão de Crédito */}
      <CreditCardForm
        isOpen={isCreditCardModalOpen}
        onClose={() => setIsCreditCardModalOpen(false)}
        onBack={handleCreditCardBack}
        selectedAmount={selectedAmount}
        onSubmit={handlePaymentSuccess}
      />

      {/* Modal de Saque */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Sacar para Conta Bancária</h2>
              <button 
                onClick={() => setIsWithdrawModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <Image
                  src="/icons/navigation/close.svg"
                  alt="Fechar"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                  style={{ filter: 'brightness(0) saturate(100%) invert(60%)' }}
                />
              </button>
            </div>

            <form onSubmit={handleWithdraw} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Valor em Créditos *</label>
                <input
                  type="number"
                  name="amount"
                  value={withdrawData.amount}
                  onChange={handleWithdrawInputChange}
                  min="50"
                  max={creditos}
                  required
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  placeholder="Mínimo 50 Créditos"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Disponível: {creditos} Créditos | Valor em R$: {withdrawData.amount ? (parseInt(withdrawData.amount || '0') * creditValue).toFixed(2).replace('.', ',') : '0,00'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Nome Completo *</label>
                <input
                  type="text"
                  name="name"
                  value={withdrawData.name}
                  onChange={handleWithdrawInputChange}
                  required
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  placeholder="Nome do titular da conta"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">CPF *</label>
                <input
                  type="text"
                  name="cpf"
                  value={withdrawData.cpf}
                  onChange={handleWithdrawInputChange}
                  required
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  placeholder="000.000.000-00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Banco *</label>
                <input
                  type="text"
                  name="bank"
                  value={withdrawData.bank}
                  onChange={handleWithdrawInputChange}
                  required
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  placeholder="Nome do banco"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Agência *</label>
                  <input
                    type="text"
                    name="agency"
                    value={withdrawData.agency}
                    onChange={handleWithdrawInputChange}
                    required
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    placeholder="0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Conta *</label>
                  <input
                    type="text"
                    name="account"
                    value={withdrawData.account}
                    onChange={handleWithdrawInputChange}
                    required
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    placeholder="00000-0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tipo de Conta *</label>
                <select
                  name="accountType"
                  value={withdrawData.accountType}
                  onChange={handleWithdrawInputChange}
                  required
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="corrente">Conta Corrente</option>
                  <option value="poupanca">Conta Poupança</option>
                </select>
              </div>

              <div className="bg-yellow-900 bg-opacity-50 border border-yellow-600 rounded-lg p-3 mt-4">
                <p className="text-yellow-200 text-sm">
                  <strong>Importante:</strong> O saque será processado em até 3 dias úteis. 
                  Valor mínimo: 50 Créditos (R$ 50,00). Taxa de processamento: R$ 2,00.
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsWithdrawModalOpen(false)}
                  className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-[#F25790] hover:bg-[#d93d75] text-white rounded-lg transition-colors"
                >
                  Solicitar Saque
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Novo Modal de Adicionar Crédito */}
      {isAddCreditsModalOpen && (
        <BaseModal
          isOpen={isAddCreditsModalOpen}
          onClose={() => setIsAddCreditsModalOpen(false)}
          modelImage="/images/realistic_photo_of_a_beautiful_curvy_cam_model_in_sexy_casual_clothing_in_a_pink_neon-lit_cam_studi_01vxr9sv9u5n1mi8vknf_2.png"
          modelName="Modelo Cam"
          title="Adicionar Créditos"
          subtitle="Selecione um valor para adicionar à sua conta"
        >
          <div className="mb-8 text-center">
            <p className="text-white/80 text-sm mb-3 font-normal">Escolha o valor que deseja <span className="text-[#F25790] font-semibold">adicionar</span> à sua carteira</p>
            <div className="grid grid-cols-2 gap-3 mb-4 w-full max-w-xs mx-auto">
              {[10, 30, 50, 100, 150, 300].map((value) => (
                <button
                  key={value}
                  onClick={() => setSelectedAmount(value)}
                  className={`py-5 px-2 rounded-2xl border border-[#F25790]/40 bg-gradient-to-br transition-all hover:scale-105 w-full text-center text-lg font-bold shadow-md tracking-wide select-none
                    ${selectedAmount === value
                      ? 'from-[#F25790]/30 to-[#d93d75]/30 border-[#F25790] shadow-[0_0_20px_rgba(242,87,144,0.4)] scale-105'
                      : 'from-[#F25790]/15 to-[#d93d75]/15 hover:from-[#F25790]/20 hover:to-[#d93d75]/20'}
                  `}
                  style={{ minHeight: '70px', fontSize: '1.25rem', letterSpacing: '0.02em' }}
                >
                  <div className="text-white/70 text-xs mb-1">Carregue</div>
                  <div className="text-white font-extrabold text-2xl">R$ {value}</div>
                </button>
              ))}
            </div>
            {/* Input para valor personalizado */}
            <div className="w-full max-w-xs mx-auto mb-4">
              <input
                type="number"
                min={1}
                placeholder="Outro valor (mín. R$ 1)"
                value={selectedAmount && ![10,30,50,100,150,300].includes(selectedAmount) ? selectedAmount : ''}
                onChange={e => setSelectedAmount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-[#F25790]/30 bg-black/30 text-white text-base placeholder:text-white/40 focus:outline-none focus:border-[#F25790] transition-all text-center"
              />
            </div>
            <div className="w-full max-w-xs mx-auto">
              <button
                onClick={() => {
                  setIsAddCreditsModalOpen(false);
                  setIsPaymentMethodModalOpen(true);
                }}
                disabled={!selectedAmount || selectedAmount < 1}
                className={`w-full py-3 font-semibold rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(242,87,144,0.3)] hover:shadow-[0_0_25px_rgba(242,87,144,0.5)] hover:scale-105 active:scale-95 border border-[#F25790]/20 mt-1 text-base ${
                  selectedAmount && selectedAmount >= 1
                    ? 'bg-gradient-to-r from-[#F25790]/40 to-[#d93d75]/40 hover:from-[#F25790]/60 hover:to-[#d93d75]/60 text-white'
                    : 'bg-white/10 text-white/50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Image
                    src="/icons/action/credit_card.svg"
                    alt="Avançar"
                    width={20}
                    height={20}
                    className="w-5 h-5 filter invert"
                  />
                  <span>Avançar</span>
                </div>
              </button>
            </div>
            <p className="text-white/40 text-xs text-center mt-4 drop-shadow-[0_0_10px_rgba(0,0,0,0.7)] font-light">
              <Image
                src="/icons/action/lock.svg"
                alt="Seguro"
                width={12}
                height={12}
                className="w-3 h-3 inline mr-1 filter invert opacity-50"
              />
              Seus dados estão protegidos com criptografia SSL
            </p>
          </div>
        </BaseModal>
      )}

      {/* Fluxo de Checkout */}
      {/* <CheckoutController
        isOpen={isAddCreditsModalOpen} 
        onClose={() => setIsAddCreditsModalOpen(false)} 
        onSuccess={handleAddCredits}
      /> */}
    </>
  );
};

export default Carteira;
