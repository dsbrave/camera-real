import React, { useState } from 'react';
import Image from 'next/image';
import BaseModal from '@/components/BaseModal';

interface CreditCardFormProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  selectedAmount: number;
  onSubmit: () => void;
}

export default function CreditCardForm({
  isOpen,
  onClose,
  onBack,
  selectedAmount,
  onSubmit
}: CreditCardFormProps) {
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    cpf: '',
    installments: 1
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Formatação do número do cartão
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Formatação da data de expiração
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  // Formatação do CVV
  const formatCVV = (value: string) => {
    return value.replace(/[^0-9]/gi, '').substring(0, 4);
  };

  // Formatação do CPF
  const formatCPF = (value: string) => {
    const v = value.replace(/\D/g, '');
    return v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    switch (field) {
      case 'number':
        formattedValue = formatCardNumber(value);
        break;
      case 'expiry':
        formattedValue = formatExpiry(value);
        break;
      case 'cvv':
        formattedValue = formatCVV(value);
        break;
      case 'cpf':
        formattedValue = formatCPF(value);
        break;
      case 'name':
        formattedValue = value.toUpperCase();
        break;
    }

    setCardData(prev => ({
      ...prev,
      [field]: formattedValue
    }));

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!cardData.number || cardData.number.replace(/\s/g, '').length < 16) {
      newErrors.number = 'Número do cartão inválido';
    }

    if (!cardData.expiry || cardData.expiry.length < 5) {
      newErrors.expiry = 'Data de expiração inválida';
    }

    if (!cardData.cvv || cardData.cvv.length < 3) {
      newErrors.cvv = 'CVV inválido';
    }

    if (!cardData.name || cardData.name.length < 3) {
      newErrors.name = 'Nome do titular é obrigatório';
    }

    if (!cardData.cpf || cardData.cpf.replace(/\D/g, '').length !== 11) {
      newErrors.cpf = 'CPF inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    
    // Simular processamento
    setTimeout(() => {
      setIsProcessing(false);
      onSubmit();
    }, 3000);
  };

  const installmentOptions = [
    { value: 1, label: `1x de R$ ${selectedAmount.toFixed(2).replace('.', ',')} sem juros` },
    { value: 2, label: `2x de R$ ${(selectedAmount / 2).toFixed(2).replace('.', ',')} sem juros` },
    { value: 3, label: `3x de R$ ${(selectedAmount / 3).toFixed(2).replace('.', ',')} sem juros` },
    { value: 4, label: `4x de R$ ${(selectedAmount / 4).toFixed(2).replace('.', ',')} sem juros` },
    { value: 5, label: `5x de R$ ${(selectedAmount / 5).toFixed(2).replace('.', ',')} sem juros` },
    { value: 6, label: `6x de R$ ${(selectedAmount / 6).toFixed(2).replace('.', ',')} sem juros` }
  ];

  if (isProcessing) {
    return (
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        modelImage="/images/realistic_photo_of_a_beautiful_curvy_cam_model_in_sexy_casual_clothing_crouching_down_seductively_t_amu04kgiucz3eokekwrk_1.png"
        modelName="Modelo Cam"
        title="Processando Pagamento"
        subtitle="Aguarde enquanto processamos seu cartão"
      >
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Image
              src="/icons/navigation/refresh.svg"
              alt="Processando"
              width={40}
              height={40}
              className="w-10 h-10 filter invert animate-spin"
            />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Processando...</h3>
          <p className="text-white/80 mb-6">Estamos validando seus dados com a operadora do cartão.</p>
        </div>
      </BaseModal>
    );
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      modelImage="/images/realistic_photo_of_a_beautiful_curvy_cam_model_in_sexy_casual_clothing_crouching_down_seductively_t_amu04kgiucz3eokekwrk_1.png"
      modelName="Modelo Cam"
      title="Cartão de Crédito"
      subtitle="Preencha os dados do seu cartão"
    >
      {/* Valor selecionado */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F25790]/20 to-[#d93d75]/20 border border-[#F25790]/30 rounded-2xl px-4 py-2">
          <Image
            src="/icons/action/credit_card.svg"
            alt="Valor"
            width={20}
            height={20}
            className="w-5 h-5 filter invert"
          />
          <span className="text-white font-bold text-lg">R$ {selectedAmount}</span>
        </div>
      </div>

      {/* Formulário */}
      <div className="space-y-4 mb-6">
        {/* Número do cartão */}
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Número do cartão *
          </label>
          <input
            type="text"
            value={cardData.number}
            onChange={(e) => handleInputChange('number', e.target.value)}
            placeholder="0000 0000 0000 0000"
            maxLength={19}
            className={`w-full bg-white/10 border rounded-2xl px-4 py-3 text-white placeholder-white/50 transition-all ${
              errors.number ? 'border-red-500' : 'border-white/20 focus:border-[#F25790]'
            }`}
          />
          {errors.number && <p className="text-red-400 text-xs mt-1">{errors.number}</p>}
        </div>

        {/* Data de expiração e CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Expiração *
            </label>
            <input
              type="text"
              value={cardData.expiry}
              onChange={(e) => handleInputChange('expiry', e.target.value)}
              placeholder="MM/AA"
              maxLength={5}
              className={`w-full bg-white/10 border rounded-2xl px-4 py-3 text-white placeholder-white/50 transition-all ${
                errors.expiry ? 'border-red-500' : 'border-white/20 focus:border-[#F25790]'
              }`}
            />
            {errors.expiry && <p className="text-red-400 text-xs mt-1">{errors.expiry}</p>}
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              CVV *
            </label>
            <input
              type="text"
              value={cardData.cvv}
              onChange={(e) => handleInputChange('cvv', e.target.value)}
              placeholder="000"
              maxLength={4}
              className={`w-full bg-white/10 border rounded-2xl px-4 py-3 text-white placeholder-white/50 transition-all ${
                errors.cvv ? 'border-red-500' : 'border-white/20 focus:border-[#F25790]'
              }`}
            />
            {errors.cvv && <p className="text-red-400 text-xs mt-1">{errors.cvv}</p>}
          </div>
        </div>

        {/* Nome do titular */}
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Nome do titular *
          </label>
          <input
            type="text"
            value={cardData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="NOME COMO ESTÁ NO CARTÃO"
            className={`w-full bg-white/10 border rounded-2xl px-4 py-3 text-white placeholder-white/50 transition-all ${
              errors.name ? 'border-red-500' : 'border-white/20 focus:border-[#F25790]'
            }`}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* CPF */}
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            CPF *
          </label>
          <input
            type="text"
            value={cardData.cpf}
            onChange={(e) => handleInputChange('cpf', e.target.value)}
            placeholder="000.000.000-00"
            maxLength={14}
            className={`w-full bg-white/10 border rounded-2xl px-4 py-3 text-white placeholder-white/50 transition-all ${
              errors.cpf ? 'border-red-500' : 'border-white/20 focus:border-[#F25790]'
            }`}
          />
          {errors.cpf && <p className="text-red-400 text-xs mt-1">{errors.cpf}</p>}
        </div>

        {/* Parcelamento */}
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Parcelamento
          </label>
          <select
            value={cardData.installments}
            onChange={(e) => setCardData(prev => ({ ...prev, installments: parseInt(e.target.value) }))}
            className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white focus:border-[#F25790] transition-all"
          >
            {installmentOptions.map(option => (
              <option key={option.value} value={option.value} className="bg-gray-800">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={onBack}
          className="flex-1 py-3 font-bold rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all duration-300 border border-white/20"
        >
          <div className="flex items-center justify-center gap-2">
            <Image
              src="/icons/navigation/arrow_back.svg"
              alt="Voltar"
              width={20}
              height={20}
              className="w-5 h-5 filter invert"
            />
            <span>Voltar</span>
          </div>
        </button>
        
        <button
          onClick={handleSubmit}
          className="flex-1 py-3 font-bold rounded-2xl bg-gradient-to-r from-[#F25790]/40 to-[#d93d75]/40 hover:from-[#F25790]/60 hover:to-[#d93d75]/60 text-white transition-all duration-300 shadow-[0_0_25px_rgba(242,87,144,0.4)] hover:shadow-[0_0_35px_rgba(242,87,144,0.6)] hover:scale-105 active:scale-95"
        >
          <div className="flex items-center justify-center gap-2">
            <Image
              src="/icons/action/credit_card.svg"
              alt="Pagar"
              width={20}
              height={20}
              className="w-5 h-5 filter invert"
            />
            <span>Finalizar Pagamento</span>
          </div>
        </button>
      </div>

      {/* Informações adicionais */}
      <div className="text-center">
        <p className="text-white/50 text-xs mb-2">
          <Image
            src="/icons/action/lock.svg"
            alt="Seguro"
            width={12}
            height={12}
            className="w-3 h-3 inline mr-1 filter invert opacity-50"
          />
          Transação segura e criptografada
        </p>
        <p className="text-white/40 text-xs">
          O nome que aparecerá na fatura é "CAMERA REAL LTDA"
        </p>
      </div>
    </BaseModal>
  );
}
