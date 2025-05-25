import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Cadastro() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    isAdult: false,
    agreeTerms: false
  });
  
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    // Validações
    if (formData.password !== formData.confirmPassword) {
      setFormError('As senhas não coincidem.');
      return;
    }
    
    if (formData.email !== formData.confirmEmail) {
      setFormError('Os e-mails não coincidem.');
      return;
    }
    
    if (!formData.isAdult) {
      setFormError('Você precisa confirmar que tem mais de 18 anos.');
      return;
    }
    
    // Simulação de envio para o backend
    setIsSubmitting(true);
    
    setTimeout(() => {
      // Verificar se o email já está cadastrado (simulação)
      const emailExists = Math.random() > 0.7;
      
      if (emailExists) {
        setErrorMessage('Este e-mail já está cadastrado em nosso sistema.');
        setShowErrorModal(true);
        setIsSubmitting(false);
        return;
      }
      
      // Armazenar dados do usuário no localStorage para simular autenticação
      localStorage.setItem('user', JSON.stringify({
        name: formData.username,
        email: formData.email,
        isLoggedIn: true,
        isModel: false,
        credits: 100, // Créditos iniciais de boas-vindas
        createdAt: new Date().toISOString()
      }));
      
      setIsSubmitting(false);
      setShowSuccessModal(true);
      
      // Redirecionar para a página inicial após 3 segundos
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>Cadastro | Camera Real</title>
        <meta name="description" content="Cadastre-se na Camera Real e acesse nossa plataforma de videochat" />
      </Head>
      
      <div className="min-h-screen bg-black text-white relative overflow-hidden" style={{ backgroundImage: "url('/images/high-resolution_studio_photo_of_a_confident_brazilian-inspired_model_wearing_an_elegant_black_lace__xju79gu63twrr4y7wwl6_0.png')", backgroundSize: 'cover', backgroundPosition: 'center', transform: 'scaleX(-1)' }}>
        {/* Overlay padronizado mais escuro */}
        <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>
        <div className="relative z-10" style={{ transform: 'scaleX(-1)' }}>
          {/* Logo posicionada como no header original, mas sem tarja */}
          <div className="py-3 md:py-6 w-full z-50">
            <div className="container mx-auto px-4 flex justify-between items-center">
              <div className="logo">
                <Link href="/">
                  <Image 
                    src="/icons/logo.svg" 
                    alt="Camera Real" 
                    width={220} 
                    height={70}
                    className="h-10 sm:h-12 md:h-16 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </Link>
              </div>
              <div className="hidden lg:block">
                <Link href="/" className="text-[#F25790] hover:underline text-xs sm:text-sm font-medium">
                  ← Voltar para home
                </Link>
              </div>
            </div>
          </div>
          
          <div className="lg:hidden absolute top-3 sm:top-4 md:top-5 right-0 p-3 sm:p-5 z-50">
            <Link href="/" className="text-[#F25790] hover:underline text-xs sm:text-sm font-medium block">
              ← Voltar para home
            </Link>
          </div>
          
          {/* Main Content */}
          <div className="flex flex-col lg:flex-row min-h-screen pt-0 lg:pt-0">
              {/* Left Column - Welcome Text with Background Image */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-left p-6 sm:p-8 lg:p-12 xl:p-16 z-10 relative min-h-[50vh] lg:min-h-screen">
                <div className="max-w-lg ml-4 sm:ml-8 lg:ml-12 xl:ml-20" style={{ marginTop: '-280px' }}>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
                    Bem-vindo(a) ao<br />
                    <span className="text-[#F25790]">Camera Real.</span>
                  </h1>
                  <p className="text-base sm:text-lg mb-6 lg:mb-8 leading-relaxed">
                    Conheça nossa plataforma inovadora de chat por vídeo.<br/>
                    Em apenas um clique descubra um novo jeito de interagir.<br/>
                    Junte-se a nós e conecte-se de forma genuína.
                  </p>
                </div>
              </div>
              
              {/* Right Column - Registration Form */}
              <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start p-4 sm:p-6 lg:p-8 xl:p-12 min-h-[50vh] lg:min-h-screen" style={{ marginTop: '-40px' }}>
                <div className="max-w-sm sm:max-w-md w-full lg:ml-4 xl:ml-8 bg-gradient-to-br from-black/80 via-black/70 to-black/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#F25790]">Cadastro</h2>
                  
                  {formError && (
                    <div className="bg-red-500 bg-opacity-20 border border-red-500 text-white p-3 rounded-lg mb-4 text-sm">
                      {formError}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    <div className="mb-2 sm:mb-3">
                      <label htmlFor="username" className="block text-xs sm:text-sm font-medium mb-1 text-[#F25790]">Nome de usuário</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input 
                          type="text" 
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          className="w-full pl-8 sm:pl-10 px-3 sm:px-4 py-2.5 sm:py-3 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm sm:text-base"
                          placeholder="Escolha um nome de usuário" 
                          required
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Este é o nome que ficará visível no site</p>
                    </div>
                    
                    <div className="mb-2 sm:mb-3">
                      <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1 text-[#F25790]">E-mail</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <input 
                          type="email" 
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-8 sm:pl-10 px-3 sm:px-4 py-2.5 sm:py-3 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm sm:text-base"
                          placeholder="Seu endereço de e-mail" 
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-2 sm:mb-3">
                      <label htmlFor="confirmEmail" className="block text-xs sm:text-sm font-medium mb-1 text-[#F25790]">Confirme seu e-mail</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input 
                          type="email" 
                          id="confirmEmail"
                          name="confirmEmail"
                          value={formData.confirmEmail}
                          onChange={handleChange}
                          className="w-full pl-8 sm:pl-10 px-3 sm:px-4 py-2.5 sm:py-3 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm sm:text-base"
                          placeholder="Digite seu e-mail novamente" 
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-2 sm:mb-3">
                      <label htmlFor="password" className="block text-xs sm:text-sm font-medium mb-1 text-[#F25790]">Senha</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input 
                          type="password" 
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full pl-8 sm:pl-10 px-3 sm:px-4 py-2.5 sm:py-3 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm sm:text-base"
                          placeholder="Crie uma senha segura" 
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4 sm:mb-5">
                      <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-medium mb-1 text-[#F25790]">Confirme sua senha</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input 
                          type="password" 
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full pl-8 sm:pl-10 px-3 sm:px-4 py-2.5 sm:py-3 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm sm:text-base"
                          placeholder="Digite sua senha novamente" 
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2 mb-4 sm:mb-6">
                      <div className="flex items-center h-5 mt-0.5">
                        <input 
                          type="checkbox" 
                          id="isAdult" 
                          name="isAdult"
                          checked={formData.isAdult}
                          onChange={handleChange}
                          className="h-4 w-4 sm:h-5 sm:w-5 text-[#F25790] focus:ring-[#F25790] border-gray-600 rounded accent-[#F25790]"
                          required
                        />
                      </div>
                      <label htmlFor="isAdult" className="text-xs sm:text-sm text-gray-300">
                        <span className="block font-medium">Confirmo que possuo 18 anos ou mais.</span>
                        <span className="block mt-1">Ao criar sua conta, você concorda com nossos <Link href="/termos-condicoes" className="text-[#F25790] hover:underline">Termos e Condições</Link>.</span>
                      </label>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full bg-[#F25790] hover:bg-[#d93d75] text-white py-3 sm:py-4 px-4 sm:px-6 rounded-full mt-4 sm:mt-6 transition-all duration-300 font-medium text-base sm:text-lg shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Registrando...
                        </span>
                      ) : 'Registre-se agora'}
                    </button>
                    
                    <div className="text-center mt-3 sm:mt-4">
                      <p className="text-sm">
                        Já tem conta? <Link href="/login" className="text-[#F25790] hover:underline">Entre aqui</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
          </div>
          {/* Success Modal */}
          {showSuccessModal && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
              <div className="bg-[#1A1A1A] p-8 rounded-xl max-w-md w-full text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Cadastro realizado com sucesso!</h3>
                <p className="text-gray-300 mb-6">Bem-vindo(a) à Camera Real! Você será redirecionado para seu painel em instantes.</p>
                <button 
                  onClick={() => setShowSuccessModal(false)}
                  className="bg-[#F25790] hover:bg-[#d93d75] text-white py-2 px-6 rounded-full transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
          
          {/* Error Modal */}
          {showErrorModal && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
              <div className="bg-[#1A1A1A] p-8 rounded-xl max-w-md w-full text-center">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Erro no cadastro</h3>
                <p className="text-gray-300 mb-6">{errorMessage}</p>
                <button 
                  onClick={() => setShowErrorModal(false)}
                  className="bg-[#F25790] hover:bg-[#d93d75] text-white py-2 px-6 rounded-full transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
