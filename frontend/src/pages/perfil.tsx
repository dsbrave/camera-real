import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import EditarPerfilModal from '../components/EditarPerfilModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Perfil: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Dados mockados do perfil
  const profileData = {
    username: '@Nick_name_aqui',
    email: 'email@email.com',
    phone: '55 11 93366 1304',
    profilePic: '/images/profile.jpg',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#2D1A3A] text-white">
      <Head>
        <title>Perfil | Camera Real</title>
        <meta name="description" content="Gerenciar perfil" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className="header-spacer" />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Perfil</h1>
          
          {/* Perfil Card */}
          <div className="bg-[#2D1A3A] rounded-lg p-6 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden mr-6">
                <Image 
                  src={profileData.profilePic || "/images/default-profile.jpg"} 
                  alt="Foto de perfil" 
                  width={96} 
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">João</h2>
                <p className="text-gray-300">{profileData.email}</p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="mt-2 px-4 py-1 bg-camera-pink text-white rounded-full text-sm hover:bg-pink-600 transition-colors"
                >
                  Editar perfil
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Informações de contato</h3>
                <div className="bg-[#3D2A4A] rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-300">Email</p>
                    <p>{profileData.email}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-300">Telefone</p>
                    <p>{profileData.phone}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Segurança</h3>
                <div className="bg-[#3D2A4A] rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-300">Senha</p>
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="text-camera-pink hover:underline"
                    >
                      Alterar senha
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Dados para pagamento</h3>
                <div className="bg-[#3D2A4A] rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-300">Banco</p>
                    <p>Nu Pagamentos</p>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-300">Tipo de conta</p>
                    <p>Conta Corrente</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-300">Número da conta</p>
                    <p>61***20</p>
                  </div>
                  <div className="mt-4">
                    <Link href="/financeiro">
                      <button className="w-full px-4 py-2 bg-camera-pink text-white rounded-full text-sm hover:bg-pink-600 transition-colors">
                        Ir para página financeira
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preferências e Configurações */}
          <div className="bg-[#2D1A3A] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Preferências e Configurações</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-[#4D2D5A]">
                <p>Notificações por e-mail</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-camera-pink"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b border-[#4D2D5A]">
                <p>Notificações no aplicativo</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-camera-pink"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b border-[#4D2D5A]">
                <p>Tema escuro</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-camera-pink"></div>
                </label>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-[#4D2D5A]">
                <p>Privacidade do perfil</p>
                <select className="bg-[#3D2A4A] text-white px-3 py-2 rounded-lg focus:outline-none">
                  <option>Público</option>
                  <option>Privado</option>
                  <option>Somente amigos</option>
                </select>
              </div>

              <div className="pt-4">
                <button className="px-4 py-2 bg-red-600 text-white rounded-full text-sm hover:bg-red-700 transition-colors">
                  Sair da conta
                </button>
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

      {/* Modal de Edição de Perfil */}
      <EditarPerfilModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        profileData={profileData}
      />
    <Footer />
    </div>
  );
};

export default Perfil;
