import React from 'react';
import Image from 'next/image';
import BaseModal from '@/components/BaseModal';

interface SelectPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  selectedAmount: number;
  onSelectMethod: (method: string) => void;
  onNext: (method: 'pix' | 'credit-card') => void;
}

export default function SelectPaymentMethodModal({
  isOpen,
  onClose,
  onBack,
  selectedAmount,
  onSelectMethod,
  onNext
}: SelectPaymentMethodModalProps) {
  const [selectedMethod, setSelectedMethod] = React.useState<'pix' | 'credit-card' | ''>('');

  const handleMethodSelect = (method: 'pix' | 'credit-card') => {
    setSelectedMethod(method);
    onSelectMethod(method);
  };

  const handleNext = () => {
    if (selectedMethod) {
      onNext(selectedMethod);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      modelImage="/images/realistic_photo_of_a_beautiful_curvy_cam_model_in_sexy_casual_clothing_crouching_down_seductively_t_3cztx1xhqyc4ka3r2sxm_77.png"
      modelName="Modelo Cam"
      title="Escolha o pagamento"
      subtitle="Como você quer carregar sua conta?"
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

      {/* Métodos de pagamento */}
      <div className="space-y-4 mb-6">
        {/* PIX */}
        <button
          onClick={() => handleMethodSelect('pix')}
          className={`w-full p-4 rounded-2xl border transition-all hover:scale-105 ${
            selectedMethod === 'pix'
              ? 'border-[#F25790] bg-gradient-to-r from-[#F25790]/30 to-[#d93d75]/30 shadow-[0_0_15px_rgba(242,87,144,0.4)]'
              : 'border-[#F25790]/50 bg-gradient-to-r from-[#F25790]/20 to-[#d93d75]/20 hover:from-[#F25790]/25 hover:to-[#d93d75]/25'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#F25790]/40 to-[#d93d75]/40 rounded-xl flex items-center justify-center">
              <Image
                src="/icons/communication/qr_code.svg"
                alt="PIX"
                width={24}
                height={24}
                className="w-6 h-6 filter invert"
              />
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-lg">PIX</div>
              <div className="text-white/70 text-sm">Pagamento instantâneo</div>
            </div>
          </div>
        </button>

        {/* Cartão de Crédito */}
        <button
          onClick={() => handleMethodSelect('credit-card')}
          className={`w-full p-4 rounded-2xl border transition-all hover:scale-105 ${
            selectedMethod === 'credit-card'
              ? 'border-[#F25790] bg-gradient-to-r from-[#F25790]/30 to-[#d93d75]/30 shadow-[0_0_15px_rgba(242,87,144,0.4)]'
              : 'border-[#F25790]/50 bg-gradient-to-r from-[#F25790]/20 to-[#d93d75]/20 hover:from-[#F25790]/25 hover:to-[#d93d75]/25'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#F25790]/40 to-[#d93d75]/40 rounded-xl flex items-center justify-center">
              <Image
                src="/icons/action/credit_card.svg"
                alt="Cartão"
                width={24}
                height={24}
                className="w-6 h-6 filter invert"
              />
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-lg">Cartão de Crédito</div>
              <div className="text-white/70 text-sm">Parcelamento disponível</div>
            </div>
          </div>
        </button>
      </div>

      {/* Botões de ação */}
      <div className="flex gap-3">
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
          onClick={handleNext}
          disabled={!selectedMethod}
          className={`flex-1 py-3 font-bold rounded-2xl transition-all duration-300 shadow-[0_0_25px_rgba(242,87,144,0.4)] hover:shadow-[0_0_35px_rgba(242,87,144,0.6)] hover:scale-105 active:scale-95 border border-[#F25790]/30 ${
            selectedMethod
              ? 'bg-gradient-to-r from-[#F25790]/40 to-[#d93d75]/40 hover:from-[#F25790]/60 hover:to-[#d93d75]/60 text-white'
              : 'bg-white/10 text-white/50 cursor-not-allowed'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Image
              src="/icons/navigation/arrow_forward.svg"
              alt="Avançar"
              width={20}
              height={20}
              className="w-5 h-5 filter invert"
            />
            <span>Avançar</span>
          </div>
        </button>
      </div>

      {/* Texto de segurança */}
      <p className="text-white/50 text-xs text-center mt-4 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
        <Image
          src="/icons/action/lock.svg"
          alt="Seguro"
          width={12}
          height={12}
          className="w-3 h-3 inline mr-1 filter invert opacity-50"
        />
        Seus dados estão protegidos com criptografia SSL
      </p>
    </BaseModal>
  );
}
