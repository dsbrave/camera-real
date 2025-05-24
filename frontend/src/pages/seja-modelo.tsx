import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SejaModelo() {
  return (
    <>
      <Head>
        <title>Seja Modelo - Camera Real</title>
        <meta name="description" content="Torne-se um modelo no Camera Real e comece a ganhar" />
      </Head>
      
      <div className="min-h-screen bg-black text-white page-with-bg-image" style={{ backgroundImage: "url('/images/Group 26.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Header />
        
        <div className="flex min-h-screen content-after-header">
          {/* Área da imagem - Lado esquerdo */}
          <div className="hidden md:block w-1/2 relative" style={{ backgroundImage: "url('/images/model-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* Sem conteúdo, apenas a imagem de fundo */}
          </div>
          
          {/* Área de conteúdo - Lado direito */}
          <div className="w-full md:w-1/2 bg-black bg-opacity-90 flex items-center justify-center p-8 md:p-12">
            <div className="max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold mb-8">
                O que é ser <span className="text-[#F25790]">modelo</span><br />
                Camera Real?
              </h1>
              
              <p className="text-lg mb-6">
                Ser modelo Camera Real é fazer parte da mais inovadora website de performance digital do mercado.
              </p>
              
              <p className="text-lg mb-8">
                Com seu formato exclusivo, o Camera Real proporciona mais interação aos usuários com rendimentos significativos.
              </p>
              
              <Link href="/cadastro-modelo" className="bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-4 px-10 rounded-full inline-block text-center transition-colors duration-200">
                Registre-se agora
              </Link>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}
