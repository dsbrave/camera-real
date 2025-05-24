import Link from 'next/link';
import { useState } from 'react';
import Layout from '@/components/Layout';

export default function LoginModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de login aqui
    console.log('Login com:', { email, password });
  };

  return (
    <Layout 
      title="Login - Camera Real" 
      description="Entre na sua conta Camera Real"
      showHeader={false}
    >
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="mb-6 ml-4">
              <Link href="/">
                <h1 className="text-[#ff4d8d] text-3xl font-bold">
                  CAMERA<br />REAL
                  <span className="inline-block ml-1">👑</span>
                </h1>
              </Link>
            </div>
            
            <div className="bg-[#222222] bg-opacity-80 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-6 text-center text-[#ff4d8d]">Login</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 text-[#ff4d8d]">E-mail</label>
                  <input 
                    type="email" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-transparent border border-[#ff4d8d] rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff4d8d]"
                    placeholder="Insira seu e-mail de cadastro" 
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1 text-[#ff4d8d]">Senha</label>
                  <input 
                    type="password" 
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-transparent border border-[#ff4d8d] rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff4d8d]"
                    placeholder="Inserir senha" 
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-[#ff4d8d] text-white py-2 px-4 rounded-full"
                >
                  Entrar
                </button>
                
                <div className="text-center mt-4">
                  <Link href="/esqueci-senha" className="text-[#ff4d8d] text-sm hover:underline">
                    Esqueceu sua senha? Clique aqui.
                  </Link>
                </div>
              </form>
            </div>
            
            <div className="mt-6 text-right">
              <Link href="/" className="text-[#ff4d8d] hover:underline">
                Voltar para home
              </Link>
            </div>
          </div>
        </div>
        
        {/* Footer simplificado */}
        <footer className="py-4 border-t border-gray-800">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            <div>
              © 2024 Camera Real
            </div>
            <div className="flex space-x-4">
              <Link href="/politica-privacidade" className="hover:text-[#ff4d8d]">
                Política de privacidade
              </Link>
              <Link href="/fale-conosco" className="hover:text-[#ff4d8d]">
                Fale conosco
              </Link>
              <Link href="/termos" className="hover:text-[#ff4d8d]">
                Termos e condições
              </Link>
              <Link href="/regras" className="hover:text-[#ff4d8d]">
                Regras e ajuda
              </Link>
              <Link href="/assistencia" className="hover:text-[#ff4d8d]">
                Assistência
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
}
