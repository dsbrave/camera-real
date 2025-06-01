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

  // Efeito para scroll automático para a última mensagem
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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
        <div className="flex-1 flex flex-col md:flex-row relative h-[calc(100vh-80px)]">

          {/* Área do vídeo */}
          <div className={`flex-1 relative flex flex-col`}>
            
            {/* Vídeo/Player da modelo */}
            <div className="relative w-full h-[72vh] bg-gradient-to-br from-purple-900 via-pink-900 to-black">
              {/* Mock Video Player */}
              <div className="relative w-full h-full bg-black overflow-hidden">
                {/* Simulação de stream de vídeo com gradiente animado */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-transparent animate-pulse"></div>
                
                {/* Indicador de transmissão ao vivo */}
                <div className="absolute top-4 left-4 z-30">
                  <div className="flex items-center bg-red-600 text-white px-3 py-1 rounded-full shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                    <span className="text-xs font-bold">AO VIVO</span>
                  </div>
                </div>
                
                {/* Controles simplificados - só aparecem no hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 group">
                  {/* Botão play central menor */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="p-3 bg-black/60 hover:bg-black/80 rounded-full backdrop-blur-sm transition-all hover:scale-105 border border-white/20">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                  </div>
                  
                  {/* Controles inferiores minimalistas */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center justify-between text-white text-sm">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={handleToggleMute}
                          className="hover:text-[#F25790] transition-colors"
                        >
                          {isMuted ? (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                            </svg>
                          )}
                        </button>
                        
                        <span className="text-[#F25790] font-bold text-xs">LIVE</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs">HD</span>
                        </div>
                        
                        <button className="hover:text-[#F25790] transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Indicadores de qualidade compactos */}
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <div className="bg-black/60 backdrop-blur-sm rounded px-2 py-1 text-white text-xs flex items-center gap-1">
                    <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span>4.8</span>
                  </div>
                  
                  <div className="bg-black/60 backdrop-blur-sm rounded px-2 py-1 text-white text-xs flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.996 2.996 0 0 0 16.96 6c-.8 0-1.54.37-2.01.97L12 10.5 8.05 6.97A2.996 2.996 0 0 0 5.04 6c-.8 0-1.54.37-2.01.97L.5 14H3v8h2v-6h2.5l1.5-4.5L12 14.5l2.5-3L16 16v6h4z"/>
                    </svg>
                    <span>247</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões de controle principais - com mais destaque */}
            <div className="hidden md:flex justify-center items-center gap-8 py-6 relative z-10">
              {/* Botão modelo anterior */}
              <button
                onClick={handlePrevModel}
                className="p-5 bg-black/80 hover:bg-black/90 rounded-full backdrop-blur-sm transition-all hover:scale-110 border border-white/10 shadow-xl"
                aria-label="Modelo anterior"
                title="Modelo anterior"
              >
                <Image
                  src="/icons/hardware/keyboard_arrow_left.svg"
                  alt="Modelo anterior"
                  width={28}
                  height={28}
                  className="w-7 h-7 filter invert"
                />
              </button>

              {/* Botão Chat Privado */}
              <button 
                onClick={() => handleChangeChatType('private')} 
                className={`p-5 rounded-full transition-all hover:scale-110 shadow-xl ${chatType === 'private' ? 'bg-[#F25790] border-2 border-[#F25790]' : 'bg-black/80 hover:bg-black/90 border border-white/10'}`}
                type="button"
                title="Chat Privado"
              >
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24">
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
                className="p-5 rounded-full transition-all bg-black/80 hover:bg-black/90 border border-white/10 shadow-xl hover:scale-110"
                type="button"
                title="Presentes"
              >
                <svg className="w-7 h-7 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 7h-1.35A3.35 3.35 0 0 0 12 3.35 3.35 3.35 0 0 0 5.35 7H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM12 5.35A1.65 1.65 0 0 1 13.65 7h-3.3A1.65 1.65 0 0 1 12 5.35zM20 11H4V9h16zm-2 9H6v-7h12z" />
                </svg>
              </button>

              {/* Botão próxima modelo */}
              <button
                onClick={handleNextModel}
                className="p-5 bg-black/80 hover:bg-black/90 rounded-full backdrop-blur-sm transition-all hover:scale-110 border border-white/10 shadow-xl"
                aria-label="Próxima modelo"
                title="Próxima modelo"
              >
                <Image
                  src="/icons/hardware/keyboard_arrow_right.svg"
                  alt="Próxima modelo"
                  width={28}
                  height={28}
                  className="w-7 h-7 filter invert"
                />
              </button>
            </div>
          </div>

          {/* Timer Vertical - Entre player e chat */}
          <div className="hidden md:flex flex-col justify-center items-center w-16 bg-black/40 backdrop-blur-sm border-x border-white/10 flex-shrink-0">
            {/* Timer compacto vertical */}
            <div className="flex flex-col items-center gap-3 p-3">
              {/* Tempo */}
              <div className="text-center">
                <div className="text-[#F25790] font-bold text-sm mb-1">
                  {freeTimeRemaining > 0 ? formatTime(freeTimeRemaining) : formatTime(sessionTime)}
                </div>
                <div className="text-white text-xs opacity-70">
                  {freeTimeRemaining > 0 ? 'grátis' : 'ativo'}
                </div>
              </div>
              
              {/* Progress bar vertical */}
              <div className="w-1 h-24 bg-white/10 rounded-full relative">
                <div 
                  className={`w-1 rounded-full transition-all duration-1000 absolute bottom-0 ${
                    freeTimeRemaining > 0 ? 'bg-[#39FF14] shadow-[0_0_10px_#39FF14]' : 'bg-[#F25790] shadow-[0_0_10px_#F25790]'
                  }`}
                  style={{
                    height: freeTimeRemaining > 0 
                      ? `${((10 - freeTimeRemaining) / 10) * 100}%`
                      : '100%'
                  }}
                ></div>
              </div>
              
              {/* Créditos */}
              {freeTimeRemaining === 0 && (
                <div className="text-center">
                  <div className="text-[#F25790] text-xs font-medium mb-1">-{creditsSpent}</div>
                  <div className="text-[#39FF14] text-xs font-medium">{userCredits}</div>
                </div>
              )}
            </div>
          </div>

          {/* Área de chat (mais larga) */}
          {showChat && (
            <div className="w-full md:w-96 border-l border-white/10 flex flex-col relative overflow-hidden" style={{ height: 'calc(100vh - 100px)' }}>
              {/* Efeito neon de fundo */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#F25790]/5 via-transparent to-[#39FF14]/5 pointer-events-none"></div>
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>
              
              {/* Cabeçalho do chat com efeito neon */}
              <div className="p-4 border-b border-white/10 flex-shrink-0 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                      <Image 
                        src={currentModel.profileImage} 
                        alt={currentModel.name} 
                        width={48} 
                        height={48} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-white flex items-center gap-2 text-lg">
                        {currentModel.name}
                        <svg className="w-5 h-5 text-[#F25790] drop-shadow-[0_0_8px_rgba(242,87,144,0.8)]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </h3>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="inline-block w-2 h-2 rounded-full bg-[#39FF14] shadow-[0_0_8px_rgba(57,255,20,0.8)] animate-pulse"></span>
                          <span className="text-[#39FF14] font-medium">Online</span>
                        </div>
                        <span className="text-gray-500">•</span>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-yellow-400 drop-shadow-[0_0_6px_rgba(255,255,0,0.6)]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          <span className="text-yellow-400 font-medium">{currentModel.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Botões mobile na barra do chat com efeito neon */}
                  <div className="md:hidden flex items-center gap-2">
                    <button
                      onClick={handlePrevModel}
                      className="p-2 bg-black/60 hover:bg-white/10 rounded-full backdrop-blur-sm transition-all hover:scale-110 border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)] active:scale-95"
                      aria-label="Modelo anterior"
                      title="Modelo anterior"
                    >
                      <Image
                        src="/icons/hardware/keyboard_arrow_left.svg"
                        alt="Modelo anterior"
                        width={20}
                        height={20}
                        className="w-5 h-5 filter invert"
                      />
                    </button>
                    
                    <button 
                      onClick={() => handleChangeChatType('private')} 
                      className={`p-2 rounded-full transition-all hover:scale-110 active:scale-95 ${chatType === 'private' ? 'bg-[#F25790] border-2 border-[#F25790] shadow-[0_0_20px_rgba(242,87,144,0.6)]' : 'bg-black/60 hover:bg-white/10 border border-white/20'}`}
                      type="button"
                      title="Chat Privado"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <rect x="5" y="11" width="14" height="9" rx="2" fill="#39FF14" fillOpacity="0.15" />
                        <rect x="5" y="11" width="14" height="9" rx="2" stroke="#39FF14" strokeWidth="2" />
                        <path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="#39FF14" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="12" cy="16" r="1.5" fill="#39FF14" />
                        <rect x="11.25" y="17.5" width="1.5" height="2" rx="0.75" fill="#39FF14" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => setShowGiftModal(true)}
                      className="p-2 bg-black/60 hover:bg-white/10 rounded-full backdrop-blur-sm transition-all hover:scale-110 border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)] active:scale-95"
                      type="button"
                      title="Presentes"
                    >
                      <svg className="w-5 h-5 text-[#F25790]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 7h-1.35A3.35 3.35 0 0 0 12 3.35 3.35 3.35 0 0 0 5.35 7H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM12 5.35A1.65 1.65 0 0 1 13.65 7h-3.3A1.65 1.65 0 0 1 12 5.35zM20 11H4V9h16zm-2 9H6v-7h12z" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={handleNextModel}
                      className="p-2 bg-black/60 hover:bg-white/10 rounded-full backdrop-blur-sm transition-all hover:scale-110 border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)] active:scale-95"
                      aria-label="Próxima modelo"
                      title="Próxima modelo"
                    >
                      <Image
                        src="/icons/hardware/keyboard_arrow_right.svg"
                        alt="Próxima modelo"
                        width={20}
                        height={20}
                        className="w-5 h-5 filter invert"
                      />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Mensagens do chat com altura fixa e scroll interno */}
              <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                      <p className="text-white mb-2 text-lg font-medium">💬 Inicie uma conversa com {currentModel.name}</p>
                      <p className="text-gray-300 text-sm opacity-75">Seja respeitoso e divirta-se!</p>
                    </div>
                  </div>
                )}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : msg.sender === 'system' ? 'justify-center' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 relative ${
                        msg.sender === 'user' 
                          ? 'bg-gradient-to-r from-[#F25790] to-[#d93d75] text-white shadow-[0_0_20px_rgba(242,87,144,0.4)] border border-[#F25790]/50' 
                          : msg.sender === 'system'
                          ? 'bg-gradient-to-r from-[#39FF14]/20 to-[#2dd914]/20 text-[#39FF14] text-sm border border-[#39FF14]/30 shadow-[0_0_15px_rgba(57,255,20,0.2)]'
                          : 'bg-gradient-to-r from-gray-800/80 to-gray-700/80 text-white border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                      }`}
                    >
                      <p className="relative z-10">{msg.text}</p>
                      {msg.timestamp && (
                        <p className="text-xs opacity-70 mt-2 relative z-10">
                          {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      )}
                      {/* Efeito de brilho interno */}
                      <div className={`absolute inset-0 rounded-2xl ${
                        msg.sender === 'user' 
                          ? 'bg-gradient-to-r from-white/10 to-transparent' 
                          : msg.sender === 'system'
                          ? 'bg-gradient-to-r from-[#39FF14]/10 to-transparent'
                          : 'bg-gradient-to-r from-white/5 to-transparent'
                      } pointer-events-none`}></div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input de mensagem fixo na altura dos botões principais */}
              <div className="flex-shrink-0 relative z-10" style={{ height: '96px' }}>
                <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 h-full flex items-center">
                  <div className="flex gap-3 w-full">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Digite sua mensagem..."
                      className="flex-1 bg-black text-white placeholder-gray-400 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-[#F25790]/50 transition-all border border-white/20 shadow-[0_0_15px_rgba(242,87,144,0.3)] focus:shadow-[0_0_25px_rgba(242,87,144,0.5)] backdrop-blur-sm"
                    />
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="p-3 bg-gradient-to-r from-[#F25790] to-[#d93d75] hover:from-[#d93d75] hover:to-[#F25790] disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-full transition-all shadow-[0_0_20px_rgba(242,87,144,0.4)] hover:shadow-[0_0_30px_rgba(242,87,144,0.6)] disabled:shadow-none hover:scale-105 active:scale-95"
                    >
                      <Image
                        src="/icons/navigation/arrow_forward.svg"
                        alt="Enviar"
                        width={24}
                        height={24}
                        className="w-6 h-6 filter invert"
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
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
