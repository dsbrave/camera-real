import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CadastroModelo() {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    confirmEmail: '',
    dataNascimento: '',
    genero: '',
    documentoFrente: null,
    documentoVerso: null,
    fotoComDocumento: null,
    nomeUsuario: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const { name } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: e.target.files ? e.target.files[0] : null
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de cadastro de modelo
    console.log('Cadastro de modelo:', formData);
  };

  return (
    <>
      <Head>
        <title>Cadastro para Modelo - Camera Real</title>
        <meta name="description" content="Cadastre-se como modelo no Camera Real e comece a gerar rendimentos. Processo simples e seguro." />
      </Head>
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-10">
            <Link href="/" className="flex items-center">
              <Image 
                src="/icons/logo.svg" 
                alt="Camera Real" 
                width={140} 
                height={45} 
                priority
              />
            </Link>
            <h2 className="text-2xl text-[#F25790] font-bold">Cadastro para modelo</h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Coluna da esquerda com texto e imagem */}
            <div className="w-full md:w-1/2">
              <h1 className="text-4xl font-bold mb-4">
                Bem-vinda ao<br />
                <span className="text-[#F25790]">Camera Real</span>
              </h1>
              <p className="text-lg mb-6">
                Junte-se a nós e comece a gerar
                remuneração proporcional à sua
                quantidade de transmissões feitas.
              </p>
              
              <div className="h-96 rounded-lg overflow-hidden relative">
                <Image 
                  src="/images/model-signup.jpg" 
                  alt="Modelo Camera Real" 
                  fill 
                  className="object-cover rounded-lg"  
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-xl font-semibold text-white">Faça parte do nosso time de modelos e ganhe até R$ 20.000 por mês</p>
                </div>
              </div>
            </div>
            
            {/* Coluna da direita com formulário */}
            <div className="w-full md:w-1/2">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nomeCompleto" className="block text-sm text-[#F25790] mb-1">Nome completo</label>
                  <input 
                    type="text" 
                    id="nomeCompleto"
                    name="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] text-white"
                    placeholder="Escreva seu nome completo que consta em seus documentos" 
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm text-[#F25790] mb-1">E-mail</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] text-white"
                      placeholder="Escreva seu e-mail" 
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmEmail" className="block text-sm text-[#ff4d8d] mb-1">Confirmação do e-mail</label>
                    <input 
                      type="email" 
                      id="confirmEmail"
                      name="confirmEmail"
                      value={formData.confirmEmail}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-transparent border border-[#ff4d8d] rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff4d8d]"
                      placeholder="Escreva seu e-mail" 
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dataNascimento" className="block text-sm text-[#ff4d8d] mb-1">Data de nascimento</label>
                    <div className="relative">
                      <input 
                        type="date" 
                        id="dataNascimento"
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-transparent border border-[#ff4d8d] rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff4d8d] text-gray-300"
                        placeholder="Selecionar data" 
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-[#ff4d8d]">📅</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="genero" className="block text-sm text-[#ff4d8d] mb-1">Gênero</label>
                    <div className="relative">
                      <select 
                        id="genero"
                        name="genero"
                        value={formData.genero}
                        onChange={(e) => setFormData(prev => ({ ...prev, genero: e.target.value }))}
                        className="w-full px-3 py-2 bg-transparent border border-[#ff4d8d] rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff4d8d] appearance-none"
                        required
                      >
                        <option value="" disabled>Selecionar gênero</option>
                        <option value="feminino">Feminino</option>
                        <option value="masculino">Masculino</option>
                        <option value="outro">Outro</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-[#ff4d8d]">⌄</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="documentoFrente" className="block text-sm text-[#ff4d8d] mb-1">Documento frente</label>
                  <div className="w-full px-3 py-3 bg-transparent border border-[#ff4d8d] rounded-md cursor-pointer">
                    <div className="flex items-center">
                      <span className="text-[#ff4d8d] mr-2">📄</span>
                      <label htmlFor="documentoFrente" className="cursor-pointer text-sm">
                        Clique aqui para anexar o arquivo. As fotos devem estar legíveis e 
                        conter todas as informações do RG, CNH ou passaporte
                      </label>
                      <input 
                        type="file" 
                        id="documentoFrente"
                        name="documentoFrente"
                        onChange={handleFileChange}
                        className="hidden" 
                        accept="image/*"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="documentoVerso" className="block text-sm text-[#ff4d8d] mb-1">Documento verso</label>
                  <div className="w-full px-3 py-3 bg-transparent border border-[#ff4d8d] rounded-md cursor-pointer">
                    <div className="flex items-center">
                      <span className="text-[#ff4d8d] mr-2">📄</span>
                      <label htmlFor="documentoVerso" className="cursor-pointer text-sm">
                        Clique aqui para anexar o arquivo. As fotos devem estar legíveis e 
                        conter todas as informações do RG, CNH ou passaporte
                      </label>
                      <input 
                        type="file" 
                        id="documentoVerso"
                        name="documentoVerso"
                        onChange={handleFileChange}
                        className="hidden" 
                        accept="image/*"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="fotoComDocumento" className="block text-sm text-[#ff4d8d] mb-1">Foto com documento</label>
                  <div className="w-full px-3 py-3 bg-transparent border border-[#ff4d8d] rounded-md cursor-pointer">
                    <div className="flex items-center">
                      <span className="text-[#ff4d8d] mr-2">📷</span>
                      <label htmlFor="fotoComDocumento" className="cursor-pointer text-sm">
                        Clique aqui para anexar a foto: Faça uma foto segurando o
                        documento sem cobrir seu rosto.
                      </label>
                      <input 
                        type="file" 
                        id="fotoComDocumento"
                        name="fotoComDocumento"
                        onChange={handleFileChange}
                        className="hidden" 
                        accept="image/*"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="nomeUsuario" className="block text-sm text-[#ff4d8d] mb-1">Nome de usuário</label>
                  <input 
                    type="text" 
                    id="nomeUsuario"
                    name="nomeUsuario"
                    value={formData.nomeUsuario}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-transparent border border-[#ff4d8d] rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff4d8d]"
                    placeholder="Insira nome de usuário, este é o nome que ficará visível no site" 
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="senha" className="block text-sm text-[#ff4d8d] mb-1">Senha</label>
                  <input 
                    type="password" 
                    id="senha"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-transparent border border-[#ff4d8d] rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff4d8d]"
                    placeholder="Inserir senha" 
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmarSenha" className="block text-sm text-[#ff4d8d] mb-1">Repetir senha</label>
                  <input 
                    type="password" 
                    id="confirmarSenha"
                    name="confirmarSenha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-transparent border border-[#ff4d8d] rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff4d8d]"
                    placeholder="Inserir senha" 
                    required
                  />
                </div>
                
                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="w-full bg-[#F25790] hover:bg-[#d93d75] text-white py-3 px-6 rounded-full font-bold transition-colors duration-200"
                  >
                    Registrar
                  </button>
                  
                  <div className="text-center mt-4">
                    <p>
                      Já tem conta? <Link href="/login" className="text-[#ff4d8d]">Entre aqui</Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}
