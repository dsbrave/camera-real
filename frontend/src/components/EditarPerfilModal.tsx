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
}

const EditarPerfilModal: React.FC<EditarPerfilModalProps> = ({
  isOpen,
  onClose,
  profileData,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'password'>('info');
  const [formData, setFormData] = useState({
    username: profileData.username,
    email: profileData.email,
    phone: profileData.phone,
    newPassword: '',
    confirmPassword: '',
  });
  const [editingField, setEditingField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const startEditing = (field: string) => {
    setEditingField(field);
  };

  const cancelEditing = () => {
    setEditingField(null);
    // Reset to original values
    setFormData({
      username: profileData.username,
      email: profileData.email,
      phone: profileData.phone,
      newPassword: '',
      confirmPassword: '',
    });
  };

  const saveChanges = () => {
    // Here you would implement the API call to save the changes
    console.log('Saving changes:', formData);
    setEditingField(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#b162c9] rounded-lg max-w-md w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">Editar perfil</h2>

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white">
              <Image
                src={profileData.profilePic || "/images/default-profile.jpg"}
                alt="Foto de perfil"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-camera-pink text-white text-xs py-1 px-3 rounded-full">
              Editar
            </button>
          </div>
        </div>

        {activeTab === 'info' ? (
          <>
            {/* Username Field */}
            {editingField === 'username' ? (
              <div className="mb-4">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg mb-2 focus:outline-none"
                  placeholder="@Nick_name_aqui"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={cancelEditing}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={saveChanges}
                    className="bg-camera-pink text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#8d41a8]/50 rounded-lg p-4 mb-4 flex justify-between items-center">
                <span className="text-white">{formData.username}</span>
                <button
                  onClick={() => startEditing('username')}
                  className="bg-camera-pink text-white text-xs py-1 px-3 rounded-full"
                >
                  Editar
                </button>
              </div>
            )}

            {/* Email Field */}
            <div className="bg-[#8d41a8]/50 rounded-lg p-4 mb-4 flex justify-between items-center">
              <span className="text-white">{formData.email}</span>
              <button
                onClick={() => startEditing('email')}
                className="bg-camera-pink text-white text-xs py-1 px-3 rounded-full"
              >
                Editar
              </button>
            </div>

            {/* Phone Field */}
            <div className="bg-[#8d41a8]/50 rounded-lg p-4 mb-4 flex justify-between items-center">
              <span className="text-white">{formData.phone}</span>
              <button
                onClick={() => startEditing('phone')}
                className="bg-camera-pink text-white text-xs py-1 px-3 rounded-full"
              >
                Editar
              </button>
            </div>

            {/* Password Field */}
            <div className="bg-[#8d41a8]/50 rounded-lg p-4 mb-4 flex justify-between items-center">
              <span className="text-white">Senha: *******</span>
              <button
                onClick={() => setActiveTab('password')}
                className="bg-camera-pink text-white text-xs py-1 px-3 rounded-full"
              >
                Editar
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Password Change Form */}
            <div className="mb-4">
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full p-3 rounded-lg mb-2 focus:outline-none"
                placeholder="Nova senha"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 rounded-lg mb-2 focus:outline-none"
                placeholder="Repetir nova senha"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setActiveTab('info')}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={saveChanges}
                className="bg-camera-pink text-white px-4 py-2 rounded-lg text-sm"
              >
                Salvar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditarPerfilModal;
