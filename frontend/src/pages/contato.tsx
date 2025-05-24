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
};

// Respostas pré-programadas para a IA de suporte
const aiResponses = {
  greeting: [
    "Olá! Sou a assistente virtual da Camera Real. Como posso ajudar você hoje?",
    "Oi! Bem-vindo ao suporte da Camera Real. Em que posso ser útil?",
    "Olá! Estou aqui para responder suas dúvidas sobre a Camera Real. Como posso ajudar?"
  ],
  payment: [
    "Aceitamos cartões de crédito, boleto bancário e PIX. Todos os pagamentos são processados com segurança e não aparecerão como 'Camera Real' na sua fatura, garantindo sua privacidade.",
    "Você pode adicionar créditos usando cartão de crédito, PIX ou boleto. Para sua privacidade, a cobrança aparecerá como 'CR Entretenimento' na sua fatura."
  ],
  modelo: [
    "Para se tornar uma modelo, acesse nossa página de cadastro de modelos. Você precisará fornecer documentos de identificação para verificação de idade e dados bancários para receber seus pagamentos.",
    "Quer se tornar uma modelo na Camera Real? É simples! Clique em 'Seja modelo' no menu superior e siga as instruções de cadastro. Nosso time fará a verificação e você poderá começar a trabalhar em até 48 horas."
  ],
  creditos: [
    "Você pode comprar créditos na página 'Adicionar Créditos' dentro da sua conta. Os valores são convertidos em créditos que podem ser usados para sessões privadas com as modelos.",
    "Os créditos são usados para interagir com as modelos em chat privado. 1 crédito equivale a aproximadamente R$ 1,00, mas oferecemos bônus para compras maiores."
  ],
  idade: [
    "Todos os usuários e modelos devem ter pelo menos 18 anos. Realizamos verificação de idade para todas as modelos e recomendamos que usuários também verifiquem sua identidade para uma experiência melhor.",
    "A Camera Real é uma plataforma exclusiva para maiores de 18 anos. Todas as nossas modelos passam por verificação de idade, e exigimos que todos os usuários confirmem ter pelo menos 18 anos ao se cadastrar."
  ],
  problema: [
    "Sinto muito que você esteja enfrentando problemas. Por favor, descreva o problema com mais detalhes ou entre em contato com nosso suporte pelo email suporte@camera-real.com.br.",
    "Estamos aqui para ajudar! Por favor, forneça mais detalhes sobre o problema que está enfrentando, ou se preferir suporte personalizado, envie um email para suporte@camera-real.com.br."
  ],
  fallback: [
    "Não tenho certeza se entendi sua pergunta. Poderia reformular ou escolher um dos tópicos comuns: pagamentos, cadastro de modelos, créditos, verificação de idade ou relatar um problema?",
    "Desculpe, não consegui entender completamente. Você poderia reformular sua pergunta? Estou aqui para ajudar com informações sobre pagamentos, cadastro, créditos e suporte técnico.",
    "Hmm, não tenho uma resposta específica para isso. Você gostaria de falar com nossa equipe de suporte? Você pode enviar um email para suporte@camera-real.com.br ou preencher o formulário de contato."
  ]
};

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
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Adicionar a mensagem de boas-vindas quando o componente montar
  useEffect(() => {
    if (activeTab === 'chat' && messages.length === 0) {
      const greeting = aiResponses.greeting[Math.floor(Math.random() * aiResponses.greeting.length)];
      setMessages([
        {
          id: Date.now(),
          sender: 'bot',
          text: greeting,
          timestamp: new Date()
        }
      ]);
    }
  }, [activeTab, messages.length]);

  // Rolar para o final das mensagens quando uma nova mensagem for adicionada
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulário enviado:', formData);
    // Aqui você implementaria a lógica real de envio do formulário
    setFormSubmitted(true);
    // Resetar o formulário após 5 segundos
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

    // Gerar resposta da IA
    setTimeout(() => {
      let response;
      const messageLower = newMessage.toLowerCase();
      
      if (messageLower.includes('pagamento') || messageLower.includes('pagar') || messageLower.includes('cartão')) {
        response = aiResponses.payment[Math.floor(Math.random() * aiResponses.payment.length)];
      } else if (messageLower.includes('modelo') || messageLower.includes('trabalhar') || messageLower.includes('cadastro modelo')) {
        response = aiResponses.modelo[Math.floor(Math.random() * aiResponses.modelo.length)];
      } else if (messageLower.includes('crédito') || messageLower.includes('comprar') || messageLower.includes('valor')) {
        response = aiResponses.creditos[Math.floor(Math.random() * aiResponses.creditos.length)];
      } else if (messageLower.includes('idade') || messageLower.includes('verificação') || messageLower.includes('anos')) {
        response = "Para usar a Camera Real, é necessário ter mais de 18 anos. Nossa verificação de idade é feita no momento do cadastro, onde você confirma ter mais de 18 anos marcando a caixa correspondente.";
      } else if (messageLower.includes('problema') || messageLower.includes('erro') || messageLower.includes('falha')) {
        response = "Lamento pelo problema. Você pode nos enviar mais detalhes pelo formulário de contato ou enviar um email para suporte@camera-real.com.br para que possamos resolver seu problema o mais rápido possível.";
      } else {
        response = aiResponses.fallback[Math.floor(Math.random() * aiResponses.fallback.length)];
      }

      const botMessage: MessageType = {
        id: Date.now(),
        sender: 'bot',
        text: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000); // Simular delay de resposta da IA
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
                  <div className="h-[500px] flex flex-col">
                    <div className="bg-gray-800 p-4 rounded-t-lg flex items-center space-x-3 border-b border-gray-700">
                      <div className="w-10 h-10 rounded-full bg-[#F25790] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Assistente Virtual</h3>
                        <p className="text-xs text-green-400">Online</p>
                      </div>
                    </div>
                    
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-800 space-y-4">
                      {messages.map(message => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          {message.sender === 'bot' && (
                            <div className="w-8 h-8 rounded-full bg-[#F25790] flex items-center justify-center mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                              </svg>
                            </div>
                          )}
                          
                          <div className={`max-w-[80%] rounded-xl p-3 ${
                            message.sender === 'user' 
                              ? 'bg-[#F25790] text-white rounded-tr-none' 
                              : 'bg-gray-700 text-white rounded-tl-none'
                          }`}>
                            <p>{message.text}</p>
                            <p className="text-xs opacity-70 mt-1 text-right">
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                          
                          {message.sender === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center ml-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                          )}
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                    
                    <form onSubmit={handleSendMessage} className="p-3 bg-gray-900 flex items-center">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-full bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F25790]"
                        placeholder="Digite sua mensagem..."
                      />
                      <button
                        type="submit"
                        className="ml-3 w-12 h-12 rounded-full bg-[#F25790] flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
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
