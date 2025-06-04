import { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Suporte() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensagem enviada! Nossa equipe entrará em contato em breve.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'medium'
    });
    setSelectedFile(null);
  };

  return (
    <>
      <Head>
        <title>Suporte - Camera Real</title>
        <meta name="description" content="Entre em contato com nossa equipe de suporte." />
      </Head>
      
      <div className="min-h-screen bg-black text-white">
        <Header />
        
        
        <div className="container mx-auto px-4 pt-0 mt-0 pb-8 content-after-header">
          <div className="max-w-2xl mx-auto">
            {/* Header da página */}
            <div className="text-center mb-10 flex flex-col items-center">
  <div className="flex items-center justify-center mb-2">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mr-2">
    <g clipPath="url(#clip0_17_18133)">
      <path d="M21 12.22C21 6.73 16.74 3 12 3C7.31 3 3 6.65 3 12.28C2.4 12.62 2 13.26 2 14V16C2 17.1 2.9 18 4 18C4.55 18 5 17.55 5 17V12.19C5 8.36 7.95 5.01 11.78 4.9C15.74 4.78 19 7.96 19 11.9V19H12C11.45 19 11 19.45 11 20C11 20.55 11.45 21 12 21H19C20.1 21 21 20.1 21 19V17.78C21.59 17.47 22 16.86 22 16.14V13.84C22 13.14 21.59 12.53 21 12.22Z" fill="#F25790"/>
      <path d="M9 14C9.55228 14 10 13.5523 10 13C10 12.4477 9.55228 12 9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14Z" fill="#F25790"/>
      <path d="M15 14C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12C14.4477 12 14 12.4477 14 13C14 13.5523 14.4477 14 15 14Z" fill="#F25790"/>
      <path d="M18 11.03C17.52 8.18 15.04 6 12.05 6C9.01997 6 5.75997 8.51 6.01997 12.45C8.48997 11.44 10.35 9.24 10.88 6.56C12.19 9.19 14.88 11 18 11.03Z" fill="#F25790"/>
    </g>
    <defs>
      <clipPath id="clip0_17_18133">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
  <h1 className="text-3xl md:text-4xl font-bold text-white">
    Suporte <span className="text-[#F25790]">Camera Real</span>
  </h1>
</div>
              <p className="text-white text-lg">
                Nossa equipe está aqui para te ajudar. Envie sua mensagem!
              </p>
            </div>
            
            {/* Formulário de contato */}
            <div className="bg-black bg-opacity-60 border border-gray-800 rounded-2xl p-8 shadow-2xl backdrop-blur-lg transition-all duration-200 focus-within:border-[#F25790]">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F25790] transition-colors duration-200"
                      placeholder="Seu nome"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F25790] transition-colors duration-200"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Assunto *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F25790] transition-colors duration-200"
                      placeholder="Assunto da mensagem"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-2">
                      Prioridade
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#F25790] transition-colors duration-200"
                    >
                      <option value="low">Baixa</option>
                      <option value="medium">Média</option>
                      <option value="high">Alta</option>
                      <option value="urgent">Urgente</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#F25790] transition-colors duration-200 resize-none"
                    placeholder="Descreva sua dúvida ou problema em detalhes..."
                  />
                </div>
                
                <div>
                  <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-2">
                    Anexar Documento ou Imagem
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="file"
                      onChange={handleFileChange}
                      accept="image/*,.pdf,.doc,.docx,.txt"
                      className="hidden"
                    />
                    <label
                      htmlFor="file"
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-gray-400 hover:text-white hover:border-[#F25790] transition-colors duration-200 cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span>
                        {selectedFile ? selectedFile.name : 'Clique para selecionar um arquivo'}
                      </span>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Formatos aceitos: JPG, PNG, PDF, DOC, DOCX, TXT (máx. 10MB)
                  </p>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#F25790] hover:bg-[#d93d75] text-white font-bold py-3 rounded-full transition-colors duration-200 text-lg shadow-md"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>
            
            {/* Informações de contato */}
            <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
              <div className="rounded-xl p-4">
                <div className="flex items-center justify-center mx-auto mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-[#F25790]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">E-mail</h3>
                <p className="text-gray-400 text-sm">suporte@camerareal.com</p>
              </div>
              
              <div className="rounded-xl p-4">
                <div className="flex items-center justify-center mx-auto mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-[#F25790]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Horário</h3>
                <p className="text-gray-400 text-sm">24h por dia, 7 dias por semana</p>
              </div>
              
              <div className="rounded-xl p-4">
                <div className="flex items-center justify-center mx-auto mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-[#F25790]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Resposta</h3>
                <p className="text-gray-400 text-sm">Em até 24 horas</p>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}