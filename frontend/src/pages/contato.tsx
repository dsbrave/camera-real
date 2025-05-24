import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Tipos de mensagens para o chat com IA
type MessageType = {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  context?: string;
  suggestions?: string[];
};

// Base de conhecimento expandida para o assistente inteligente
const knowledgeBase = {
  // Informações sobre pagamentos
  payments: {
    methods: ["PIX", "Cartão de crédito", "Boleto bancário"],
    privacy: "Todas as cobranças aparecem como 'CR Entretenimento' na sua fatura para garantir total privacidade",
    processing: {
      pix: "Instantâneo - créditos disponíveis imediatamente",
      card: "1-3 minutos - processamento em tempo real",
      boleto: "1-2 dias úteis após confirmação do pagamento"
    },
    security: "Utilizamos criptografia SSL 256-bits e parceiros certificados PCI DSS",
    refund: "Reembolsos são processados em até 7 dias úteis, conforme nossa política"
  },
  
  // Informações sobre modelos
  models: {
    requirements: [
      "Ter mais de 18 anos (obrigatório)",
      "Documento de identidade válido",
      "Dados bancários para recebimento",
      "Conexão de internet estável",
      "Webcam HD e microfone de qualidade"
    ],
    process: "Cadastro → Verificação de documentos → Entrevista online → Aprovação → Início das atividades",
    earnings: "Modelos recebem 60-70% do valor das sessões, pagos semanalmente",
    support: "Suporte 24/7 para modelos, treinamento inicial e acompanhamento contínuo"
  },
  
  // Sistema de créditos
  credits: {
    conversion: "1 crédito = R$ 1,00 (aproximadamente)",
    packages: [
      { amount: 50, bonus: 0, total: 50 },
      { amount: 100, bonus: 10, total: 110 },
      { amount: 200, bonus: 30, total: 230 },
      { amount: 500, bonus: 100, total: 600 }
    ],
    usage: "Créditos são debitados por minuto durante sessões privadas",
    expiry: "Créditos não expiram e ficam disponíveis na sua conta"
  },
  
  // Recursos da plataforma
  features: {
    videochat: "Chat por vídeo em HD com qualidade profissional",
    privacy: "Sessões privadas 1:1 com criptografia ponta a ponta",
    mobile: "Aplicativo disponível para iOS e Android",
    quality: "Streaming em até 1080p com áudio cristalino"
  },
  
  // Suporte técnico
  technical: {
    requirements: {
      browser: "Chrome 90+, Firefox 88+, Safari 14+, Edge 90+",
      internet: "Mínimo 5 Mbps para qualidade HD",
      device: "Webcam HD, microfone, alto-falantes ou fones"
    },
    troubleshooting: {
      connection: "Verifique sua conexão, feche outros aplicativos que usam internet",
      camera: "Permita acesso à câmera nas configurações do navegador",
      audio: "Verifique se o microfone não está mutado e tem permissão"
    }
  }
};

// Assistente IA avançado com processamento de linguagem natural
class AdvancedAIAssistant {
  private conversationContext: string[] = [];
  private userProfile: any = null;
  
