import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function ChatVideo() {
  const router = useRouter();
  const { id } = router.query;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [showEmojis, setShowEmojis] = useState(false);
  const [modelInfo, setModelInfo] = useState({
    name: 'Cláudia Venturin',
    online: true,
    pricePerMinute: 2.5,
    profileImage: '/images/Tutto Ricco - Pride Month 1.png'
  });
  const [userInfo, setUserInfo] = useState<any>(null);
  const [timer, setTimer] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isCameraPermissionGranted, setIsCameraPermissionGranted] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  // Emoji options
  const emojis = ['😊', '❤️', '👋', '🔥', '👍', '😍', '🥰', '🎉'];
  
  useEffect(() => {
    // Carregar dados do usuário do localStorage
    const loadUserData = () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          setUserInfo(user);
        } else {
          // Se não houver usuário logado, redirecionar para o login
          router.push('/login');
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    };
    
    loadUserData();
    
    // Inicializar mensagens de exemplo
    setMessages([
      { id: 1, sender: 'model', text: 'Olá! Tudo bem?', time: '14:30' },
      { id: 2, sender: 'user', text: 'Oi! Tudo ótimo, e você?', time: '14:31' },
      { id: 3, sender: 'model', text: 'Estou bem! Vamos conversar um pouco?', time: '14:32' }
    ]);
    
    return () => {
      // Limpar stream de vídeo ao desmontar o componente
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [router]);
  
  // Scroll para o final das mensagens sempre que novas mensagens são adicionadas
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Timer para contagem do tempo de chamada
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isCallActive) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCallActive]);
  
  // Formatar o tempo para exibição
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Calcular o custo da chamada
  const calculateCost = () => {
    const minutes = timer / 60;
    return (minutes * modelInfo.pricePerMinute).toFixed(2);
  };
  
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio: true
      });
      
      setLocalStream(stream);
      setIsCameraPermissionGranted(true);
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      // Simular o vídeo do modelo com um vídeo gravado ou imagem
      if (remoteVideoRef.current) {
        remoteVideoRef.current.poster = modelInfo.profileImage;
      }
      
      setIsCallActive(true);
      
      // Adicionar mensagem de sistema
      const systemMessage = {
        id: Date.now(),
        sender: 'system',
        text: 'A videochamada foi iniciada.',
        time: new Date().toLocaleTimeString().slice(0, 5)
      };
      
      setMessages(prev => [...prev, systemMessage]);
      
    } catch (error) {
      console.error('Erro ao acessar a câmera:', error);
      alert('Não foi possível acessar sua câmera. Verifique as permissões do navegador.');
    }
  };
  
  const stopCamera = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    
    setIsCallActive(false);
    
    // Adicionar mensagem de sistema
    const systemMessage = {
      id: Date.now(),
      sender: 'system',
      text: `A videochamada foi encerrada. Duração: ${formatTime(timer)}. Custo: R$ ${calculateCost()}`,
      time: new Date().toLocaleTimeString().slice(0, 5)
    };
    
    setMessages(prev => [...prev, systemMessage]);
  };
  
  const toggleCamera = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks[0].enabled = !videoTracks[0].enabled;
        setIsVideoOn(videoTracks[0].enabled);
      }
    }
  };
  
  const toggleMic = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks[0].enabled = !audioTracks[0].enabled;
        setIsMicOn(audioTracks[0].enabled);
      }
    }
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = { 
        id: Date.now(), 
        sender: 'user', 
        text: message, 
        time: new Date().toLocaleTimeString().slice(0, 5) 
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Simular resposta do modelo após alguns segundos
      setTimeout(() => {
        const modelResponses = [
          'Que legal! Me conte mais sobre isso.',
          'Interessante! E como você se sentiu?',
          'Entendo... Fale mais sobre você!',
          'Adorei saber disso! Vamos continuar conversando?',
          'Haha, você é muito engraçado!'
        ];
        
        const randomResponse = modelResponses[Math.floor(Math.random() * modelResponses.length)];
        
        const modelReply = {
          id: Date.now(),
          sender: 'model',
          text: randomResponse,
          time: new Date().toLocaleTimeString().slice(0, 5)
        };
        
        setMessages(prev => [...prev, modelReply]);
      }, 2000);
    }
  };
  
  const sendEmoji = (emoji: string) => {
    const emojiMessage = { 
      id: Date.now(), 
      sender: 'user', 
      text: emoji, 
      time: new Date().toLocaleTimeString().slice(0, 5),
      isEmoji: true
    };
    
    setMessages(prev => [...prev, emojiMessage]);
    setShowEmojis(false);
  };
  
  return (
    <>
      <Head>
        <title>Videochat com {modelInfo.name} | Camera Real</title>
      </Head>
      
      <div className="min-h-screen bg-black text-white flex flex-col h-screen">
        {/* Header */}
        <div className="flex items-center p-4 bg-[#9747FF] shadow-md">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3 overflow-hidden">
              {modelInfo.profileImage ? (
                <Image 
                  src={modelInfo.profileImage} 
                  alt={modelInfo.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[#9747FF] font-bold">{modelInfo.name.charAt(0)}</span>
              )}
            </div>
            <div>
              <h1 className="text-xl font-semibold">{modelInfo.name}</h1>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                <span className="text-xs">Online</span>
              </div>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-3">
            <div className="text-xs">R$ {modelInfo.pricePerMinute.toFixed(2)}/min</div>
            {isCallActive && (
              <>
                <div className="text-xs">{formatTime(timer)}</div>
                <div className="px-3 py-1 rounded-full bg-white text-[#9747FF] text-sm font-medium">
                  R$ {calculateCost()}
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Video area */}
          <div className="flex-1 p-4 flex flex-col md:flex-row h-full">
            <div className="flex-1 md:flex-[2] relative overflow-hidden rounded-xl bg-gray-900 mr-0 md:mr-4 mb-4 md:mb-0">
              {/* Remote Video (Model) */}
              <video 
                ref={remoteVideoRef}
                className="w-full h-full object-cover"
                poster={modelInfo.profileImage}
                autoPlay
                playsInline
                muted={!isMicOn}
              />
              
              {/* Local Video (User) */}
              <div className="absolute bottom-4 right-4 w-1/4 h-1/4 rounded-lg overflow-hidden border-2 border-white shadow-lg">
                {isCallActive ? (
                  <video 
                    ref={localVideoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                    muted
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xs text-center">Sua câmera</div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Video call controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                {isCallActive ? (
                  <>
                    <button 
                      onClick={toggleCamera} 
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${isVideoOn ? 'bg-gray-600' : 'bg-red-500'}`}
                    >
                      {isVideoOn ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                      )}
                    </button>
                    
                    <button 
                      onClick={toggleMic} 
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${isMicOn ? 'bg-gray-600' : 'bg-red-500'}`}
                    >
                      {isMicOn ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                        </svg>
                      )}
                    </button>
                    
                    <button 
                      onClick={stopCamera} 
                      className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={startCamera} 
                    className="px-6 py-3 bg-[#F25790] hover:bg-[#d93d75] text-white rounded-full flex items-center space-x-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Iniciar Videochamada</span>
                  </button>
                )}
              </div>
            </div>
            
            {/* Chat area */}
            <div className="flex-1 bg-gray-900 rounded-xl flex flex-col h-full md:h-auto">
              <div className="p-4 border-b border-gray-800">
                <h2 className="text-lg font-semibold">Chat</h2>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
                {messages.map((msg) => (
                  <div key={msg.id} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                    {msg.sender === 'system' ? (
                      <div className="text-center my-2">
                        <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-md">{msg.text}</span>
                      </div>
                    ) : (
                      <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'model' && (
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2 overflow-hidden">
                            {modelInfo.profileImage ? (
                              <Image 
                                src={modelInfo.profileImage} 
                                alt={modelInfo.name}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-[#9747FF] text-xs font-bold">{modelInfo.name.charAt(0)}</span>
                            )}
                          </div>
                        )}
                        <div>
                          <div 
                            className={`px-4 py-2 rounded-2xl ${msg.sender === 'user' 
                              ? 'bg-[#F25790] text-white' 
                              : 'bg-gray-800 text-white'} ${msg.isEmoji ? 'text-3xl px-3 py-1' : ''}`}
                          >
                            {msg.text}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">{msg.time}</div>
                        </div>
                        {msg.sender === 'user' && (
                          <div className="w-8 h-8 rounded-full bg-[#F25790] flex items-center justify-center ml-2">
                            <span className="text-white text-xs font-bold">
                              {userInfo?.name?.charAt(0) || 'U'}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="p-4 border-t border-gray-800 relative">
                {showEmojis && (
                  <div className="absolute bottom-16 right-4 bg-gray-800 rounded-xl p-2 shadow-lg">
                    <div className="flex flex-wrap gap-2">
                      {emojis.map((emoji, index) => (
                        <button 
                          key={index}
                          onClick={() => sendEmoji(emoji)}
                          className="text-2xl hover:bg-gray-700 p-1 rounded"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSendMessage} className="flex items-center">
                  <button 
                    type="button" 
                    onClick={() => setShowEmojis(!showEmojis)}
                    className="p-2 text-gray-400 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 mx-2 text-white focus:outline-none focus:ring-2 focus:ring-[#F25790]"
                    placeholder="Digite sua mensagem..."
                  />
                  <button 
                    type="submit" 
                    className="p-2 bg-[#F25790] hover:bg-[#d93d75] rounded-full text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
