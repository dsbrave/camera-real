import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Componente do modal de resgate
const ResgateModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#b162c9] rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200"
        >
          <Image
            src="/icons/navigation/close.svg"
            alt="Fechar"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">Resgate</h2>
        <p className="text-white mb-4">Selecionar período:</p>

        <div className="mb-4">
          <label className="block text-white mb-2">Início</label>
          <div className="relative">
            <input 
              type="date" 
              className="w-full p-3 rounded-lg pr-10 focus:outline-none" 
              placeholder="Select date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Image
                src="/icons/action/date_range.svg"
                alt="Calendário"
                width={20}
                height={20}
                className="w-5 h-5 text-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-white mb-2">Fim</label>
          <div className="relative">
            <input 
              type="date" 
              className="w-full p-3 rounded-lg pr-10 focus:outline-none" 
              placeholder="Select date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Image
                src="/icons/action/date_range.svg"
                alt="Calendário"
                width={20}
                height={20}
                className="w-5 h-5 text-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-full text-sm"
          >
            Voltar
          </button>
          <button
            className="bg-camera-pink text-white px-8 py-2 rounded-full text-sm"
          >
            Solicitar resgate
          </button>
        </div>
      </div>
    </div>
  );
};

const Financeiro: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dados mockados para a tabela
  const transacoes = [
    { 
      data: '05/09/2024', 
      dataTransferencia: '05/09/2024', 
      periodo: '05/09/2024 até 05/09/2024', 
      saldo: '1517,13', 
      tarifa: '10,00', 
      valor: '1507,13', 
      status: 'Pago' 
    },
    { 
      data: '05/09/2024', 
      dataTransferencia: '05/09/2024', 
      periodo: '05/09/2024 até 05/09/2024', 
      saldo: '1517,13', 
      tarifa: '10,00', 
      valor: '1507,13', 
      status: 'Pago' 
    },
    { 
      data: '05/09/2024', 
      dataTransferencia: '05/09/2024', 
      periodo: '05/09/2024 até 05/09/2024', 
      saldo: '1517,13', 
      tarifa: '10,00', 
      valor: '1507,13', 
      status: 'Pendente' 
    },
    { 
      data: '05/09/2024', 
      dataTransferencia: '05/09/2024', 
      periodo: '05/09/2024 até 05/09/2024', 
      saldo: '1517,13', 
      tarifa: '10,00', 
      valor: '1507,13', 
      status: 'Pago' 
    },
    { 
      data: '05/09/2024', 
      dataTransferencia: '05/09/2024', 
      periodo: '05/09/2024 até 05/09/2024', 
      saldo: '1517,13', 
      tarifa: '10,00', 
      valor: '1507,13', 
      status: 'Pago' 
    },
    { 
      data: '05/09/2024', 
      dataTransferencia: '05/09/2024', 
      periodo: '05/09/2024 até 05/09/2024', 
      saldo: '1517,13', 
      tarifa: '10,00', 
      valor: '1507,13', 
      status: 'Pago' 
    },
    { 
      data: '05/09/2024', 
      dataTransferencia: '05/09/2024', 
      periodo: '05/09/2024 até 05/09/2024', 
      saldo: '1517,13', 
      tarifa: '10,00', 
      valor: '1507,13', 
      status: 'Pago' 
    },
    { 
      data: '05/09/2024', 
      dataTransferencia: '05/09/2024', 
      periodo: '05/09/2024 até 05/09/2024', 
      saldo: '1517,13', 
      tarifa: '10,00', 
      valor: '1507,13', 
      status: 'Pendente' 
    },
    { 
      data: '05/09/2024', 
      dataTransferencia: '05/09/2024', 
      periodo: '05/09/2024 até 05/09/2024', 
      saldo: '1517,13', 
      tarifa: '10,00', 
      valor: '1507,13', 
      status: 'Pendente' 
    },
  ];

  const dadosBancarios = {
    metodo: 'Transferência bancária',
    banco: 'Nu Pagamentos',
    favorecido: 'Cl***in',
    cpfCnpj: '00***01',
    numeroConta: '61***20',
    tipoConta: 'Conta Corrente'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#370836] to-[#6a0d66] text-white">
      <Head>
        <title>Financeiro | Camera Real</title>
        <meta name="description" content="Gerencie seus pagamentos e resgates" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="flex justify-between items-center p-4 md:p-6">
        <div className="logo">
          <Image src="/images/logo.png" alt="Camera Real" width={150} height={60} />
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/assistencia" className="text-white hover:text-camera-pink">
            Assistência
          </Link>
          <Link href="/regras-e-ajuda" className="text-white hover:text-camera-pink">
            Regras e ajuda
          </Link>
          <button className="text-white">
            <Image src="/icons/notification/notifications.svg" alt="Notificações" width={24} height={24} />
          </button>
          <button className="text-white">
            <Image src="/icons/action/account_circle.svg" alt="Perfil" width={24} height={24} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Painel de ganhos */}
          <div className="bg-[#2D1A3A] rounded-lg p-6 col-span-1">
            <h2 className="text-xl font-medium mb-2">Seus ganhos</h2>
            <p className="text-4xl font-bold mb-4">$300,00</p>
            <div className="flex flex-col space-y-2">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center px-4 py-2 bg-camera-pink text-white rounded-full hover:bg-pink-600 transition-colors"
              >
                <Image src="/icons/action/account_balance_wallet.svg" alt="Resgate" width={20} height={20} className="mr-2" />
                Resgatar Agora
              </button>
              <button className="flex items-center justify-center px-4 py-2 bg-[#4D2D5A] text-white rounded-full hover:bg-[#5D3D6A] transition-colors">
                <Image src="/icons/hardware/videocam.svg" alt="Online" width={20} height={20} className="mr-2" />
                Ficar Online
              </button>
            </div>
          </div>

          {/* Dados para depósito */}
          <div className="bg-[#2D1A3A] rounded-lg p-6 col-span-2">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-medium">Dados para depósito</h2>
              <button className="px-3 py-1 bg-camera-pink text-white text-xs rounded-full">
                Editar
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-300">Método de pagamento:</span> {dadosBancarios.metodo}
              </p>
              <p>
                <span className="text-gray-300">Banco:</span> {dadosBancarios.banco}
              </p>
              <p>
                <span className="text-gray-300">Favorecido:</span> {dadosBancarios.favorecido}
              </p>
              <p>
                <span className="text-gray-300">CPF/CNPJ:</span> {dadosBancarios.cpfCnpj}
              </p>
              <p>
                <span className="text-gray-300">Número da conta:</span> {dadosBancarios.numeroConta}
              </p>
              <p>
                <span className="text-gray-300">Tipo de conta:</span> {dadosBancarios.tipoConta}
              </p>
            </div>
          </div>
        </div>

        {/* Tabela de Transações */}
        <div className="bg-[#2D1A3A] rounded-lg overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-[#4D2D5A]">
              <tr>
                <th className="px-4 py-3 text-sm font-medium">Data do resgate</th>
                <th className="px-4 py-3 text-sm font-medium">Data da transferência</th>
                <th className="px-4 py-3 text-sm font-medium">Período de resgate</th>
                <th className="px-4 py-3 text-sm font-medium">Saldo</th>
                <th className="px-4 py-3 text-sm font-medium">Tarifa</th>
                <th className="px-4 py-3 text-sm font-medium">Valor</th>
                <th className="px-4 py-3 text-sm font-medium">Situação</th>
                <th className="px-4 py-3 text-sm font-medium">Nota fiscal</th>
                <th className="px-4 py-3 text-sm font-medium">Comprovante</th>
                <th className="px-4 py-3 text-sm font-medium">Resumo</th>
              </tr>
            </thead>
            <tbody>
              {transacoes.map((transacao, index) => (
                <tr key={index} className="border-b border-[#4D2D5A] hover:bg-[#3D2A4A]">
                  <td className="px-4 py-3 text-sm">{transacao.data}</td>
                  <td className="px-4 py-3 text-sm">{transacao.dataTransferencia}</td>
                  <td className="px-4 py-3 text-sm">{transacao.periodo}</td>
                  <td className="px-4 py-3 text-sm">{transacao.saldo}</td>
                  <td className="px-4 py-3 text-sm">{transacao.tarifa}</td>
                  <td className="px-4 py-3 text-sm">{transacao.valor}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${transacao.status === 'Pago' ? 'bg-green-500' : 'bg-red-500'}`}>
                      {transacao.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-camera-pink hover:underline">Ver</button>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-camera-pink hover:underline">Ver</button>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-camera-pink hover:underline">Ver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-6 px-4 border-t border-[#4D2D5A]">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">© 2024 Camera Real</p>
          </div>
          <div className="flex space-x-6">
            <Link href="/politica-de-privacidade" className="text-sm text-gray-400 hover:text-white">
              Política de privacidade
            </Link>
            <Link href="/fale-conosco" className="text-sm text-gray-400 hover:text-white">
              Fale conosco
            </Link>
            <Link href="/termos-e-condicoes" className="text-sm text-gray-400 hover:text-white">
              Termos e condições
            </Link>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/regras-e-ajuda" className="text-sm text-gray-400 hover:text-white">
              Regras e ajuda
            </Link>
            <span className="mx-2 text-gray-600">•</span>
            <Link href="/assistencia" className="text-sm text-gray-400 hover:text-white">
              Assistência
            </Link>
          </div>
        </div>
      </footer>

      {/* Modal de Resgate */}
      <ResgateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Financeiro;
