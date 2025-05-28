import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface Gift {
  name: string;
  price: number;
  image: string;
}

export default function ChatVideo() {
  const router = useRouter();
  const { id } = router.query;
  const [modelIndex, setModelIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [freeTimeRemaining, setFreeTimeRemaining] = useState(10); // 10 segundos grátis
  const [isCallActive, setIsCallActive] = useState(true);
  const [creditsSpent, setCreditsSpent] = useState(0);
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);
  const [userCredits, setUserCredits] = useState(150); // Créditos do usuário
  const [sessionTime, setSessionTime] = useState(0); // Tempo da sessão em segundos
  const [showPrivateCallModal, setShowPrivateCallModal] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  const [isPrivateCall, setIsPrivateCall] = useState(false);
  
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  
  // Modelos disponíveis (simulação)
  const models = [
    {
      id: 'm1',
      name: 'Cláudia Venturin',
      online: true,
      pricePerMinute: 2,
      privateCallPrice: 8,
      profileImage: '/images/high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_ko2t9z7547m30wzu3dsv_1.png',
      categories: ['conversa', 'dança'],
      rating: 4.8,
      age: 24,
      location: 'São Paulo'
    },
    {
      id: 'm2',
      name: 'Marina Pereira',
      online: true,
      pricePerMinute: 3,
      privateCallPrice: 10,
      profileImage: '/images/high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_2wu5n7gdr6dsrmj98ak9_2.png',
      categories: ['conversa', 'artes'],
      rating: 4.7,
      age: 26,
      location: 'Rio de Janeiro'
    },
    {
      id: 'm3',
      name: 'Fernanda Lima',
      online: true,
      pricePerMinute: 4,
      privateCallPrice: 12,
      profileImage: '/images/high-resolution_studio_photo_of_a_confident_brazilian-inspired_model_wearing_an_elegant_black_lace__i7mo7j07sng27o0fv86l_2.png',
      categories: ['conversa', 'jogos'],
      rating: 4.9,
      age: 28,
      location: 'Brasília'
    }
  ];

  const gifts: Gift[] = [
    { name: 'Rosa', price: 5, image: '/icons/action/card_giftcard.svg' },
    { name: 'Coração', price: 10, image: '/icons/action/card_giftcard.svg' },
    { name: 'Beijo', price: 15, image: '/icons/action/card_giftcard.svg' },
    { name: 'Diamante', price: 25, image: '/icons/action/card_giftcard.svg' },
    { name: 'Coroa', price: 50, image: '/icons/action/card_giftcard.svg' },
  ];

  // Timer para sessão ativa
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
        
        // Desconta créditos a cada minuto (após tempo grátis)
        if (sessionTime > 0 && sessionTime % 60 === 0 && freeTimeRemaining === 0) {
          const currentModel = models[modelIndex];
          const cost = isPrivateCall ? currentModel.privateCallPrice : currentModel.pricePerMinute;
          
          if (userCredits >= cost) {
            setUserCredits(prev => prev - cost);
            setCreditsSpent(prev => prev + cost);
          } else {
            setShowContinuePrompt(true);
            setIsCallActive(false);
          }
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isCallActive, sessionTime, modelIndex, isPrivateCall, userCredits, freeTimeRemaining]);

  // Timer para tempo grátis
  useEffect(() => {
    if (freeTimeRemaining > 0 && isCallActive) {
      const timer = setTimeout(() => {
        setFreeTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (freeTimeRemaining === 0 && !showContinuePrompt && sessionTime > 10) {
      setShowContinuePrompt(true);
    }
  }, [freeTimeRemaining, isCallActive, showContinuePrompt, sessionTime]);

  const handleNextModel = () => {
    setModelIndex((prevIndex) => (prevIndex + 1) % models.length);
    setShowContinuePrompt(false);
    setSessionTime(0);
    setCreditsSpent(0);
    setFreeTimeRemaining(10);
    setIsPrivateCall(false);
  };

  const handlePrevModel = () => {
    setModelIndex((prevIndex) => (prevIndex - 1 + models.length) % models.length);
    setShowContinuePrompt(false);
    setSessionTime(0);
    setCreditsSpent(0);
    setFreeTimeRemaining(10);
    setIsPrivateCall(false);
  };

  const handleContinueCall = () => {
    setShowContinuePrompt(false);
    setIsCallActive(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, { id: Date.now(), text: message, sender: 'user', timestamp: new Date() }]);
      setMessage('');
      
      // Simular resposta da modelo
      setTimeout(() => {
        const responses = [
          "Oi amor! 😘",
          "Como você está?",
          "Obrigada pelo carinho! ❤️",
          "Você é muito fofo!",
          "Que bom te ver aqui! 🥰"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setMessages(prev => [...prev, { 
          id: Date.now(), 
          text: randomResponse, 
          sender: 'model', 
          timestamp: new Date() 
        }]);
      }, 1000 + Math.random() * 2000);
    }
  };

  const handleSendGift = (gift: Gift, index: number) => {
    if (userCredits >= gift.price) {
      setUserCredits(prev => prev - gift.price);
      setSelectedGift(index);
      setMessages([...messages, { 
        id: Date.now(), 
        text: `🎁 Enviou um presente: ${gift.name} (${gift.price} créditos)`, 
        sender: 'system',
        timestamp: new Date()
      }]);
      setShowGiftModal(false);
      
      // Resposta da modelo
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: Date.now(), 
          text: `Muito obrigada pelo presente! Você é incrível! 😍💕`, 
          sender: 'model',
          timestamp: new Date()
        }]);
      }, 1500);
    }
  };

  const handlePrivateCall = () => {
    const currentModel = models[modelIndex];
    if (userCredits >= currentModel.privateCallPrice) {
      setIsPrivateCall(true);
      setShowPrivateCallModal(false);
      setMessages([...messages, { 
        id: Date.now(), 
        text: `🔒 Sala privada iniciada com ${currentModel.name}`, 
        sender: 'system',
        timestamp: new Date()
      }]);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentModel = models[modelIndex];

  return (
    <>
      <Head>
        <title>{`Chat com ${currentModel.name} | Camera Real`}</title>
        <meta name="description" content={`Videochat ao vivo com ${currentModel.name} na Camera Real.`} />
      </Head>
      
      <div className="min-h-screen bg-black text-white flex">
        {/* Main Video Area */}
        <div className="flex-1 relative">
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between">
              <Link href="/explorar" className="flex items-center gap-2 text-white hover:text-[#F25790] transition-colors">
                <Image
                  src="/icons/hardware/keyboard_arrow_left.svg"
                  alt="Voltar"
                  width={20}
                  height={20}
                  className="w-5 h-5 filter invert"
                />
                <span className="font-medium">Voltar</span>
              </Link>
              
              <Link href="/carteira" className="bg-gradient-to-r from-[#F25790] to-purple-600 rounded-full px-4 py-2 flex items-center gap-2 hover:from-[#d93d75] hover:to-purple-700 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="font-bold">{userCredits}</span>
                <span className="text-sm opacity-90">créditos</span>
              </Link>
            </div>
          </div>

          {/* Video Container */}
          <div className="relative h-screen bg-black flex items-center justify-center">
            {/* Model Image/Video Placeholder */}
            <div className="relative w-full h-full max-w-4xl">
              <Image
                src={currentModel.profileImage}
                alt={currentModel.name}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder-model.jpg';
                }}
              />
              
              {/* Overlay com informações da modelo */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{currentModel.name}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-300 mb-3">
                      <span>{currentModel.age} anos</span>
                      <span>•</span>
                      <span>{currentModel.location}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span>{currentModel.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-[#F25790]/20 border border-[#F25790]/30 rounded-full px-3 py-1">
                        <span className="text-sm font-medium">{currentModel.pricePerMinute} créditos/min</span>
                      </div>
                      <div className="bg-purple-600/20 border border-purple-600/30 rounded-full px-3 py-1">
                        <span className="text-sm font-medium">Privado: {currentModel.privateCallPrice} créditos/min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls - Only on video */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
            <button
              onClick={handlePrevModel}
              className="p-3 bg-black/70 hover:bg-black/90 rounded-full backdrop-blur-sm transition-all hover:scale-110 border border-white/20"
            >
              <Image
                src="/icons/hardware/keyboard_arrow_left.svg"
                alt="Modelo anterior"
                width={24}
                height={24}
                className="w-6 h-6 filter invert"
              />
            </button>
          </div>
          
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
            <button
              onClick={handleNextModel}
              className="p-3 bg-black/70 hover:bg-black/90 rounded-full backdrop-blur-sm transition-all hover:scale-110 border border-white/20"
            >
              <Image
                src="/icons/hardware/keyboard_arrow_right.svg"
                alt="Próxima modelo"
                width={24}
                height={24}
                className="w-6 h-6 filter invert"
              />
            </button>
          </div>

          {/* Private Room Button - On video */}
          <div className="absolute top-1/2 right-20 transform -translate-y-1/2 z-20">
            <button
              onClick={() => setShowPrivateCallModal(true)}
              className={`p-4 rounded-full transition-all hover:scale-110 shadow-lg border-2 ${
                isPrivateCall 
                  ? 'bg-purple-600 hover:bg-purple-700 border-purple-400' 
                  : 'bg-purple-500/80 hover:bg-purple-600 border-purple-300 backdrop-blur-sm'
              }`}
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
              </svg>
            </button>
          </div>

          {/* Timer Progress Bar - Below video */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 w-80">
            <div className="bg-black/70 backdrop-blur-sm rounded-full p-4 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  {freeTimeRemaining > 0 ? 'Tempo grátis' : 'Sessão ativa'}
                </span>
                <span className="text-sm font-bold text-[#F25790]">
                  {freeTimeRemaining > 0 ? formatTime(freeTimeRemaining) : formatTime(sessionTime)}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    freeTimeRemaining > 0 ? 'bg-green-400' : 'bg-[#F25790]'
                  }`}
                  style={{
                    width: freeTimeRemaining > 0 
                      ? `${((10 - freeTimeRemaining) / 10) * 100}%`
                      : '100%'
                  }}
                ></div>
              </div>
              
              {freeTimeRemaining === 0 && (
                <div className="flex justify-between text-xs text-gray-300">
                  <span>Gasto: {creditsSpent} créditos</span>
                  <span>Restam: {userCredits} créditos</span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Controls - Below video */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex items-center gap-4">
              {/* Encerrar Chamada */}
              <Link href="/explorar" className="p-4 bg-red-500 hover:bg-red-600 rounded-full transition-all hover:scale-110 shadow-lg border-2 border-red-300">
                <Image
                  src="/icons/notification/phone_missed.svg"
                  alt="Encerrar"
                  width={24}
                  height={24}
                  className="w-6 h-6 filter invert"
                />
              </Link>

              {/* Presentes */}
              <button
                onClick={() => setShowGiftModal(true)}
                className="p-4 bg-yellow-500 hover:bg-yellow-600 rounded-full transition-all hover:scale-110 shadow-lg border-2 border-yellow-300"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
                </svg>
              </button>

              {/* Volume */}
              <button className="p-4 bg-gray-700 hover:bg-gray-600 rounded-full transition-all hover:scale-110 shadow-lg border-2 border-gray-500">
                <Image
                  src="/icons/audio_video/volume_mute.svg"
                  alt="Volume"
                  width={24}
                  height={24}
                  className="w-6 h-6 filter invert"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Chat Sidebar - Always Open with Black Background */}
        <div className="w-96 bg-black flex flex-col border-l border-gray-800">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-800 bg-gray-900">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#F25790] flex items-center justify-center">
                <span className="text-lg font-bold">{currentModel.name[0]}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{currentModel.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span>Online</span>
                  <span>•</span>
                  <span>{currentModel.pricePerMinute} créditos/min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-black">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <p className="mb-2">💬 Inicie uma conversa com {currentModel.name}</p>
                <p className="text-sm opacity-75">Seja respeitoso e divirta-se!</p>
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : msg.sender === 'system' ? 'justify-center' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                    msg.sender === 'user' 
                      ? 'bg-[#F25790] text-white' 
                      : msg.sender === 'system'
                      ? 'bg-yellow-500/20 text-yellow-200 text-sm'
                      : 'bg-gray-800 text-white'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.timestamp && (
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800 bg-gray-900">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-gray-800 text-white placeholder-gray-500 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F25790] transition-all"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="p-3 bg-[#F25790] hover:bg-[#d93d75] disabled:bg-gray-600 disabled:cursor-not-allowed rounded-full transition-all"
              >
                <Image
                  src="/icons/content/send.svg"
                  alt="Enviar"
                  width={20}
                  height={20}
                  className="w-5 h-5 filter invert"
                />
              </button>
            </div>
          </form>
        </div>

        {/* Modal para continuar após tempo grátis - Melhorado */}
        {showContinuePrompt && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-700 p-8 rounded-2xl max-w-md w-full text-white shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#F25790] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Tempo grátis encerrado</h3>
                <p className="text-gray-400">
                  Continue aproveitando com <span className="text-[#F25790] font-bold">{currentModel.name}</span>
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Custo por minuto:</span>
                  <span className="font-bold text-[#F25790]">{currentModel.pricePerMinute} créditos</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Seus créditos:</span>
                  <span className="font-bold text-white">{userCredits} créditos</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={handleNextModel}
                  className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all border border-gray-600"
                >
                  Próxima Modelo
                </button>
                <button 
                  onClick={handleContinueCall}
                  className="flex-1 py-3 bg-[#F25790] hover:bg-[#d93d75] rounded-lg font-medium transition-all"
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Sala Privada - Melhorado */}
        {showPrivateCallModal && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-purple-500/30 p-8 rounded-2xl max-w-md w-full text-white shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">🔒 Sala Privada</h3>
                <p className="text-gray-400">
                  Tenha um momento exclusivo com {currentModel.name}
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Custo por minuto:</span>
                  <span className="font-bold text-purple-400">{currentModel.privateCallPrice} créditos</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Seus créditos:</span>
                  <span className="font-bold text-white">{userCredits} créditos</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowPrivateCallModal(false)}
                  className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all border border-gray-600"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handlePrivateCall}
                  disabled={userCredits < currentModel.privateCallPrice}
                  className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium transition-all"
                >
                  Iniciar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Presentes - Melhorado */}
        {showGiftModal && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-yellow-500/30 p-8 rounded-2xl max-w-lg w-full text-white shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">🎁 Enviar Presente</h3>
                <p className="text-gray-400">
                  Demonstre seu carinho por {currentModel.name}
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                {gifts.map((gift, index) => (
                  <button
                    key={gift.name}
                    onClick={() => handleSendGift(gift, index)}
                    disabled={userCredits < gift.price}
                    className="bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg p-4 text-center transition-all hover:scale-105 border border-gray-700 hover:border-yellow-500/50"
                  >
                    <svg className="w-8 h-8 mx-auto mb-2 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
                    </svg>
                    <p className="font-medium text-sm text-white">{gift.name}</p>
                    <p className="text-yellow-400 text-xs font-bold">{gift.price} créditos</p>
                  </button>
                ))}
              </div>
              
              <div className="text-center border-t border-gray-700 pt-4">
                <p className="text-gray-400 mb-4">Seus créditos: <span className="font-bold text-white">{userCredits}</span></p>
                <button 
                  onClick={() => setShowGiftModal(false)}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all border border-gray-600"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
