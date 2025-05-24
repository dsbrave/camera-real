import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutController from '../components/checkout/CheckoutController';

const Extrato: React.FC = () => {
  const [isAddCreditsModalOpen, setIsAddCreditsModalOpen] = useState(false);
  const [saldoAtual, setSaldoAtual] = useState(300);
  const [tipoExtrato, setTipoExtrato] = useState<'modelo' | 'usuario'>('modelo');
  const [userType, setUserType] = useState<'modelo' | 'usuario'>('modelo');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Dados bancários do modelo
  const dadosBancarios = {
    metodo: 'Transferência bancária',
    banco: 'Nu Pagamentos',
    favorecido: 'Cl***in',
    cpfcnpj: '00***01',
    conta: '61***20',
    tipo: 'Conta Corrente'
  };
  
  // Transações simuladas
  const [transacoes, setTransacoes] = useState([
    { 
      data: '05/09/2024', 
      dataTransferencia: '05/09/2024', 
      periodo: '05/09/2024 até 05/09/2024', 
      saldo: 1517.13, 
      tarifa: 10.00, 
      valor: 1507.13, 
      situacao: 'Pago' 
    },
    { 
      data: '05/09/2024', 
      dataTransferencia: '05/09/2024', 
      periodo: '05/09/2024 até 05/09/2024', 
      saldo: 1517.13, 
      tarifa: 10.00, 
      valor: 1507.13, 
      situacao: 'Pago' 
    },
    { 
      data: '05/09/2024', 
      dataTransferencia: '05/09/2024', 
      periodo: '05/09/2024 até 05/09/2024', 
      saldo: 1517.13, 
      tarifa: 10.00, 
      valor: 1507.13, 
      situacao: 'Pendente' 
    },
    { 
      data: '05/09/2024', 
      dataTransferencia: '05/09/2024', 
      periodo: '05/09/2024 até 05/09/2024', 
      saldo: 1517.13, 
      tarifa: 10.00, 
      valor: 1507.13, 
      situacao: 'Pago' 
    },
    { 
      data: '05/09/2024', 
      dataTransferencia: '05/09/2024', 
      periodo: '05/09/2024 até 05/09/2024', 
      saldo: 1517.13, 
      tarifa: 10.00, 
      valor: 1507.13, 
      situacao: 'Pago' 
    },
  ]);
  
  // Transações do usuário (historico de compras)
  const [transacoesUsuario, setTransacoesUsuario] = useState([
    { 
      data: '05/09/2024', 
      tipo: 'Compra de créditos', 
      valor: 'R$ 300,00', 
      saldoFinal: 'R$ 300,00' 
    },
    { 
      data: '06/09/2024', 
      tipo: 'Chat privado com Julia', 
      valor: 'R$ 50,00-', 
      saldoFinal: 'R$ 250,00' 
    },
    { 
      data: '10/09/2024', 
      tipo: 'Compra de créditos', 
      valor: 'R$ 100,00', 
      saldoFinal: 'R$ 350,00' 
    },
    { 
      data: '15/09/2024', 
      tipo: 'Presente para Amanda', 
      valor: 'R$ 30,00-', 
      saldoFinal: 'R$ 320,00' 
    },
    { 
      data: '20/09/2024', 
      tipo: 'Chat privado com Bianca', 
      valor: 'R$ 20,00-', 
      saldoFinal: 'R$ 300,00' 
    },
  ]);
  
  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      try {
        const userData = JSON.parse(userStorage);
        setIsLoggedIn(!!userData.isLoggedIn);
        // Detectar se é modelo ou usuário comum baseado em um campo simulado
        setUserType(userData.isModel ? 'modelo' : 'usuario');
      } catch (error) {
        console.error('Erro ao verificar login:', error);
      }
    }
  }, []);

  const handleAddCredits = (amount: number) => {
    const novoSaldo = saldoAtual + amount;
    setSaldoAtual(novoSaldo);
    
    // Adiciona transação ao histórico (somente para usuários comuns)
    if (userType === 'usuario') {
      const novaTransacao = {
        data: new Date().toLocaleDateString('pt-BR'),
        tipo: 'Compra de créditos',
        valor: `R$ ${amount.toFixed(2).replace('.', ',')}`,
        saldoFinal: `R$ ${novoSaldo.toFixed(2).replace('.', ',')}`,
      };
      
      setTransacoesUsuario([novaTransacao, ...transacoesUsuario]);
    }
  };

  return (
    <>
      <Head>
        <title>{userType === 'modelo' ? 'Extrato' : 'Carteira'} | Camera Real</title>
        <meta name="description" content={userType === 'modelo' ? 'Acompanhe seus ganhos' : 'Gerencie seus créditos'} />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#9747FF] to-[#FF6B95] text-white">
        <Header />
        
        <main className="container mx-auto px-4 pt-32 pb-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">
              {userType === 'modelo' ? 'Seus ganhos' : 'Sua carteira'}
            </h1>
            
            {userType === 'usuario' && (
              <button 
                onClick={() => setIsAddCreditsModalOpen(true)}
                className="px-6 py-3 bg-white text-[#9747FF] rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Adicionar créditos
              </button>
            )}
          </div>
          
          <div className="bg-gray-900 bg-opacity-20 backdrop-blur-sm rounded-lg p-6 mb-10">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
              <div>
                <h2 className="text-4xl font-bold mb-2">
                  ${saldoAtual.toFixed(2)}
                </h2>
                <p className="text-gray-200">
                  {userType === 'modelo' ? 'Saldo disponível para saque' : 'Saldo atual'}
                </p>
              </div>
              
              {userType === 'modelo' && (
                <div className="mt-4 md:mt-0">
                  <button className="px-6 py-3 bg-white text-[#9747FF] rounded-full font-medium hover:bg-gray-100 transition-colors">
                    Resgatar Agora
                  </button>
                  <button className="px-6 py-3 bg-transparent border border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors ml-3">
                    Ficar Online
                  </button>
                </div>
              )}
            </div>
            
            {userType === 'modelo' && (
              <div className="bg-gray-900 bg-opacity-20 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">Dados para depósito</h3>
                  <button className="text-sm bg-pink-500 px-2 py-1 rounded-md">Editar</button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 text-sm">
                  <div>
                    <p className="text-gray-300">Método de pagamento:</p>
                    <p>{dadosBancarios.metodo}</p>
                  </div>
                  <div>
                    <p className="text-gray-300">Banco:</p>
                    <p>{dadosBancarios.banco}</p>
                  </div>
                  <div>
                    <p className="text-gray-300">Favorecido:</p>
                    <p>{dadosBancarios.favorecido}</p>
                  </div>
                  <div>
                    <p className="text-gray-300">CPF/CNPJ:</p>
                    <p>{dadosBancarios.cpfcnpj}</p>
                  </div>
                  <div>
                    <p className="text-gray-300">Número da conta:</p>
                    <p>{dadosBancarios.conta}</p>
                  </div>
                  <div>
                    <p className="text-gray-300">Tipo de conta:</p>
                    <p>{dadosBancarios.tipo}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Seletores de tipo de extrato */}
          {userType === 'modelo' && (
            <div className="flex mb-6">
              <button
                onClick={() => setTipoExtrato('modelo')}
                className={`px-4 py-2 rounded-lg mr-4 ${tipoExtrato === 'modelo' ? 'bg-white text-[#9747FF]' : 'bg-transparent text-white border border-white'}`}
              >
                Extrato de ganhos
              </button>
              <button
                onClick={() => setTipoExtrato('usuario')}
                className={`px-4 py-2 rounded-lg ${tipoExtrato === 'usuario' ? 'bg-white text-[#9747FF]' : 'bg-transparent text-white border border-white'}`}
              >
                Histórico de compras
              </button>
            </div>
          )}
          
          {/* Tabela de transações para modelos */}
          {(userType === 'modelo' && tipoExtrato === 'modelo') && (
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="py-3 px-4 font-medium">Data do resgate</th>
                    <th className="py-3 px-4 font-medium">Data da transferência</th>
                    <th className="py-3 px-4 font-medium">Período de resgate</th>
                    <th className="py-3 px-4 font-medium">Saldo</th>
                    <th className="py-3 px-4 font-medium">Tarifa</th>
                    <th className="py-3 px-4 font-medium">Valor</th>
                    <th className="py-3 px-4 font-medium">Situação</th>
                    <th className="py-3 px-4 font-medium">Nota fiscal</th>
                    <th className="py-3 px-4 font-medium">Comprovante</th>
                    <th className="py-3 px-4 font-medium">Resumo</th>
                  </tr>
                </thead>
                <tbody>
                  {transacoes.map((transacao, index) => (
                    <tr key={index} className="border-b border-white/10">
                      <td className="py-3 px-4">{transacao.data}</td>
                      <td className="py-3 px-4">{transacao.dataTransferencia}</td>
                      <td className="py-3 px-4">{transacao.periodo}</td>
                      <td className="py-3 px-4">{transacao.saldo.toFixed(2)}</td>
                      <td className="py-3 px-4">{transacao.tarifa.toFixed(2)}</td>
                      <td className="py-3 px-4">{transacao.valor.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transacao.situacao === 'Pago' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-orange-500 text-white'
                        }`}>
                          {transacao.situacao}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-pink-300 hover:text-white">Ver</button>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-pink-300 hover:text-white">Ver</button>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-pink-300 hover:text-white">Ver</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Tabela de transações para usuários ou quando o modelo seleciona visualização de usuário */}
          {(userType === 'usuario' || tipoExtrato === 'usuario') && (
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="py-3 px-4 font-medium">Data</th>
                    <th className="py-3 px-4 font-medium">Descrição</th>
                    <th className="py-3 px-4 font-medium">Valor</th>
                    <th className="py-3 px-4 font-medium">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {transacoesUsuario.map((transacao, index) => (
                    <tr key={index} className="border-b border-white/10">
                      <td className="py-3 px-4">{transacao.data}</td>
                      <td className="py-3 px-4">{transacao.tipo}</td>
                      <td className="py-3 px-4" style={{ 
                        color: transacao.valor.includes('-') ? '#ff6b6b' : '#4cd964' 
                      }}>
                        {transacao.valor}
                      </td>
                      <td className="py-3 px-4">{transacao.saldoFinal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
        
        <Footer />
      </div>

      {/* Fluxo de Checkout para usuários */}
      {userType === 'usuario' && (
        <CheckoutController
          isOpen={isAddCreditsModalOpen} 
          onClose={() => setIsAddCreditsModalOpen(false)} 
          onSuccess={handleAddCredits}
        />
      )}
    </>
  );
};

export default Extrato;
