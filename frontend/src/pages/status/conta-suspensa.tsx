import React from 'react';
import Head from 'next/head';
import StatusModal from '@/components/StatusModal';

export default function ContaSuspensa() {
  return (
    <>
      <Head>
        <title>Conta Suspensa | Camera Real</title>
        <meta name="description" content="Sua conta foi suspensa" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <StatusModal
        title="Conta Suspensa"
        message="Sua conta foi suspensa devido a violações dos termos de uso. Entre em contato com o suporte para mais informações."
        buttonText="Entrar em Contato"
        buttonHref="/suporte"
        type="error"
      />
    </>
  );
} 