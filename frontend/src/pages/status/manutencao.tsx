import Head from 'next/head';
import StatusModal from '@/components/StatusModal';

export default function Manutencao() {
  return (
    <>
      <Head>
        <title>Sistema em Manutenção | Camera Real</title>
        <meta name="description" content="Sistema temporariamente em manutenção" />
      </Head>
      
      <StatusModal
        title="Sistema em Manutenção"
        message="Estamos realizando melhorias em nossa plataforma. O sistema estará disponível novamente em breve. Agradecemos sua compreensão."
        buttonText="Voltar à página inicial"
        buttonHref="/"
        type="info"
      />
    </>
  );
} 