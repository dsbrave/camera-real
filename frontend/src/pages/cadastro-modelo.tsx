import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

export default function CadastroModelo() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    confirmEmail: '',
    dataNascimento: '',
    genero: '',
    documentoFrente: null as File | null,
    documentoVerso: null as File | null,
    fotoComDocumento: null as File | null,
    nomeUsuario: '',
    senha: '',
    confirmSenha: ''
  });
  
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const files = (e.target as HTMLInputElement).files;
      setFormData(prev => ({
        ...prev,
        [name]: files ? files[0] : null
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    // Validações
    if (formData.senha !== formData.confirmSenha) {
      setFormError('As senhas não coincidem.');
      return;
    }
    
    if (formData.email !== formData.confirmEmail) {
      setFormError('Os e-mails não coincidem.');
      return;
    }
    
    if (!formData.documentoFrente || !formData.documentoVerso || !formData.fotoComDocumento) {
      setFormError('Todos os documentos são obrigatórios.');
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
      
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>Cadastro para Modelo | Camera Real</title>
        <meta name="description" content="Cadastre-se como modelo na Camera Real e comece a gerar renda" />
      </Head>
      
      <div className="min-h-screen bg-black text-white relative overflow-hidden" style={{ backgroundImage: "url('/images/high-resolution_studio_photo_of_a_confident_brazilian-inspired_model_wearing_an_elegant_black_lace__i7mo7j07sng27o0fv86l_2.png')", backgroundSize: 'cover', backgroundPosition: 'center', transform: 'scaleX(-1)' }}>
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
                <div className="max-w-lg ml-4 sm:ml-8 lg:ml-12 xl:ml-20" style={{ marginTop: '-360px' }}>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
                    Bem-vindo(a) ao<br />
                    <span className="text-[#F25790]">Camera Real.</span>
                  </h1>
                  <p className="text-base sm:text-lg mb-6 lg:mb-8 leading-relaxed">
                    Junte-se a nós e comece a gerar remuneração proporcional à sua quantidade de transmissões feitas.
                  </p>
                </div>
              </div>
              
              {/* Right Column - Registration Form */}
              <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start p-4 sm:p-6 lg:p-8 xl:p-12 min-h-[50vh] lg:min-h-screen" style={{ marginTop: '-40px' }}>
                <div className="max-w-sm sm:max-w-md w-full lg:ml-4 xl:ml-8 bg-gradient-to-br from-black/80 via-black/70 to-black/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#F25790]">Cadastro para modelo</h2>
                  
                  {formError && (
                    <div className="bg-red-500 bg-opacity-20 border border-red-500 text-white p-3 rounded-lg mb-4 text-sm">
                      {formError}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    {/* Nome Completo */}
                    <div className="mb-2 sm:mb-3">
                      <label htmlFor="nomeCompleto" className="block text-xs sm:text-sm font-medium mb-1 text-[#F25790]">Nome completo</label>
                      <input 
                        type="text" 
                        id="nomeCompleto"
                        name="nomeCompleto"
                        value={formData.nomeCompleto}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm sm:text-base"
                        placeholder="Nome completo dos documentos" 
                        required
                      />
                    </div>

                    {/* Email Row - Compacto */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div>
                        <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1 text-[#F25790]">E-mail</label>
                        <input 
                          type="email" 
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm sm:text-base"
                          placeholder="Seu e-mail" 
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmEmail" className="block text-xs sm:text-sm font-medium mb-1 text-[#F25790]">Confirmar e-mail</label>
                        <input 
                          type="email" 
                          id="confirmEmail"
                          name="confirmEmail"
                          value={formData.confirmEmail}
                          onChange={handleChange}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm sm:text-base"
                          placeholder="Confirme o e-mail" 
                          required
                        />
                      </div>
                    </div>

                    {/* Data e Gênero Row - Compacto */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div>
                        <label htmlFor="dataNascimento" className="block text-xs sm:text-sm font-medium mb-1 text-[#F25790]">Data nascimento</label>
                        <input 
                          type="date" 
                          id="dataNascimento"
                          name="dataNascimento"
                          value={formData.dataNascimento}
                          onChange={handleChange}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white transition-all duration-200 text-sm sm:text-base"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="genero" className="block text-xs sm:text-sm font-medium mb-1 text-[#F25790]">Gênero</label>
                        <select 
                          id="genero"
                          name="genero"
                          value={formData.genero}
                          onChange={handleChange}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white transition-all duration-200 appearance-none text-sm sm:text-base"
                          required
                        >
                          <option value="" className="bg-black">Selecionar</option>
                          <option value="feminino" className="bg-black">Feminino</option>
                          <option value="masculino" className="bg-black">Masculino</option>
                          <option value="outro" className="bg-black">Outro</option>
                        </select>
                      </div>
                    </div>

                    {/* Documentos - Compactos */}
                    <div className="mb-2 sm:mb-3">
                      <label className="block text-xs sm:text-sm font-medium mb-1 text-[#F25790]">Documentos</label>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="border border-gray-700 rounded-lg p-2 cursor-pointer hover:border-[#F25790] transition-colors">
                          <input 
                            type="file" 
                            id="documentoFrente"
                            name="documentoFrente"
                            onChange={handleChange}
                            accept="image/*"
                            className="hidden"
                            required
                          />
                          <label htmlFor="documentoFrente" className="cursor-pointer flex items-center text-xs sm:text-sm">
                            <svg className="w-4 h-4 text-[#F25790] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-[#F25790]">Documento frente</span>
                          </label>
                        </div>
                        <div className="border border-gray-700 rounded-lg p-2 cursor-pointer hover:border-[#F25790] transition-colors">
                          <input 
                            type="file" 
                            id="documentoVerso"
                            name="documentoVerso"
                            onChange={handleChange}
                            accept="image/*"
                            className="hidden"
                            required
                          />
                          <label htmlFor="documentoVerso" className="cursor-pointer flex items-center text-xs sm:text-sm">
                            <svg className="w-4 h-4 text-[#F25790] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-[#F25790]">Documento verso</span>
                          </label>
                        </div>
                        <div className="border border-gray-700 rounded-lg p-2 cursor-pointer hover:border-[#F25790] transition-colors">
                          <input 
                            type="file" 
                            id="fotoComDocumento"
                            name="fotoComDocumento"
                            onChange={handleChange}
                            accept="image/*"
                            className="hidden"
                            required
                          />
                          <label htmlFor="fotoComDocumento" className="cursor-pointer flex items-center text-xs sm:text-sm">
                            <svg className="w-4 h-4 text-[#F25790] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-[#F25790]">Foto com documento</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Nome de Usuário */}
                    <div className="mb-2 sm:mb-3">
                      <label htmlFor="nomeUsuario" className="block text-xs sm:text-sm font-medium mb-1 text-[#F25790]">Nome de usuário</label>
                      <input 
                        type="text" 
                        id="nomeUsuario"
                        name="nomeUsuario"
                        value={formData.nomeUsuario}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm sm:text-base"
                        placeholder="Nome visível no site" 
                        required
                      />
                    </div>

                    {/* Senha e Confirmar Senha - Compacto */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-5">
                      <div>
                        <label htmlFor="senha" className="block text-xs sm:text-sm font-medium mb-1 text-[#F25790]">Senha</label>
                        <input 
                          type="password" 
                          id="senha"
                          name="senha"
                          value={formData.senha}
                          onChange={handleChange}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm sm:text-base"
                          placeholder="Criar senha" 
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmSenha" className="block text-xs sm:text-sm font-medium mb-1 text-[#F25790]">Repetir senha</label>
                        <input 
                          type="password" 
                          id="confirmSenha"
                          name="confirmSenha"
                          value={formData.confirmSenha}
                          onChange={handleChange}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm sm:text-base"
                          placeholder="Confirmar senha" 
                          required
                        />
                      </div>
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
                      ) : 'Registrar'}
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
                <div className="bg-[#1A1A1A] p-6 sm:p-8 rounded-xl max-w-md w-full text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 sm:w-10 sm:h-10 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 break-words truncate">Cadastro enviado com sucesso!</h3>
                  <p className="text-gray-300 mb-6 text-sm sm:text-base break-words truncate">Seu cadastro está em análise. Você receberá um e-mail com o resultado em até 48 horas.</p>
                  <button 
                    onClick={() => setShowSuccessModal(false)}
                    className="bg-[#F25790] hover:bg-[#d93d75] text-white py-2 sm:py-3 px-6 sm:px-8 rounded-full transition-colors text-sm sm:text-base"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
}
