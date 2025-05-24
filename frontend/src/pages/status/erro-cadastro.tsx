import Head from 'next/head';
import StatusModal from '@/components/StatusModal';

export default function ErroCadastro() {
  const handleTryAgain = () => {
    // Lógica para tentar novamente
    window.location.href = '/cadastro';
  };

  return (
    <>
      <Head>
        <title>Erro no Cadastro | Camera Real</title>
        <meta name="description" content="Erro ao criar conta na Camera Real" />
      </Head>
      
      <StatusModal
        title="Erro no Cadastro"
        message="Não foi possível criar sua conta. Verifique os dados preenchidos e tente novamente."
        buttonText="Tentar novamente"
        buttonAction={handleTryAgain}
        type="error"
      />
    </>
  );
} 