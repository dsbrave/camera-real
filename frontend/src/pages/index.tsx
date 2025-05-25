import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Verificar se o usuário está logado através do localStorage
    try {
      const userStorage = localStorage.getItem('user');
      if (userStorage) {
        const user = JSON.parse(userStorage);
        setIsLoggedIn(!!user.isLoggedIn);
      }
    } catch (error) {
      console.error('Erro ao verificar login:', error);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Camera Real - Plataforma de Videochat</title>
        <meta name="description" content="A melhor plataforma de videochat ao vivo. Converse com modelos em tempo real." />
      </Head>
      
      <div className="min-h-screen bg-black text-white" style={{ backgroundImage: "url('/images/high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_l1g01p6hm0p1kyxw2q42_0.png')", backgroundSize: 'cover', backgroundPosition: 'center 15%', transform: 'scaleX(-1)' }}>
        {/* Overlay igual ao das páginas de cadastro */}
        <div className="absolute inset-0 bg-black bg-opacity-80 z-0"></div>
        
        <div style={{ transform: 'scaleX(-1)' }} className="relative z-10"> {/* Contra-flipa os elementos para ficarem corretos */}
          <Header />
          <div className="h-20 sm:h-24 md:h-32" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 z-10 relative">
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-3xl text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
                  Videochats: explore o<br/>
                  <span className="text-[#F25790]">prazer</span> em tempo real.
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Conheça nossa plataforma inovadora de chat por vídeo.<br className="hidden sm:block"/>
                  Em apenas um clique descubra um novo jeito de interagir.<br className="hidden sm:block"/>
                  Junte-se a nós e conecte-se de forma genuína.
                </p>
                
                <div className="mb-12">
                  {isLoggedIn ? (
                    <Link href="/explorar" className="bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-3 sm:py-4 px-8 sm:px-10 rounded-full inline-block text-center transition-colors duration-200 text-sm sm:text-base">
                      Explorar
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
