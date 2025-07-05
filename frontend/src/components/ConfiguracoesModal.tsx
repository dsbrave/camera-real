import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { userStorage } from '../utils/userStorage';

interface ConfiguracoesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotificationSettings {
  emailMarketing: boolean;
  emailAccount: boolean;
  emailPayments: boolean;
  emailFollowOnline: boolean;
  pushAll: boolean;
  pushModelsOnline: boolean;
  pushMessages: boolean;
  pushNewsletter: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'following' | 'private';
  showOnHomepage: boolean;
  showCountryFlag: boolean;
  allowNetworkSites: boolean;
  showSatisfactionRating: boolean;
  saveWatchHistory: boolean;
  personalizedContent: boolean;
}

const ConfiguracoesModal: React.FC<ConfiguracoesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState('conta');
  const [userData, setUserData] = useState<any>(null);
  
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailMarketing: true,
    emailAccount: true,
    emailPayments: true,
    emailFollowOnline: true,
    pushAll: true,
    pushModelsOnline: true,
    pushMessages: true,
    pushNewsletter: false
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'public',
    showOnHomepage: true,
    showCountryFlag: true,
    allowNetworkSites: true,
    showSatisfactionRating: true,
    saveWatchHistory: true,
    personalizedContent: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (isOpen) {
      const user = userStorage.getUserData();
      if (user) {
        setUserData(user);
      }
      
      // Carregar configurações salvas
      if (typeof window !== 'undefined') {
        const savedNotifications = localStorage.getItem('notificationSettings');
        const savedPrivacy = localStorage.getItem('privacySettings');
        
        if (savedNotifications) {
          setNotifications(JSON.parse(savedNotifications));
        }
        
        if (savedPrivacy) {
          setPrivacy(JSON.parse(savedPrivacy));
        }
      }
    }
  }, [isOpen]);

  const handleChangePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert('Por favor, preencha todos os campos de senha.');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('A nova senha e a confirmação não coincidem.');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    // Aqui você implementaria a lógica de mudança de senha com o backend
    alert('Senha alterada com sucesso!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleSaveNotifications = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('notificationSettings', JSON.stringify(notifications));
      alert('Configurações de notificação salvas com sucesso!');
    }
  };

  const handleSavePrivacy = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('privacySettings', JSON.stringify(privacy));
      alert('Configurações de privacidade salvas com sucesso!');
    }
  };

  const toggleNotification = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const togglePrivacy = (key: keyof PrivacySettings) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <div 
      className={`relative inline-block w-12 h-6 rounded-full cursor-pointer transition-colors ${
        checked ? 'bg-[#F25790]' : 'bg-gray-600'
      }`}
      onClick={onChange}
    >
      <span 
        className={`block w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-0.5'
        }`}
      />
    </div>
  );

  const tabs = [
    { id: 'conta', label: 'Conta e Segurança', icon: '/icons/hardware/security.svg' },
    { id: 'notificacoes', label: 'Notificações', icon: '/icons/notification/priority_high.svg' },
    { id: 'privacidade', label: 'Privacidade', icon: '/icons/action/verified_user.svg' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[11000] p-4">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="p-6 pb-4">
          <h2 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-[#F25790] to-[#d93d75] bg-clip-text text-transparent">
            Configurações
          </h2>
          <p className="text-gray-300 text-sm">
            Gerencie suas configurações de conta, notificações e privacidade
          </p>
        </div>

        <div className="px-6 pb-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-700 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#F25790] border-b-2 border-[#F25790]'
                    : 'text-gray-400 hover:text-[#F25790]'
                }`}
              >
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={16}
                  height={16}
                  className="w-4 h-4 filter brightness-0 invert"
                />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Conteúdo das abas */}
          <div className="space-y-4">
            {/* Conta e Segurança */}
            {activeTab === 'conta' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Informações da Conta</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Email</label>
                      <input
                        type="email"
                        value={userData?.email || 'teste@camera.real'}
                        onChange={(e) => setUserData((prev: any) => ({ ...prev, email: e.target.value }))}
                        className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#F25790] border border-gray-600"
                        placeholder="Seu email"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Telefone</label>
                      <input
                        type="text"
                        value={userData?.phone || 'teste@camera.real'}
                        onChange={(e) => setUserData((prev: any) => ({ ...prev, phone: e.target.value }))}
                        className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#F25790] border border-gray-600"
                        placeholder="Seu telefone"
                      />
                    </div>
                    <button
                      onClick={() => {
                        // Salvar informações da conta
                        userStorage.saveUserData(userData);
                        alert('Informações da conta salvas com sucesso!');
                      }}
                      className="w-full bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-3 rounded-lg transition-colors"
                    >
                      Salvar Informações
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Alterar Senha</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Senha atual</label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#F25790] border border-gray-600"
                        placeholder="Digite sua senha atual"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Nova senha</label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#F25790] border border-gray-600"
                        placeholder="Digite sua nova senha"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Confirmar nova senha</label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#F25790] border border-gray-600"
                        placeholder="Confirme sua nova senha"
                      />
                    </div>
                    <button
                      onClick={handleChangePassword}
                      className="w-full bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-3 rounded-lg transition-colors"
                    >
                      Alterar Senha
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h4 className="text-white font-medium mb-3">Verificação de 2 Fatores</h4>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="text-white text-sm">Autenticação de dois fatores</p>
                      <p className="text-gray-400 text-xs">Adicione uma camada extra de segurança</p>
                    </div>
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors">
                      Configurar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notificações */}
            {activeTab === 'notificacoes' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Notificações por E-mail</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="text-white text-sm">Quando alguém que sigo ficar online</p>
                      <p className="text-gray-400 text-xs">Receba um e-mail quando seus modelos favoritos ficarem online</p>
                    </div>
                    <ToggleSwitch
                      checked={notifications.emailFollowOnline}
                      onChange={() => toggleNotification('emailFollowOnline')}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="text-white text-sm">Alterações na conta</p>
                      <p className="text-gray-400 text-xs">Notificações importantes sobre sua conta</p>
                    </div>
                    <ToggleSwitch
                      checked={notifications.emailAccount}
                      onChange={() => toggleNotification('emailAccount')}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="text-white text-sm">Pagamentos e transações</p>
                      <p className="text-gray-400 text-xs">Confirmações de pagamento e compras</p>
                    </div>
                    <ToggleSwitch
                      checked={notifications.emailPayments}
                      onChange={() => toggleNotification('emailPayments')}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="text-white text-sm">Newsletter e promoções</p>
                      <p className="text-gray-400 text-xs">Ofertas especiais e novidades da plataforma</p>
                    </div>
                    <ToggleSwitch
                      checked={notifications.pushNewsletter}
                      onChange={() => toggleNotification('pushNewsletter')}
                    />
                  </div>
                </div>

                <h4 className="text-white font-medium mt-6 mb-3">Notificações no Navegador</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="text-white text-sm">Quando alguém que sigo ficar online</p>
                      <p className="text-gray-400 text-xs">Notificação instantânea no navegador</p>
                    </div>
                    <ToggleSwitch
                      checked={notifications.pushModelsOnline}
                      onChange={() => toggleNotification('pushModelsOnline')}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="text-white text-sm">Mensagens de chat</p>
                      <p className="text-gray-400 text-xs">Notificações de mensagens privadas</p>
                    </div>
                    <ToggleSwitch
                      checked={notifications.pushMessages}
                      onChange={() => toggleNotification('pushMessages')}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="text-white text-sm">Todas as notificações</p>
                      <p className="text-gray-400 text-xs">Habilitar/desabilitar todas as notificações push</p>
                    </div>
                    <ToggleSwitch
                      checked={notifications.pushAll}
                      onChange={() => toggleNotification('pushAll')}
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveNotifications}
                  className="w-full bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-3 rounded-lg transition-colors mt-4"
                >
                  Salvar Configurações de Notificação
                </button>
              </div>
            )}

            {/* Privacidade */}
            {activeTab === 'privacidade' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Visibilidade do Perfil</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Quem pode ver meu perfil</label>
                    <select
                      value={privacy.profileVisibility}
                      onChange={(e) => setPrivacy(prev => ({ ...prev, profileVisibility: e.target.value as any }))}
                      className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#F25790] border border-gray-600"
                    >
                      <option value="public">Todos os usuários</option>
                      <option value="following">Apenas modelos que sigo</option>
                      <option value="private">Somente eu</option>
                    </select>
                  </div>

                  {userData?.isModel && (
                    <>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div>
                          <p className="text-white text-sm">Aparecer na página inicial</p>
                          <p className="text-gray-400 text-xs">Mostrar sua câmera na página inicial</p>
                        </div>
                        <ToggleSwitch
                          checked={privacy.showOnHomepage}
                          onChange={() => togglePrivacy('showOnHomepage')}
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div>
                          <p className="text-white text-sm">Mostrar bandeira do país</p>
                          <p className="text-gray-400 text-xs">Exibir a bandeira do seu país na miniatura</p>
                        </div>
                        <ToggleSwitch
                          checked={privacy.showCountryFlag}
                          onChange={() => togglePrivacy('showCountryFlag')}
                        />
                      </div>
                    </>
                  )}
                </div>

                <h4 className="text-white font-medium mt-6 mb-3">Histórico e Dados</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="text-white text-sm">Salvar histórico de visualizações</p>
                      <p className="text-gray-400 text-xs">Manter um histórico dos modelos que você visitou</p>
                    </div>
                    <ToggleSwitch
                      checked={privacy.saveWatchHistory}
                      onChange={() => togglePrivacy('saveWatchHistory')}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="text-white text-sm">Conteúdo personalizado</p>
                      <p className="text-gray-400 text-xs">Personalizar recomendações baseadas no seu uso</p>
                    </div>
                    <ToggleSwitch
                      checked={privacy.personalizedContent}
                      onChange={() => togglePrivacy('personalizedContent')}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-sm py-2 px-4 rounded-lg transition-colors">
                    Limpar Histórico
                  </button>
                  <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-sm py-2 px-4 rounded-lg transition-colors">
                    Baixar Meus Dados
                  </button>
                </div>

                <button
                  onClick={handleSavePrivacy}
                  className="w-full bg-[#F25790] hover:bg-[#d93d75] text-white font-medium py-3 rounded-lg transition-colors mt-4"
                >
                  Salvar Configurações de Privacidade
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracoesModal; 