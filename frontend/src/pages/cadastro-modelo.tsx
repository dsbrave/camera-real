import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function CadastroModelo() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Dados pessoais
    nomeCompleto: '',
    nomeArtistico: '',
    email: '',
    confirmarEmail: '',
    telefone: '',
    dataNascimento: '',
    genero: '',
    orientacao: '',
    etnia: '',
    tipoCorpo: '',
    cidade: '',
    estado: '',
    cep: '',
    endereco: '',
    // Dados profissionais
    experiencia: '',
    idiomas: '',
    apresentacao: '',
    // Documentos
    documentoTipo: '',
    documentoNumero: '',
    documentoFoto: null,
    documentoVerso: null,
    selfieDocumento: null,
    fotoRosto: null,
    // Conta
    senha: '',
    confirmarSenha: '',
    // Termos
    aceitaTermos: false,
    aceitaTermosModelo: false,
    confirmaIdade: false,
    aceitaPrivacidade: false
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Limpar erro específico quando campo é alterado
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: {[key: string]: string} = {};

    if (step === 1) {
      if (!formData.nomeCompleto) newErrors.nomeCompleto = 'Nome completo é obrigatório';
      if (!formData.nomeArtistico) newErrors.nomeArtistico = 'Nome artístico é obrigatório';
      if (!formData.email) newErrors.email = 'E-mail é obrigatório';
      if (!formData.confirmarEmail) newErrors.confirmarEmail = 'Confirme o e-mail';
      if (formData.email !== formData.confirmarEmail) newErrors.confirmarEmail = 'E-mails não coincidem';
      if (!formData.telefone) newErrors.telefone = 'Telefone é obrigatório';
      if (!formData.dataNascimento) newErrors.dataNascimento = 'Data de nascimento é obrigatória';
      
      // Validar idade mínima
      const hoje = new Date();
      const nascimento = new Date(formData.dataNascimento);
      const idade = hoje.getFullYear() - nascimento.getFullYear();
      if (idade < 18) newErrors.dataNascimento = 'Você deve ter pelo menos 18 anos';
    }

    if (step === 2) {
      if (!formData.genero) newErrors.genero = 'Gênero é obrigatório';
      if (!formData.orientacao) newErrors.orientacao = 'Orientação sexual é obrigatória';
      if (!formData.cidade) newErrors.cidade = 'Cidade é obrigatória';
      if (!formData.estado) newErrors.estado = 'Estado é obrigatório';
      if (!formData.cep) newErrors.cep = 'CEP é obrigatório';
      if (!formData.endereco) newErrors.endereco = 'Endereço é obrigatório';
    }

    if (step === 3) {
      if (!formData.documentoTipo) newErrors.documentoTipo = 'Tipo de documento é obrigatório';
      if (!formData.documentoNumero) newErrors.documentoNumero = 'Número do documento é obrigatório';
      if (!formData.documentoFoto) newErrors.documentoFoto = 'Foto do documento é obrigatória';
      if (!formData.documentoVerso) newErrors.documentoVerso = 'Foto do verso do documento é obrigatória';
      if (!formData.selfieDocumento) newErrors.selfieDocumento = 'Selfie com documento é obrigatória';
      if (!formData.fotoRosto) newErrors.fotoRosto = 'Foto do rosto é obrigatória';
    }

    if (step === 4) {
      if (!formData.senha) newErrors.senha = 'Senha é obrigatória';
      if (formData.senha.length < 6) newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
      if (!formData.confirmarSenha) newErrors.confirmarSenha = 'Confirme a senha';
      if (formData.senha !== formData.confirmarSenha) newErrors.confirmarSenha = 'Senhas não coincidem';
      if (!formData.aceitaTermos) newErrors.aceitaTermos = 'Você deve aceitar os termos gerais';
      if (!formData.aceitaTermosModelo) newErrors.aceitaTermosModelo = 'Você deve aceitar os termos para modelos';
      if (!formData.confirmaIdade) newErrors.confirmaIdade = 'Você deve confirmar que tem mais de 18 anos';
      if (!formData.aceitaPrivacidade) newErrors.aceitaPrivacidade = 'Você deve aceitar a política de privacidade';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    
    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccess(true);
      
      // Redirecionar após 3 segundos
      setTimeout(() => {
        router.push('/login');
      }, 3000);
      
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setErrorMessage('Erro ao processar cadastro. Tente novamente.');
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-6">
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
              step <= currentStep 
                ? 'bg-[#F25790] text-white' 
                : 'bg-gray-700 text-gray-400'
            }`}>
              {step}
            </div>
            {step < 4 && (
              <div className={`w-8 h-0.5 ml-1 ${
                step < currentStep ? 'bg-[#F25790]' : 'bg-gray-700'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium mb-1 text-[#F25790]">Nome Completo *</label>
        <input
          type="text"
          name="nomeCompleto"
          value={formData.nomeCompleto}
          onChange={handleChange}
          className="w-full px-3 py-2.5 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm"
          placeholder="Seu nome completo"
        />
        {errors.nomeCompleto && <p className="text-red-500 text-xs mt-1">{errors.nomeCompleto}</p>}
      </div>

      <div>
        <label className="block text-xs font-medium mb-1 text-[#F25790]">Nome Artístico *</label>
        <input
          type="text"
          name="nomeArtistico"
          value={formData.nomeArtistico}
          onChange={handleChange}
          className="w-full px-3 py-2.5 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm"
          placeholder="Como você quer ser chamada(o)"
        />
        {errors.nomeArtistico && <p className="text-red-500 text-xs mt-1">{errors.nomeArtistico}</p>}
      </div>

      <div>
        <label className="block text-xs font-medium mb-1 text-[#F25790]">E-mail *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2.5 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm"
          placeholder="seu@email.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-xs font-medium mb-1 text-[#F25790]">Confirmar E-mail *</label>
        <input
          type="email"
          name="confirmarEmail"
          value={formData.confirmarEmail}
          onChange={handleChange}
          className="w-full px-3 py-2.5 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm"
          placeholder="Confirme seu e-mail"
        />
        {errors.confirmarEmail && <p className="text-red-500 text-xs mt-1">{errors.confirmarEmail}</p>}
      </div>

      <div>
        <label className="block text-xs font-medium mb-1 text-[#F25790]">Telefone/WhatsApp *</label>
        <input
          type="tel"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          className="w-full px-3 py-2.5 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm"
          placeholder="(11) 99999-9999"
        />
        {errors.telefone && <p className="text-red-500 text-xs mt-1">{errors.telefone}</p>}
      </div>

      <div>
        <label className="block text-xs font-medium mb-1 text-[#F25790]">Data de Nascimento *</label>
        <input
          type="date"
          name="dataNascimento"
          value={formData.dataNascimento}
          onChange={handleChange}
          className="w-full px-3 py-2.5 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm"
        />
        {errors.dataNascimento && <p className="text-red-500 text-xs mt-1">{errors.dataNascimento}</p>}
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-2 bg-[#F25790] text-white rounded-lg hover:bg-[#d93d75] transition-colors text-sm"
        >
          Próximo
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1 text-[#F25790]">Gênero *</label>
          <select
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            className="w-full px-3 py-2.5 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white text-sm"
          >
            <option value="">Selecione</option>
            <option value="feminino">Feminino</option>
            <option value="masculino">Masculino</option>
            <option value="trans-mtf">Trans (M para F)</option>
            <option value="trans-ftm">Trans (F para M)</option>
            <option value="nao-binario">Não-binário</option>
          </select>
          {errors.genero && <p className="text-red-500 text-xs mt-1">{errors.genero}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#F25790]">Orientação Sexual *</label>
          <select
            name="orientacao"
            value={formData.orientacao}
            onChange={handleChange}
            className="w-full px-3 py-2.5 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white text-sm"
          >
            <option value="">Selecione</option>
            <option value="heterossexual">Heterossexual</option>
            <option value="homossexual">Homossexual</option>
            <option value="bissexual">Bissexual</option>
            <option value="pansexual">Pansexual</option>
          </select>
          {errors.orientacao && <p className="text-red-500 text-xs mt-1">{errors.orientacao}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1 text-[#F25790]">Etnia</label>
          <select
            name="etnia"
            value={formData.etnia}
            onChange={handleChange}
            className="w-full px-3 py-2.5 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white text-sm"
          >
            <option value="">Selecione</option>
            <option value="branca">Branca</option>
            <option value="preta">Preta</option>
            <option value="parda">Parda</option>
            <option value="amarela">Amarela</option>
            <option value="indigena">Indígena</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#F25790]">Tipo de Corpo</label>
          <select
            name="tipoCorpo"
            value={formData.tipoCorpo}
            onChange={handleChange}
            className="w-full px-3 py-2.5 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white text-sm"
          >
            <option value="">Selecione</option>
            <option value="magra">Magra</option>
            <option value="atletica">Atlética</option>
            <option value="media">Média</option>
            <option value="curvilinea">Curvilínea</option>
            <option value="plus-size">Plus Size</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium mb-1 text-[#F25790]">Cidade *</label>
        <input
          type="text"
          name="cidade"
          value={formData.cidade}
          onChange={handleChange}
          className="w-full px-3 py-2.5 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm"
          placeholder="Sua cidade"
        />
        {errors.cidade && <p className="text-red-500 text-xs mt-1">{errors.cidade}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1 text-[#F25790]">Estado *</label>
          <input
            type="text"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className="w-full px-3 py-2.5 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm"
            placeholder="Seu estado"
          />
          {errors.estado && <p className="text-red-500 text-xs mt-1">{errors.estado}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#F25790]">CEP *</label>
          <input
            type="text"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            className="w-full px-3 py-2.5 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm"
            placeholder="00000-000"
          />
          {errors.cep && <p className="text-red-500 text-xs mt-1">{errors.cep}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium mb-1 text-[#F25790]">Endereço *</label>
        <input
          type="text"
          name="endereco"
          value={formData.endereco}
          onChange={handleChange}
          className="w-full px-3 py-2.5 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm"
          placeholder="Rua, número, bairro"
        />
        {errors.endereco && <p className="text-red-500 text-xs mt-1">{errors.endereco}</p>}
      </div>

      <div>
        <label className="block text-xs font-medium mb-1 text-[#F25790]">Apresentação</label>
        <textarea
          name="apresentacao"
          value={formData.apresentacao}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2.5 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm"
          placeholder="Conte um pouco sobre você (opcional)"
        />
      </div>

      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-2 bg-[#F25790] text-white rounded-lg hover:bg-[#d93d75] transition-colors text-sm"
        >
          Próximo
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-3">
      <div className="bg-yellow-900/20 border border-yellow-500 rounded-lg p-3 mb-4">
        <p className="text-yellow-400 text-xs">
          <strong>Importante:</strong> Todos os documentos são obrigatórios para verificação de identidade e idade.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1 text-[#F25790]">Tipo de Documento *</label>
          <select
            name="documentoTipo"
            value={formData.documentoTipo}
            onChange={handleChange}
            className="w-full px-3 py-2.5 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white text-sm"
          >
            <option value="">Selecione</option>
            <option value="rg">RG</option>
            <option value="cnh">CNH</option>
            <option value="passaporte">Passaporte</option>
          </select>
          {errors.documentoTipo && <p className="text-red-500 text-xs mt-1">{errors.documentoTipo}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#F25790]">Número do Documento *</label>
          <input
            type="text"
            name="documentoNumero"
            value={formData.documentoNumero}
            onChange={handleChange}
            className="w-full px-3 py-2.5 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm"
            placeholder="Número do documento"
          />
          {errors.documentoNumero && <p className="text-red-500 text-xs mt-1">{errors.documentoNumero}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1 text-[#F25790]">Frente do Documento *</label>
          <input
            type="file"
            name="documentoFoto"
            onChange={handleChange}
            accept="image/*"
            className="w-full px-3 py-2.5 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white text-sm file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-[#F25790] file:text-white"
          />
          {errors.documentoFoto && <p className="text-red-500 text-xs mt-1">{errors.documentoFoto}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#F25790]">Verso do Documento *</label>
          <input
            type="file"
            name="documentoVerso"
            onChange={handleChange}
            accept="image/*"
            className="w-full px-3 py-2.5 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white text-sm file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-[#F25790] file:text-white"
          />
          {errors.documentoVerso && <p className="text-red-500 text-xs mt-1">{errors.documentoVerso}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1 text-[#F25790]">Selfie com Documento *</label>
          <input
            type="file"
            name="selfieDocumento"
            onChange={handleChange}
            accept="image/*"
            className="w-full px-3 py-2.5 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white text-sm file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-[#F25790] file:text-white"
          />
          {errors.selfieDocumento && <p className="text-red-500 text-xs mt-1">{errors.selfieDocumento}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#F25790]">Foto do Rosto *</label>
          <input
            type="file"
            name="fotoRosto"
            onChange={handleChange}
            accept="image/*"
            className="w-full px-3 py-2.5 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white text-sm file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-[#F25790] file:text-white"
          />
          {errors.fotoRosto && <p className="text-red-500 text-xs mt-1">{errors.fotoRosto}</p>}
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-3">
        <h3 className="text-blue-400 font-medium mb-1 text-xs">Dicas para fotos de qualidade:</h3>
        <ul className="text-blue-300 text-xs space-y-1">
          <li>• Use boa iluminação</li>
          <li>• Certifique-se de que as informações estão legíveis</li>
          <li>• Evite reflexos ou sombras</li>
          <li>• Na selfie, mantenha rosto e documento visíveis</li>
        </ul>
      </div>

      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-2 bg-[#F25790] text-white rounded-lg hover:bg-[#d93d75] transition-colors text-sm"
        >
          Próximo
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1 text-[#F25790]">Senha *</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            className="w-full px-3 py-2.5 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm"
            placeholder="Mínimo 6 caracteres"
          />
          {errors.senha && <p className="text-red-500 text-xs mt-1">{errors.senha}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-[#F25790]">Confirmar Senha *</label>
          <input
            type="password"
            name="confirmarSenha"
            value={formData.confirmarSenha}
            onChange={handleChange}
            className="w-full px-3 py-2.5 bg-black bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F25790] focus:border-[#F25790] text-white placeholder-gray-400 transition-all duration-200 text-sm"
            placeholder="Confirme sua senha"
          />
          {errors.confirmarSenha && <p className="text-red-500 text-xs mt-1">{errors.confirmarSenha}</p>}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            name="confirmaIdade"
            checked={formData.confirmaIdade}
            onChange={handleChange}
            className="mt-1 w-4 h-4 text-[#F25790] rounded focus:ring-[#F25790] accent-[#F25790]"
          />
          <label className="text-xs text-gray-300">
            Confirmo que tenho mais de 18 anos de idade *
          </label>
        </div>
        {errors.confirmaIdade && <p className="text-red-500 text-xs">{errors.confirmaIdade}</p>}

        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            name="aceitaTermos"
            checked={formData.aceitaTermos}
            onChange={handleChange}
            className="mt-1 w-4 h-4 text-[#F25790] rounded focus:ring-[#F25790] accent-[#F25790]"
          />
          <label className="text-xs text-gray-300">
            Li e aceito os <Link href="/termos" className="text-[#F25790] hover:underline">Termos de Uso</Link> *
          </label>
        </div>
        {errors.aceitaTermos && <p className="text-red-500 text-xs">{errors.aceitaTermos}</p>}

        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            name="aceitaTermosModelo"
            checked={formData.aceitaTermosModelo}
            onChange={handleChange}
            className="mt-1 w-4 h-4 text-[#F25790] rounded focus:ring-[#F25790] accent-[#F25790]"
          />
          <label className="text-xs text-gray-300">
            Li e aceito os <Link href="/termos-modelo" className="text-[#F25790] hover:underline">Termos para Modelos</Link> *
          </label>
        </div>
        {errors.aceitaTermosModelo && <p className="text-red-500 text-xs">{errors.aceitaTermosModelo}</p>}

        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            name="aceitaPrivacidade"
            checked={formData.aceitaPrivacidade}
            onChange={handleChange}
            className="mt-1 w-4 h-4 text-[#F25790] rounded focus:ring-[#F25790] accent-[#F25790]"
          />
          <label className="text-xs text-gray-300">
            Li e aceito a <Link href="/privacidade" className="text-[#F25790] hover:underline">Política de Privacidade</Link> *
          </label>
        </div>
        {errors.aceitaPrivacidade && <p className="text-red-500 text-xs">{errors.aceitaPrivacidade}</p>}
      </div>

      <div className="bg-green-900/20 border border-green-500 rounded-lg p-3">
        <h3 className="text-green-400 font-medium mb-1 text-xs">Próximos passos:</h3>
        <ul className="text-green-300 text-xs space-y-1">
          <li>• Verificação de documentos em até 48 horas</li>
          <li>• E-mail de confirmação será enviado</li>
          <li>• Acesso ao painel após aprovação</li>
        </ul>
      </div>

      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
        >
          Anterior
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-[#F25790] text-white rounded-lg hover:bg-[#d93d75] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {isSubmitting ? 'Cadastrando...' : 'Finalizar'}
        </button>
      </div>
    </div>
  );

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
        <div className="bg-[#1A1A1A] p-8 rounded-xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-white">Cadastro Realizado!</h2>
          <p className="text-gray-400 mb-4">
            Seu cadastro foi enviado com sucesso. Verificaremos seus documentos e entraremos em contato em até 48 horas.
          </p>
          <p className="text-sm text-gray-500">
            Redirecionando para a página de login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Cadastro de Modelo | Camera Real</title>
        <meta name="description" content="Torne-se um modelo da Camera Real" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-black text-white relative overflow-hidden" style={{ backgroundImage: "url('/images/high-resolution_studio_photo_of_a_confident_brazilian-inspired_model_wearing_an_elegant_black_lace__xju79gu63twrr4y7wwl6_0.png')", backgroundSize: 'cover', backgroundPosition: 'center', transform: 'scaleX(-1)' }}>
        {/* Overlay padronizado mais escuro */}
        <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>
        <div className="relative z-10" style={{ transform: 'scaleX(-1)' }}>
          {/* Logo posicionada como no header original */}
          <div className="py-4 md:py-6 w-full z-50">
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
              {/* Left Column - Welcome Text */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-left p-6 sm:p-8 lg:p-12 xl:p-16 z-10 relative min-h-[50vh] lg:min-h-screen">
                <div className="max-w-lg ml-4 sm:ml-8 lg:ml-12 xl:ml-20" style={{ marginTop: '-280px' }}>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
                    Seja um Modelo da<br />
                    <span className="text-[#F25790]">Camera Real.</span>
                  </h1>
                  <p className="text-base sm:text-lg mb-6 lg:mb-8 leading-relaxed">
                    Transforme sua beleza em renda.<br/>
                    Trabalhe de casa, defina seus horários.<br/>
                    Seja sua própria chefe e alcance a independência.
                  </p>
                </div>
              </div>
              
              {/* Right Column - Registration Form */}
              <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start p-4 sm:p-6 lg:p-8 xl:p-12 min-h-[50vh] lg:min-h-screen" style={{ marginTop: '-40px' }}>
                <div className="max-w-sm sm:max-w-md w-full lg:ml-4 xl:ml-8 bg-gradient-to-br from-black/80 via-black/70 to-black/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#F25790]">Cadastro de Modelo</h2>
                  
                  {/* Step Indicator */}
                  {renderStepIndicator()}
                  
                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                    {currentStep === 4 && renderStep4()}
                  </form>
                  
                  <div className="text-center mt-3 sm:mt-4">
                    <p className="text-sm">
                      Já tem conta? <Link href="/login" className="text-[#F25790] hover:underline">Entre aqui</Link>
                    </p>
                  </div>
                </div>
              </div>
          </div>
          
          {/* Error Modal */}
          {showError && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
              <div className="bg-[#1A1A1A] p-8 rounded-xl max-w-md w-full text-center">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Erro no cadastro</h3>
                <p className="text-gray-300 mb-6">{errorMessage}</p>
                <button 
                  onClick={() => setShowError(false)}
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
