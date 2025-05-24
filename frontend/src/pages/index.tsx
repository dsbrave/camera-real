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
      
      <div className="min-h-screen bg-black text-white page-with-bg-image" style={{ backgroundImage: "url('/images/Group 26.png')", backgroundSize: 'cover', backgroundPosition: 'center', transform: 'scaleX(-1)' }}>
        <div style={{ transform: 'scaleX(-1)' }}> {/* Contra-flipa os elementos para ficarem corretos */}
          <Header />
          <div style={{ height: '120px' }} />
          <div className="container mx-auto px-4 pb-20 z-10 relative">
            <div className="flex">
              <div className="w-full max-w-3xl">
                <h1 className="text-5xl sm:text-6xl font-bold mb-8">
                  Videochats: explore o<br/>
                  <span className="text-[#F25790]">prazer</span> em tempo real.
                </h1>
                
                <p className="text-xl text-gray-300 mb-10">
                  Conheça nossa plataforma inovadora de chat por vídeo.<br/>
                  Em apenas um clique descubra um novo jeito de interagir.<br/>
                  Junte-se a nós e conecte-se de forma genuína.
                </p>
                
                <div className="mb-12">
                  {isLoggedIn ? (
                    <Link href="/explorar" className="bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-4 px-10 rounded-full inline-block text-center transition-colors duration-200">
                      Explorar
                    </Link>
                  ) : (
                    <Link href="/cadastro" className="bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-4 px-10 rounded-full inline-block text-center transition-colors duration-200">
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
