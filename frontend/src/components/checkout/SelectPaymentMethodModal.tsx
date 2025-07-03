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
      <div className="max-h-[90vh] overflow-y-auto p-0 md:p-6 min-h-[320px]">
        {/* Valor selecionado */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F25790]/20 to-[#d93d75]/20 border border-[#F25790]/30 rounded-xl px-3 py-1.5">
            <Image
              src="/icons/action/credit_card.svg"
              alt="Valor"
              width={18}
              height={18}
              className="w-4 h-4 filter invert"
            />
            <span className="text-white font-semibold text-base">R$ {selectedAmount}</span>
          </div>
        </div>
        {/* Métodos de pagamento */}
        <div className="space-y-2 mb-3">
          {/* PIX */}
          <button
            onClick={() => handleMethodSelect('pix')}
            className={`w-full py-2 px-4 rounded-xl border text-sm font-bold transition-all hover:scale-105 shadow-[0_0_18px_rgba(242,87,144,0.3)] border-[#F25790]/30 bg-gradient-to-r from-[#F25790]/15 to-[#d93d75]/15 hover:from-[#F25790]/20 hover:to-[#d93d75]/20 text-white mb-2 flex items-center gap-3 select-none
              ${selectedMethod === 'pix' ? 'border-[#F25790] bg-gradient-to-r from-[#F25790]/30 to-[#d93d75]/30 scale-105' : ''}`}
            style={{ minHeight: '44px', fontSize: '0.97rem', letterSpacing: '0.01em' }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#F25790]/40 to-[#d93d75]/40 rounded-xl flex items-center justify-center">
              <Image
                src="/icons/communication/qr_code.svg"
                alt="PIX"
                width={22}
                height={22}
                className="w-6 h-6 filter invert"
              />
            </div>
            <div className="text-left">
              <div className="text-white font-extrabold text-base leading-tight">PIX</div>
              <div className="text-white/70 text-xs">Pagamento instantâneo</div>
            </div>
          </button>

          {/* Cartão de Crédito */}
          <button
            onClick={() => handleMethodSelect('credit-card')}
            className={`w-full py-2 px-4 rounded-xl border text-sm font-bold transition-all hover:scale-105 shadow-[0_0_18px_rgba(242,87,144,0.3)] border-[#F25790]/30 bg-gradient-to-r from-[#F25790]/15 to-[#d93d75]/15 hover:from-[#F25790]/20 hover:to-[#d93d75]/20 text-white mb-2 flex items-center gap-3 select-none
              ${selectedMethod === 'credit-card' ? 'border-[#F25790] bg-gradient-to-r from-[#F25790]/30 to-[#d93d75]/30 scale-105' : ''}`}
            style={{ minHeight: '44px', fontSize: '0.97rem', letterSpacing: '0.01em' }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#F25790]/40 to-[#d93d75]/40 rounded-xl flex items-center justify-center">
              <Image
                src="/icons/action/credit_card.svg"
                alt="Cartão"
                width={22}
                height={22}
                className="w-6 h-6 filter invert"
              />
            </div>
            <div className="text-left">
              <div className="text-white font-extrabold text-base leading-tight">Cartão de Crédito</div>
              <div className="text-white/70 text-xs">Parcelamento disponível</div>
            </div>
          </button>
        </div>
        {/* Botões de ação */}
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 py-2 px-4 font-semibold rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm transition-all duration-300 border border-white/20"
          >
            <div className="flex items-center justify-center gap-1">
              <Image
                src="/icons/navigation/arrow_back.svg"
                alt="Voltar"
                width={16}
                height={16}
                className="w-4 h-4 filter invert"
              />
              <span>Voltar</span>
            </div>
          </button>
          
          <button
            onClick={handleNext}
            disabled={!selectedMethod}
            className={`flex-1 py-2 px-4 font-semibold rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(242,87,144,0.3)] hover:shadow-[0_0_25px_rgba(242,87,144,0.5)] hover:scale-105 active:scale-95 border border-[#F25790]/20 text-sm ${selectedMethod ? 'bg-gradient-to-r from-[#F25790]/40 to-[#d93d75]/40 hover:from-[#F25790]/60 hover:to-[#d93d75]/60 text-white' : 'bg-white/10 text-white/50 cursor-not-allowed'}`}
          >
            <div className="flex items-center justify-center gap-1">
              <Image
                src="/icons/navigation/arrow_forward.svg"
                alt="Avançar"
                width={16}
                height={16}
                className="w-4 h-4 filter invert"
              />
              <span>Avançar</span>
            </div>
          </button>
        </div>
        {/* Texto de segurança */}
        <p className="text-white/40 text-xs text-center mt-3 drop-shadow-[0_0_10px_rgba(0,0,0,0.7)] font-light">
          <Image
            src="/icons/action/lock.svg"
            alt="Seguro"
            width={12}
            height={12}
            className="w-3 h-3 inline mr-1 filter invert opacity-50"
          />
          Seus dados estão protegidos com criptografia SSL
        </p>
      </div>
    </BaseModal>
  );
}
