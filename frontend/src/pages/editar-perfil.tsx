import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProfileEditModal from '@/components/ProfileEditModal';

export default function EditarPerfil() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    photo: '/images/default-profile.jpg'
  });

  useEffect(() => {
    // Carregar dados do usuário do localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser) {
          setUserData({
            name: parsedUser.name || userData.name,
            email: parsedUser.email || userData.email,
            phone: parsedUser.phone || userData.phone,
            photo: parsedUser.photo || userData.photo
          });
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push('/painel-usuario');
  };

  const handleUpdateProfile = (updatedData: any) => {
    // Atualizar os dados do usuário no localStorage
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const updatedUser = { ...parsedUser, ...updatedData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUserData({
          name: updatedUser.name || userData.name,
          email: updatedUser.email || userData.email,
          phone: updatedUser.phone || userData.phone,
          photo: updatedUser.photo || userData.photo
        });
        
        // Mostrar mensagem de sucesso
        setShowSuccessMessage(true);
        setIsModalOpen(false);
        
        // Redirecionar após 2 segundos
        setTimeout(() => {
          router.push('/painel-usuario');
        }, 2000);
      }
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black bg-opacity-90 page-with-bg-image" style={{ background: 'linear-gradient(135deg, #1a0033 0%, #330033 50%, #220022 100%)' }}>
      <Head>
        <title>Editar Perfil | Camera Real</title>
        <meta name="description" content="Atualize suas informações de perfil" />
      </Head>
      
      <Header />
      
      {/* Conteúdo principal */}
      <main className="content-after-header container mx-auto px-4 py-8 pt-32">
        {showSuccessMessage && (
          <div className="bg-[#1a8a3d] text-white p-4 rounded-lg mb-8 max-w-lg mx-auto flex items-center animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <h3 className="font-bold">Perfil atualizado com sucesso!</h3>
              <p className="text-sm">Suas informações foram salvas. Redirecionando para o painel...</p>
            </div>
          </div>
        )}
        
        {!showSuccessMessage && !isModalOpen && (
          <div className="text-center py-8">
            <h1 className="text-3xl font-bold mb-4">Editar Perfil</h1>
            <p className="text-gray-300 mb-6">Clique no botão abaixo para editar suas informações pessoais</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-2 px-6 rounded-full transition-colors"
            >
              Editar perfil
            </button>
          </div>
        )}
      </main>
      
      <Footer />
      
      {/* Modal de edição de perfil */}
      <ProfileEditModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userData={userData}
        onUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
}
