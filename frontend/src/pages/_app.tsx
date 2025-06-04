import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import AgeVerification from '@/components/AgeVerification';
import { UserProvider } from '@/contexts/UserContext';

export default function App({ Component, pageProps }: AppProps) {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [initialCheck, setInitialCheck] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    // Verificar se o usuário já confirmou a idade
    try {
      const hasVerified = localStorage.getItem('age-verified') === 'true';
      setIsAgeVerified(hasVerified);
    } catch (error) {
      console.error('Erro ao verificar idade:', error);
      setIsAgeVerified(false);
    }
    setInitialCheck(true);
  }, [isClient]);

  // Função para atualizar o estado quando o usuário verificar a idade
  const handleAgeVerification = () => {
    setIsAgeVerified(true);
  };

  // Renderização de loading durante hidratação
  if (!isClient || !initialCheck) {
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Camera Real - Plataforma de Videochat</title>
          <meta name="description" content="Plataforma de videochat adulto com modelos reais" />
          <meta name="keywords" content="videochat, adulto, modelos, webcam" />
        </Head>
        <UserProvider>
          <main className="font-sans min-h-screen bg-black flex items-center justify-center">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F25790] mx-auto mb-4"></div>
              <p>Carregando...</p>
            </div>
          </main>
        </UserProvider>
      </>
    );
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Camera Real - Plataforma de Videochat</title>
        <meta name="description" content="Plataforma de videochat adulto com modelos reais" />
        <meta name="keywords" content="videochat, adulto, modelos, webcam" />
      </Head>
      <UserProvider>
        <main className="font-sans">
          {!isAgeVerified && (
            <AgeVerification onVerify={handleAgeVerification} />
          )}
          {isAgeVerified && <Component {...pageProps} />}
        </main>
      </UserProvider>
    </>
  );
}
