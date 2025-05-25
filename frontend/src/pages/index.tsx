import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  
  useEffect(() => {
    // Verificar se o usuário está logado através do localStorage
    try {
      const userStorage = localStorage.getItem('user');
      if (userStorage) {
        const user = JSON.parse(userStorage);
        setIsLoggedIn(!!user.isLoggedIn);
        if (user.isLoggedIn && user.name) {
          setUserName(user.name);
        }
      }
    } catch (error) {
      console.error('Erro ao verificar login:', error);
    }
  }, []);

  // Definir a imagem de fundo baseada no status de login
  const backgroundImage = isLoggedIn 
    ? "url('/images/intimate_abstract_neon-lit_room_designed_for_cam_girls_and_digital_content_creators_no_models_no_be_ciz4ls7h0mms3epzpkxr_1.png')" // Imagem do quarto para usuários logados
    : "url('/images/high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_l1g01p6hm0p1kyxw2q42_0.png')"; // Imagem da modelo para usuários deslogados

  return (
    <>
      <Head>
        <title>Camera Real - Plataforma de Videochat</title>
        <meta name="description" content="A melhor plataforma de videochat ao vivo. Converse com modelos em tempo real." />
      </Head>
      
      <div className="min-h-screen bg-black text-white" style={{ backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center 15%', transform: 'scaleX(-1)' }}>
        {/* Overlay igual ao das páginas de cadastro */}
        <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>
        
        <div className="relative z-10" style={{ transform: 'scaleX(-1)' }}> {/* Contra-flipa os elementos para ficarem corretos */}
          <Header />
          <div className="h-20 sm:h-24 md:h-32" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 z-10 relative">
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-3xl text-center lg:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 leading-tight">
                  {isLoggedIn && userName ? (
                    <>
                      Olá <span className="text-[#F25790]">{userName}</span>!<br/>
                      Seus videochats personalizados<br/>
                      te aguardam em <span className="text-[#F25790]">tempo real</span>.
                    </>
                  ) : (
                    <>
                      Videochats: explore o<br/>
                      <span className="text-[#F25790]">prazer</span> em tempo real.
                    </>
                  )}
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {isLoggedIn ? (
                    <>
                      Experiências selecionadas especialmente para você.<br className="hidden sm:block"/>
                      Conecte-se agora e descubra seu match perfeito.
                    </>
                  ) : (
                    <>
                      Conheça nossa plataforma inovadora de chat por vídeo.<br className="hidden sm:block"/>
                      Em apenas um clique descubra um novo jeito de interagir.<br className="hidden sm:block"/>
                      Junte-se a nós e conecte-se de forma genuína.
                    </>
                  )}
                </p>
                
                <div className="mb-12">
                  {isLoggedIn ? (
                    <Link href="/explorar" className="bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-3 sm:py-4 px-8 sm:px-10 rounded-full inline-block text-center transition-colors duration-200 text-sm sm:text-base">
                      Explorar Agora
                    </Link>
                  ) : (
                    <Link href="/cadastro" className="bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-3 sm:py-4 px-8 sm:px-10 rounded-full inline-block text-center transition-colors duration-200 text-sm sm:text-base">
                      Cadastre-se agora
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <Footer />
        </div>
      </div>
    </>
  );
}
