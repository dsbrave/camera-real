import React, { useState, useEffect } from 'react';
import Image from 'next/image';


interface PixPaymentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  selectedAmount: number;
  onSubmit: () => void;
}

export default function PixPaymentForm({ isOpen, onClose, onBack, selectedAmount, onSubmit }: PixPaymentFormProps) {
  const [showQRCode, setShowQRCode] = useState(true);
  const [userName] = useState('Cláudia Soso Venturin');
  const [saveInfo, setSaveInfo] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutos em segundos
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'expired'>('pending');
  const [copied, setCopied] = useState(false);
  
  // PIX code simulado (BR Code)
  const pixCode = '00020101021226910014br.gov.bcb.pix2569qrcodes.fiduciascm.digital/v1/qr/ded35b9c-fdf8-4789-ba97-24f26cc9327252040000530398654041.005802BR5910Camera_Real6009Sao_Paulo62290525' + Date.now() + '630470AA';
  
  // Countdown timer
  useEffect(() => {
    if (!isOpen || paymentStatus !== 'pending') return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setPaymentStatus('expired');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, paymentStatus]);

  // Simular verificação de pagamento
  useEffect(() => {
    if (!isOpen || paymentStatus !== 'pending') return;
    
    // Simular verificação a cada 5 segundos
    const checkPayment = setInterval(() => {
      // Aqui você faria a verificação real do status do pagamento
      // Por enquanto, vamos simular
    }, 5000);

    return () => clearInterval(checkPayment);
  }, [isOpen, paymentStatus]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const handlePaymentConfirm = () => {
    setPaymentStatus('processing');
    // Simular processamento
    setTimeout(() => {
      setPaymentStatus('success');
      setTimeout(() => {
        onSubmit();
      }, 2000);
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 pix-modal">
      <div className="bg-gray-800 rounded-xl w-full max-w-3xl max-h-[75vh] overflow-hidden relative shadow-2xl pix-modal-content">
        {/* Header */}
        <div className="relative p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Pagamento via Pix</h2>
                <p className="text-gray-300 text-xs">Transferência instantânea e segura</p>
              </div>
            </div>
            
            {/* Status e Timer */}
            <div className="flex items-center gap-3">
              {paymentStatus === 'pending' && (
                <div className="text-right">
                  <p className="text-gray-300 text-xs">Expira em</p>
                  <p className={`text-white font-mono text-sm font-bold timer-display ${
                    timeLeft < 300 ? 'countdown-warning' : ''
                  } ${timeLeft < 60 ? 'countdown-critical' : ''}`}>
                    {formatTime(timeLeft)}
                  </p>
                </div>
              )}
              
              <button 
                onClick={onClose}
                className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors focus-visible"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {paymentStatus === 'pending' && (
            <div className="grid lg:grid-cols-2 gap-4 items-start">
              {/* Left Side - Instructions */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-base font-semibold text-white mb-3">Como pagar com Pix</h3>
                  <div className="space-y-2 text-gray-300 instruction-steps">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-[#F25790] rounded-full flex items-center justify-center flex-shrink-0 step-indicator">
                        <span className="text-white text-xs font-bold">1</span>
                      </div>
                      <p className="text-xs">Abra o app do seu banco ou carteira digital</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-[#F25790] rounded-full flex items-center justify-center flex-shrink-0 step-indicator">
                        <span className="text-white text-xs font-bold">2</span>
                      </div>
                      <p className="text-xs">Escolha a opção "Pix" e depois "Pagar com QR Code"</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-[#F25790] rounded-full flex items-center justify-center flex-shrink-0 step-indicator">
                        <span className="text-white text-xs font-bold">3</span>
                      </div>
                      <p className="text-xs">Escaneie o código ou cole o código Pix</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-[#F25790] rounded-full flex items-center justify-center flex-shrink-0 step-indicator">
                        <span className="text-white text-xs font-bold">4</span>
                      </div>
                      <p className="text-xs">Confirme o pagamento na sua conta</p>
                    </div>
                  </div>
                </div>

                {/* Illustration */}
                <div className="hidden lg:flex justify-center">
                  <div className="relative w-48 h-32">
                    <Image 
                      src="/images/Payment.png" 
                      alt="Pagamento via PIX" 
                      width={192}
                      height={128}
                      className="object-contain filter brightness-110 contrast-110"
                    />
                  </div>
                </div>
              </div>

              {/* Right Side - Payment Details */}
              <div className="space-y-3">
                {/* Payment Amount */}
                <div className="bg-gray-700 rounded-lg p-3 border border-gray-600 info-card">
                  <div className="text-center">
                    <p className="text-gray-300 text-xs mb-1">Valor a pagar</p>
                    <p className="text-xl font-bold text-white gradient-text">R$ {selectedAmount.toFixed(2).replace('.', ',')}</p>
                    <p className="text-gray-400 text-xs mt-1">{selectedAmount} Créditos</p>
                  </div>
                </div>

                {/* QR Code Section */}
                <div className="bg-gray-700 rounded-lg p-3 border border-gray-600 info-card">
                  {showQRCode ? (
                    <div className="text-center space-y-2">
                      <div className="bg-white p-3 rounded-lg inline-block shadow-lg qr-code-container">
                        <Image 
                          src="/images/qr-code-pix.png" 
                          alt="QR Code PIX" 
                          width={120} 
                          height={120}
                          className="mx-auto"
                        />
                      </div>
                      <p className="text-gray-300 text-xs">Escaneie com a câmera do seu celular</p>
                      
                      <button 
                        onClick={() => setShowQRCode(false)}
                        className="w-full py-2 px-3 rounded-lg bg-gray-600 hover:bg-gray-500 text-white text-xs font-medium transition-all duration-200 flex items-center justify-center gap-2 button-secondary focus-visible"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copiar código
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div>
                        <p className="text-gray-300 text-xs mb-2 font-medium">Código Pix para copiar:</p>
                        <div className="bg-gray-800 text-gray-100 p-2 rounded-lg text-xs break-all font-mono border border-gray-600 max-h-20 overflow-y-auto pix-code-container">
                          {pixCode}
                        </div>
                        <button 
                          onClick={() => copyToClipboard(pixCode)}
                          className={`w-full mt-2 py-2 px-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 copy-button focus-visible text-xs ${
                            copied 
                              ? 'bg-green-500 text-white copied' 
                              : 'bg-[#F25790] hover:bg-[#d93d75] text-white button-primary'
                          }`}
                        >
                          {copied ? (
                            <>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Código copiado!
                            </>
                          ) : (
                            <>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Copiar código Pix
                            </>
                          )}
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => setShowQRCode(true)}
                        className="w-full py-2 px-3 rounded-lg bg-gray-600 hover:bg-gray-500 text-white text-xs font-medium transition-all duration-200 flex items-center justify-center gap-2 button-secondary focus-visible"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                        Ver QR Code
                      </button>
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="bg-gray-700 rounded-lg p-2 border border-gray-600 info-card">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-xs">Pagador</p>
                      <p className="text-white text-xs font-medium">{userName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <input 
                      type="checkbox" 
                      id="saveInfo" 
                      checked={saveInfo} 
                      onChange={() => setSaveInfo(!saveInfo)} 
                      className="w-3 h-3 accent-[#F25790] rounded focus-visible"
                    />
                    <label htmlFor="saveInfo" className="text-gray-300 text-xs">
                      Salvar informações para próximas compras
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Processing State */}
          {paymentStatus === 'processing' && (
            <div className="text-center py-4">
              <div className="w-10 h-10 bg-[#F25790] rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
                <svg className="w-5 h-5 text-white loading-spinner" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <h3 className="text-base font-semibold text-white mb-1 status-processing">Processando pagamento...</h3>
              <p className="text-gray-300 text-xs">Aguarde enquanto confirmamos seu pagamento</p>
            </div>
          )}

          {/* Success State */}
          {paymentStatus === 'success' && (
            <div className="text-center py-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2 success-checkmark">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-base font-semibold text-white mb-1 status-success">Pagamento confirmado!</h3>
              <p className="text-gray-300 text-xs">Seus créditos foram adicionados à sua conta</p>
            </div>
          )}

          {/* Expired State */}
          {paymentStatus === 'expired' && (
            <div className="text-center py-4">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-base font-semibold text-white mb-1 status-expired">Código expirado</h3>
              <p className="text-gray-300 text-xs mb-3">O tempo limite para pagamento foi atingido</p>
              <button
                onClick={() => {
                  setPaymentStatus('pending');
                  setTimeLeft(30 * 60);
                }}
                className="py-2 px-3 rounded-lg bg-[#F25790] hover:bg-[#d93d75] text-white text-xs font-medium transition-all duration-200 button-primary focus-visible"
              >
                Gerar novo código
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {paymentStatus === 'pending' && (
          <div className="border-t border-gray-700 p-3">
            <div className="flex gap-2">
              <button
                onClick={onBack || onClose}
                className="flex-1 py-2 px-3 rounded-lg bg-gray-600 hover:bg-gray-500 transition-all duration-200 text-white text-xs font-medium button-secondary focus-visible"
              >
                Voltar
              </button>
              
              <button
                onClick={handlePaymentConfirm}
                className="flex-1 py-2 px-3 rounded-lg bg-[#F25790] hover:bg-[#d93d75] transition-all duration-200 transform hover:scale-[1.02] text-white text-xs font-medium shadow-lg button-primary focus-visible"
              >
                Já realizei o pagamento
              </button>
            </div>
            
            <p className="text-center text-gray-400 text-xs mt-2">
              O pagamento será confirmado automaticamente após a transferência
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
