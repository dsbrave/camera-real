import Head from 'next/head';
import StatusModal from '@/components/StatusModal';

export default function ContaSuspensa() {
  return (
    <>
      <Head>
        <title>Conta Suspensa | Camera Real</title>
        <meta name="description" content="Conta suspensa na Camera Real" />
      </Head>
      
      <StatusModal
        title="Conta Suspensa"
        message="Sua conta foi temporariamente suspensa por violação dos termos de uso. Entre em contato com o suporte para mais informações."
        buttonText="Falar com suporte"
        buttonHref="/assistencia"
        type="error"
      />
    </>
  );
} 