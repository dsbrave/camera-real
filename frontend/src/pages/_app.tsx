import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import AgeVerification, { TestButton } from '@/components/AgeVerification';

export default function App({ Component, pageProps }: AppProps) {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [initialCheck, setInitialCheck] = useState(false);

  useEffect(() => {
    // Verificar se o usuário já confirmou a idade
    const hasVerified = localStorage.getItem('age-verified') === 'true';
    setIsAgeVerified(hasVerified);
    setInitialCheck(true);
  }, []);

  // Função para atualizar o estado quando o usuário verificar a idade
  const handleAgeVerification = () => {
    setIsAgeVerified(true);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Camera Real - Plataforma de Videochat</title>
        <meta name="description" content="Plataforma de videochat adulto com modelos reais" />
        <meta name="keywords" content="videochat, adulto, modelos, webcam" />
      </Head>
      <main className="font-sans">
        {initialCheck && !isAgeVerified && (
          <AgeVerification onVerify={handleAgeVerification} />
        )}
        {(isAgeVerified || !initialCheck) && <Component {...pageProps} />}
        {/* Botão de teste para a verificação de idade */}
        <TestButton />
      </main>
    </>
  );
}
