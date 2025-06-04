import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    name: string;
    email: string;
    phone: string;
    photo: string;
    username?: string;
  };
  onUpdateProfile: (data: any) => void;
}

export default function ProfileEditModal({ isOpen, onClose, userData, onUpdateProfile }: ProfileEditModalProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [localUserData, setLocalUserData] = useState(userData);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalUserData({
      ...userData,
      username: userData.username || userData.name?.toLowerCase().replace(/\s+/g, '') || 'usuario'
    });
  }, [userData]);

  useEffect(() => {
    if (isOpen) {
      // Prevenir scroll do body quando o modal estiver aberto
      document.body.style.overflow = 'hidden';
    } else {
      // Restaurar scroll do body quando o modal for fechado
      document.body.style.overflow = 'unset';
    }

    // Cleanup function para garantir que o scroll seja restaurado
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleEdit = (field: string) => {
    setEditingField(field);
    setTempValue(localUserData[field as keyof typeof localUserData] || '');
  };

  const handleSave = () => {
    if (editingField) {
      const updatedUser = { ...localUserData, [editingField]: tempValue };
      setLocalUserData(updatedUser);
      onUpdateProfile({ [editingField]: tempValue });
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

  const handlePhotoEdit = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Verificar se é uma imagem
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem.');
        return;
      }

      // Verificar tamanho do arquivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewPhoto(result);
        
        // Atualizar os dados do usuário
        const updatedUser = { ...localUserData, photo: result };
        setLocalUserData(updatedUser);
        onUpdateProfile({ photo: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPreviewPhoto(null);
    const updatedUser = { ...localUserData, photo: '' };
    setLocalUserData(updatedUser);
    onUpdateProfile({ photo: '' });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Modal Overlay - Fixed positioning with higher z-index */}
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        onClick={handleOverlayClick}
      >
        {/* Modal Container - Centered and responsive */}
        <div className="bg-black rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-[0_0_30px_rgba(242,87,144,0.3)] border border-[#F25790]/20 relative">
          {/* Efeitos neon de fundo */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#F25790]/5 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F25790] to-transparent opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F25790] to-transparent opacity-20"></div>
          
          <div className="relative z-10 p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Editar perfil</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Profile Photo */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                  {(previewPhoto || localUserData.photo) ? (
                    <Image 
                      src={previewPhoto || localUserData.photo} 
                      alt="Foto de perfil" 
                      width={96} 
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-xl sm:text-2xl font-bold">
                      {localUserData.name?.charAt(0) || 'U'}
                    </span>
                  )}
                </div>
                <div className="absolute bottom-0 right-0 flex gap-1">
                  <button 
                    onClick={handlePhotoEdit}
                    className="bg-[#F25790] hover:bg-[#d93d75] text-white text-xs px-2 py-1 rounded-full transition-colors"
                    title="Alterar foto"
                  >
                    Editar
                  </button>
                  {(previewPhoto || localUserData.photo) && (
                    <button 
                      onClick={handleRemovePhoto}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-full transition-colors ml-1"
                      title="Remover foto"
                    >
                      ×
                    </button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
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
                      <p className="text-white">@{localUserData.username}</p>
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
                      <p className="text-white">{localUserData.email}</p>
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
                      <p className="text-white">{localUserData.phone}</p>
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
