import React, { useState } from "react";
import Image from "next/image";
import { userStorage } from "../utils/userStorage";

interface EditarPerfilModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: {
    name?: string;
    username: string;
    profilePic: string;
    bio?: string;
  };
  onSave: (data: any) => void;
}

const MAX_BIO = 160;

const EditarPerfilModal: React.FC<EditarPerfilModalProps> = ({
  isOpen,
  onClose,
  profileData,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: profileData.name || '',
    username: profileData.username,
    profilePic: profileData.profilePic,
    bio: profileData.bio || '',
  });
  const [previewPic, setPreviewPic] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreviewPic(ev.target?.result as string);
        setFormData((prev) => ({
          ...prev,
          profilePic: ev.target?.result as string,
          photo: ev.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Preparar dados para salvar
    const dataToSave = {
      name: formData.name,
      username: formData.username,
      photo: formData.profilePic,
      profilePic: formData.profilePic,
      bio: formData.bio,
    };
    
    onSave(dataToSave);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[11000] p-4">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
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
          <h2 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-[#F25790] to-[#d93d75] bg-clip-text text-transparent text-center">
            Editar perfil
          </h2>
        </div>

        <div className="px-6 pb-6">
          {/* Foto de perfil */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-2">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#F25790] bg-gray-700 flex items-center justify-center">
                {(previewPic || (formData.profilePic && formData.profilePic !== "/images/default-avatar.png")) ? (
                  <Image
                    src={previewPic || formData.profilePic}
                    alt="Foto de perfil"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">
                      {formData.name?.charAt(0).toUpperCase() || formData.username?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                )}
              </div>
              {/* Botão de editar foto */}
              <label className="absolute bottom-0 right-0 bg-[#F25790] text-white text-xs py-1 px-3 rounded-full shadow cursor-pointer">
                Editar
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>
            </div>
          </div>

          {/* Campo Nome */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-1">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none border border-gray-700 mb-2"
              placeholder="Seu nome"
            />
          </div>

          {/* Campo Nome de usuário */}
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

          {/* Campo Bio */}
          <div className="mb-6">
            <label className="block text-gray-300 text-sm mb-1">Biografia</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              maxLength={MAX_BIO}
              rows={3}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none border border-gray-700 mb-1 resize-none"
              placeholder="Fale um pouco sobre você..."
            />
            <div className="text-xs text-gray-400 text-right">{formData.bio.length}/{MAX_BIO}</div>
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
