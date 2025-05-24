import Link from 'next/link';
import Layout from '@/components/Layout';

export default function DocumentosInvalidos() {
  return (
    <Layout 
      title="Documentos Inválidos - Camera Real" 
      description="Não foi possível validar seus documentos"
      showHeader={false}
    >
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-[#222222] bg-opacity-80 p-8 rounded-lg max-w-lg mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-octagon border-4 border-[#F25790] flex items-center justify-center">
              <span className="text-[#F25790] text-5xl font-bold">!</span>
            </div>
          </div>
          
          <p className="text-xl mb-8">
            Não foi possível validar seus documentos. Clique
            no botão abaixo para reenviá-los novamente.
          </p>
          
          <div className="mt-8">
            <Link 
              href="/cadastro-modelo" 
              className="bg-[#F25790] text-white px-8 py-3 rounded-full inline-block hover:bg-opacity-90 transition-all"
            >
              Reenviar documentos
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
