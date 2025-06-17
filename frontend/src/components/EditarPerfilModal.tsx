import React, { useState } from 'react';
import Image from 'next/image';

interface EditarPerfilModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: {
    username: string;
    email: string;
    phone: string;
    profilePic: string;
  };
  onSave: (data: any) => void;
}

const EditarPerfilModal: React.FC<EditarPerfilModalProps> = ({
  isOpen,
  onClose,
  profileData,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    username: profileData.username,
    email: profileData.email,
    phone: profileData.phone,
    profilePic: profileData.profilePic,
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Validação simples
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-6 pb-4">
          <h2 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-[#F25790] to-[#d93d75] bg-clip-text text-transparent text-center">
            Editar perfil
          </h2>
        </div>

        <div className="px-6 pb-6">
          {/* Foto de perfil */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-2">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#F25790] bg-gray-700 flex items-center justify-center">
                {formData.profilePic ? (
                  <Image
                    src={formData.profilePic}
                    alt="Foto de perfil"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-white text-4xl font-bold">
                    {formData.username?.charAt(0).toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              {/* Botão de editar foto (futuro upload) */}
              <button className="absolute bottom-0 right-0 bg-[#F25790] text-white text-xs py-1 px-3 rounded-full shadow">
                Editar
              </button>
            </div>
          </div>

          {/* Campos de edição */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-1">Nome de usuário</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none border border-gray-700 mb-2"
              placeholder="@Nick_name_aqui"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none border border-gray-700 mb-2"
              placeholder="Seu email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-1">Telefone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none border border-gray-700 mb-2"
              placeholder="Seu telefone"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-1">Nova senha</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none border border-gray-700 mb-2"
              placeholder="Nova senha"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm mb-1">Confirmar nova senha</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none border border-gray-700 mb-2"
              placeholder="Repetir nova senha"
            />
          </div>

          {/* Botão de ação */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-[#F25790] to-[#d93d75] hover:from-[#d93d75] hover:to-[#c12d65] text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(242,87,144,0.4)] hover:shadow-[0_0_25px_rgba(242,87,144,0.6)] hover:scale-105 active:scale-95"
            >
              Salvar alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarPerfilModal; 