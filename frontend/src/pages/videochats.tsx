import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';

export default function Videochats() {
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
        <title>Videochats - Camera Real</title>
        <meta name="description" content="Conheça o funcionamento dos videochats ao vivo no Camera Real" />
      </Head>

      <div className="min-h-screen bg-black text-white relative">
        {/* Background */}
        <div className="relative z-10">
          <Header />
          
          {/* Main Content */}
          <div className="container mx-auto px-4 py-16 content-after-header">
            <h1 className="text-4xl font-bold mb-10 text-center">Como funcionam nossos <span className="text-[#F25790]">Videochats</span></h1>
            
            <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
              {/* Left Side - Video Chat Explanation */}
              <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <div className="bg-black bg-opacity-40 p-8 rounded-xl border border-gray-800 relative min-h-[400px] flex flex-col justify-center">
                  <h2 className="text-2xl font-bold mb-4 text-[#F25790]">Converse em tempo real</h2>
                  <p className="mb-4 text-lg text-gray-300">
                    Nossos videochats permitem que você se conecte diretamente com modelos ao vivo em tempo real, em uma experiência exclusiva e privada.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <div className="bg-[#F25790] bg-opacity-20 p-2 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#F25790]">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Vídeo em alta definição</span>
                        <p className="text-sm text-gray-400">Transmissão em HD para uma experiência imersiva</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#F25790] bg-opacity-20 p-2 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#F25790]">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Ambiente seguro</span>
                        <p className="text-sm text-gray-400">Privacidade garantida e conexão criptografada</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#F25790] bg-opacity-20 p-2 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#F25790]">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Pagamento flexível</span>
                        <p className="text-sm text-gray-400">Compre créditos e pague apenas pelo tempo utilizado</p>
                      </div>
                    </li>
                  </ul>
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
                  <div className="text-3xl font-bold text-[#F25790] mb-2">R$ 50</div>
                  <p className="text-sm text-gray-400 mb-4">100 créditos</p>
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
                      Válido por 30 dias
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
                    MAIS POPULAR
                  </div>
                  <h3 className="text-xl font-bold mb-2 mt-2">Pacote Premium</h3>
                  <div className="text-3xl font-bold text-[#F25790] mb-2">R$ 150</div>
                  <p className="text-sm text-gray-400 mb-4">400 créditos <span className="text-white font-bold">(33% de desconto)</span></p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Aproximadamente 160 minutos
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Válido por 60 dias
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      30 créditos bônus
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
                  <div className="text-3xl font-bold text-[#F25790] mb-2">R$ 300</div>
                  <p className="text-sm text-gray-400 mb-4">1000 créditos <span className="text-white font-bold">(50% de desconto)</span></p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Aproximadamente 400 minutos
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Válido por 90 dias
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      100 créditos bônus
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
                      <p>• Válido por 30 dias</p>
                    </>
                  )}
                  {selectedPackage === 'premium' && (
                    <>
                      <p>• 400 créditos + 30 bônus</p>
                      <p>• Aproximadamente 160 minutos</p>
                      <p>• Válido por 60 dias</p>
                      <p>• 33% de desconto</p>
                    </>
                  )}
                  {selectedPackage === 'master' && (
                    <>
                      <p>• 1000 créditos + 100 bônus</p>
                      <p>• Aproximadamente 400 minutos</p>
                      <p>• Válido por 90 dias</p>
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
