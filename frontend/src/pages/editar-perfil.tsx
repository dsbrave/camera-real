import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function EditarPerfil() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    photo: '/default-avatar.png',
    credits: 0
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
    // Garantir que o scroll esteja sempre habilitado
    document.body.style.overflow = 'unset';
    document.body.style.paddingRight = '';
    
    return () => {
      // Cleanup para garantir que o scroll permaneça habilitado
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '';
    };
  }, []);

  useEffect(() => {
    // Carregar dados do usuário do localStorage
    const loadUserData = () => {
      const storedData = localStorage.getItem('userData');
      if (storedData) {
        try {
          const data = JSON.parse(storedData);
          if (data) {
            setUserData({
              name: data.name || 'Usuário',
              username: data.username || 'usuario',
              email: data.email || 'usuario@email.com',
              phone: data.phone || '(11) 99999-9999',
              photo: data.photo || '/default-avatar.png',
              credits: data.credits || 0
            });
          }
        } catch (error) {
          console.error('Erro ao carregar dados do usuário:', error);
        }
      }
    };

    loadUserData();

    // Adiciona listener para o evento customizado de atualização de dados do usuário
    window.addEventListener('userDataUpdated', loadUserData);
    
    return () => {
      window.removeEventListener('userDataUpdated', loadUserData);
    };
  }, [router]);

  const handleEdit = (field: string) => {
    setEditingField(field);
    setTempValue(userData[field as keyof typeof userData] as string);
  };

  const handleSave = () => {
    if (editingField && tempValue.trim()) {
      const updatedData = {
        ...userData,
        [editingField]: tempValue.trim()
      };
      setUserData(updatedData);
      localStorage.setItem('userData', JSON.stringify(updatedData));
      setEditingField(null);
      setTempValue('');
      
      // Disparar evento para atualizar outros componentes
      window.dispatchEvent(new Event('userDataUpdated'));
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
        <title>Editar Perfil - Camera Real</title>
        <meta name="description" content="Edite suas informações pessoais" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <div className="hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:inset-y-0 lg:z-10">
            <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-gray-900/50 backdrop-blur-sm border-r border-gray-700/50 h-full">
              <div className="flex items-center flex-shrink-0 px-4">
                <Link href="/painel-usuario" className="flex items-center space-x-2">
                  <Image
                    src="/logo.png"
                    alt="Camera Real"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                  <span className="text-xl font-bold text-white">Camera Real</span>
                </Link>
              </div>
              
              {/* User Card */}
              <div className="mt-8 px-4">
                <div className="bg-gradient-to-r from-[#F25790]/20 to-purple-600/20 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Image
                        src={userData.photo}
                        alt="Foto do usuário"
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#F25790]/50"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{userData.name}</p>
                      <p className="text-xs text-gray-400 truncate">@{userData.username}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-700/50">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Créditos</span>
                      <span className="text-sm font-semibold text-[#F25790]">{userData.credits}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="mt-8 flex-1 px-4 space-y-2">
                <Link href="/painel-usuario" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800/50 hover:text-white transition-colors">
                  <Image
                    src="/icons/action/dashboard.svg"
                    alt="Dashboard"
                    width={20}
                    height={20}
                    className="mr-3 w-5 h-5"
                    style={{ filter: 'invert(1) sepia(0) saturate(0) hue-rotate(0deg) brightness(0.7)' }}
                  />
                  Dashboard
                </Link>
                
                <Link href="/carteira" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800/50 hover:text-white transition-colors">
                  <Image
                    src="/icons/action/account_balance_wallet.svg"
                    alt="Carteira"
                    width={20}
                    height={20}
                    className="mr-3 w-5 h-5"
                    style={{ filter: 'invert(1) sepia(0) saturate(0) hue-rotate(0deg) brightness(0.7)' }}
                  />
                  Carteira
                </Link>
                
                <Link href="/editar-perfil" className="group flex items-center px-3 py-2 text-sm font-medium text-white bg-[#F25790]/20 rounded-lg">
                  <Image
                    src="/icons/action/person.svg"
                    alt="Perfil"
                    width={20}
                    height={20}
                    className="mr-3 w-5 h-5"
                    style={{ filter: 'invert(1) sepia(1) saturate(5) hue-rotate(315deg) brightness(1.2)' }}
                  />
                  Editar Perfil
                </Link>
                
                <Link href="/chat-video" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800/50 hover:text-white transition-colors">
                  <Image
                    src="/icons/av/videocam.svg"
                    alt="Chat"
                    width={20}
                    height={20}
                    className="mr-3 w-5 h-5"
                    style={{ filter: 'invert(1) sepia(0) saturate(0) hue-rotate(0deg) brightness(0.7)' }}
                  />
                  Chat & Vídeo
                </Link>
                
                <Link href="/configuracoes" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800/50 hover:text-white transition-colors">
                  <Image
                    src="/icons/action/settings.svg"
                    alt="Configurações"
                    width={20}
                    height={20}
                    className="mr-3 w-5 h-5"
                    style={{ filter: 'invert(1) sepia(0) saturate(0) hue-rotate(0deg) brightness(0.7)' }}
                  />
                  Configurações
                </Link>
              </nav>

              {/* Logout Button */}
              <div className="px-4 pb-4">
                <Link href="/" className="group flex items-center px-3 py-2 text-sm font-medium text-red-400 rounded-lg hover:bg-red-500/10 hover:text-red-300 transition-colors">
                  <Image
                    src="/icons/action/logout.svg"
                    alt="Sair"
                    width={20}
                    height={20}
                    className="mr-3 w-5 h-5"
                    style={{ filter: 'invert(1) sepia(1) saturate(5) hue-rotate(0deg) brightness(0.8)' }}
                  />
                  Sair
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:pl-80 w-full">
            <div className="p-4 lg:p-8 min-h-screen">
              {/* Mobile Header */}
              <div className="lg:hidden mb-6">
                <div className="flex items-center justify-between">
                  <Link href="/painel-usuario" className="flex items-center space-x-2">
                    <Image
                      src="/logo.png"
                      alt="Camera Real"
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                    <span className="text-xl font-bold text-white">Camera Real</span>
                  </Link>
                  <button className="p-2 rounded-lg bg-gray-800/50 border border-gray-700/50">
                    <Image
                      src="/icons/navigation/menu.svg"
                      alt="Menu"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                      style={{ filter: 'invert(1)' }}
                    />
                  </button>
                </div>
              </div>

              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-white">Editar Perfil</h1>
                    <p className="text-gray-400 mt-1">Gerencie suas informações pessoais</p>
                  </div>
                </div>
              </div>

              {/* Profile Photo Section */}
              <div className="mb-8">
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Foto do Perfil</h2>
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <Image
                        src={userData.photo}
                        alt="Foto do usuário"
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full object-cover border-4 border-[#F25790]/50"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{userData.name}</p>
                      <p className="text-gray-400 text-sm">@{userData.username}</p>
                      <button className="mt-2 px-4 py-2 bg-[#F25790] hover:bg-[#d93d75] text-white text-sm rounded-lg transition-colors">
                        Alterar Foto
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Information */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Informações Pessoais</h2>
                
                {/* Name */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                  {editingField === 'name' ? (
                    <div>
                      <input
                        type="text"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg mb-3 border border-gray-600 focus:border-[#F25790] focus:outline-none"
                        placeholder="Nome completo"
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
                        <p className="text-gray-400 text-sm">Nome completo</p>
                        <p className="text-white">{userData.name}</p>
                      </div>
                      <button
                        onClick={() => handleEdit('name')}
                        className="bg-[#F25790] hover:bg-[#d93d75] text-white text-sm px-4 py-2 rounded-lg transition-colors"
                      >
                        Editar
                      </button>
                    </div>
                  )}
                </div>

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
      </div>
    </>
  );
}
