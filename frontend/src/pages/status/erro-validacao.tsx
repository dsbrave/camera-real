import Head from 'next/head';
import StatusModal from '@/components/StatusModal';

export default function ErroValidacao() {
  const handleResendDocuments = () => {
    // Lógica para reenviar documentos
    window.location.href = '/cadastro-modelo';
  };

  return (
    <>
      <Head>
        <title>Erro na Validação | Camera Real</title>
        <meta name="description" content="Erro na validação de documentos na Camera Real" />
      </Head>
      
      <StatusModal
        title="Erro na Validação"
        message="Não foi possível validar seus documentos. Clique no botão abaixo para reenvia-los novamente."
        buttonText="Reenviar documentos"
        buttonAction={handleResendDocuments}
        type="error"
      />
    </>
  );
} 