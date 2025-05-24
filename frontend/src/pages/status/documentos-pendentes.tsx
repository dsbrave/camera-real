import Head from 'next/head';
import StatusModal from '@/components/StatusModal';

export default function DocumentosPendentes() {
  return (
    <>
      <Head>
        <title>Documentos Pendentes | Camera Real</title>
        <meta name="description" content="Documentos em análise na Camera Real" />
      </Head>
      
      <StatusModal
        title="Documentos Pendentes"
        message="Seus documentos ainda não foram validados. Assim que forem aprovados, iremos enviar um e-mail informando que você já pode acessar a plataforma."
        buttonText="Entendi"
        buttonHref="/"
        type="warning"
      />
    </>
  );
} 