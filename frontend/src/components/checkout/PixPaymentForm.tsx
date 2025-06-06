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
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Image
                src="/icons/action/check_circle.svg"
                alt="Sucesso"
                width={40}
                height={40}
                className="w-10 h-10 filter invert"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Pagamento Confirmado!</h3>
            <p className="text-white/80 mb-6">Seus créditos foram adicionados com sucesso.</p>
            
            <div className="bg-white/10 rounded-2xl p-4 mb-6">
              <div className="text-white/60 text-sm mb-2">Detalhes da transação:</div>
              <div className="text-white font-bold">R$ {selectedAmount.toFixed(2).replace('.', ',')}</div>
              <div className="text-white/60 text-sm">
                {new Date().toLocaleDateString('pt-BR')} • ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
              </div>
            </div>
          </div>
        );

      case 'expired':
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Image
                src="/icons/alert/error.svg"
                alt="Expirado"
                width={40}
                height={40}
                className="w-10 h-10 filter invert"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Tempo Expirado</h3>
            <p className="text-white/80 mb-6">O código PIX expirou. Tente novamente.</p>
            
            <button
              onClick={onBack}
              className="w-full py-3 bg-gradient-to-r from-[#F25790]/40 to-[#d93d75]/40 hover:from-[#F25790]/60 hover:to-[#d93d75]/60 text-white font-bold rounded-2xl transition-all duration-300"
            >
              Tentar Novamente
            </button>
          </div>
        );

      case 'processing':
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Image
                src="/icons/navigation/refresh.svg"
                alt="Processando"
                width={40}
                height={40}
                className="w-10 h-10 filter invert animate-spin"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Processando Pagamento...</h3>
            <p className="text-white/80 mb-6">Aguarde enquanto confirmamos seu pagamento.</p>
          </div>
        );

      default:
        return (
          <>
            {/* Instruções */}
            <div className="text-center mb-6">
              <p className="text-white/90 text-base mb-4">
                Abra o app do seu banco e escaneie o <span className="text-[#F25790] font-bold">QR Code</span>
              </p>
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

            {/* QR Code */}
            {showQRCode && (
              <div className="text-center mb-6">
                <div className="bg-white p-4 rounded-2xl inline-block mb-4">
                  <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">QR Code PIX</span>
                  </div>
                </div>
                
                {/* Countdown */}
                <div className="text-white/60 text-sm mb-4">
                  Código expira em: <span className="text-[#F25790] font-bold">{formatTime(countdown)}</span>
                </div>
              </div>
            )}

            {/* Código PIX para copiar */}
            <div className="mb-6">
              <div className="text-white/80 text-sm mb-2">Ou copie o código PIX:</div>
              <div className="bg-white/10 rounded-2xl p-3 flex items-center gap-3">
                <div className="flex-1 text-white/60 text-sm font-mono break-all">
                  {pixCode.substring(0, 50)}...
                </div>
                <button
                  onClick={copyPixCode}
                  className={`px-4 py-2 rounded-xl font-bold transition-all ${
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
                onClick={confirmPayment}
                className="flex-1 py-3 font-bold rounded-2xl bg-gradient-to-r from-[#F25790]/40 to-[#d93d75]/40 hover:from-[#F25790]/60 hover:to-[#d93d75]/60 text-white transition-all duration-300 shadow-[0_0_25px_rgba(242,87,144,0.4)] hover:shadow-[0_0_35px_rgba(242,87,144,0.6)] hover:scale-105 active:scale-95"
              >
                Já finalizei a transferência
              </button>
            </div>

            {/* Texto de segurança */}
            <p className="text-white/50 text-xs text-center mt-4">
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
      {renderContent()}
    </BaseModal>
  );
}
