import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import BaseModal from '@/components/BaseModal';

interface PixPaymentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  selectedAmount: number;
  onSubmit: () => void;
}

export default function PixPaymentForm({
  isOpen,
  onClose,
  onBack,
  selectedAmount,
  onSubmit
}: PixPaymentFormProps) {
  const [showQRCode, setShowQRCode] = useState(false);
  const [userName, setUserName] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);
  const [countdown, setCountdown] = useState(30 * 60); // 30 minutos em segundos
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'expired'>('pending');
  const [copyStatus, setCopyStatus] = useState(false);

  // Código PIX fictício
  const pixCode = "00020126580014BR.GOV.BCB.PIX013636c4b8c4-4c4c-4c4c-4c4c-4c4c4c4c4c4c5204000053039865802BR5925CAMERA REAL LTDA6009SAO PAULO62070503***6304";

  useEffect(() => {
    if (isOpen && paymentStatus === 'pending') {
      setShowQRCode(true);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setPaymentStatus('expired');
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Simular verificação de pagamento
      const checkPayment = setInterval(() => {
        // Aqui você faria a verificação real do pagamento
        // Por enquanto, vamos simular
      }, 5000);

      return () => {
        clearInterval(timer);
        clearInterval(checkPayment);
      };
    }
  }, [isOpen, paymentStatus]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const copyPixCode = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar código PIX:', err);
    }
  };

  const confirmPayment = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
      setTimeout(() => {
        onSubmit();
      }, 2000);
    }, 3000);
  };

  const renderContent = () => {
    switch (paymentStatus) {
      case 'success':
        return (
          <div className="text-center">
            <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Image
                src="/icons/action/check_circle.svg"
                alt="Sucesso"
                width={28}
                height={28}
                className="w-7 h-7 filter invert"
              />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Pagamento Confirmado!</h3>
            <p className="text-white/70 mb-2 text-sm">Seus créditos foram adicionados com sucesso.</p>
            <div className="bg-white/10 rounded-xl p-3 mb-2">
              <div className="text-white/60 text-xs mb-1">Detalhes da transação:</div>
              <div className="text-white font-semibold text-base">R$ {selectedAmount.toFixed(2).replace('.', ',')}</div>
              <div className="text-white/60 text-xs">
                {new Date().toLocaleDateString('pt-BR')} • ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
              </div>
            </div>
          </div>
        );

      case 'expired':
        return (
          <div className="text-center">
            <div className="w-14 h-14 bg-red-500 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Image
                src="/icons/alert/error.svg"
                alt="Expirado"
                width={28}
                height={28}
                className="w-7 h-7 filter invert"
              />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Tempo Expirado</h3>
            <p className="text-white/70 mb-2 text-sm">O código PIX expirou. Tente novamente.</p>
            <button
              onClick={onBack}
              className="w-full py-1.5 bg-gradient-to-r from-[#F25790]/40 to-[#d93d75]/40 hover:from-[#F25790]/60 hover:to-[#d93d75]/60 text-white font-medium rounded-lg transition-all duration-300 text-sm"
            >
              Tentar Novamente
            </button>
          </div>
        );

      case 'processing':
        return (
          <div className="text-center">
            <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2 animate-pulse">
              <Image
                src="/icons/navigation/refresh.svg"
                alt="Processando"
                width={28}
                height={28}
                className="w-7 h-7 filter invert animate-spin"
              />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Processando Pagamento...</h3>
            <p className="text-white/70 mb-2 text-sm">Aguarde enquanto confirmamos seu pagamento.</p>
          </div>
        );

      default:
        return (
          <>
            {/* Instruções */}
            <div className="text-center mb-2">
              <p className="text-white/80 text-sm mb-1">Abra o app do seu banco e escaneie o <span className="text-[#F25790] font-semibold">QR Code</span></p>
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

            {/* QR Code */}
            {showQRCode && (
              <div className="text-center mb-2">
                <div className="bg-white p-3 rounded-xl inline-block mb-1">
                  <div className="w-40 h-40 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">QR Code PIX</span>
                  </div>
                </div>
                
                {/* Countdown */}
                <div className="text-white/60 text-xs mb-1">
                  Código expira em: <span className="text-[#F25790] font-semibold">{formatTime(countdown)}</span>
                </div>
              </div>
            )}

            {/* Código PIX para copiar */}
            <div className="mb-2">
              <div className="text-white/70 text-xs mb-1">Ou copie o código PIX:</div>
              <div className="bg-white/10 rounded-xl p-2 flex items-center gap-2">
                <div className="flex-1 text-white/60 text-xs font-mono break-all">
                  {pixCode.substring(0, 50)}...
                </div>
                <button
                  onClick={copyPixCode}
                  className={`px-3 py-1 rounded-lg font-medium transition-all text-sm ${
                    copyStatus
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-[#F25790]/40 to-[#d93d75]/40 hover:from-[#F25790]/60 hover:to-[#d93d75]/60 text-white'
                  }`}
                >
                  {copyStatus ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex gap-2">
              <button
                onClick={onBack}
                className="flex-1 py-1.5 px-2 font-medium rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-300 border border-white/20 text-sm"
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
                onClick={confirmPayment}
                className="flex-1 py-1.5 px-2 font-medium rounded-lg bg-gradient-to-r from-[#F25790]/40 to-[#d93d75]/40 hover:from-[#F25790]/60 hover:to-[#d93d75]/60 text-white transition-all duration-300 shadow-[0_0_10px_rgba(242,87,144,0.3)] hover:shadow-[0_0_15px_rgba(242,87,144,0.5)] hover:scale-105 active:scale-95 border border-[#F25790]/20 text-sm"
              >
                Já finalizei a transferência
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
              Transação segura e criptografada
            </p>
          </>
        );
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      modelImage="/images/realistic_photo_of_a_beautiful_curvy_cam_model_with_a_seductive_figure_in_sexy_casual_clothing_slig_ahfgqgjmowqgy07bfw5r_0.png"
      modelName="Modelo Cam"
      title="Pagamento via PIX"
      subtitle={paymentStatus === 'pending' ? 'Escaneie o QR Code para pagar' : undefined}
    >
      <div className="max-h-[90vh] overflow-y-auto p-0 md:p-6 min-h-[320px]">
        {renderContent()}
      </div>
    </BaseModal>
  );
}
