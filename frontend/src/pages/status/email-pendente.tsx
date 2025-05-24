import Head from 'next/head';
import StatusModal from '@/components/StatusModal';

export default function EmailPendente() {
  const handleResendEmail = () => {
    // Lógica para reenviar e-mail
    console.log('Reenviando e-mail de confirmação...');
  };

  return (
    <>
      <Head>
        <title>E-mail Pendente | Camera Real</title>
        <meta name="description" content="Confirme seu e-mail para acessar a plataforma Camera Real" />
      </Head>
      
      <StatusModal
        title="E-mail Pendente"
        message="Seu e-mail ainda não foi confirmado. Caso ainda não o tenha recebido, clique no botão abaixo para reenvia-lo."
        buttonText="Reenviar e-mail de confirmação"
        buttonAction={handleResendEmail}
        type="warning"
      />
    </>
  );
} 