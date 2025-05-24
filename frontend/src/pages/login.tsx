import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showPasswordResetSuccess, setShowPasswordResetSuccess] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validação básica
    if (!formData.email || !formData.password) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }
    
    setLoading(true);
    
    // Simulação de login bem-sucedido
    setTimeout(() => {
      // Verificar se é usuário de teste (para demonstração)
      if (formData.email === 'teste@camera.real' && formData.password === 'senha123') {
        // Armazenar dados do usuário no localStorage
        localStorage.setItem('user', JSON.stringify({
          name: 'Usuário Teste',
          email: formData.email,
          isLoggedIn: true,
          credits: 300
        }));
        
        // Redirecionar para a página principal após o login
        router.push('/painel-usuario');
      } else if (formData.email === 'modelo@camera.real' && formData.password === 'modelo123') {
        // Armazenar dados do modelo no localStorage
        localStorage.setItem('user', JSON.stringify({
          name: 'Modelo Teste',
          email: formData.email,
          isLoggedIn: true,
          isModel: true,
          credits: 1500
        }));
        
        // Redirecionar para o dashboard do modelo
        router.push('/painel-modelo');
      } else {
        setError('E-mail ou senha inválidos.');
        setLoading(false);
      }
    }, 1000);
  };
  
  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryEmail) {
      return;
    }
    
    // Simulação de envio de e-mail de recuperação
    setTimeout(() => {
      setShowForgotPasswordModal(false);
      setShowPasswordResetSuccess(true);
      setRecoveryEmail('');
      
      // Fechamento automático do modal de sucesso após 5 segundos
      setTimeout(() => {
        setShowPasswordResetSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>Login | Camera Real</title>
        <meta name="description" content="Entre na sua conta Camera Real e acesse nossa plataforma" />
      </Head>
      
      <div className="min-h-screen bg-black text-white relative overflow-hidden" style={{ backgroundImage: "url('/images/Group 26.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'darken' }}>
        <div className="absolute top-0 left-0 p-3 sm:p-5 z-50">
          <Link href="/" className="block">
            <Image 
              src="/icons/logo.svg" 
              alt="Camera Real" 
              width={220} 
              height={70}
              className="h-12 sm:h-16 w-auto cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>
        
        <div className="absolute top-0 right-0 p-3 sm:p-5 z-50">
          <Link href="/" className="text-[#F25790] hover:underline text-xs sm:text-sm font-medium block">
            ← Voltar para home
          </Link>
        </div>
        
        <div className="flex justify-center items-center min-h-screen px-4 pt-20 sm:pt-0">
          {/* Login Form */}
          <div className="w-full max-w-sm sm:max-w-md p-4 sm:p-6 bg-[#1A1A1A] bg-opacity-80 rounded-xl shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-[#F25790]">Login</h2>
              
              {error && (
                <div className="bg-red-500 bg-opacity-20 border border-red-500 text-white p-3 rounded-lg mb-4 text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1 text-[#F25790]">E-mail</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 sm:py-3 bg-transparent border border-[#F25790] rounded-md focus:outline-none focus:ring-1 focus:ring-[#F25790] text-white text-sm sm:text-base"
                    placeholder="Insira seu e-mail de cadastro" 
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-xs sm:text-sm font-medium mb-1 text-[#F25790]">Senha</label>
                  <input 
                    type="password" 
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 sm:py-3 bg-transparent border border-[#F25790] rounded-md focus:outline-none focus:ring-1 focus:ring-[#F25790] text-white text-sm sm:text-base"
                    placeholder="Inserir senha" 
                    required
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      name="remember"
                      checked={formData.remember}
                      onChange={handleChange}
                      className="w-4 h-4 mr-2 accent-[#F25790]"
                    />
                    <label htmlFor="remember" className="text-xs sm:text-sm">Lembrar-me</label>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setShowForgotPasswordModal(true)}
                    className="text-xs sm:text-sm text-[#F25790] hover:underline text-left sm:text-right"
                  >
                    Esqueceu sua senha? Clique aqui.
                  </button>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-[#F25790] hover:bg-[#d93d75] text-white py-3 sm:py-4 px-4 rounded-full mt-4 sm:mt-6 transition-colors font-medium text-base sm:text-lg"
                  disabled={loading}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </button>
                
                <div className="mt-4 sm:mt-6 text-center">
                  <p className="text-xs sm:text-sm">
                    Não tem uma conta?{' '}
                    <Link href="/cadastro" className="text-[#F25790] hover:underline">
                      Cadastre-se
                    </Link>
                  </p>
                </div>
              </form>
              
              <div className="mt-4 sm:mt-6 text-center text-xs text-gray-400">
                <p>Para fins de demonstração, use:</p>
                <p className="mt-1">Usuário: teste@camera.real / Senha: senha123</p>
                <p className="mt-1">Modelo: modelo@camera.real / Senha: modelo123</p>
              </div>
          </div>
          
          {/* Forgot Password Modal */}
          {showForgotPasswordModal && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
              <div className="bg-[#1A1A1A] p-8 rounded-xl max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Recuperar senha</h3>
                  <button 
                    onClick={() => setShowForgotPasswordModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <p className="text-gray-300 mb-4">Insira seu e-mail cadastrado para receber um link de recuperação de senha.</p>
                
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label htmlFor="recoveryEmail" className="block text-sm font-medium mb-1 text-[#F25790]">E-mail</label>
                    <input 
                      type="email" 
                      id="recoveryEmail"
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-transparent border border-[#F25790] rounded-md focus:outline-none focus:ring-1 focus:ring-[#F25790] text-white"
                      placeholder="Seu e-mail cadastrado" 
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-[#F25790] hover:bg-[#d93d75] text-white py-2 px-4 rounded-full transition-colors"
                  >
                    Enviar link de recuperação
                  </button>
                </form>
              </div>
            </div>
          )}
          
          {/* Password Reset Success Modal */}
          {showPasswordResetSuccess && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
              <div className="bg-[#1A1A1A] p-8 rounded-xl max-w-md w-full text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">E-mail enviado!</h3>
                <p className="text-gray-300 mb-6">Enviamos instruções para recuperação de senha no seu e-mail. Verifique sua caixa de entrada.</p>
                <button 
                  onClick={() => setShowPasswordResetSuccess(false)}
                  className="bg-[#F25790] hover:bg-[#d93d75] text-white py-2 px-6 rounded-full transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 py-4 px-5 flex justify-between items-center text-sm text-gray-400">
          <div> 2024 Camera Real</div>
          <div className="flex space-x-6">
            <Link href="/politica-privacidade" className="hover:text-[#F25790]">Política de privacidade</Link>
            <Link href="/fale-conosco" className="hover:text-[#F25790]">Fale conosco</Link>
            <Link href="/termos-condicoes" className="hover:text-[#F25790]">Termos e condições</Link>
          </div>
        </div>
      </div>
    </>
  );
}
