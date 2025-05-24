import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Sobre() {
  return (
    <>
      <Head>
        <title>Sobre a Camera Real | Plataforma de Videochat</title>
        <meta name="description" content="Conheça a história e a missão da Camera Real, a mais nova plataforma de videochat para adultos do Brasil." />
      </Head>

      <div className="min-h-screen flex flex-col text-white page-with-bg-image" style={{ background: 'linear-gradient(135deg, #1a0033 0%, #330033 50%, #220022 100%)' }}>
        <Header />
        
        <main className="flex-1 py-12 content-after-header">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="mb-10 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Nossa <span className="text-[#F25790]">História</span></h1>
              <p className="text-xl text-gray-300">Como nasceu a maior plataforma brasileira de videochat adulto</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10 mb-16 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-[#F25790]">O início de tudo</h2>
                <p className="mb-4 text-gray-300">
                  A Camera Real nasceu em 2021, em plena pandemia, quando três amigos empreendedores 
                  identificaram uma oportunidade de mercado: criar uma plataforma de videochat 
                  100% brasileira, com foco na qualidade e segurança tanto para modelos quanto para usuários.
                </p>
                <p className="mb-4 text-gray-300">
                  Com background em tecnologia e desenvolvimento de software, a equipe fundadora 
                  conseguiu criar uma plataforma robusta que garantia pagamentos seguros e 
                  estáveis para as modelos e uma experiência premium para os usuários.
                </p>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
                <Image 
                  src="/images/close-up_de_duas_mos_se_conectando_digitalmente-_a_mo_esquerda_de_uma_modelo_segurando_um_smartphon_jh4ulurb16xob05ie124_3.png" 
                  alt="Conexão digital - mãos se conectando através da tecnologia" 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10 mb-16 items-center">
              <div className="order-2 md:order-1 relative h-80 rounded-lg overflow-hidden shadow-xl">
                <Image 
                  src="/images/fotografia_realista_de_um_escritrio_moderno__noite_com_trs_laptops_abertos_mostrando_linhas_de_cdig_7o867ohk7qss4wikqslz_3.png" 
                  alt="Escritório moderno à noite com laptops mostrando código" 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-2xl font-bold mb-4 text-[#F25790]">Nossa Missão</h2>
                <p className="mb-4 text-gray-300">
                  Acreditamos em criar conexões genuínas e proporcionar momentos de intimidade e prazer 
                  com total segurança e privacidade. Nossa missão é valorizar as modelos parceiras 
                  oferecendo as melhores condições de trabalho e remuneração do mercado.
                </p>
                <p className="mb-4 text-gray-300">
                  Somos pioneiros no Brasil em implementar um sistema que garante pagamentos 
                  justos e pontuais para nossas modelos, com taxas competitivas e transparência 
                  em todas as transações.
                </p>
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6 text-center text-[#F25790]">Nossos Valores</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gray-900 p-6 rounded-xl">
                  <div className="w-16 h-16 bg-[#F25790] rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center">Segurança</h3>
                  <p className="text-gray-300 text-center">
                    Protegemos os dados e a privacidade de todos os usuários e modelos com os mais altos padrões de segurança.
                  </p>
                </div>
                
                <div className="bg-gray-900 p-6 rounded-xl">
                  <div className="w-16 h-16 bg-[#F25790] rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center">Transparência</h3>
                  <p className="text-gray-300 text-center">
                    Garantimos total transparência nas cobranças e nos pagamentos às modelos, sem taxas ocultas.
                  </p>
                </div>
                
                <div className="bg-gray-900 p-6 rounded-xl">
                  <div className="w-16 h-16 bg-[#F25790] rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center">Respeito</h3>
                  <p className="text-gray-300 text-center">
                    Promovemos um ambiente de respeito mútuo entre modelos e usuários, com tolerância zero a assédio.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-xl text-center mb-16">
              <h2 className="text-2xl font-bold mb-6 text-[#F25790]">Nossa Equipe</h2>
              <p className="text-xl text-gray-300 mb-8">
                Somos mais de 30 profissionais dedicados a criar a melhor experiência 
                de videochat adulto do Brasil, incluindo desenvolvedores, designers, 
                atendimento ao cliente e especialistas em marketing.
              </p>
              
              <div className="flex justify-center gap-6 flex-wrap">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-3 mx-auto border-2 border-[#F25790]">
                    <Image
                      src="/images/team-1.jpg"
                      alt="Fundador"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="font-bold">Ricardo Mendes</h3>
                  <p className="text-sm text-gray-400">CEO & Fundador</p>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-3 mx-auto border-2 border-[#F25790]">
                    <Image
                      src="/images/team-2.jpg"
                      alt="CTO"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="font-bold">Marcela Silva</h3>
                  <p className="text-sm text-gray-400">CTO</p>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-3 mx-auto border-2 border-[#F25790]">
                    <Image
                      src="/images/team-3.jpg"
                      alt="COO"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="font-bold">André Santos</h3>
                  <p className="text-sm text-gray-400">COO</p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-6 text-[#F25790]">Faça Parte Dessa História</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Seja um usuário ou uma modelo, você é bem-vindo à nossa comunidade.
                Junte-se a nós e descubra por que a Camera Real é a plataforma que mais cresce no Brasil.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/cadastro" className="px-8 py-4 bg-[#F25790] text-white rounded-full hover:bg-[#d93d75] font-bold">
                  Crie sua conta
                </Link>
                <Link href="/cadastro-modelo" className="px-8 py-4 border-2 border-[#F25790] text-[#F25790] rounded-full hover:bg-[#F25790] hover:text-white font-bold">
                  Torne-se uma modelo
                </Link>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
