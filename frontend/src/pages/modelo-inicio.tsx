import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const ModeloInicio: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#2D1A3A] text-white">
      <Head>
        <title>Início | Camera Real</title>
        <meta name="description" content="Página inicial do modelo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="flex justify-between items-center p-4 md:p-6">
        <div className="logo">
          <Image src="/images/logo.png" alt="Camera Real" width={150} height={60} />
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/regras-e-ajuda" className="text-white hover:text-camera-pink">
            Regras e ajuda
          </Link>
          <button className="text-white">
            <Image src="/icons/bell.png" alt="Notificações" width={24} height={24} />
          </button>
          <button className="text-white">
            <Image src="/icons/user.png" alt="Perfil" width={24} height={24} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="text-camera-pink">Fique online</span> agora e <br />
            comece um chat exclusivo.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            Faça novas amizades e vivencie experiências únicas. Crie vínculos a cada conversa e aumente seus ganhos!
          </p>
          <Link href="/ficar-online" className="inline-flex items-center px-6 py-3 rounded-full bg-camera-pink text-white font-medium text-lg transition-all hover:bg-pink-600">
            <Image src="/icons/chat.png" alt="Chat" width={24} height={24} className="mr-2" />
            Ficar Online
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          <div className="bg-[#131340]/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-300">Seus likes</h2>
            </div>
            <div className="flex items-center mt-2">
              <Image src="/icons/heart.png" alt="Likes" width={32} height={32} className="text-camera-pink" />
              <span className="text-4xl font-bold ml-2">12k</span>
            </div>
          </div>
          
          <div className="bg-[#131340]/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-300">Seus ganhos</h2>
              <Link href="/financeiro" className="text-camera-pink text-sm hover:underline flex items-center">
                Ver extrato completo <span className="ml-1">▶</span>
              </Link>
            </div>
            <div className="mt-2">
              <span className="text-4xl font-bold">$300,00</span>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Como <span className="text-camera-pink">mandar bem</span> no Camera Real</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Card 1 */}
            <div className="rounded-lg overflow-hidden">
              <Image src="/images/dica1.jpg" alt="Aumente seus ganhos" width={220} height={160} className="w-full h-48 object-cover" />
              <div className="p-3 bg-black/30 backdrop-blur-sm">
                <h3 className="font-medium">Aumente seus ganhos</h3>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="rounded-lg overflow-hidden">
              <Image src="/images/dica2.jpg" alt="Cuide de você" width={220} height={160} className="w-full h-48 object-cover" />
              <div className="p-3 bg-black/30 backdrop-blur-sm">
                <h3 className="font-medium">Cuide de você</h3>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="rounded-lg overflow-hidden">
              <Image src="/images/dica3.jpg" alt="Cenário e luz" width={220} height={160} className="w-full h-48 object-cover" />
              <div className="p-3 bg-black/30 backdrop-blur-sm">
                <h3 className="font-medium">Cenário e luz</h3>
              </div>
            </div>
            
            {/* Card 4 */}
            <div className="rounded-lg overflow-hidden">
              <Image src="/images/dica4.jpg" alt="Interação e expressão" width={220} height={160} className="w-full h-48 object-cover" />
              <div className="p-3 bg-black/30 backdrop-blur-sm">
                <h3 className="font-medium">Interação e expressão</h3>
              </div>
            </div>
            
            {/* Card 5 */}
            <div className="rounded-lg overflow-hidden">
              <Image src="/images/dica5.jpg" alt="Conta pra gente: Como melhorar o Camera Real?" width={220} height={160} className="w-full h-48 object-cover" />
              <div className="p-3 bg-black/30 backdrop-blur-sm">
                <h3 className="font-medium">Conta pra gente: Como melhorar o Camera Real?</h3>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-6 px-4 border-t border-gray-800">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">© 2024 Camera Real</p>
          </div>
          <div className="flex space-x-6">
            <Link href="/politica-de-privacidade" className="text-sm text-gray-400 hover:text-white">
              Política de privacidade
            </Link>
            <Link href="/fale-conosco" className="text-sm text-gray-400 hover:text-white">
              Fale conosco
            </Link>
            <Link href="/termos-e-condicoes" className="text-sm text-gray-400 hover:text-white">
              Termos e condições
            </Link>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/regras-e-ajuda" className="text-sm text-gray-400 hover:text-white">
              Regras e ajuda
            </Link>
            <span className="mx-2 text-gray-600">•</span>
            <Link href="/assistencia" className="text-sm text-gray-400 hover:text-white">
              Assistência
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModeloInicio;
