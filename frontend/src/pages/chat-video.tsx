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
  
  // Estados para meta da modelo
  const [modelGoal, setModelGoal] = useState(500); // Meta de 500 créditos
  const [modelEarnings, setModelEarnings] = useState(45); // Já ganhou 45 créditos
  
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
      // Adicionar mensagem de entrada do usuário no chat inicial
      setMessages([
        { id: Date.now() - 3000, text: 'Oi pessoal! Como vocês estão?', sender: 'other_user', timestamp: new Date(Date.now() - 3000), username: 'João_SP' },
        { id: Date.now() - 2000, text: 'Oi João! Estamos bem! 😊', sender: 'model', timestamp: new Date(Date.now() - 2000) },
        { id: Date.now() - 1000, text: 'entrou no chat', sender: 'system', timestamp: new Date(Date.now() - 1000), username: 'DiogoBR' }
      ]);
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
            // 30% para a modelo
            setModelEarnings(prev => prev + Math.floor(cost * 0.3));
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
    // Reset da meta da modelo
    setModelEarnings(Math.floor(Math.random() * 100) + 20); // Valor aleatório entre 20-120
    
    // Simular chat público já em andamento
    const newModel = models[(modelIndex + 1) % models.length];
    const simulatedMessages = [
      { id: Date.now() - 5000, text: `Oi ${newModel.name}! Você está linda hoje! 😍`, sender: 'other_user', timestamp: new Date(Date.now() - 5000), username: 'Carlos123' },
      { id: Date.now() - 4000, text: 'Obrigada amor! ❤️', sender: 'model', timestamp: new Date(Date.now() - 4000) },
      { id: Date.now() - 3000, text: 'Pode dançar um pouquinho?', sender: 'other_user', timestamp: new Date(Date.now() - 3000), username: 'Miguel_SP' },
      { id: Date.now() - 2000, text: 'Claro! 💃', sender: 'model', timestamp: new Date(Date.now() - 2000) },
      { id: Date.now() - 1000, text: 'entrou no chat', sender: 'system', timestamp: new Date(Date.now() - 1000), username: `${userName || 'Usuário'}` }
    ];
    setMessages(simulatedMessages);
  };

  const handlePrevModel = () => {
    setModelIndex((prevIndex) => (prevIndex - 1 + models.length) % models.length);
    setSessionTime(0);
    setCreditsSpent(0);
    setFreeTimeRemaining(10);
    setIsPrivateCall(false);
    // Reset da meta da modelo
    setModelEarnings(Math.floor(Math.random() * 100) + 20); // Valor aleatório entre 20-120
    
    // Simular chat público já em andamento
    const newModel = models[(modelIndex - 1 + models.length) % models.length];
    const simulatedMessages = [
      { id: Date.now() - 4000, text: `${newModel.name}, você é incrível! 🌟`, sender: 'other_user', timestamp: new Date(Date.now() - 4000), username: 'Pedro_RJ' },
      { id: Date.now() - 3000, text: 'Muito obrigada! Vocês são demais! 🥰', sender: 'model', timestamp: new Date(Date.now() - 3000) },
      { id: Date.now() - 2000, text: 'Que sorriso lindo!', sender: 'other_user', timestamp: new Date(Date.now() - 2000), username: 'Rafael2024' },
      { id: Date.now() - 1000, text: 'entrou no chat', sender: 'system', timestamp: new Date(Date.now() - 1000), username: `${userName || 'Usuário'}` }
    ];
    setMessages(simulatedMessages);
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
        // 30% para a modelo
        setModelEarnings(prev => prev + Math.floor(currentModel.privateCallPrice * 0.3));
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

  const handleSendGift = (gift: Gift) => {
    if (userCredits >= gift.price) {
      setUserCredits(prev => prev - gift.price);
      // 30% para a modelo
      setModelEarnings(prev => prev + Math.floor(gift.price * 0.3));
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: `🎁 ${userName} enviou ${gift.name} para ${currentModel.name}!`, 
        sender: 'system', 
        timestamp: new Date() 
      }]);
      setShowGiftModal(false);
    } else {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: `⚠️ Créditos insuficientes para enviar ${gift.name}. Necessário: ${gift.price} créditos.`, 
        sender: 'system', 
        timestamp: new Date() 
      }]);
    }
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
            <div className="relative w-full h-[68vh] bg-gradient-to-br from-purple-900 via-pink-900 to-black">
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

            {/* Progress Bars Section - Single line design */}
            <div className="hidden md:flex justify-center items-center py-3 bg-gradient-to-r from-black/20 via-black/40 to-black/20 backdrop-blur-sm">
              <div className="flex items-center gap-8 px-8">
                {/* Timer only */}
                <div className="flex items-center gap-3">
                  <div className="text-[#F25790] font-bold text-base">
                    {freeTimeRemaining > 0 ? formatTime(freeTimeRemaining) : formatTime(sessionTime)}
                  </div>
                </div>

                {/* Progress bar sessão + créditos */}
                <div className="flex items-center gap-3">
                  <div className="w-48 h-2 bg-white/10 rounded-full relative overflow-hidden">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        freeTimeRemaining > 0 
                          ? 'bg-gradient-to-r from-green-400 to-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' 
                          : 'bg-gradient-to-r from-[#F25790] to-[#d93d75] shadow-[0_0_8px_rgba(242,87,144,0.5)]'
                      }`}
                      style={{
                        width: freeTimeRemaining > 0 
                          ? `${((10 - freeTimeRemaining) / 10) * 100}%`
                          : '100%'
                      }}
                    ></div>
                  </div>
                  
                  {freeTimeRemaining === 0 && (
                    <div className="flex items-center gap-1">
                      <span className="text-green-400 font-bold text-xs">{userCredits}</span>
                      <span className="text-white/60 text-xs">créditos</span>
                    </div>
                  )}
                </div>

                {/* Divisor */}
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>

                {/* Meta da Modelo com coroa */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <svg className="w-6 h-6 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5 16L3 3l5.5 5L12 4l3.5 4L21 3l-2 13H5zm2.7-2h8.6l.9-5.4-2.1 1.4L12 8l-3.1 2L6.8 8.6L7.7 14z"/>
                    </svg>
                    <div className="absolute -inset-1 bg-yellow-400/20 rounded-full blur-sm"></div>
                  </div>
                  
                  <div className="w-48 h-2 bg-white/10 rounded-full relative overflow-hidden">
                    <div 
                      className="h-2 rounded-full transition-all duration-1000 bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                      style={{
                        width: `${Math.min((modelEarnings / modelGoal) * 100, 100)}%`
                      }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-yellow-400 font-bold text-xs">
                    <span>{modelEarnings}</span>
                    <span className="text-white/60 text-xs">/ {modelGoal}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Botões de controle principais - integrados */}
            <div className="hidden md:flex justify-center items-center gap-8 py-3 relative z-10 bg-gradient-to-r from-black/10 via-black/20 to-black/10 backdrop-blur-sm">
              {/* Botão modelo anterior */}
              <button
                onClick={handlePrevModel}
                className="p-5 bg-black/80 hover:bg-black/90 rounded-full backdrop-blur-sm transition-all hover:scale-110 border border-white/20 shadow-[0_0_8px_rgba(255,255,255,0.2)] hover:shadow-[0_0_12px_rgba(255,255,255,0.3)]"
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
                className={`p-5 rounded-full transition-all hover:scale-110 ${
                  chatType === 'private' 
                    ? 'bg-gradient-to-r from-[#F25790]/60 to-[#d93d75]/60 border-2 border-[#F25790] shadow-[0_0_12px_rgba(242,87,144,0.4)] hover:shadow-[0_0_16px_rgba(242,87,144,0.5)]' 
                    : 'bg-black/80 hover:bg-black/90 border border-white/20 shadow-[0_0_8px_rgba(255,255,255,0.2)] hover:shadow-[0_0_12px_rgba(255,255,255,0.3)]'
                } backdrop-blur-sm`}
                type="button"
                title="Chat Privado"
              >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <circle cx="12" cy="16" r="1"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </button>

              {/* Botão Presentes */}
              <button
                onClick={() => setShowGiftModal(true)}
                className="p-5 rounded-full transition-all bg-black/80 hover:bg-black/90 border border-white/20 shadow-[0_0_8px_rgba(242,87,144,0.2)] hover:shadow-[0_0_12px_rgba(242,87,144,0.3)] hover:scale-110 backdrop-blur-sm"
                type="button"
                title="Presentes"
              >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <polyline points="20,12 20,22 4,22 4,12"/>
                  <rect x="2" y="7" width="20" height="5"/>
                  <line x1="12" y1="22" x2="12" y2="7"/>
                  <path d="M12,7 C12,7 8,3 5,7"/>
                  <path d="M12,7 C12,7 16,3 19,7"/>
                </svg>
              </button>

              {/* Botão próxima modelo */}
              <button
                onClick={handleNextModel}
                className="p-5 bg-black/80 hover:bg-black/90 rounded-full backdrop-blur-sm transition-all hover:scale-110 border border-white/20 shadow-[0_0_8px_rgba(255,255,255,0.2)] hover:shadow-[0_0_12px_rgba(255,255,255,0.3)]"
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

          {/* Área de chat (mais larga) */}
          {showChat && (
            <div className="w-full md:w-[480px] border-l border-white/10 flex flex-col relative overflow-hidden" style={{ height: 'calc(100vh - 100px)' }}>
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
                      <h3 className="font-bold text-white flex items-center gap-2 text-sm">
                        {currentModel.name}
                        <svg className="w-3 h-3 text-[#F25790]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </h3>
                      <div className="flex items-center gap-3 text-xs">
                        <div className="flex items-center gap-1">
                          <span className="inline-block w-2 h-2 rounded-full bg-[#39FF14] animate-pulse"></span>
                          <span className="text-[#39FF14] font-medium">Online</span>
                        </div>
                        <span className="text-gray-500">•</span>
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
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
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <circle cx="12" cy="16" r="1"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => setShowGiftModal(true)}
                      className="p-2 bg-black/60 hover:bg-white/10 rounded-full backdrop-blur-sm transition-all hover:scale-110 border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)] active:scale-95"
                      type="button"
                      title="Presentes"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <polyline points="20,12 20,22 4,22 4,12"/>
                        <rect x="2" y="7" width="20" height="5"/>
                        <line x1="12" y1="22" x2="12" y2="7"/>
                        <path d="M12,7 C12,7 8,3 5,7"/>
                        <path d="M12,7 C12,7 16,3 19,7"/>
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
                    <div className="text-gray-400 text-sm">
                      <p>Conectando ao chat...</p>
                    </div>
                  </div>
                )}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : msg.sender === 'system' ? 'justify-center' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 relative ${
                        msg.sender === 'user' 
                          ? 'bg-gradient-to-r from-[#F25790]/60 to-[#d93d75]/60 text-white shadow-[0_0_8px_rgba(242,87,144,0.2)] border border-[#F25790]/30' 
                          : msg.sender === 'system'
                          ? 'bg-gradient-to-r from-gray-700/40 to-gray-600/40 text-gray-300 text-xs border border-gray-500/30 shadow-[0_0_8px_rgba(128,128,128,0.1)]'
                          : msg.sender === 'other_user'
                          ? 'bg-gradient-to-r from-gray-600/60 to-gray-500/60 text-white border border-gray-500/30 shadow-[0_0_8px_rgba(128,128,128,0.2)]'
                          : 'bg-gradient-to-r from-gray-800/80 to-gray-700/80 text-white border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                      }`}
                    >
                      {msg.sender === 'other_user' && (
                        <p className="text-xs text-gray-300 mb-1 font-medium">{msg.username}</p>
                      )}
                      {msg.sender === 'system' && (
                        <p className="relative z-10 text-xs">
                          <span className="text-[#F25790] font-medium">{msg.username}</span>
                          <span className="text-gray-300"> {msg.text}</span>
                        </p>
                      )}
                      {msg.sender !== 'system' && (
                        <p className="relative z-10 text-sm">{msg.text}</p>
                      )}
                      {msg.timestamp && (
                        <p className="text-xs opacity-70 mt-1 relative z-10">
                          {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      )}
                      {/* Efeito de brilho interno */}
                      <div className={`absolute inset-0 rounded-2xl ${
                        msg.sender === 'user' 
                          ? 'bg-gradient-to-r from-white/10 to-transparent' 
                          : msg.sender === 'system'
                          ? 'bg-gradient-to-r from-white/5 to-transparent'
                          : msg.sender === 'other_user'
                          ? 'bg-gradient-to-r from-white/5 to-transparent'
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
                      className="p-3 bg-gradient-to-r from-[#F25790]/60 to-[#d93d75]/60 hover:from-[#F25790]/80 hover:to-[#d93d75]/80 disabled:bg-transparent disabled:cursor-not-allowed disabled:opacity-50 rounded-full transition-all shadow-[0_0_6px_rgba(242,87,144,0.2)] hover:shadow-[0_0_10px_rgba(242,87,144,0.3)] disabled:shadow-none border border-white/10 hover:scale-105 active:scale-95"
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
                    onClick={() => handleSendGift(gift)}
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

        {/* Layout Mobile */}
        <div className="md:hidden flex flex-col h-screen bg-black">
          {/* Header mobile */}
          <div className="flex items-center justify-between p-4 bg-black/80 backdrop-blur-sm border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#F25790]">
                  <Image
                    src="/images/model1.jpg"
                    alt="Modelo"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#39FF14] rounded-full border-2 border-black animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-white font-bold text-sm">Bella Santos</h2>
                <div className="flex items-center gap-2">
                  <svg className="w-3 h-3 text-[#F25790]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-yellow-400 text-xs font-bold">4.8</span>
                  <span className="text-white/60 text-xs">• Online</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[#F25790] font-bold text-sm">
                  {freeTimeRemaining > 0 ? formatTime(freeTimeRemaining) : formatTime(sessionTime)}
                </div>
              </div>
              
              <button
                onClick={() => setShowChat(!showChat)}
                className="p-2 bg-[#F25790] rounded-full"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Vídeo mobile */}
          <div className="flex-1 relative bg-gradient-to-br from-purple-900 via-pink-900 to-black">
            <div className="relative w-full h-full bg-black overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-transparent animate-pulse"></div>
              
              <div className="absolute top-4 left-4 z-30">
                <div className="flex items-center bg-red-600 text-white px-3 py-1 rounded-full shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs font-bold">AO VIVO</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar mobile - single line design */}
          <div className="bg-black/90 backdrop-blur-sm border-t border-white/10 p-4">
            <div className="flex items-center justify-between">
              {/* Timer only */}
              <div className="flex items-center gap-2">
                <div className="text-[#F25790] font-bold text-xs">
                  {freeTimeRemaining > 0 ? formatTime(freeTimeRemaining) : formatTime(sessionTime)}
                </div>
              </div>

              {/* Progress bars */}
              <div className="flex items-center gap-3">
                {/* Progress bar principal */}
                <div className="w-24 h-1.5 bg-white/10 rounded-full relative">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-1000 ${
                      freeTimeRemaining > 0 
                        ? 'bg-green-400 shadow-[0_0_6px_rgba(34,197,94,0.5)]' 
                        : 'bg-[#F25790] shadow-[0_0_6px_rgba(242,87,144,0.5)]'
                    }`}
                    style={{
                      width: freeTimeRemaining > 0 
                        ? `${((10 - freeTimeRemaining) / 10) * 100}%`
                        : '100%'
                    }}
                  ></div>
                </div>

                {/* Coroa + Meta */}
                <div className="flex items-center gap-2">
                  <svg className="w-3 h-3 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 16L3 3l5.5 5L12 4l3.5 4L21 3l-2 13H5zm2.7-2h8.6l.9-5.4-2.1 1.4L12 8l-3.1 2L6.8 8.6L7.7 14z"/>
                  </svg>
                  
                  <div className="w-20 h-1.5 bg-white/10 rounded-full relative">
                    <div 
                      className="h-1.5 rounded-full transition-all duration-1000 bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-[0_0_6px_rgba(251,191,36,0.5)]"
                      style={{
                        width: `${Math.min((modelEarnings / modelGoal) * 100, 100)}%`
                      }}
                    ></div>
                  </div>
                  
                  <div className="text-yellow-400 font-bold text-xs">
                    {modelEarnings}/{modelGoal}
                  </div>
                </div>
              </div>

              {/* Créditos */}
              {freeTimeRemaining === 0 && (
                <div className="text-green-400 font-bold text-xs">
                  {userCredits}
                </div>
              )}
            </div>
          </div>

          {/* Botões mobile */}
          <div className="flex justify-around items-center p-4 bg-black/80 backdrop-blur-sm border-t border-white/10">
            <button
              onClick={handlePrevModel}
              className="p-3 bg-white/10 rounded-full"
            >
              <Image
                src="/icons/hardware/keyboard_arrow_left.svg"
                alt="Anterior"
                width={20}
                height={20}
                className="w-5 h-5 filter invert"
              />
            </button>

            <button 
              onClick={() => handleChangeChatType('private')} 
              className={`p-3 rounded-full ${
                chatType === 'private' 
                  ? 'bg-[#F25790]' 
                  : 'bg-white/10'
              }`}
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <circle cx="12" cy="16" r="1"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </button>

            <button
              onClick={() => setShowGiftModal(true)}
              className="p-3 bg-white/10 rounded-full"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <polyline points="20,12 20,22 4,22 4,12"/>
                <rect x="2" y="7" width="20" height="5"/>
                <line x1="12" y1="22" x2="12" y2="7"/>
                <path d="M12,7 C12,7 8,3 5,7"/>
                <path d="M12,7 C12,7 16,3 19,7"/>
              </svg>
            </button>

            <button
              onClick={handleNextModel}
              className="p-3 bg-white/10 rounded-full"
            >
              <Image
                src="/icons/hardware/keyboard_arrow_right.svg"
                alt="Próximo"
                width={20}
                height={20}
                className="w-5 h-5 filter invert"
              />
            </button>
          </div>

          {/* Chat mobile overlay */}
          {showChat && (
            <div className="absolute inset-0 bg-black/95 backdrop-blur-sm z-50 flex flex-col">
              {/* Header do chat mobile */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-white font-bold">Chat</h3>
                <button
                  onClick={() => setShowChat(false)}
                  className="p-2 text-white/60 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Conteúdo do chat mobile */}
              <div className="flex-1 overflow-hidden">
                {/* Aqui seria o conteúdo do chat */}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
