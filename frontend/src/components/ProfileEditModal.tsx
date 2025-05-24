import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: {
    name?: string;
    email?: string;
    phone?: string;
    photo?: string;
  };
  onUpdateProfile: (data: any) => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  userData = {},
  onUpdateProfile,
}) => {
  const [activeField, setActiveField] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    username: '@Nick_name_aqui',
    email: 'email@email.com',
    phone: '55 11 93366 1304',
    password: '******',
    photo: '/images/default-profile.jpg',
  });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [editingPassword, setEditingPassword] = useState(false);

  useEffect(() => {
    // Preencher dados do usuário quando disponíveis
    if (userData) {
      setProfileData({
        ...profileData,
        username: userData.name ? `@${userData.name.replace(/\s+/g, '_').toLowerCase()}` : profileData.username,
        email: userData.email || profileData.email,
        phone: userData.phone || profileData.phone,
        photo: userData.photo || profileData.photo,
      });
    }
  }, [userData]);

  if (!isOpen) return null;

  const handleFieldEdit = (field: string) => {
    if (field === 'password') {
      setEditingPassword(true);
    } else {
      setActiveField(field);
    }
  };

  const handleSaveField = () => {
    setActiveField(null);
    // Aqui você poderia enviar as mudanças para um servidor
    onUpdateProfile(profileData);
  };

  const handleCancelEdit = () => {
    setActiveField(null);
    setEditingPassword(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handlePasswordSave = () => {
    if (newPassword === confirmPassword && newPassword.length >= 6) {
      setProfileData({ ...profileData, password: '******' });
      setEditingPassword(false);
      setNewPassword('');
      setConfirmPassword('');
      // Aqui você poderia enviar a nova senha para um servidor
      onUpdateProfile({ ...profileData, newPassword });
    } else {
      // Exibir erro de validação
      alert('As senhas não conferem ou a senha é muito curta (mínimo 6 caracteres)');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#9747FF] rounded-lg max-w-md w-full p-8 relative">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Editar perfil</h2>

        {/* Foto de perfil */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300">
              <Image
                src={profileData.photo}
                alt="Foto de perfil"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-[#F25790] text-white text-xs px-2 py-1 rounded-md">
              Editar
            </button>
          </div>
        </div>

        {/* Campos de edição */}
        <div className="space-y-4">
          {/* Username */}
          <div className="bg-[#9747FF]/80 rounded-lg p-4">
            {activeField === 'username' ? (
              <div>
                <input
                  type="text"
                  name="username"
                  value={profileData.username}
                  onChange={handleInputChange}
                  className="w-full bg-white text-gray-800 px-4 py-2 rounded-md mb-2"
                  autoFocus
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-500/50 text-white px-4 py-1 rounded-md text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveField}
                    className="bg-[#F25790] text-white px-4 py-1 rounded-md text-sm"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span>{profileData.username}</span>
                <button
                  onClick={() => handleFieldEdit('username')}
                  className="bg-[#F25790] text-white text-sm px-4 py-1 rounded-md"
                >
                  Editar
                </button>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="bg-[#9747FF]/80 rounded-lg p-4">
            {activeField === 'email' ? (
              <div>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white text-gray-800 px-4 py-2 rounded-md mb-2"
                  autoFocus
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-500/50 text-white px-4 py-1 rounded-md text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveField}
                    className="bg-[#F25790] text-white px-4 py-1 rounded-md text-sm"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span>{profileData.email}</span>
                <button
                  onClick={() => handleFieldEdit('email')}
                  className="bg-[#F25790] text-white text-sm px-4 py-1 rounded-md"
                >
                  Editar
                </button>
              </div>
            )}
          </div>

          {/* Telefone */}
          <div className="bg-[#9747FF]/80 rounded-lg p-4">
            {activeField === 'phone' ? (
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-white text-gray-800 px-4 py-2 rounded-md mb-2"
                  autoFocus
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-500/50 text-white px-4 py-1 rounded-md text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveField}
                    className="bg-[#F25790] text-white px-4 py-1 rounded-md text-sm"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span>{profileData.phone}</span>
                <button
                  onClick={() => handleFieldEdit('phone')}
                  className="bg-[#F25790] text-white text-sm px-4 py-1 rounded-md"
                >
                  Editar
                </button>
              </div>
            )}
          </div>

          {/* Senha */}
          <div className="bg-[#9747FF]/80 rounded-lg p-4">
            {editingPassword ? (
              <div className="space-y-3">
                <input
                  type="password"
                  placeholder="Nova senha"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-white text-gray-800 px-4 py-2 rounded-md"
                  autoFocus
                />
                <input
                  type="password"
                  placeholder="Repetir nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white text-gray-800 px-4 py-2 rounded-md"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-500/50 text-white px-4 py-1 rounded-md text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handlePasswordSave}
                    className="bg-[#F25790] text-white px-4 py-1 rounded-md text-sm"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span>Senha: {profileData.password}</span>
                <button
                  onClick={() => handleFieldEdit('password')}
                  className="bg-[#F25790] text-white text-sm px-4 py-1 rounded-md"
                >
                  Editar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
