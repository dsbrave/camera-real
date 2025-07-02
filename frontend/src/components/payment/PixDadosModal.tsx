import React, { useState } from 'react';
import Image from 'next/image';

interface PixDadosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  valorSelecionado: number;
  onProceed: () => void;
}

const PixDadosModal: React.FC<PixDadosModalProps> = ({
  isOpen,
  onClose,
  onBack,
  valorSelecionado,
  onProceed,
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
  });
  const [saveInfo, setSaveInfo] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProceed();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[99999]">
      <div className="bg-[#b162c9] rounded-lg max-w-md w-full p-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center">
          {/* Left side - Illustration */}
          <div className="mb-3">
            <div className="relative h-20 w-20">
              <Image 
                src="/images/realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_lesbian_real-life_lq4u513chjx1rlabljif_1.png" 
                alt="Casal brasileiro - Dados PIX" 
                width={320} 
                height={320}
                className="object-cover rounded-lg mx-auto"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-full">
            <h2 className="text-xl font-bold text-white mb-3 text-center">Pagamento via PIX</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" 
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Nome completo"
                className="w-full bg-white rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-camera-pink"
                required
              />
              
              <input 
                type="text" 
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="CPF"
                className="w-full bg-white rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-camera-pink"
                required
              />
              
              <div className="flex items-center">
                <input 
                  type="checkbox"
                  id="save-info"
                  checked={saveInfo}
                  onChange={() => setSaveInfo(!saveInfo)}
                  className="h-4 w-4 text-camera-pink focus:ring-camera-pink border-gray-300 rounded"
                />
                <label htmlFor="save-info" className="ml-2 block text-sm text-white">
                  Salvar as informações para futuras transações
                </label>
              </div>
              
              <div className="border-t border-white/20 pt-4 flex justify-between items-center">
                <div>
                  <p className="text-white/70 text-sm">Valor selecionado</p>
                  <p className="text-white text-2xl font-bold">R$ {valorSelecionado.toFixed(2).replace('.', ',')}</p>
                </div>
                <button 
                  type="submit"
                  className="bg-camera-pink text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors"
                >
                  Avançar
                </button>
              </div>
            </form>
          </div>
        </div>

        <button
          onClick={onBack}
          className="absolute bottom-8 left-8 px-6 py-2 rounded-full bg-[#8d41a8]/50 text-white hover:bg-[#8d41a8]"
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default PixDadosModal;
