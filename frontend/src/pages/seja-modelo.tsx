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
      
      <div className="min-h-screen bg-black text-white" style={{ backgroundImage: "url('/images/high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_6xmeh5hwdbulnwsdojt2_3.png')", backgroundSize: 'cover', backgroundPosition: 'right 5%', transform: 'scaleX(-1)' }}>
        {/* Overlay padronizado mais escuro */}
        <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>
        <div className="relative z-10" style={{ transform: 'scaleX(-1)' }}>
          <Header />
          <div className="h-16 sm:h-20 md:h-24" />
          
          <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Área de conteúdo - Alinhada à esquerda */}
            <div className="w-full flex items-start justify-start pt-0 pb-0 px-2 sm:pt-0 sm:pb-0 sm:px-4 md:pt-0 md:pb-0 md:px-6 lg:pt-0 lg:pb-0 lg:px-8 min-h-[40vh]">
  <div className="max-w-lg w-full text-left lg:ml-6 mt-0">
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 leading-tight">
      O que é ser <span className="text-[#F25790]">modelo</span> Camera Real?
    </h1>
    <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
      Ser modelo Camera Real é fazer parte da mais inovadora website de performance digital do mercado.
    </p>
    <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
      Com seu formato exclusivo, o Camera Real proporciona mais interação aos usuários com rendimentos significativos.
    </p>
    {/* Benefits section - mais espaçado, cards maiores */}
    <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8 w-fit">
      <div className="bg-black/20 border border-white/5 px-3 py-3 sm:px-4 sm:py-3 rounded-lg flex items-center gap-3 shadow-md backdrop-blur-sm w-fit max-w-xs">
        <span className="text-[#F25790] flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9">
          {/* Ícone dinheiro */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </span>
        <div>
          <h3 className="font-bold text-sm sm:text-base mb-1">Ganhos Altos</h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-tight">60-70% de comissão</p>
        </div>
      </div>
      <div className="bg-black/20 border border-white/5 px-3 py-3 sm:px-4 sm:py-3 rounded-lg flex items-center gap-3 shadow-md backdrop-blur-sm w-fit max-w-xs">
        <span className="text-[#F25790] flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9">
          {/* Ícone segurança */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 10V7a4 4 0 10-8 0v3M5 10h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z" />
          </svg>
        </span>
        <div>
          <h3 className="font-bold text-sm sm:text-base mb-1">Segurança</h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-tight">Plataforma segura</p>
        </div>
      </div>
      <div className="bg-black/20 border border-white/5 px-3 py-3 sm:px-4 sm:py-3 rounded-lg flex items-center gap-3 shadow-md backdrop-blur-sm w-fit max-w-xs">
        <span className="text-[#F25790] flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9">
          {/* Ícone flexibilidade */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.5} fill="none" />
          </svg>
        </span>
        <div>
          <h3 className="font-bold text-sm sm:text-base mb-1">Flexibilidade</h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-tight">Horários livres</p>
        </div>
      </div>
      <div className="bg-black/20 border border-white/5 px-3 py-3 sm:px-4 sm:py-3 rounded-lg flex items-center gap-3 shadow-md backdrop-blur-sm w-fit max-w-xs">
        <span className="text-[#F25790] flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9">
          {/* Ícone suporte */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.5} fill="none" />
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth={1.5} fill="none" />
            <circle cx="12" cy="12" r="2" fill="#F25790" />
          </svg>
        </span>
        <div>
          <h3 className="font-bold text-sm sm:text-base mb-1">Suporte</h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-tight">Equipe dedicada</p>
        </div>
      </div>
    </div>
                
                <Link 
                  href="/cadastro-modelo" 
                  className="bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-3 sm:py-4 px-8 sm:px-10 rounded-full inline-block text-center transition-all duration-200 text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 w-full sm:w-auto"
                >
                  Registre-se agora
                </Link>
                
                {/* Informações adicionais - sempre visível, layout responsivo */}
                
              </div>
            </div>
          </div>
          
          <Footer />
        </div>
      </div>
    </>
  );
}
