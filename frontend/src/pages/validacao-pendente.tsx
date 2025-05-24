import Link from 'next/link';
import Layout from '@/components/Layout';

export default function ValidacaoPendente() {
  return (
    <Layout 
      title="Validação Pendente - Camera Real" 
      description="Aguarde a validação dos seus documentos"
      showHeader={false}
    >
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-[#222222] bg-opacity-80 p-8 rounded-lg max-w-lg mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full border-4 border-[#ff4d8d] flex items-center justify-center">
              <span className="text-[#ff4d8d] text-5xl font-bold">!</span>
            </div>
          </div>
          
          <p className="text-xl mb-8">
            Seus documentos ainda não foram validados.
            Assim que forem aprovados, iremos enviar um
            e-mail informando que você já pode acessar a
            plataforma.
          </p>
          
          <div className="mt-10">
            <Link 
              href="/" 
              className="text-[#ff4d8d] hover:underline"
            >
              Voltar para home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
