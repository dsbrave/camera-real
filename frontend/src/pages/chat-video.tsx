import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';

interface Gift {
  name: string;
  price: number;
  image: string;
}

export default function ChatVideo() {
  const router = useRouter();
  const { id } = router.query;
  
  // Estados
  const [modelIndex, setModelIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [freeTimeRemaining, setFreeTimeRemaining] = useState(10); // 10 segundos grátis
  const [isCallActive, setIsCallActive] = useState(true);
  const [creditsSpent, setCreditsSpent] = useState(0);
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);
  const [userCredits, setUserCredits] = useState<number>(150);
  const [userName, setUserName] = useState<string>('');
  const [sessionTime, setSessionTime] = useState(0);
  const [showPrivateCallModal, setShowPrivateCallModal] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  const [isPrivateCall, setIsPrivateCall] = useState(false);
  const [chatType, setChatType] = useState<'exclusive' | 'private' | 'group'>('exclusive');
  const [showChat, setShowChat] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  
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

  // Efeito para simular o carregamento do nome do usuário
  useEffect(() => {
    // Simula o carregamento do nome do usuário de uma API
    const timeout = setTimeout(() => {
      setUserName('DiogoBR');
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, []);

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
    const currentModel = models[modelIndex];
    const cost = isPrivateCall ? currentModel.privateCallPrice : currentModel.pricePerMinute;
    if (userCredits >= cost) {
      setShowContinuePrompt(false);
      setIsCallActive(true);
      setFreeTimeRemaining(0);
      setMessages(prev => [...prev, { id: Date.now(), text: `💰 Sessão continuada! Custo: ${cost} créditos/min`, sender: 'system', timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }]);
    } else {
      setMessages(prev => [...prev, { id: Date.now(), text: `⚠️ Créditos insuficientes para continuar. Necessário: ${cost} créditos/min.`, sender: 'system', timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }]);
    }
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

  const handleTogglePrivateRoom = () => {
    if (isPrivateCall) {
      setIsPrivateCall(false);
      setMessages(prev => [...prev, { id: Date.now(), text: `🔓 Você voltou para o chat aberto com todos os usuários.`, sender: 'system', timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }]);
    } else {
      const currentModel = models[modelIndex];
      if (userCredits >= currentModel.privateCallPrice) {
        setIsPrivateCall(true);
        setMessages(prev => [...prev, { id: Date.now(), text: `🔒 Sala privada iniciada com ${currentModel.name}`, sender: 'system', timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }]);
      } else {
        setMessages(prev => [...prev, { id: Date.now(), text: `⚠️ Créditos insuficientes para sala privada. Necessário: ${currentModel.privateCallPrice} créditos.`, sender: 'system', timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }]);
      }
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

  const handleChangeChatType = (type: 'exclusive' | 'private' | 'group') => {
    setChatType(type);
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      text: `Você entrou no chat ${type === 'exclusive' ? 'exclusivo' : type === 'private' ? 'privado' : 'em grupo'}`, 
      sender: 'system', 
      timestamp: new Date() 
    }]);
  };



  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const currentModel = models[modelIndex];

  return (
    <>
      <Head>
        <title>{`Chat com ${currentModel.name} | Camera Real`}</title>
        <meta name="description" content={`Videochat ao vivo com ${currentModel.name} na Camera Real.`} />
      </Head>
      
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Header />

        {/* Área principal com vídeo e chat */}
        <div className="flex-1 flex flex-col md:flex-row relative">

          {/* Área do vídeo */}
          <div className={`flex-1 relative ${showContinuePrompt ? 'blur-sm' : ''}`}>
            {/* Informações da modelo no canto superior esquerdo */}
            <div className="absolute top-4 left-4 z-20 flex items-center bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                <Image 
                  src={currentModel.profileImage} 
                  alt={currentModel.name} 
                  width={32} 
                  height={32} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-sm font-bold flex items-center">
                  {currentModel.name} 
                  <svg className="w-4 h-4 ml-1 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </h3>
                <div className="flex items-center text-xs">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                  <span>ONLINE</span>
                  <span className="mx-1">•</span>
                  <span>{currentModel.age}</span>
                </div>
              </div>
            </div>
            
            {/* Botão de saída no canto superior direito */}
            <div className="absolute top-4 right-4 z-20">
              <button 
                onClick={() => router.push('/explorar')}
                className="bg-black/70 backdrop-blur-sm rounded-md px-3 py-1 text-sm font-medium hover:bg-black transition-colors"
              >
                EXIT ROOM
              </button>
            </div>
            
            {/* Vídeo/Imagem da modelo */}
            <div className="relative w-full h-[calc(100vh-120px)]">
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
              
              {/* Overlay com gradiente na parte inferior */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
            </div>
            
            {/* Controles de vídeo na parte inferior */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-4">
              <button className="p-3 bg-black/70 hover:bg-black rounded-full transition-all">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
              </button>
              
              <button 
                onClick={handleToggleMute}
                className="p-3 bg-black/70 hover:bg-black rounded-full transition-all"
              >
                {isMuted ? (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                )}
              </button>
              
              <button className="p-3 bg-black/70 hover:bg-black rounded-full transition-all">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
              </button>
              
              <button className="p-3 bg-black/70 hover:bg-black rounded-full transition-all">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15 8v8H5V8h10m1-2H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4V7c0-.55-.45-1-1-1z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Controls - Setas laterais */}
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

          {/* Timer Progress Bar - Abaixo do vídeo */}
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

          {/* Área de chat (visível apenas em telas maiores) */}
          {showChat && (
            <div className="w-full md:w-80 bg-[#1e0a1e] border-l border-[#3d1f3d] flex flex-col">
              {/* Cabeçalho do chat */}
              <div className="p-4 border-b border-[#3d1f3d]">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">Chat</h3>
                  <button 
                    onClick={() => setShowChat(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Mensagens do chat */}
              <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3">
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
              
              {/* Input de mensagem */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-[#3d1f3d]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 bg-[#2a142a] text-white placeholder-gray-500 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F25790] transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="p-2 bg-[#F25790] hover:bg-[#d93d75] disabled:bg-gray-600 disabled:cursor-not-allowed rounded-full transition-all"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Barra inferior com opções de chat */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#1e0a1e] border-t border-[#3d1f3d] py-2 px-4 flex justify-center items-center gap-3 z-20">
          <button 
            onClick={() => handleChangeChatType('exclusive')} 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${chatType === 'exclusive' ? 'bg-[#F25790] text-white' : 'bg-[#2a142a] text-gray-300 hover:bg-[#3d1f3d]'}`}
          >
            EXCLUSIVE CHAT
          </button>
          <button 
            onClick={() => handleChangeChatType('private')} 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${chatType === 'private' ? 'bg-[#F25790] text-white' : 'bg-[#2a142a] text-gray-300 hover:bg-[#3d1f3d]'}`}
          >
            PRIVATE CHAT
          </button>
          <button 
            onClick={() => handleChangeChatType('group')} 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${chatType === 'group' ? 'bg-[#F25790] text-white' : 'bg-[#2a142a] text-gray-300 hover:bg-[#3d1f3d]'}`}
          >
            GROUP CHAT
          </button>
        </div>

        {/* Modal para continuar após tempo grátis */}
        {showContinuePrompt && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1e0a1e] border border-[#3d1f3d] p-8 rounded-2xl max-w-md w-full text-white shadow-2xl">
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
              
              <div className="bg-[#2a142a] rounded-lg p-4 mb-6 border border-[#3d1f3d]">
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
                  className="flex-1 py-3 bg-[#2a142a] hover:bg-[#3d1f3d] rounded-lg font-medium transition-all border border-[#3d1f3d]"
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

        {/* Modal Sala Privada */}
        {showPrivateCallModal && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1e0a1e] border border-purple-500/30 p-8 rounded-2xl max-w-md w-full text-white shadow-2xl">
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
              
              <div className="bg-[#2a142a] rounded-lg p-4 mb-6 border border-[#3d1f3d]">
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
                  className="flex-1 py-3 bg-[#2a142a] hover:bg-[#3d1f3d] rounded-lg font-medium transition-all border border-[#3d1f3d]"
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

        {/* Modal Presentes */}
        {showGiftModal && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1e0a1e] border border-yellow-500/30 p-8 rounded-2xl max-w-lg w-full text-white shadow-2xl">
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
                    className="bg-[#2a142a] hover:bg-[#3d1f3d] disabled:bg-[#2a142a] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg p-4 text-center transition-all hover:scale-105 border border-[#3d1f3d] hover:border-yellow-500/50"
                  >
                    <svg className="w-8 h-8 mx-auto mb-2 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
                    </svg>
                    <p className="font-medium text-sm text-white">{gift.name}</p>
                    <p className="text-yellow-400 text-xs font-bold">{gift.price} créditos</p>
                  </button>
                ))}
              </div>
              
              <div className="text-center border-t border-[#3d1f3d] pt-4">
                <p className="text-gray-400 mb-4">Seus créditos: <span className="font-bold text-white">{userCredits}</span></p>
                <button 
                  onClick={() => setShowGiftModal(false)}
                  className="px-6 py-2 bg-[#2a142a] hover:bg-[#3d1f3d] rounded-lg font-medium transition-all border border-[#3d1f3d]"
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