  // Análise semântica avançada da mensagem
  private analyzeMessage(message: string): {
    intent: string;
    entities: string[];
    sentiment: 'positive' | 'negative' | 'neutral';
    confidence: number;
  } {
    const messageLower = message.toLowerCase();
    const words = messageLower.split(/\s+/);
    
    // Detecção de intenções com múltiplas palavras-chave
    const intents = {
      payment: ['pagamento', 'pagar', 'cartão', 'pix', 'boleto', 'cobrança', 'fatura', 'valor', 'preço', 'custo', 'reembolso', 'estorno'],
      model_signup: ['modelo', 'trabalhar', 'cadastro', 'ganhar', 'dinheiro', 'renda', 'trabalho', 'candidatar'],
      credits: ['crédito', 'comprar', 'pacote', 'recarga', 'saldo', 'bonus', 'desconto'],
      technical: ['problema', 'erro', 'falha', 'bug', 'não funciona', 'travou', 'lento', 'conexão', 'câmera', 'microfone', 'áudio', 'vídeo'],
      account: ['conta', 'perfil', 'senha', 'login', 'cadastro', 'dados', 'alterar', 'atualizar'],
      privacy: ['privacidade', 'segurança', 'dados', 'proteção', 'anônimo', 'discreto'],
      features: ['funciona', 'como usar', 'tutorial', 'ajuda', 'explicar', 'ensinar'],
      age_verification: ['idade', 'verificação', 'documento', 'anos', 'maior', 'menor'],
      mobile: ['celular', 'mobile', 'app', 'aplicativo', 'android', 'ios', 'iphone'],
      quality: ['qualidade', 'hd', 'resolução', 'imagem', 'som', 'áudio', 'vídeo']
    };
    
    let bestIntent = 'general';
    let maxScore = 0;
    
    for (const [intent, keywords] of Object.entries(intents)) {
      const score = keywords.reduce((acc, keyword) => {
        if (messageLower.includes(keyword)) {
          return acc + (keyword.length > 3 ? 2 : 1); // Palavras maiores têm peso maior
        }
        return acc;
      }, 0);
      
      if (score > maxScore) {
        maxScore = score;
        bestIntent = intent;
      }
    }
    
    // Análise de sentimento básica
    const positiveWords = ['obrigado', 'ótimo', 'bom', 'excelente', 'perfeito', 'gostei', 'adorei'];
    const negativeWords = ['problema', 'erro', 'ruim', 'péssimo', 'não funciona', 'difícil', 'complicado'];
    
    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
    if (positiveWords.some(word => messageLower.includes(word))) sentiment = 'positive';
    if (negativeWords.some(word => messageLower.includes(word))) sentiment = 'negative';
    
    return {
      intent: bestIntent,
      entities: words.filter(word => word.length > 3),
      sentiment,
      confidence: Math.min(maxScore / 3, 1)
    };
  }
  
