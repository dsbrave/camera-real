import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SelectPaymentMethodModal from '@/components/checkout/SelectPaymentMethodModal';
import PixPaymentForm from '@/components/checkout/PixPaymentForm';
import CreditCardForm from '@/components/checkout/CreditCardForm';
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
  const [withdrawData, setWithdrawData] = useState({
    amount: '',
    bank: '',
    agency: '',
    account: '',
    accountType: 'corrente',
    cpf: '',
    name: ''
  });
  const [creditos, setCreditos] = useState(150); // Mudança de chatCoins para creditos
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
  
  useEffect(() => {
    // Verifica se o usuário está logado
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      try {
        const userData = JSON.parse(userStorage);
        setCreditos(userData.creditos || 150); // Usar Créditos em vez de chatCoins
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

  const handleSelectPaymentMethod = () => {
    // setSelectedPaymentMethod(method);
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
      </Head>

      <div className="min-h-screen bg-black text-white">
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
                <p className="text-white text-sm">Seus Créditos foram adicionados à sua conta.</p>
              </div>
            </div>
          )}
          
          <h1 className="text-4xl font-bold mb-8">Minha Carteira</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Card de Saldo */}
            <div className="bg-black bg-opacity-80 border border-gray-800 rounded-lg p-6 col-span-1">
              <h2 className="text-xl font-medium mb-2">Seu saldo atual</h2>
              <p className="text-4xl font-bold mb-2 text-[#F25790]">{creditos} Créditos</p>
              <p className="text-lg text-gray-300 mb-2">≈ R$ {totalValueInReais.toFixed(2).replace('.', ',')}</p>
              <p className="text-sm text-gray-400 mb-4">1 Crédito = R$ 1,00</p>
              <div className="space-y-2">
                <button 
                  onClick={() => setIsAddCreditsModalOpen(true)}
                  className="w-full flex items-center justify-center px-4 py-2 bg-[#F25790] hover:bg-[#d93d75] text-white rounded-full transition-colors"
                >
                  <Image 
                    src="/icons/content/add.svg"
                    alt="Adicionar"
                    width={20}
                    height={20}
                    className="w-5 h-5 mr-2 text-white"
                  />
                  Adicionar Crédito
                </button>
                <button 
                  onClick={() => setIsWithdrawModalOpen(true)}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors"
                >
                  <Image 
                    src="/icons/navigation/arrow_upward.svg"
                    alt="Sacar"
                    width={20}
                    height={20}
                    className="w-5 h-5 mr-2 text-white"
                  />
                  Sacar para conta
                </button>
              </div>
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
          <h2 className="text-2xl font-bold mb-6">Comprar Créditos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Pacote Básico */}
            <div className="bg-black bg-opacity-80 border border-gray-800 rounded-lg p-6 hover:shadow-xl transition-shadow">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs bg-[#F25790] text-white rounded-full">Básico</span>
              </div>
              <p className="text-3xl font-bold mb-2">R$ 29</p>
              <p className="text-sm text-gray-300 mb-4">40 créditos</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Image 
                    src="/icons/action/check_circle.svg"
                    alt="Check"
                    width={20}
                    height={20}
                    className="w-5 h-5 text-white mr-2"
                  />
                  <span className="text-sm">Aproximadamente 40 minutos</span>
                </li>
              </ul>
              <button 
                onClick={() => handleAddCredits(40)}
                className="w-full py-2 bg-[#F25790] hover:bg-[#d93d75] text-white rounded-full transition-colors"
              >
                Comprar R$ 29
              </button>
            </div>

            {/* Pacote Popular */}
            <div className="bg-black bg-opacity-80 border-2 border-[#F25790] rounded-lg p-6 hover:shadow-xl transition-shadow relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#F25790] text-white text-xs px-4 py-1 rounded-full">
                MAIS VENDIDO!
              </div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs bg-[#F25790] text-white rounded-full">Popular</span>
              </div>
              <p className="text-3xl font-bold mb-2">R$ 79</p>
              <p className="text-sm text-gray-300 mb-4">100 créditos + 10 bônus</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Image 
                    src="/icons/action/check_circle.svg"
                    alt="Check"
                    width={20}
                    height={20}
                    className="w-5 h-5 text-white mr-2"
                  />
                  <span className="text-sm">Aproximadamente 110 minutos</span>
                </li>
              </ul>
              <button 
                onClick={() => handleAddCredits(110)}
                className="w-full py-2 bg-[#F25790] hover:bg-[#d93d75] text-white rounded-full transition-colors"
              >
                Comprar R$ 79
              </button>
            </div>

            {/* Pacote Master */}
            <div className="bg-black bg-opacity-80 border border-gray-800 rounded-lg p-6 hover:shadow-xl transition-shadow">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs bg-[#F25790] text-white rounded-full">Master</span>
              </div>
              <p className="text-3xl font-bold mb-2">R$ 199</p>
              <p className="text-sm text-gray-300 mb-4">300 créditos + 50 bônus</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Image 
                    src="/icons/action/check_circle.svg"
                    alt="Check"
                    width={20}
                    height={20}
                    className="w-5 h-5 text-white mr-2"
                  />
                  <span className="text-sm">Aproximadamente 350 minutos</span>
                </li>
              </ul>
              <button 
                onClick={() => handleAddCredits(350)}
                className="w-full py-2 bg-[#F25790] hover:bg-[#d93d75] text-white rounded-full transition-colors"
              >
                Comprar R$ 199
              </button>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>

      {/* Modal de Adicionar Crédito */}
      {isAddCreditsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            {/* Botão de fechar */}
            <button 
              onClick={() => setIsAddCreditsModalOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-8">
              {/* Imagem à esquerda */}
              <div className="flex-shrink-0 relative">
                <div className="relative w-96 h-96 flex items-center justify-center">
                  <Image 
                    src="/images/Payment.png" 
                    alt="Adicionar crédito" 
                    width={384}
                    height={384}
                    className="object-contain filter brightness-110 contrast-110"
                  />
                </div>
              </div>

              {/* Conteúdo principal */}
              <div className="flex-1 max-w-md">
                <h2 className="text-3xl font-bold text-white mb-2 text-center">Adicionar Crédito</h2>
                <p className="text-white text-center mb-2 opacity-90">Selecione um valor para adicionar a sua conta:</p>
                <p className="text-white text-center mb-8 opacity-75 text-sm">
                  {selectedAmount} Crédito{selectedAmount !== 1 ? 's' : ''} = R$ {selectedAmount.toFixed(2).replace('.', ',')}
                </p>
                
                {/* Grid de valores */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {[10, 30, 50, 100, 150, 300].map((value) => (
                    <button
                      key={value}
                      onClick={() => setSelectedAmount(value)}
                      className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                        selectedAmount === value 
                          ? 'border-white bg-white bg-opacity-20 shadow-lg' 
                          : 'border-gray-400 border-opacity-50 hover:border-white hover:bg-white hover:bg-opacity-10'
                      }`}
                    >
                      <div className="text-white text-xs opacity-80 mb-1">Carregue</div>
                      <div className="text-white text-lg font-bold">R$ {value}</div>
                    </button>
                  ))}
                </div>

                {/* Botão Avançar */}
                <button 
                  onClick={() => {
                    setIsAddCreditsModalOpen(false);
                    setIsPaymentMethodModalOpen(true);
                  }}
                  className="w-full bg-[#F25790] hover:bg-[#d93d75] text-white py-4 px-6 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                >
                  Avançar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
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
