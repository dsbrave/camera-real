import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

export default function EditarPerfil() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    photo: '',
    username: ''
  });
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  useEffect(() => {
    // Carregar dados do usuário do localStorage
    const loadUserData = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser) {
            setUserData({
              name: parsedUser.name || 'Usuário',
              email: parsedUser.email || 'teste@camera.real',
              phone: parsedUser.phone || '55 11 93366 1304',
              photo: parsedUser.photo || '',
              username: parsedUser.username || parsedUser.name?.toLowerCase().replace(/\s+/g, '') || 'usuario'
            });
          }
        } catch (error) {
          console.error('Erro ao carregar dados do usuário:', error);
          router.push('/painel-usuario');
        }
      } else {
        router.push('/login');
      }
    };

    loadUserData();

    // Adiciona listener para o evento customizado de atualização de dados do usuário
    window.addEventListener('userDataUpdated', loadUserData);
    
    return () => {
      window.removeEventListener('userDataUpdated', loadUserData);
    };
  }, [router]);

  useEffect(() => {
    // Prevenir scroll do body quando o modal estiver aberto
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '0px';

    // Cleanup function para garantir que o scroll seja restaurado
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '';
    };
  }, []);

  const handleClose = () => {
    router.push('/painel-usuario');
  };

  const handleEdit = (field: string) => {
    setEditingField(field);
    setTempValue(userData[field as keyof typeof userData] || '');
  };

  const handleSave = () => {
    if (editingField) {
      const updatedUser = { ...userData, [editingField]: tempValue };
      setUserData(updatedUser);
      
      // Atualizar localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const newUserData = { ...parsedUser, [editingField]: tempValue };
        localStorage.setItem('user', JSON.stringify(newUserData));
        
        // Disparar evento customizado para notificar outras páginas
        window.dispatchEvent(new Event('userDataUpdated'));
      }
      
      setEditingField(null);
      setTempValue('');
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
  };

  const handlePasswordSave = () => {
    if (passwordData.new !== passwordData.confirm) {
      alert('As senhas não conferem');
      return;
    }
    if (passwordData.new.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    // Simular salvamento da senha
    setShowPassword(false);
    setPasswordData({ current: '', new: '', confirm: '' });
    alert('Senha alterada com sucesso!');
  };

  return (
    <>
      <Head>
        <title>Editar Perfil | Camera Real</title>
        <meta name="description" content="Edite suas informações pessoais" />
      </Head>

      {/* Modal Overlay */}
      <div 
        className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
          minHeight: '100vh',
          minWidth: '100vw'
        }}
      >
        {/* Modal Container */}
        <div 
          className="bg-black rounded-3xl max-w-md w-full mx-auto my-8 shadow-[0_0_30px_rgba(242,87,144,0.3)] border border-[#F25790]/20 relative"
          style={{
            maxHeight: 'calc(100vh - 4rem)',
            overflowY: 'auto'
          }}
        >
          {/* Efeitos neon de fundo */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#F25790]/5 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F25790] to-transparent opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F25790] to-transparent opacity-20"></div>
          
          <div className="relative z-10 p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Editar perfil</h2>
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Profile Photo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                  {userData.photo ? (
                    <Image 
                      src={userData.photo} 
                      alt="Foto de perfil" 
                      width={96} 
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-2xl font-bold">
                      {userData.name?.charAt(0) || 'U'}
                    </span>
                  )}
                </div>
                <button className="absolute bottom-0 right-0 bg-[#F25790] hover:bg-[#d93d75] text-white text-xs px-2 py-1 rounded-full transition-colors">
                  Editar
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Username */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                {editingField === 'username' ? (
                  <div>
                    <input
                      type="text"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg mb-3 border border-gray-600 focus:border-[#F25790] focus:outline-none"
                      placeholder="Nome de usuário"
                      autoFocus
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-[#F25790] hover:bg-[#d93d75] text-white rounded-lg text-sm transition-colors"
                      >
                        Salvar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-sm">Nome de usuário</p>
                      <p className="text-white">@{userData.username}</p>
                    </div>
                    <button
                      onClick={() => handleEdit('username')}
                      className="bg-[#F25790] hover:bg-[#d93d75] text-white text-sm px-4 py-2 rounded-lg transition-colors"
                    >
                      Editar
                    </button>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                {editingField === 'email' ? (
                  <div>
                    <input
                      type="email"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg mb-3 border border-gray-600 focus:border-[#F25790] focus:outline-none"
                      placeholder="Email"
                      autoFocus
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-[#F25790] hover:bg-[#d93d75] text-white rounded-lg text-sm transition-colors"
                      >
                        Salvar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white">{userData.email}</p>
                    </div>
                    <button
                      onClick={() => handleEdit('email')}
                      className="bg-[#F25790] hover:bg-[#d93d75] text-white text-sm px-4 py-2 rounded-lg transition-colors"
                    >
                      Editar
                    </button>
                  </div>
                )}
              </div>

              {/* Phone */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                {editingField === 'phone' ? (
                  <div>
                    <input
                      type="tel"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg mb-3 border border-gray-600 focus:border-[#F25790] focus:outline-none"
                      placeholder="Telefone"
                      autoFocus
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-[#F25790] hover:bg-[#d93d75] text-white rounded-lg text-sm transition-colors"
                      >
                        Salvar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-sm">Telefone</p>
                      <p className="text-white">{userData.phone}</p>
                    </div>
                    <button
                      onClick={() => handleEdit('phone')}
                      className="bg-[#F25790] hover:bg-[#d93d75] text-white text-sm px-4 py-2 rounded-lg transition-colors"
                    >
                      Editar
                    </button>
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                {showPassword ? (
                  <div className="space-y-3">
                    <input
                      type="password"
                      value={passwordData.current}
                      onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                      className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#F25790] focus:outline-none"
                      placeholder="Senha atual"
                    />
                    <input
                      type="password"
                      value={passwordData.new}
                      onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                      className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#F25790] focus:outline-none"
                      placeholder="Nova senha"
                    />
                    <input
                      type="password"
                      value={passwordData.confirm}
                      onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                      className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#F25790] focus:outline-none"
                      placeholder="Confirmar nova senha"
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setShowPassword(false)}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handlePasswordSave}
                        className="px-4 py-2 bg-[#F25790] hover:bg-[#d93d75] text-white rounded-lg text-sm transition-colors"
                      >
                        Salvar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-sm">Senha</p>
                      <p className="text-white">••••••</p>
                    </div>
                    <button
                      onClick={() => setShowPassword(true)}
                      className="bg-[#F25790] hover:bg-[#d93d75] text-white text-sm px-4 py-2 rounded-lg transition-colors"
                    >
                      Editar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