  // Geração de resposta contextual
  generateResponse(message: string, context: string[] = []): {
    text: string;
    suggestions: string[];
    followUp: boolean;
  } {
    const analysis = this.analyzeMessage(message);
    this.conversationContext.push(message);
    
    // Manter apenas os últimos 5 contextos
    if (this.conversationContext.length > 5) {
      this.conversationContext = this.conversationContext.slice(-5);
    }
    
    let response = '';
    let suggestions: string[] = [];
    let followUp = false;
    
    switch (analysis.intent) {
      case 'payment':
        if (message.toLowerCase().includes('método') || message.toLowerCase().includes('forma')) {
          response = `Aceitamos ${knowledgeBase.payments.methods.join(', ')}. ${knowledgeBase.payments.privacy}. O PIX é processado instantaneamente, cartão em 1-3 minutos, e boleto em 1-2 dias úteis.`;
          suggestions = ['Como funciona o PIX?', 'Cartão é seguro?', 'Posso pagar com débito?'];
        } else if (message.toLowerCase().includes('segur')) {
          response = `${knowledgeBase.payments.security}. ${knowledgeBase.payments.privacy}. Seus dados estão completamente protegidos.`;
          suggestions = ['Ver métodos de pagamento', 'Como fazer reembolso?', 'Fatura discreta?'];
        } else if (message.toLowerCase().includes('reembolso') || message.toLowerCase().includes('estorno')) {
          response = `${knowledgeBase.payments.refund}. Para solicitar, entre em contato com nosso suporte informando o motivo e dados da transação.`;
          suggestions = ['Como entrar em contato?', 'Política de reembolso', 'Prazos de estorno'];
        } else {
          response = `Sobre pagamentos: aceitamos ${knowledgeBase.payments.methods.join(', ')}. ${knowledgeBase.payments.privacy}. Todos os pagamentos são seguros e processados rapidamente.`;
          suggestions = ['Métodos disponíveis', 'Segurança dos dados', 'Tempo de processamento'];
        }
        break;
        
      case 'model_signup':
        if (message.toLowerCase().includes('requisito') || message.toLowerCase().includes('precisa')) {
          response = `Para ser modelo você precisa: ${knowledgeBase.models.requirements.join(', ')}. O processo é: ${knowledgeBase.models.process}.`;
          suggestions = ['Como é a entrevista?', 'Quanto posso ganhar?', 'Suporte para modelos'];
        } else if (message.toLowerCase().includes('ganhar') || message.toLowerCase().includes('dinheiro')) {
          response = `${knowledgeBase.models.earnings}. ${knowledgeBase.models.support}. É uma oportunidade real de renda trabalhando no seu tempo.`;
          suggestions = ['Processo de cadastro', 'Requisitos necessários', 'Quando recebo?'];
        } else {
          response = `Quer ser modelo? ${knowledgeBase.models.process}. ${knowledgeBase.models.earnings}. Oferecemos suporte completo!`;
          suggestions = ['Ver requisitos', 'Processo de seleção', 'Ganhos esperados'];
        }
        break;
        
      case 'credits':
        if (message.toLowerCase().includes('pacote') || message.toLowerCase().includes('valor')) {
          const packagesText = knowledgeBase.credits.packages.map(p => 
            `R$ ${p.amount} = ${p.total} créditos${p.bonus > 0 ? ` (+${p.bonus} bônus)` : ''}`
          ).join(', ');
          response = `Nossos pacotes: ${packagesText}. ${knowledgeBase.credits.conversion}. ${knowledgeBase.credits.expiry}.`;
          suggestions = ['Melhor custo-benefício', 'Como usar créditos', 'Créditos expiram?'];
        } else {
          response = `${knowledgeBase.credits.conversion}. ${knowledgeBase.credits.usage}. ${knowledgeBase.credits.expiry}. Temos pacotes com bônus!`;
          suggestions = ['Ver pacotes disponíveis', 'Como comprar', 'Política de uso'];
        }
        break;
        
      case 'technical':
        if (message.toLowerCase().includes('câmera') || message.toLowerCase().includes('vídeo')) {
          response = `Para problemas de câmera: ${knowledgeBase.technical.troubleshooting.camera}. Requisitos: ${knowledgeBase.technical.requirements.device}.`;
          suggestions = ['Configurar permissões', 'Testar câmera', 'Requisitos do sistema'];
        } else if (message.toLowerCase().includes('conexão') || message.toLowerCase().includes('internet')) {
          response = `Para problemas de conexão: ${knowledgeBase.technical.troubleshooting.connection}. Recomendamos ${knowledgeBase.technical.requirements.internet}.`;
          suggestions = ['Testar velocidade', 'Otimizar conexão', 'Requisitos mínimos'];
        } else {
          response = `Para suporte técnico, verifique: navegador atualizado (${knowledgeBase.technical.requirements.browser}), conexão estável (${knowledgeBase.technical.requirements.internet}), e permissões de câmera/microfone.`;
          suggestions = ['Problemas de áudio', 'Problemas de vídeo', 'Configurações do navegador'];
        }
        followUp = true;
        break;
        
      case 'privacy':
        response = `Sua privacidade é nossa prioridade! ${knowledgeBase.payments.privacy}. ${knowledgeBase.features.privacy}. Nunca compartilhamos dados pessoais.`;
        suggestions = ['Segurança dos dados', 'Sessões privadas', 'Anonimato garantido'];
        break;
        
      case 'features':
        response = `Nossa plataforma oferece: ${knowledgeBase.features.videochat}, ${knowledgeBase.features.privacy}, ${knowledgeBase.features.quality}. ${knowledgeBase.features.mobile}.`;
        suggestions = ['Como usar videochat', 'Qualidade de vídeo', 'App mobile'];
        break;
        
      case 'age_verification':
        response = `A Camera Real é exclusiva para maiores de 18 anos. Todas as modelos passam por verificação rigorosa de idade e identidade. Usuários confirmam a maioridade no cadastro.`;
        suggestions = ['Processo de verificação', 'Documentos aceitos', 'Segurança da plataforma'];
        break;
        
      case 'mobile':
        response = `${knowledgeBase.features.mobile}. A experiência mobile é otimizada com todas as funcionalidades da versão web, incluindo videochat em HD.`;
        suggestions = ['Download do app', 'Funcionalidades mobile', 'Compatibilidade'];
        break;
        
      case 'quality':
        response = `${knowledgeBase.features.quality}. Requisitos: ${knowledgeBase.technical.requirements.internet} e ${knowledgeBase.technical.requirements.device}.`;
        suggestions = ['Melhorar qualidade', 'Configurações de vídeo', 'Requisitos técnicos'];
        break;
        
      default:
        // Resposta inteligente baseada no contexto
        if (analysis.sentiment === 'positive') {
          response = `Fico feliz em ajudar! Sou o assistente virtual da Camera Real e posso esclarecer dúvidas sobre pagamentos, cadastro de modelos, créditos, funcionalidades e suporte técnico. O que gostaria de saber?`;
        } else if (analysis.sentiment === 'negative') {
          response = `Sinto muito pelo inconveniente! Estou aqui para resolver qualquer problema. Pode me contar mais detalhes sobre o que está acontecendo? Também posso conectá-lo diretamente com nossa equipe de suporte.`;
          followUp = true;
        } else {
          response = `Olá! Sou o assistente virtual da Camera Real, equipado com inteligência avançada para ajudar você. Posso esclarecer dúvidas sobre nossa plataforma, pagamentos, cadastros e muito mais. Como posso ajudar?`;
        }
        suggestions = ['Como funciona a plataforma', 'Métodos de pagamento', 'Ser modelo', 'Suporte técnico'];
    }
    
    return { text: response, suggestions, followUp };
  }
  
