import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';

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
    <Layout
      title="FAQ - Perguntas Frequentes | Camera Real"
      description="Encontre respostas para as perguntas mais frequentes sobre o Camera Real"
      showHeader={false}
    >
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Perguntas Frequentes</h1>
            
            {/* Barra de pesquisa */}
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar pergunta ou resposta..."
                  className="input-field pl-12"
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
            <div className="flex overflow-x-auto pb-2 mb-8 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    activeCategory === category.id 
                      ? 'bg-[#F25790] text-white' 
                      : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* Lista de perguntas */}
            <div className="space-y-4">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-block p-4 rounded-full bg-white bg-opacity-10 mb-4">
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
                    className="bg-black bg-opacity-70 border border-gray-800 rounded-lg overflow-hidden"
                  >
                    <button
                      className="w-full text-left p-4 flex justify-between items-center"
                      onClick={() => toggleItem(item.id)}
                    >
                      <h3 className="font-medium">{item.question}</h3>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className={`w-5 h-5 transition-transform ${expandedItems.includes(item.id) ? 'rotate-180' : ''}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                    {expandedItems.includes(item.id) && (
                      <div className="p-4 pt-0 border-t border-gray-800 text-gray-300">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            
            {/* Contato */}
            <div className="mt-12 bg-[#F25790] bg-opacity-10 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Não encontrou o que procurava?</h2>
              <p className="mb-6">Entre em contato com nossa equipe de suporte, estamos disponíveis 24/7 para ajudar com qualquer dúvida.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contato" className="btn-primary">
                  Formulário de contato
                </Link>
                <a href="mailto:suporte@camerareal.com" className="btn-secondary">
                  suporte@camerareal.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
