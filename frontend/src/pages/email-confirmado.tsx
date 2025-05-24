import Link from 'next/link';
import Layout from '@/components/Layout';

export default function EmailConfirmado() {
  return (
    <Layout 
      title="E-mail Confirmado - Camera Real" 
      description="Seu e-mail foi confirmado com sucesso"
      showHeader={false}
    >
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-[#222222] bg-opacity-80 p-8 rounded-lg max-w-lg mx-auto text-center">
          <p className="text-xl mb-8">
            Seu e-mail foi confirmado com sucesso. Clique no
            botão abaixo para logar na plataforma.
          </p>
          
          <div className="mt-8">
            <Link 
              href="/login" 
              className="bg-[#ff4d8d] text-white px-8 py-3 rounded-full inline-block hover:bg-opacity-90 transition-all"
            >
              Entrar no Camera Real
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
