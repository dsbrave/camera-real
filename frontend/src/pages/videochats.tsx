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
    <div className="mr-3">
  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
</div>
    <div>
      <span className="font-medium">1. Escolha uma modelo</span>
      <p className="text-sm text-gray-400">Navegue pela nossa seleção e encontre quem mais combina com você.</p>
    </div>
  </li>
  <li className="flex items-start">
  <div className="mr-3">
    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-18c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm1 5h-2v6l5.25 3.15 1-1.65-4.25-2.5V7z" fill="currentColor"/>
    </svg>
  </div>
  <div>
    <span className="font-medium">2. Teste grátis por 10 segundos</span>
    <p className="text-sm text-gray-400">Você tem 10 segundos gratuitos para conhecer a modelo antes de começar a gastar créditos.</p>
  </div>
</li>
<li className="flex items-start">
  <div className="mr-3">
    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-18c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm1 5h-2v6l5.25 3.15 1-1.65-4.25-2.5V7z" fill="currentColor"/>
    </svg>
  </div>
  <div>
    <span className="font-medium">3. Créditos descontados por minuto</span>
    <p className="text-sm text-gray-400">Após o teste grátis, cada minuto de conversa consome 1 crédito (R$1,00).</p>
  </div>
</li>
  <li className="flex items-start">
  <div className="mr-3">
  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
</div>
  <div>
    <span className="font-medium">4. Troque de modelo com um swipe</span>
    <p className="text-sm text-gray-400">Você pode trocar de modelo até 10 vezes gratuitamente. Após isso, cada nova troca desconta 1 crédito (equivalente a 1 minuto) para evitar uso indevido.</p>
  </div>
</li>
  <li className="flex items-start">
  <div className="mr-3">
  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" />
    <path d="M15.5 11c-.828 0-1.5.672-1.5 1.5S14.672 14 15.5 14s1.5-.672 1.5-1.5S16.328 11 15.5 11zm-7 0c-.828 0-1.5.672-1.5 1.5S7.672 14 8.5 14s1.5-.672 1.5-1.5S9.328 11 8.5 11zM12 17c2.21 0 4-1.343 4-3H8c0 1.657 1.79 3 4 3z" fill="#000" />
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
                      <div className="mr-4 flex-shrink-0">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
</div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Escolha um modelo</h3>
                        <p className="text-gray-300">Navegue pela nossa seleção de modelos e encontre o perfil que mais combina com você.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-4 flex-shrink-0">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 6V4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2m4-5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5z" />
  </svg>
</div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Compre créditos</h3>
                        <p className="text-gray-300">Adquira créditos para usar durante suas chamadas. Quanto mais comprar, melhor o valor.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-4 flex-shrink-0">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14M4 6h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
  </svg>
</div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Inicie o chat por vídeo</h3>
                        <p className="text-gray-300">Com apenas um clique, você está em uma chamada privada com o modelo escolhido.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-4 flex-shrink-0">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
</div>
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
                      <Image 
                        src="/icons/action/check_circle.svg"
                        alt="Check"
                        width={20}
                        height={20}
                        className="w-5 h-5 text-white mr-2"
                      />
                      Aproximadamente 40 minutos
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
                      <Image 
                        src="/icons/action/check_circle.svg"
                        alt="Check"
                        width={20}
                        height={20}
                        className="w-5 h-5 text-white mr-2"
                      />
                      Aproximadamente 110 minutos
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
                      <Image 
                        src="/icons/action/check_circle.svg"
                        alt="Check"
                        width={20}
                        height={20}
                        className="w-5 h-5 text-white mr-2"
                      />
                      Aproximadamente 350 minutos
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