  // Análise de contexto para respostas mais personalizadas
  getContextualGreeting(): string {
    const greetings = [
      "Olá! Sou o assistente virtual avançado da Camera Real. Como posso ajudar você hoje?",
      "Oi! Bem-vindo ao suporte inteligente da Camera Real. Estou aqui para esclarecer todas suas dúvidas!",
      "Olá! Sou seu assistente pessoal da Camera Real, equipado com IA avançada. O que gostaria de saber?"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
}

// Instância do assistente avançado
const aiAssistant = new AdvancedAIAssistant();

export default function Contato() {
  const [activeTab, setActiveTab] = useState<'form' | 'chat'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Inicializar chat com mensagem de boas-vindas inteligente
  useEffect(() => {
    if (activeTab === 'chat' && messages.length === 0) {
      const greeting = aiAssistant.getContextualGreeting();
      setMessages([
        {
          id: Date.now(),
          sender: 'bot',
          text: greeting,
          timestamp: new Date(),
          suggestions: ['Como funciona a plataforma', 'Métodos de pagamento', 'Ser modelo', 'Suporte técnico']
        }
      ]);
    }
  }, [activeTab, messages.length]);

  // Auto-scroll para mensagens - apenas dentro da área do chat
  useEffect(() => {
    const chatContainer = document.getElementById('chat-messages-container');
    if (chatContainer) {
      // Fazer scroll apenas dentro do container do chat
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  // Scroll suave apenas para o final das mensagens do chat
  const scrollToBottom = () => {
    const chatContainer = document.getElementById('chat-messages-container');
    if (chatContainer) {
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulário enviado:', formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 5000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Adicionar mensagem do usuário
    const userMessage: MessageType = {
      id: Date.now(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Scroll suave após adicionar mensagem do usuário
    setTimeout(scrollToBottom, 100);

    // Gerar resposta inteligente da IA
    setTimeout(() => {
      const context = messages.map(m => m.text);
      const aiResponse = aiAssistant.generateResponse(newMessage, context);
      
      const botMessage: MessageType = {
        id: Date.now() + 1,
        sender: 'bot',
        text: aiResponse.text,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Scroll suave após resposta da IA
      setTimeout(scrollToBottom, 100);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setNewMessage(suggestion);
    // Auto-enviar a sugestão
    setTimeout(() => {
      const event = new Event('submit');
      handleSendMessage(event as any);
    }, 100);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <Head>
        <title>Entre em Contato | Camera Real</title>
        <meta name="description" content="Entre em contato com a equipe da Camera Real. Estamos aqui para ajudar com qualquer dúvida ou sugestão." />
      </Head>

      <div className="min-h-screen flex flex-col bg-black text-white page-with-bg-image">
        <Header />
        
        <main className="flex-1 py-12 content-after-header">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Entre em <span className="text-[#F25790]">Contato</span></h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Estamos aqui para ajudar! Escolha a forma mais conveniente para entrar em contato conosco.
              </p>
            </div>
            
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl mb-16">
              <div className="flex border-b border-gray-800">
                <button 
                  className={`px-6 py-4 font-medium flex-1 text-center ${activeTab === 'form' ? 'text-[#F25790] border-b-2 border-[#F25790]' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setActiveTab('form')}
                >
                  Formulário de Contato
                </button>
                <button 
                  className={`px-6 py-4 font-medium flex-1 text-center ${activeTab === 'chat' ? 'text-[#F25790] border-b-2 border-[#F25790]' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setActiveTab('chat')}
                >
                  Chat com Assistente Virtual
                </button>
              </div>
              
              <div className="p-6">
                {activeTab === 'form' ? (
                  <div>
                    {formSubmitted ? (
                      <div className="text-center p-8">
                        <div className="w-20 h-20 rounded-full bg-green-500 mx-auto flex items-center justify-center mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Mensagem Enviada!</h3>
                        <p className="text-gray-300">
                          Obrigado por entrar em contato. Nossa equipe responderá em breve.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleFormSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="name" className="block mb-2 font-medium">Seu Nome</label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F25790]"
                              placeholder="Digite seu nome completo"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block mb-2 font-medium">Seu Email</label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F25790]"
                              placeholder="Digite seu email"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="subject" className="block mb-2 font-medium">Assunto</label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F25790]"
                          >
                            <option value="">Selecione um assunto</option>
                            <option value="suporte">Suporte Técnico</option>
                            <option value="pagamento">Problemas com Pagamento</option>
                            <option value="modelo">Tornar-se Modelo</option>
                            <option value="parceria">Proposta de Parceria</option>
                            <option value="outro">Outro Assunto</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block mb-2 font-medium">Sua Mensagem</label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            rows={6}
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F25790]"
                            placeholder="Descreva detalhadamente como podemos ajudar..."
                          ></textarea>
                        </div>
                        
                        <div className="text-center">
                          <button
                            type="submit"
                            className="px-8 py-3 bg-[#F25790] text-white rounded-full hover:bg-[#d93d75] font-medium"
                          >
                            Enviar Mensagem
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                ) : (
                  <div className="h-[600px] flex flex-col">
                    <div className="bg-gray-800 p-4 rounded-t-lg flex items-center space-x-3 border-b border-gray-700">
                      <div className="w-10 h-10 rounded-full bg-[#F25790] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Assistente Virtual Avançado</h3>
                        <p className="text-xs text-green-400 flex items-center">
                          <div className="w-2 h-2 rounded-full bg-green-400 mr-1 animate-pulse"></div>
                          Online • IA Inteligente
                        </p>
                      </div>
                      <div className="ml-auto">
                        <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                          Powered by AI
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      id="chat-messages-container"
                      className="flex-1 p-4 overflow-y-auto bg-gray-800 space-y-4 max-h-[400px]" 
                      style={{ scrollBehavior: 'smooth' }}
                    >
                      {messages.map(message => (
                        <div key={message.id}>
                          <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {message.sender === 'bot' && (
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#F25790] to-[#9747FF] flex items-center justify-center mr-2 flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                            
                            <div className={`max-w-[80%] rounded-xl p-3 ${
                              message.sender === 'user' 
                                ? 'bg-gradient-to-r from-[#F25790] to-[#d93d75] text-white rounded-tr-none shadow-lg' 
                                : 'bg-gray-700 text-white rounded-tl-none shadow-lg border border-gray-600'
                            }`}>
                              <p className="leading-relaxed">{message.text}</p>
                              <p className="text-xs opacity-70 mt-2 text-right">
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                            
                            {message.sender === 'user' && (
                              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center ml-2 flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          
                          {/* Sugestões inteligentes */}
                          {message.sender === 'bot' && message.suggestions && message.suggestions.length > 0 && (
                            <div className="mt-3 ml-10">
                              <p className="text-xs text-gray-400 mb-2">Sugestões:</p>
                              <div className="flex flex-wrap gap-2">
                                {message.suggestions.map((suggestion, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="bg-gray-700 hover:bg-[#F25790] text-white text-sm px-3 py-1 rounded-full border border-gray-600 hover:border-[#F25790] transition-all duration-200 hover:shadow-lg"
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {/* Indicador de digitação */}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#F25790] to-[#9747FF] flex items-center justify-center mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="bg-gray-700 rounded-xl p-3 rounded-tl-none">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>
                    
                    <form onSubmit={handleSendMessage} className="p-4 bg-gray-900 border-t border-gray-700">
                      <div className="flex items-center space-x-3">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          disabled={isTyping}
                          className="flex-1 px-4 py-3 rounded-full bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder={isTyping ? "Assistente está digitando..." : "Digite sua mensagem..."}
                        />
                        <button
                          type="submit"
                          disabled={isTyping || !newMessage.trim()}
                          className="w-12 h-12 rounded-full bg-gradient-to-r from-[#F25790] to-[#d93d75] flex items-center justify-center hover:from-[#d93d75] hover:to-[#c12d5f] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        >
                          {isTyping ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          )}
                        </button>
                      </div>
                      
                      {/* Dicas rápidas */}
                      <div className="mt-3 text-center">
                        <p className="text-xs text-gray-500">
                          💡 Dica: Use as sugestões acima ou pergunte sobre pagamentos, cadastro de modelos, créditos ou suporte técnico
                        </p>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gray-900 p-6 rounded-xl text-center">
                <div className="w-16 h-16 rounded-full bg-[#F25790] flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-gray-300 mb-4">
                  Envie-nos um email e responderemos dentro de 24 horas.
                </p>
                <a href="mailto:contato@camera-real.com.br" className="text-[#F25790] hover:underline">
                  contato@camera-real.com.br
                </a>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-xl text-center">
                <div className="w-16 h-16 rounded-full bg-[#F25790] flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
                <p className="text-gray-300 mb-4">
                  Suporte via WhatsApp disponível de seg-sex, das 9h às 18h.
                </p>
                <a href="https://wa.me/5511999999999" className="text-[#F25790] hover:underline">
                  +55 (11) 99999-9999
                </a>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-xl text-center">
                <div className="w-16 h-16 rounded-full bg-[#F25790] flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">FAQ</h3>
                <p className="text-gray-300 mb-4">
                  Confira nossa página de perguntas frequentes.
                </p>
                <a href="/faq" className="text-[#F25790] hover:underline">
                  Ver perguntas frequentes
                </a>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
