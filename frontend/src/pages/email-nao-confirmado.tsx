import Link from 'next/link';
import Layout from '@/components/Layout';

export default function EmailNaoConfirmado() {
  return (
    <Layout 
      title="E-mail Não Confirmado - Camera Real" 
      description="Seu e-mail ainda não foi confirmado"
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
            Seu e-mail ainda não foi confirmado. Caso ainda
            não o tenha recebido, clique no botão abaixo
            para reenviá-lo.
          </p>
          
          <div className="mt-8">
            <button 
              className="bg-[#F25790] text-white px-8 py-3 rounded-full inline-block hover:bg-opacity-90 transition-all"
            >
              Reenviar e-mail de confirmação
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
