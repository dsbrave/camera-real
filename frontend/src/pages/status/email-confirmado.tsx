import Head from 'next/head';
import StatusModal from '@/components/StatusModal';

export default function EmailConfirmado() {
  return (
    <>
      <Head>
        <title>E-mail Confirmado | Camera Real</title>
        <meta name="description" content="E-mail confirmado com sucesso na Camera Real" />
      </Head>
      
      <StatusModal
        title="E-mail Confirmado"
        message="Seu e-mail foi confirmado com sucesso. Clique no botão abaixo para logar na plataforma."
        buttonText="Entrar no Camera Real"
        buttonHref="/login"
        type="success"
      />
    </>
  );
} 