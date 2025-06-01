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
  // ... outros estados ...
  const [showGiftModal, setShowGiftModal] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  
  // Estados
  const [modelIndex, setModelIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [freeTimeRemaining, setFreeTimeRemaining] = useState(10); // 10 segundos grátis
  const [isCallActive, setIsCallActive] = useState(true);
  const [creditsSpent, setCreditsSpent] = useState(0);
  const [userCredits, setUserCredits] = useState<number>(150);
  const [userName, setUserName] = useState<string>('');
  const [sessionTime, setSessionTime] = useState(0);
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
    } else if (freeTimeRemaining === 0 && sessionTime > 10) {
      setIsCallActive(false);
    }
  }, [freeTimeRemaining, isCallActive, sessionTime]);

  const handleNextModel = () => {
    setModelIndex((prevIndex) => (prevIndex + 1) % models.length);
    setSessionTime(0);
    setCreditsSpent(0);
    setFreeTimeRemaining(10);
    setIsPrivateCall(false);
  };

  const handlePrevModel = () => {
    setModelIndex((prevIndex) => (prevIndex - 1 + models.length) % models.length);
    setSessionTime(0);
    setCreditsSpent(0);
    setFreeTimeRemaining(10);
    setIsPrivateCall(false);
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

  const handleTogglePrivateRoom = () => {
    if (isPrivateCall) {
      setIsPrivateCall(false);
      setMessages(prev => [...prev, { id: Date.now(), text: `🔓 Você voltou para o chat aberto com todos os usuários.`, sender: 'system', timestamp: new Date() }]);
    } else {
      const currentModel = models[modelIndex];
      if (userCredits >= currentModel.privateCallPrice) {
        setIsPrivateCall(true);
        // Descontar créditos da sala privada
        setUserCredits(prev => prev - currentModel.privateCallPrice);
        setMessages(prev => [...prev, { id: Date.now(), text: `🔒 Sala privada iniciada com ${currentModel.name}`, sender: 'system', timestamp: new Date() }]);
      } else {
        setMessages(prev => [...prev, { id: Date.now(), text: `⚠️ Créditos insuficientes para sala privada. Necessário: ${currentModel.privateCallPrice} créditos.`, sender: 'system', timestamp: new Date() }]);
      }
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
          <div className={`flex-1 relative`}>
            {/* Vídeo/Player da modelo */}
            <div className="relative w-full h-[calc(100vh-120px)] bg-gradient-to-br from-purple-900 via-pink-900 to-black">
              {/* Mock Video Player */}
              <div className="relative w-full h-full bg-black overflow-hidden">
                {/* Simulação de stream de vídeo com gradiente animado */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-transparent animate-pulse"></div>
                
                {/* Indicador de transmissão ao vivo */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
                  <div className="flex items-center bg-red-600 text-white px-4 py-2 rounded-full shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm font-bold">AO VIVO</span>
                  </div>
                </div>
                
                {/* Overlay de controles do player */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 group">
                  {/* Controles centrais - só aparecem no hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-6">
                      <button className="p-4 bg-black/70 hover:bg-black/90 rounded-full backdrop-blur-sm transition-all hover:scale-110 border border-white/20">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                        </svg>
                      </button>
                      
                      <button className="p-6 bg-[#F25790] hover:bg-[#d93d75] rounded-full shadow-2xl transition-all hover:scale-110 border-2 border-[#F25790]">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </button>
                      
                      <button className="p-4 bg-black/70 hover:bg-black/90 rounded-full backdrop-blur-sm transition-all hover:scale-110 border border-white/20">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Barra de controles inferior - só aparece no hover */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                      {/* Progress bar do stream */}
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-white text-sm font-medium">00:00</span>
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div className="bg-[#F25790] h-2 rounded-full w-0 animate-pulse"></div>
                        </div>
                        <span className="text-[#F25790] text-sm font-bold">LIVE</span>
                      </div>
                      
                      {/* Controles */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button className="text-white hover:text-[#F25790] transition-colors p-1">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </button>
                          
                          <button 
                            onClick={handleToggleMute}
                            className="text-white hover:text-[#F25790] transition-colors p-1"
                          >
                            {isMuted ? (
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                              </svg>
                            ) : (
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                              </svg>
                            )}
                          </button>
                          
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                            </svg>
                            <div className="w-20 bg-gray-600 rounded-full h-2">
                              <div className="bg-[#F25790] h-2 rounded-full w-3/4"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-white text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>HD</span>
                          </div>
                          
                          <button className="text-white hover:text-[#F25790] transition-colors p-1">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Indicadores de qualidade e estatísticas */}
                <div className="absolute top-4 right-4 z-20 space-y-2">
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>1080p</span>
                    </div>
                  </div>
                  
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span>4.8</span>
                    </div>
                  </div>
                  
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.996 2.996 0 0 0 16.96 6c-.8 0-1.54.37-2.01.97L12 10.5 8.05 6.97A2.996 2.996 0 0 0 5.04 6c-.8 0-1.54.37-2.01.97L.5 14H3v8h2v-6h2.5l1.5-4.5L12 14.5l2.5-3L16 16v6h4z"/>
                      </svg>
                      <span>247</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Overlay com gradiente na parte inferior */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
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
          </div>

          {/* Área de chat (visível apenas em telas maiores) */}
          {showChat && (
            <div className="w-full md:w-80 bg-[#1e0a1e] border-l border-[#3d1f3d] flex flex-col relative">
              {/* Cabeçalho do chat */}
              <div className="p-4 border-b border-[#3d1f3d]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image 
                      src={currentModel.profileImage} 
                      alt={currentModel.name} 
                      width={40} 
                      height={40} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white flex items-center gap-1">
                      {currentModel.name}
                      <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <div className="flex items-center gap-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                        <span>Online</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span>{currentModel.rating}</span>
                      </div>
                    </div>
                  </div>
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
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2V7c0-1.1.9-2 2-2h18c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V10l15-2 15 2z"/>
                    </svg>
                  </button>
                </div>
              </form>

              {/* Botões de controle abaixo do chat - apenas desktop */}
              <div className="hidden md:flex justify-center items-center bg-[#2a142a] border-t border-[#3d1f3d] p-4 gap-4">
                {/* Botão modelo anterior */}
                <button
                  onClick={handlePrevModel}
                  className="p-4 bg-black/70 hover:bg-black/90 rounded-full backdrop-blur-sm transition-all hover:scale-110 border border-white/20 shadow-lg"
                  aria-label="Modelo anterior"
                  title="Modelo anterior"
                >
                  <Image
                    src="/icons/hardware/keyboard_arrow_left.svg"
                    alt="Modelo anterior"
                    width={24}
                    height={24}
                    className="w-6 h-6 filter invert"
                  />
                </button>

                {/* Botão Chat Privado */}
                <button 
                  onClick={() => handleChangeChatType('private')} 
                  className={`p-4 rounded-full transition-all hover:scale-110 shadow-lg ${chatType === 'private' ? 'bg-[#F25790] border-2 border-[#F25790]' : 'bg-black/70 hover:bg-black/90 border border-white/20'}`}
                  type="button"
                  title="Chat Privado"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                    <rect x="5" y="11" width="14" height="9" rx="2" fill="#39FF14" fillOpacity="0.15" />
                    <rect x="5" y="11" width="14" height="9" rx="2" stroke="#39FF14" strokeWidth="2" />
                    <path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="#39FF14" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="16" r="1.5" fill="#39FF14" />
                    <rect x="11.25" y="17.5" width="1.5" height="2" rx="0.75" fill="#39FF14" />
                  </svg>
                </button>

                {/* Botão Presentes */}
                <button
                  onClick={() => setShowGiftModal(true)}
                  className="p-4 rounded-full transition-all bg-black/70 hover:bg-black/90 border border-white/20 shadow-lg hover:scale-110"
                  type="button"
                  title="Presentes"
                >
                  <svg className="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 7h-1.35A3.35 3.35 0 0 0 12 3.35 3.35 3.35 0 0 0 5.35 7H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM12 5.35A1.65 1.65 0 0 1 13.65 7h-3.3A1.65 1.65 0 0 1 12 5.35zM20 11H4V9h16zm-2 9H6v-7h12z" />
                  </svg>
                </button>

                {/* Botão próxima modelo */}
                <button
                  onClick={handleNextModel}
                  className="p-4 bg-black/70 hover:bg-black/90 rounded-full backdrop-blur-sm transition-all hover:scale-110 border border-white/20 shadow-lg"
                  aria-label="Próxima modelo"
                  title="Próxima modelo"
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
            </div>
          )}
        </div>

        {/* Barra inferior simplificada para mobile */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1e0a1e] border-t border-[#3d1f3d] py-4 px-4 flex justify-center items-center gap-6 z-20">
          {/* Botões de passar modelo (setas) */}
          <button
            onClick={handlePrevModel}
            className="p-5 bg-black/70 hover:bg-black/90 rounded-full backdrop-blur-sm transition-all hover:scale-110 border border-white/20 shadow-lg active:scale-95"
            aria-label="Modelo anterior"
            title="Modelo anterior"
          >
            <Image
              src="/icons/hardware/keyboard_arrow_left.svg"
              alt="Modelo anterior"
              width={32}
              height={32}
              className="w-8 h-8 filter invert"
            />
          </button>
          
          <button 
            onClick={() => handleChangeChatType('private')} 
            className={`p-5 rounded-full transition-all hover:scale-110 shadow-lg active:scale-95 ${chatType === 'private' ? 'bg-[#F25790] border-2 border-[#F25790]' : 'bg-black/70 hover:bg-black/90 border border-white/20'}`}
            type="button"
            title="Chat Privado"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24">
              <rect x="5" y="11" width="14" height="9" rx="2" fill="#39FF14" fillOpacity="0.15" />
              <rect x="5" y="11" width="14" height="9" rx="2" stroke="#39FF14" strokeWidth="2" />
              <path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="#39FF14" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="16" r="1.5" fill="#39FF14" />
              <rect x="11.25" y="17.5" width="1.5" height="2" rx="0.75" fill="#39FF14" />
            </svg>
          </button>
          
          <button
            onClick={() => setShowGiftModal(true)}
            className="p-5 bg-black/70 hover:bg-black/90 rounded-full backdrop-blur-sm transition-all hover:scale-110 border border-white/20 shadow-lg active:scale-95"
            type="button"
            title="Presentes"
          >
            <svg className="w-8 h-8 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 7h-1.35A3.35 3.35 0 0 0 12 3.35 3.35 3.35 0 0 0 5.35 7H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM12 5.35A1.65 1.65 0 0 1 13.65 7h-3.3A1.65 1.65 0 0 1 12 5.35zM20 11H4V9h16zm-2 9H6v-7h12z" />
            </svg>
          </button>
          
          <button
            onClick={handleNextModel}
            className="p-5 bg-black/70 hover:bg-black/90 rounded-full backdrop-blur-sm transition-all hover:scale-110 border border-white/20 shadow-lg active:scale-95"
            aria-label="Próxima modelo"
            title="Próxima modelo"
          >
            <Image
              src="/icons/hardware/keyboard_arrow_right.svg"
              alt="Próxima modelo"
              width={32}
              height={32}
              className="w-8 h-8 filter invert"
            />
          </button>
        </div>

        {/* Gift Modal */}
        {showGiftModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-[#1e0a1e] rounded-2xl p-8 max-w-md w-full shadow-lg relative">
              <button
                onClick={() => setShowGiftModal(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl"
                aria-label="Fechar"
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-4 text-white">Enviar Presente</h2>
              <div className="grid grid-cols-3 gap-4">
                {gifts.map((gift) => (
                  <button
                    key={gift.name}
                    className="flex flex-col items-center p-3 bg-[#2a142a] rounded-xl hover:bg-[#F25790]/20 transition-all"
                    // onClick={() => handleSendGift(gift)}
                    type="button"
                  >
                    <img src={gift.image} alt={gift.name} className="w-10 h-10 mb-2" />
                    <span className="text-white text-sm font-medium">{gift.name}</span>
                    <span className="text-pink-400 text-xs font-bold">{gift.price} créditos</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-6 text-center">Selecione um presente para enviar durante o chat!</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
