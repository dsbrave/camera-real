import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState('perfil');

  return (
    <Layout
      title="Configurações | Camera Real"
      description="Gerencie suas configurações e preferências no Camera Real"
      showHeader={false}
    >
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Configurações</h1>
            
            <div className="flex flex-col md:flex-row gap-6">
              {/* Menu lateral */}
              <div className="w-full md:w-64">
                <div className="bg-black bg-opacity-70 rounded-lg p-4 space-y-2">
                  <button 
                    onClick={() => setActiveTab('perfil')}
                    className={`w-full text-left px-4 py-3 rounded-lg ${activeTab === 'perfil' ? 'bg-[#F25790] bg-opacity-20 text-[#F25790]' : 'hover:bg-white hover:bg-opacity-10'}`}
                  >
                    Perfil
                  </button>
                  <button 
                    onClick={() => setActiveTab('conta')}
                    className={`w-full text-left px-4 py-3 rounded-lg ${activeTab === 'conta' ? 'bg-[#F25790] bg-opacity-20 text-[#F25790]' : 'hover:bg-white hover:bg-opacity-10'}`}
                  >
                    Conta
                  </button>
                  <button 
                    onClick={() => setActiveTab('notificacoes')}
                    className={`w-full text-left px-4 py-3 rounded-lg ${activeTab === 'notificacoes' ? 'bg-[#F25790] bg-opacity-20 text-[#F25790]' : 'hover:bg-white hover:bg-opacity-10'}`}
                  >
                    Notificações
                  </button>
                  <button 
                    onClick={() => setActiveTab('privacidade')}
                    className={`w-full text-left px-4 py-3 rounded-lg ${activeTab === 'privacidade' ? 'bg-[#F25790] bg-opacity-20 text-[#F25790]' : 'hover:bg-white hover:bg-opacity-10'}`}
                  >
                    Privacidade
                  </button>
                  <button 
                    onClick={() => setActiveTab('pagamento')}
                    className={`w-full text-left px-4 py-3 rounded-lg ${activeTab === 'pagamento' ? 'bg-[#F25790] bg-opacity-20 text-[#F25790]' : 'hover:bg-white hover:bg-opacity-10'}`}
                  >
                    Métodos de Pagamento
                  </button>
                  <button 
                    onClick={() => setActiveTab('seguranca')}
                    className={`w-full text-left px-4 py-3 rounded-lg ${activeTab === 'seguranca' ? 'bg-[#F25790] bg-opacity-20 text-[#F25790]' : 'hover:bg-white hover:bg-opacity-10'}`}
                  >
                    Segurança
                  </button>
                </div>
              </div>
              
              {/* Conteúdo principal */}
              <div className="flex-1">
                <div className="bg-black bg-opacity-70 rounded-lg p-6">
                  {activeTab === 'perfil' && (
                    <div>
                      <h2 className="text-xl font-bold mb-4">Informações do Perfil</h2>
                      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
                        <div className="w-24 h-24 rounded-full bg-gray-700 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-[#F25790] to-purple-600"></div>
                        </div>
                        <div>
                          <button className="btn-secondary mb-2">Alterar foto</button>
                          <p className="text-sm text-gray-400">JPG, PNG ou GIF. Tamanho máximo 2MB.</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block mb-1">Nome completo</label>
                          <input type="text" className="input-field" defaultValue="Jon Doe" />
                        </div>
                        <div>
                          <label className="block mb-1">Nome de usuário</label>
                          <input type="text" className="input-field" defaultValue="jondoe" />
                        </div>
                        <div>
                          <label className="block mb-1">E-mail</label>
                          <input type="email" className="input-field" defaultValue="jon.doe@exemplo.com" readOnly />
                          <p className="text-sm text-gray-400 mt-1">Para alterar seu e-mail, acesse a aba Segurança.</p>
                        </div>
                        <div>
                          <label className="block mb-1">Data de nascimento</label>
                          <input type="date" className="input-field" defaultValue="1990-01-01" />
                        </div>
                        <div>
                          <label className="block mb-1">Biografia</label>
                          <textarea 
                            className="input-field min-h-[100px]"
                            defaultValue="Olá! Sou usuário do Camera Real."
                          ></textarea>
                        </div>
                        
                        <div className="pt-4">
                          <button className="btn-primary">Salvar alterações</button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'notificacoes' && (
                    <div>
                      <h2 className="text-xl font-bold mb-4">Configurações de Notificações</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-3">E-mail</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <label htmlFor="email-marketing">Promoções e novidades</label>
                              <div className="relative inline-block w-12 h-6 rounded-full bg-gray-700">
                                <input type="checkbox" id="email-marketing" className="sr-only" defaultChecked />
                                <span className="block w-6 h-6 rounded-full bg-[#F25790] absolute left-0 transition-transform transform translate-x-6"></span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <label htmlFor="email-account">Alterações na conta</label>
                              <div className="relative inline-block w-12 h-6 rounded-full bg-gray-700">
                                <input type="checkbox" id="email-account" className="sr-only" defaultChecked />
                                <span className="block w-6 h-6 rounded-full bg-[#F25790] absolute left-0 transition-transform transform translate-x-6"></span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <label htmlFor="email-payments">Pagamentos e transações</label>
                              <div className="relative inline-block w-12 h-6 rounded-full bg-gray-700">
                                <input type="checkbox" id="email-payments" className="sr-only" defaultChecked />
                                <span className="block w-6 h-6 rounded-full bg-[#F25790] absolute left-0 transition-transform transform translate-x-6"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-3">Aplicativo e navegador</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <label htmlFor="push-all">Todas as notificações</label>
                              <div className="relative inline-block w-12 h-6 rounded-full bg-gray-700">
                                <input type="checkbox" id="push-all" className="sr-only" defaultChecked />
                                <span className="block w-6 h-6 rounded-full bg-[#F25790] absolute left-0 transition-transform transform translate-x-6"></span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <label htmlFor="push-models">Modelos online</label>
                              <div className="relative inline-block w-12 h-6 rounded-full bg-gray-700">
                                <input type="checkbox" id="push-models" className="sr-only" defaultChecked />
                                <span className="block w-6 h-6 rounded-full bg-[#F25790] absolute left-0 transition-transform transform translate-x-6"></span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <label htmlFor="push-chat">Mensagens de chat</label>
                              <div className="relative inline-block w-12 h-6 rounded-full bg-gray-700">
                                <input type="checkbox" id="push-chat" className="sr-only" defaultChecked />
                                <span className="block w-6 h-6 rounded-full bg-[#F25790] absolute left-0 transition-transform transform translate-x-6"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <button className="btn-primary">Salvar alterações</button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'privacidade' && (
                    <div>
                      <h2 className="text-xl font-bold mb-4">Configurações de Privacidade</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-3">Visibilidade do perfil</h3>
                          <div className="space-y-3">
                            <div>
                              <label className="block mb-1">Quem pode ver meu perfil</label>
                              <select className="input-field">
                                <option value="public">Todos os usuários</option>
                                <option value="following">Apenas modelos que sigo</option>
                                <option value="private">Somente eu</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-3">Histórico e dados</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <label htmlFor="history-watch">Salvar histórico de visualizações</label>
                              <div className="relative inline-block w-12 h-6 rounded-full bg-gray-700">
                                <input type="checkbox" id="history-watch" className="sr-only" defaultChecked />
                                <span className="block w-6 h-6 rounded-full bg-[#F25790] absolute left-0 transition-transform transform translate-x-6"></span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <label htmlFor="personalized">Personalização baseada no uso</label>
                              <div className="relative inline-block w-12 h-6 rounded-full bg-gray-700">
                                <input type="checkbox" id="personalized" className="sr-only" defaultChecked />
                                <span className="block w-6 h-6 rounded-full bg-[#F25790] absolute left-0 transition-transform transform translate-x-6"></span>
                              </div>
                            </div>
                            <div className="mt-4">
                              <button className="text-[#F25790] hover:underline">Limpar histórico de visualizações</button>
                            </div>
                            <div className="mt-2">
                              <button className="text-[#F25790] hover:underline">Fazer download dos meus dados</button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <button className="btn-primary">Salvar alterações</button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab !== 'perfil' && activeTab !== 'notificacoes' && activeTab !== 'privacidade' && (
                    <div className="py-12 text-center">
                      <div className="inline-block p-4 rounded-full bg-white bg-opacity-10 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-medium mb-2">Em desenvolvimento</h3>
                      <p className="text-gray-400">Esta seção está sendo implementada. Volte em breve!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
