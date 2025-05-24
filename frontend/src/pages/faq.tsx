import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState('geral');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const faqItems: FaqItem[] = [
    {
      id: '1',
      question: 'Como criar uma conta no Camera Real?',
      answer: 'Para criar uma conta no Camera Real, basta clicar no botão "Cadastrar" na página inicial, preencher seus dados pessoais e seguir as instruções. Após confirmar seu e-mail, sua conta estará pronta para uso.',
      category: 'geral'
    },
    {
      id: '2',
      question: 'Quais formas de pagamento são aceitas?',
      answer: 'Atualmente aceitamos pagamentos via PIX, cartão de crédito e boleto bancário. Para recarregar sua conta, acesse a seção "Carteira" no seu perfil e selecione a opção "Adicionar créditos".',
      category: 'pagamentos'
    },
    {
      id: '3',
      question: 'Como funciona o videochat?',
      answer: 'Nosso videochat permite interação em tempo real entre você e os modelos. Você pode iniciar uma conversa privada ao clicar no botão "Iniciar videochat" no perfil do modelo. O valor será debitado da sua carteira por minuto de conversa.',
      category: 'videochat'
    },
    {
      id: '4',
      question: 'Como posso me tornar um modelo no Camera Real?',
      answer: 'Para se tornar um modelo, acesse a opção "Seja Modelo" no menu principal. Você precisará preencher um formulário com seus dados pessoais, enviar documentos para verificação e passar por uma entrevista online. Após aprovação, você poderá configurar seu perfil e começar a realizar videochats.',
      category: 'modelos'
    },
    {
      id: '5',
      question: 'O que fazer se o pagamento não for aprovado?',
      answer: 'Se seu pagamento não for aprovado, verifique se os dados informados estão corretos. Caso o problema persista, entre em contato com nosso suporte através do e-mail suporte@camerareal.com ou pelo chat de atendimento disponível no site.',
      category: 'pagamentos'
    },
    {
      id: '6',
      question: 'Quanto tempo leva para um pagamento via PIX ser processado?',
      answer: 'Pagamentos via PIX geralmente são processados instantaneamente. Após a confirmação, o valor será adicionado à sua carteira e você poderá utilizá-lo imediatamente.',
      category: 'pagamentos'
    },
    {
      id: '7',
      question: 'Posso assistir a mais de um modelo ao mesmo tempo?',
      answer: 'Não, o sistema permite apenas uma sessão de videochat por vez. Isso garante uma experiência mais pessoal e de melhor qualidade para todos os envolvidos.',
      category: 'videochat'
    },
    {
      id: '8',
      question: 'Como funciona a política de privacidade?',
      answer: 'Valorizamos sua privacidade. Todas as conversas são privadas e não são armazenadas em nossos servidores. Seus dados pessoais são protegidos e nunca compartilhados com terceiros. Para mais detalhes, consulte nossa Política de Privacidade completa.',
      category: 'geral'
    },
    {
      id: '9',
      question: 'Como faço para cancelar minha assinatura?',
      answer: 'O Camera Real funciona com sistema de créditos pré-pagos, não trabalhamos com assinaturas recorrentes. Você só paga pelo que utiliza e os créditos não expiram.',
      category: 'pagamentos'
    },
    {
      id: '10',
      question: 'Posso recuperar créditos de uma chamada com problemas técnicos?',
      answer: 'Sim. Se você enfrentar problemas técnicos durante uma sessão, entre em contato com nosso suporte apresentando detalhes do ocorrido. Após análise, os créditos poderão ser reembolsados à sua carteira.',
      category: 'videochat'
    },
    {
      id: '11',
      question: 'A plataforma é segura para usar?',
      answer: 'Sim, utilizamos criptografia SSL de última geração e seguimos os mais rigorosos padrões de segurança. Todos os pagamentos são processados através de gateways seguros e certificados.',
      category: 'geral'
    },
    {
      id: '12',
      question: 'Como funciona o sistema de créditos?',
      answer: 'Nosso sistema funciona com créditos pré-pagos. Você compra créditos que ficam disponíveis na sua carteira e são debitados conforme o uso. 1 crédito equivale aproximadamente a R$ 1,00.',
      category: 'pagamentos'
    },
    {
      id: '13',
      question: 'Qual a qualidade do vídeo nas chamadas?',
      answer: 'Oferecemos videochat em alta definição (HD) com qualidade de até 1080p, dependendo da conexão de internet dos participantes. Recomendamos uma conexão mínima de 5 Mbps.',
      category: 'videochat'
    },
    {
      id: '14',
      question: 'Quais são os requisitos para ser modelo?',
      answer: 'Para ser modelo você deve ter mais de 18 anos, possuir documentos válidos, ter uma boa conexão de internet, webcam HD e estar localizada no Brasil. Também é necessário passar por nosso processo de verificação.',
      category: 'modelos'
    },
    {
      id: '15',
      question: 'Como funciona o pagamento para modelos?',
      answer: 'As modelos recebem entre 60-70% do valor das sessões, com pagamentos semanais via PIX ou transferência bancária. Não há taxas ocultas e oferecemos total transparência nos ganhos.',
      category: 'modelos'
    }
  ];

  const toggleItem = (id: string) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter(item => item !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };

  const filteredItems = faqItems.filter(item => {
    const matchesCategory = activeCategory === 'todos' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'geral', name: 'Geral' },
    { id: 'pagamentos', name: 'Pagamentos' },
    { id: 'videochat', name: 'Videochat' },
    { id: 'modelos', name: 'Modelos' }
  ];

  return (
    <>
      <Head>
        <title>FAQ - Perguntas Frequentes | Camera Real</title>
        <meta name="description" content="Encontre respostas para as perguntas mais frequentes sobre o Camera Real. Tire suas dúvidas sobre pagamentos, videochat, cadastro e muito mais." />
      </Head>

      <div className="min-h-screen flex flex-col bg-black text-white page-with-bg-image">
        <Header />
        
        <main className="flex-1 py-12 content-after-header">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Perguntas <span className="text-[#F25790]">Frequentes</span></h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Encontre respostas rápidas para as dúvidas mais comuns sobre nossa plataforma
              </p>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-6 mb-8">
              {/* Barra de pesquisa */}
              <div className="mb-6">
                <div className="relative max-w-md mx-auto">
                  <input
                    type="text"
                    placeholder="Pesquisar pergunta ou resposta..."
                    className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Categorias */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                      activeCategory === category.id 
                        ? 'bg-[#F25790] text-white shadow-lg' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Lista de perguntas */}
            <div className="space-y-4 mb-16">
              {filteredItems.length === 0 ? (
                <div className="text-center py-16 bg-gray-900 rounded-xl">
                  <div className="inline-block p-4 rounded-full bg-gray-800 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Nenhuma pergunta encontrada</h3>
                  <p className="text-gray-400">Tente outro termo de pesquisa ou categoria.</p>
                </div>
              ) : (
                filteredItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-200"
                  >
                    <button
                      className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-800 transition-colors duration-200"
                      onClick={() => toggleItem(item.id)}
                    >
                      <h3 className="font-medium text-lg pr-4">{item.question}</h3>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={2} 
                        stroke="currentColor" 
                        className={`w-5 h-5 text-[#F25790] transition-transform duration-200 flex-shrink-0 ${expandedItems.includes(item.id) ? 'rotate-180' : ''}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                    {expandedItems.includes(item.id) && (
                      <div className="px-6 pb-6 border-t border-gray-800">
                        <p className="text-gray-300 leading-relaxed pt-4">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            
            {/* Seção de contato */}
            <div className="bg-gradient-to-r from-[#F25790] to-[#d93d75] rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Não encontrou o que procurava?</h2>
              <p className="mb-6 text-lg opacity-90">
                Nossa equipe de suporte está disponível 24/7 para ajudar com qualquer dúvida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contato" 
                  className="px-8 py-3 bg-white text-[#F25790] rounded-full hover:bg-gray-100 font-bold transition-colors duration-200"
                >
                  Falar com Suporte
                </Link>
                <a 
                  href="mailto:suporte@camerareal.com" 
                  className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-[#F25790] font-bold transition-all duration-200"
                >
                  suporte@camerareal.com
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
