import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Footer from '@/components/Footer';

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
      
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/high-resolution_studio_photo_of_a_confident_brazilian-inspired_model_wearing_an_elegant_black_lace__i7mo7j07sng27o0fv86l_2.png')",
            transform: 'scaleX(-1)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/90" style={{ transform: 'scaleX(-1)' }}></div>
        </div>
        
        <div className="relative z-10" style={{ transform: 'scaleX(-1)' }}>
          <div style={{ transform: 'scaleX(-1)' }}>
            {/* Logo */}
            <div className="absolute top-6 left-0 right-0 z-50">
              <div className="container mx-auto px-4">
                <Link href="/" className="block w-fit">
                  <Image 
                    src="/icons/logo.svg" 
                    alt="Camera Real" 
                    width={220} 
                    height={70}
                    className="h-16 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </Link>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex min-h-screen">
              {/* Left Column - Welcome Text */}
              <div className="w-1/2 flex flex-col justify-start items-center text-left pl-8 pr-8 pt-64">
                <div className="max-w-lg ml-16">
                  <h1 className="text-5xl font-bold mb-6 leading-tight">
                    Bem-vinda, ao<br />
                    <span className="text-[#F25790]">Camera Real.</span>
                  </h1>
                  <p className="text-xl leading-relaxed text-gray-200">
                    Junte-se a nós e comece a gerar<br/>
                    remuneração proporcional à sua<br/>
                    quantidade de transmissões feitas.
                  </p>
                </div>
              </div>
              
              {/* Right Column - Registration Form */}
              <div className="w-1/2 flex items-start justify-start pl-8 pr-16 relative pt-24 pb-20">
                <div className="w-full max-w-md relative z-10 bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <h2 className="text-2xl font-bold mb-4 text-[#F25790]">Cadastro para modelo</h2>
                  
                  {formError && (
                    <div className="bg-red-500 bg-opacity-20 border border-red-500 text-white p-3 rounded-lg mb-4 text-sm">
                      {formError}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Nome Completo */}
                    <div>
                      <label htmlFor="nomeCompleto" className="block text-sm font-medium mb-1 text-[#F25790]">Nome completo</label>
                      <input 
                        type="text" 
                        id="nomeCompleto"
                        name="nomeCompleto"
                        value={formData.nomeCompleto}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 bg-transparent border border-[#F25790] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm"
                        placeholder="Escreva seu nome completo que consta em seus documentos" 
                        required
                      />
                    </div>

                    {/* Email Row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1 text-[#F25790]">E-mail</label>
                        <input 
                          type="email" 
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 bg-transparent border border-[#F25790] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm"
                          placeholder="Escreva seu e-mail" 
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmEmail" className="block text-sm font-medium mb-1 text-[#F25790]">Confirmação do e-mail</label>
                        <input 
                          type="email" 
                          id="confirmEmail"
                          name="confirmEmail"
                          value={formData.confirmEmail}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 bg-transparent border border-[#F25790] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm"
                          placeholder="Escreva seu e-mail" 
                          required
                        />
                      </div>
                    </div>

                    {/* Data e Gênero Row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="dataNascimento" className="block text-sm font-medium mb-1 text-[#F25790]">Data de nascimento</label>
                        <div className="relative">
                          <input 
                            type="date" 
                            id="dataNascimento"
                            name="dataNascimento"
                            value={formData.dataNascimento}
                            onChange={handleChange}
                            className="w-full px-3 py-2.5 bg-transparent border border-[#F25790] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] text-white transition-all duration-200 text-sm"
                            placeholder="Selecionar data"
                            required
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="w-4 h-4 text-[#F25790]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="genero" className="block text-sm font-medium mb-1 text-[#F25790]">Gênero</label>
                        <div className="relative">
                          <select 
                            id="genero"
                            name="genero"
                            value={formData.genero}
                            onChange={handleChange}
                            className="w-full px-3 py-2.5 bg-transparent border border-[#F25790] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] text-white transition-all duration-200 appearance-none text-sm"
                            required
                          >
                            <option value="" className="bg-black">Selecionar gênero</option>
                            <option value="feminino" className="bg-black">Feminino</option>
                            <option value="masculino" className="bg-black">Masculino</option>
                            <option value="outro" className="bg-black">Outro</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="w-4 h-4 text-[#F25790]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Documento Frente */}
                    <div>
                      <label htmlFor="documentoFrente" className="block text-sm font-medium mb-1 text-[#F25790]">Documento frente</label>
                      <div className="border border-[#F25790] rounded-lg p-3 cursor-pointer hover:bg-[#F25790] hover:bg-opacity-10 transition-colors">
                        <input 
                          type="file" 
                          id="documentoFrente"
                          name="documentoFrente"
                          onChange={handleChange}
                          accept="image/*"
                          className="hidden"
                          required
                        />
                        <label htmlFor="documentoFrente" className="cursor-pointer flex items-center">
                          <svg className="w-4 h-4 text-[#F25790] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <div>
                            <span className="text-[#F25790] font-medium text-sm">Clique aqui para anexar o arquivo:</span>
                            <p className="text-xs text-gray-400 mt-0.5">As fotos devem estar legíveis e conter todas as informações do RG, CNH ou passaporte</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Documento Verso */}
                    <div>
                      <label htmlFor="documentoVerso" className="block text-sm font-medium mb-1 text-[#F25790]">Documento verso</label>
                      <div className="border border-[#F25790] rounded-lg p-3 cursor-pointer hover:bg-[#F25790] hover:bg-opacity-10 transition-colors">
                        <input 
                          type="file" 
                          id="documentoVerso"
                          name="documentoVerso"
                          onChange={handleChange}
                          accept="image/*"
                          className="hidden"
                          required
                        />
                        <label htmlFor="documentoVerso" className="cursor-pointer flex items-center">
                          <svg className="w-4 h-4 text-[#F25790] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <div>
                            <span className="text-[#F25790] font-medium text-sm">Clique aqui para anexar o arquivo:</span>
                            <p className="text-xs text-gray-400 mt-0.5">As fotos devem estar legíveis e conter todas as informações do RG, CNH ou passaporte</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Foto com Documento */}
                    <div>
                      <label htmlFor="fotoComDocumento" className="block text-sm font-medium mb-1 text-[#F25790]">Foto com documento</label>
                      <div className="border border-[#F25790] rounded-lg p-3 cursor-pointer hover:bg-[#F25790] hover:bg-opacity-10 transition-colors">
                        <input 
                          type="file" 
                          id="fotoComDocumento"
                          name="fotoComDocumento"
                          onChange={handleChange}
                          accept="image/*"
                          className="hidden"
                          required
                        />
                        <label htmlFor="fotoComDocumento" className="cursor-pointer flex items-center">
                          <svg className="w-4 h-4 text-[#F25790] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <div>
                            <span className="text-[#F25790] font-medium text-sm">Clique aqui para anexar a foto:</span>
                            <p className="text-xs text-gray-400 mt-0.5">Faça uma foto segurando o documento sem cobrir seu rosto.</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Nome de Usuário */}
                    <div>
                      <label htmlFor="nomeUsuario" className="block text-sm font-medium mb-1 text-[#F25790]">Nome de usuário</label>
                      <input 
                        type="text" 
                        id="nomeUsuario"
                        name="nomeUsuario"
                        value={formData.nomeUsuario}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 bg-transparent border border-[#F25790] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm"
                        placeholder="Insira nome de usuário, este é o nome que ficará visível no site" 
                        required
                      />
                    </div>

                    {/* Senha */}
                    <div>
                      <label htmlFor="senha" className="block text-sm font-medium mb-1 text-[#F25790]">Senha</label>
                      <input 
                        type="password" 
                        id="senha"
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 bg-transparent border border-[#F25790] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm"
                        placeholder="Inserir senha" 
                        required
                      />
                    </div>

                    {/* Repetir Senha */}
                    <div>
                      <label htmlFor="confirmSenha" className="block text-sm font-medium mb-1 text-[#F25790]">Repetir senha</label>
                      <input 
                        type="password" 
                        id="confirmSenha"
                        name="confirmSenha"
                        value={formData.confirmSenha}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 bg-transparent border border-[#F25790] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm"
                        placeholder="Inserir senha" 
                        required
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full bg-[#F25790] hover:bg-[#d93d75] text-white py-3 px-6 rounded-full mt-6 transition-all duration-300 font-medium text-base shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Registrando...
                        </span>
                      ) : 'Registrar'}
                    </button>
                    
                    <div className="text-center mt-4">
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
                  <h3 className="text-xl font-bold mb-2">Cadastro enviado com sucesso!</h3>
                  <p className="text-gray-300 mb-6">Seu cadastro está em análise. Você receberá um e-mail com o resultado em até 48 horas.</p>
                  <button 
                    onClick={() => setShowSuccessModal(false)}
                    className="bg-[#F25790] hover:bg-[#d93d75] text-white py-2 px-6 rounded-full transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer fora das transformações */}
      <Footer />
    </>
  );
}
