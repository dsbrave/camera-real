import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import AdicionarSaldoModal from '../components/AdicionarSaldoModal';
import MetodoPagamentoModal from '../components/payment/MetodoPagamentoModal';
import CartaoCreditoModal from '../components/payment/CartaoCreditoModal';
import PixDadosModal from '../components/payment/PixDadosModal';
import PixQrCodeModal from '../components/payment/PixQrCodeModal';
import PagamentoSucessoModal from '../components/payment/PagamentoSucessoModal';
import Header from '@/components/Header';

const Pagamento: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<'select-amount' | 'select-method' | 'credit-card' | 'pix-data' | 'pix-qrcode' | 'complete'>('select-amount');
  const [valorSelecionado, setValorSelecionado] = useState<number>(0);
  const [userName, setUserName] = useState<string>('JadeLove');

  // Modals open states
  const [isAddCreditsModalOpen, setIsAddCreditsModalOpen] = useState(true);
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = useState(false);
  const [isCreditCardModalOpen, setIsCreditCardModalOpen] = useState(false);
  const [isPixDataModalOpen, setIsPixDataModalOpen] = useState(false);
  const [isPixQrCodeModalOpen, setIsPixQrCodeModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  // Verificar se o usuário está logado ao carregar a página
  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    if (!userStorage) {
      router.push('/login');
    }
  }, [router]);

  const handleAddCredits = (amount: number) => {
    setValorSelecionado(amount);
    setIsAddCreditsModalOpen(false);
    setIsPaymentMethodModalOpen(true);
    setCurrentStep('select-method');
  };

  const handleSelectPaymentMethod = (method: 'pix' | 'credit-card') => {
    setIsPaymentMethodModalOpen(false);
    
    if (method === 'credit-card') {
      setIsCreditCardModalOpen(true);
      setCurrentStep('credit-card');
    } else {
      setIsPixDataModalOpen(true);
      setCurrentStep('pix-data');
    }
  };

  const handleBackToPaymentMethod = () => {
    setIsCreditCardModalOpen(false);
    setIsPixDataModalOpen(false);
    setIsPaymentMethodModalOpen(true);
    setCurrentStep('select-method');
  };

  const handleCreditCardProceed = () => {
    setIsCreditCardModalOpen(false);
    setCurrentStep('complete');
    setIsSuccessModalOpen(true);
    
    // Atualizar créditos do usuário no localStorage
    try {
      const userStorage = localStorage.getItem('user');
      if (userStorage) {
        const userData = JSON.parse(userStorage);
        const updatedUser = {
          ...userData,
          credits: (userData.credits || 0) + valorSelecionado
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Erro ao atualizar créditos:', error);
    }
  };

  const handlePixDataProceed = () => {
    setIsPixDataModalOpen(false);
    setIsPixQrCodeModalOpen(true);
    setCurrentStep('pix-qrcode');
  };

  const handlePixQrCodeComplete = () => {
    setIsPixQrCodeModalOpen(false);
    setCurrentStep('complete');
    setIsSuccessModalOpen(true);
    
    // Atualizar créditos do usuário no localStorage
    try {
      const userStorage = localStorage.getItem('user');
      if (userStorage) {
        const userData = JSON.parse(userStorage);
        const updatedUser = {
          ...userData,
          credits: (userData.credits || 0) + valorSelecionado
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Erro ao atualizar créditos:', error);
    }
  };

  const handleCloseAllModals = () => {
    setIsAddCreditsModalOpen(false);
    setIsPaymentMethodModalOpen(false);
    setIsCreditCardModalOpen(false);
    setIsPixDataModalOpen(false);
    setIsPixQrCodeModalOpen(false);
    router.push('/carteira');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#370836] to-[#6a0d66] text-white">
      <Head>
        <title>Pagamento | Camera Real</title>
        <meta name="description" content="Adicionar saldo à sua conta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Adicionar Saldo</h1>

          <div className="bg-[#2D1A3A] rounded-lg p-6">
            <div className="flex items-center mb-6">
              <div className="bg-camera-pink/20 p-3 rounded-full mr-4">
                <Image 
                  src="/icons/wallet.png" 
                  alt="Carteira" 
                  width={32} 
                  height={32} 
                  className="text-camera-pink"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    console.log('Erro ao carregar imagem de carteira');
                  }}
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Selecione um valor</h2>
                <p className="text-gray-300">Escolha quanto deseja adicionar à sua conta</p>
              </div>
              {/* Ilustração */}
              <div className="md:w-1/2 flex justify-center items-center">
                <div className="bg-[#F25790] bg-opacity-10 p-6 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-56 w-56 text-[#F25790]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {[10, 30, 50, 100, 150, 300].map((valor) => (
                <button
                  key={valor}
                  onClick={() => {
                    setValorSelecionado(valor);
                    setIsAddCreditsModalOpen(true);
                  }}
                  className="bg-[#3D2A4A] hover:bg-[#4D3A5A] rounded-lg py-3 px-4 text-center transition-all"
                >
                  <div className="text-base font-medium">Carregar</div>
                  <div className="text-xl font-semibold">R$ {valor}</div>
                </button>
              ))}
            </div>

            <p className="text-sm text-gray-300 mb-6">
              Selecione um dos valores predefinidos acima ou insira um valor personalizado abaixo.
            </p>

            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Valor personalizado
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">R$</span>
                  </div>
                  <input
                    type="number"
                    min="10"
                    className="bg-[#3D2A4A] text-white block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-camera-pink"
                    placeholder="0,00"
                    onChange={(e) => setValorSelecionado(parseFloat(e.target.value))}
                  />
                </div>
              </div>
              <button
                onClick={() => setIsAddCreditsModalOpen(true)}
                disabled={valorSelecionado <= 0}
                className={`px-6 py-2 rounded-full ${
                  valorSelecionado > 0 
                    ? 'bg-camera-pink hover:bg-pink-600 text-white' 
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                } transition-colors`}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-6 px-4 border-t border-[#4D2D5A]">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">© 2024 Camera Real</p>
          </div>
          <div className="flex space-x-6">
            <Link href="/politica-de-privacidade" className="text-sm text-gray-400 hover:text-white">
              Política de privacidade
            </Link>
            <Link href="/suporte" className="text-sm text-gray-400 hover:text-white">
              Suporte
            </Link>
            <Link href="/termos-e-condicoes" className="text-sm text-gray-400 hover:text-white">
              Termos e condições
            </Link>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/regras-e-ajuda" className="text-sm text-gray-400 hover:text-white">
              Regras e ajuda
            </Link>
            <span className="mx-2 text-gray-600">•</span>
            <Link href="/assistencia" className="text-sm text-gray-400 hover:text-white">
              Assistência
            </Link>
          </div>
        </div>
      </footer>

      {/* Payment Flow Modals */}
      <AdicionarSaldoModal 
        isOpen={isAddCreditsModalOpen} 
        onClose={handleCloseAllModals} 
        onAddCredits={handleAddCredits}
      />

      <MetodoPagamentoModal 
        isOpen={isPaymentMethodModalOpen} 
        onClose={handleCloseAllModals}
        valorSelecionado={valorSelecionado}
        onSelectPaymentMethod={handleSelectPaymentMethod}
      />

      <CartaoCreditoModal 
        isOpen={isCreditCardModalOpen} 
        onClose={handleCloseAllModals}
        onBack={handleBackToPaymentMethod}
        valorSelecionado={valorSelecionado}
        onProceed={handleCreditCardProceed}
      />

      <PixDadosModal 
        isOpen={isPixDataModalOpen} 
        onClose={handleCloseAllModals}
        onBack={handleBackToPaymentMethod}
        valorSelecionado={valorSelecionado}
        onProceed={handlePixDataProceed}
      />

      <PixQrCodeModal 
        isOpen={isPixQrCodeModalOpen} 
        onClose={handleCloseAllModals}
        onBack={() => {
          setIsPixQrCodeModalOpen(false);
          setIsPixDataModalOpen(true);
        }}
        valorSelecionado={valorSelecionado}
        userName={userName}
        onComplete={handlePixQrCodeComplete}
      />
      
      <PagamentoSucessoModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          router.push('/carteira');
        }}
        valorAdicionado={valorSelecionado}
      />
    </div>
  );
};

export default Pagamento;
