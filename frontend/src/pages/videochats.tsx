import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';

export default function ComoFunciona() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const router = useRouter();

  // Verificar se o usuário está logado ao carregar a página
  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      try {
        const userData = JSON.parse(userStorage);
        setIsLoggedIn(!!userData.isLoggedIn);
      } catch (error) {
        console.error('Erro ao verificar login:', error);
      }
    }
  }, []);

  const handlePurchaseClick = (packageType: string) => {
    if (!isLoggedIn) {
      // Redirecionar para login se não estiver logado
      router.push('/login');
    } else {
      // Abrir modal de compra se estiver logado
      setSelectedPackage(packageType);
      setShowCreditModal(true);
    }
  };

  const closeCreditModal = () => {
    setShowCreditModal(false);
    setSelectedPackage('');
  };

  return (
    <>
      <Head>
        <title>Como Funciona - Camera Real</title>
        <meta name="description" content="Saiba como funciona o Camera Real e aproveite ao máximo a experiência de videochats ao vivo" />
      </Head>

      <div className="min-h-screen bg-black text-white relative">
        {/* Background */}
        <div className="relative z-10">
          <Header />
          
          {/* Main Content */}
          <div className="container mx-auto px-4 py-16 content-after-header">
            <h1 className="text-4xl font-bold mb-10 text-center">Como Funciona o <span className="text-[#F25790]">Camera Real</span>?</h1>
            
            <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
              {/* Left Side - Video Chat Explanation */}
              <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <div className="bg-black bg-opacity-40 p-8 rounded-xl border border-gray-800 relative min-h-[400px] flex flex-col justify-center">
                  <h2 className="text-2xl font-bold mb-4 text-[#F25790]">Descubra uma experiência única de videochats ao vivo</h2>
<p className="mb-4 text-lg text-gray-300">
O Camera Real foi criado para você interagir com modelos ao vivo de forma simples, divertida e segura. Veja como funciona:
</p>
<ul className="space-y-3 mb-6">
  <li className="flex items-start">
    <div className="bg-[#F25790] bg-opacity-20 p-2 rounded-full mr-3">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#F25790]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0 0a2 2 0 100-4 2 2 0 000 4zm0 0v2m0-2h2m-2 0H10" />
      </svg>
    </div>
    <div>
      <span className="font-medium">1. Escolha uma modelo</span>
      <p className="text-sm text-gray-400">Navegue pela nossa seleção e encontre quem mais combina com você.</p>
    </div>
  </li>
  <li className="flex items-start">
  <div className="bg-[#F25790] bg-opacity-20 p-2 rounded-full mr-3">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#F25790]">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.5} fill="none" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 2" />
    </svg>
  </div>
  <div>
    <span className="font-medium">2. Teste grátis por 10 segundos</span>
    <p className="text-sm text-gray-400">Você tem 10 segundos gratuitos para conhecer a modelo antes de começar a gastar créditos.</p>
  </div>
</li>
<li className="flex items-start">
  <div className="bg-[#F25790] bg-opacity-20 p-2 rounded-full mr-3">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#F25790]">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.5} fill="none" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 2" />
    </svg>
  </div>
  <div>
    <span className="font-medium">3. Créditos descontados por minuto</span>
    <p className="text-sm text-gray-400">Após o teste grátis, cada minuto de conversa consome 1 crédito (R$1,00).</p>
  </div>
</li>
  <li className="flex items-start">
    <div className="bg-[#F25790] bg-opacity-20 p-2 rounded-full mr-3">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#F25790]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12l4.5 4.5M15 12l4.5-4.5M9 12l-4.5 4.5M9 12l-4.5-4.5" />
      </svg>
    </div>
    <div>
      <span className="font-medium">4. Troque de modelo com um swipe</span>
<p className="text-sm text-gray-400">Você pode trocar de modelo até 10 vezes gratuitamente. Após isso, cada nova troca desconta 1 crédito (equivalente a 1 minuto) para evitar uso indevido.</p>
    </div>
  </li>
  <li className="flex items-start">
    <div className="bg-[#F25790] bg-opacity-20 p-2 rounded-full mr-3">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#F25790]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </div>
    <div>
      <span className="font-medium">5. Surpreenda e interaja mais!</span>
      <p className="text-sm text-gray-400">Envie emojis, presentes virtuais e convide para chamadas privadas. Novas formas de interação para tornar sua experiência ainda mais divertida.</p>
    </div>
  </li>
</ul>
<div className="mt-6">
  <p className="text-center text-lg font-semibold text-[#F25790]">Cadastre-se agora e ganhe créditos de boas-vindas para começar!</p>
</div>
                </div>
              </div>
              
              {/* Right Side - How it Works */}
              <div className="w-full md:w-1/2">
                <div className="bg-black bg-opacity-40 p-8 rounded-xl border border-gray-800">
                  <h2 className="text-2xl font-bold mb-6 text-[#F25790]">Como funciona</h2>
                  
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="bg-[#F25790] w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Escolha um modelo</h3>
                        <p className="text-gray-300">Navegue pela nossa seleção de modelos e encontre o perfil que mais combina com você.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="bg-[#F25790] w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Compre créditos</h3>
                        <p className="text-gray-300">Adquira créditos para usar durante suas chamadas. Quanto mais comprar, melhor o valor.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="bg-[#F25790] w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Inicie o chat por vídeo</h3>
                        <p className="text-gray-300">Com apenas um clique, você está em uma chamada privada com o modelo escolhido.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="bg-[#F25790] w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Aproveite a experiência</h3>
                        <p className="text-gray-300">Converse, faça pedidos e aproveite uma experiência totalmente personalizada.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    {!isLoggedIn ? (
                      <Link href="/cadastro" className="bg-[#F25790] hover:bg-[#d93d75] text-white px-8 py-3 rounded-full inline-block text-center transition-colors">
                        Cadastre-se agora
                      </Link>
                    ) : (
                      <Link href="/explorar" className="bg-[#F25790] hover:bg-[#d93d75] text-white px-8 py-3 rounded-full inline-block text-center transition-colors">
                        Explorar modelos
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pricing Section */}
            <div className="max-w-5xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Pacotes de <span className="text-[#F25790]">Créditos</span></h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Basic Package */}
                <div className="bg-black bg-opacity-40 border border-gray-800 rounded-xl p-6 hover:border-[#F25790] transition-colors">
                  <h3 className="text-xl font-bold mb-2">Pacote Básico</h3>
                  <div className="text-3xl font-bold text-[#F25790] mb-2">R$ 29</div>
                  <p className="text-sm text-gray-400 mb-4">40 créditos</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Aproximadamente 40 minutos
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      +2 minutos grátis
                    </li>
                  </ul>
                  <button 
                    onClick={() => handlePurchaseClick('basic')}
                    className="w-full bg-white text-black py-2 rounded-full font-medium hover:bg-gray-200 transition-colors"
                  >
                    Comprar Agora
                  </button>
                </div>
                
                {/* Popular Package */}
                <div className="bg-black bg-opacity-40 border-2 border-[#F25790] rounded-xl p-6 relative transform hover:scale-105 transition-transform">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#F25790] text-white text-sm font-bold px-3 py-1 rounded-full">
                    MAIS VENDIDO!
                  </div>
                  <h3 className="text-xl font-bold mb-2">Pacote Popular</h3>
                  <div className="text-3xl font-bold text-[#F25790] mb-2">R$ 79</div>
                  <p className="text-sm text-gray-400 mb-4">100 créditos + 10 bônus</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Aproximadamente 100 minutos
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      +10 créditos bônus
                    </li>
                  </ul>
                  <button 
                    onClick={() => handlePurchaseClick('premium')}
                    className="w-full bg-[#F25790] text-white py-2 rounded-full font-medium hover:bg-[#d93d75] transition-colors"
                  >
                    Comprar Agora
                  </button>
                </div>
                
                {/* Pro Package */}
                <div className="bg-black bg-opacity-40 border border-gray-800 rounded-xl p-6 hover:border-[#F25790] transition-colors">
                  <h3 className="text-xl font-bold mb-2">Pacote Master</h3>
                  <div className="text-3xl font-bold text-[#F25790] mb-2">R$ 199</div>
                  <p className="text-sm text-gray-400 mb-4">300 créditos + 50 bônus</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Aproximadamente 300 minutos
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      +50 créditos bônus
                    </li>
                    
                  </ul>
                  <button 
                    onClick={() => handlePurchaseClick('master')}
                    className="w-full bg-white text-black py-2 rounded-full font-medium hover:bg-gray-200 transition-colors"
                  >
                    Comprar Agora
                  </button>
                </div>
              </div>
            </div>
            
            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Perguntas <span className="text-[#F25790]">Frequentes</span></h2>
              
              <div className="space-y-4">
                <div className="bg-black bg-opacity-40 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-2">Como funciona o pagamento?</h3>
                  <p className="text-gray-300">Você compra créditos que são gastos durante suas sessões de chat por vídeo. Cada modelo define seu próprio valor por minuto, e os créditos são descontados enquanto você está em uma chamada.</p>
                </div>
                
                <div className="bg-black bg-opacity-40 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-2">Posso solicitar ações específicas durante o chat?</h3>
                  <p className="text-gray-300">Sim, você pode fazer solicitações aos modelos durante a sessão. O atendimento dessas solicitações está sujeito à disponibilidade e conforto do modelo, sempre dentro dos termos de serviço da plataforma.</p>
                </div>
                
                <div className="bg-black bg-opacity-40 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-2">Como garantir minha privacidade?</h3>
                  <p className="text-gray-300">Todas as sessões são privadas e não são gravadas pela plataforma. Utilizamos criptografia de ponta a ponta para proteger sua chamada. Você pode optar por não mostrar seu rosto ou usar apelidos para manter sua privacidade.</p>
                </div>
                
                <div className="bg-black bg-opacity-40 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-2">Os créditos expiram?</h3>
                  <p className="text-gray-300">Sim, os créditos têm um período de validade que depende do pacote adquirido. O período de validade varia de 30 a 90 dias após a compra, dependendo do pacote escolhido.</p>
                </div>
              </div>
            </div>
          </div>
          
          <Footer />
        </div>
      </div>

      {/* Modal de Compra de Créditos */}
      {showCreditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Comprar Créditos</h3>
              <button 
                onClick={closeCreditModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-300 mb-4">
                Você selecionou o pacote: <span className="font-bold text-[#F25790]">
                  {selectedPackage === 'basic' && 'Básico (R$ 50)'}
                  {selectedPackage === 'premium' && 'Premium (R$ 150)'}
                  {selectedPackage === 'master' && 'Master (R$ 300)'}
                </span>
              </p>
              
              <div className="bg-gray-800 p-4 rounded-lg mb-4">
                <h4 className="font-bold text-white mb-2">Detalhes do Pagamento:</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  {selectedPackage === 'basic' && (
                    <>
                      <p>• 100 créditos</p>
                      <p>• Aproximadamente 40 minutos</p>
                      <p>• </p>
                    </>
                  )}
                  {selectedPackage === 'premium' && (
                    <>
                      <p>• 400 créditos + 30 bônus</p>
                      <p>• Aproximadamente 160 minutos</p>
                      <p>• </p>
                      <p>• 33% de desconto</p>
                    </>
                  )}
                  {selectedPackage === 'master' && (
                    <>
                      <p>• 1000 créditos + 100 bônus</p>
                      <p>• Aproximadamente 400 minutos</p>
                      <p>• </p>
                      <p>• 50% de desconto</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={closeCreditModal}
                className="flex-1 bg-gray-700 text-white py-2 rounded-full font-medium hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  // Aqui você implementaria a integração com o gateway de pagamento
                  alert('Redirecionando para o pagamento...');
                  closeCreditModal();
                }}
                className="flex-1 bg-[#F25790] text-white py-2 rounded-full font-medium hover:bg-[#d93d75] transition-colors"
              >
                Pagar Agora
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
