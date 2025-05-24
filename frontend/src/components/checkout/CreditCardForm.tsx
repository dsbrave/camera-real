import React, { useState } from 'react';
import CheckoutModal from './CheckoutModal';
import Image from 'next/image';

interface CreditCardFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAmount: number;
  onSubmit: () => void;
}

export default function CreditCardForm({ 
  isOpen, 
  onClose, 
  selectedAmount, 
  onSubmit 
}: CreditCardFormProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [cpf, setCpf] = useState('');
  const [saveInfo, setSaveInfo] = useState(true);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber && expiryDate && cvv && cardholderName && cpf) {
      onSubmit();
    }
  };

  // Função para formatar o número do cartão
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 16) {
      // Formata como número de cartão (XXXX XXXX XXXX XXXX)
      const blocks = [];
      for (let i = 0; i < value.length; i += 4) {
        blocks.push(value.slice(i, i + 4));
      }
      setCardNumber(blocks.join(' '));
    }
  };

  // Função para formatar a data de validade
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      if (value.length > 2) {
        value = value.replace(/(\d{2})(\d{1,2})/, '$1/$2');
      }
      setExpiryDate(value);
    }
  };

  // Função para formatar o CPF
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      // Formata como CPF (123.456.789-01)
      if (value.length > 9) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
      } else if (value.length > 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
      } else if (value.length > 3) {
        value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
      }
      setCpf(value);
    }
  };

  return (
    <CheckoutModal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-full gap-12">
  <div className="w-2/5 flex items-center justify-center">
  <Image
    src="/images/Payment.png"
    alt="Pagamento via Cartão"
    width={760}
    height={760}
    className="mx-auto"
    style={{ maxWidth: 760, width: '100%', height: 'auto', display: 'block' }}
    priority
  />
  </div>
  <div className="w-3/5">
          <h2 className="text-2xl font-bold mb-6 text-center">Cartão de Crédito</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Número do cartão" 
                value={cardNumber}
                onChange={handleCardNumberChange}
                className="w-full bg-white rounded-lg px-4 py-3 text-black placeholder-gray-500 pr-12"
                required
                maxLength={19}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Image src="/images/visa-icon.png" alt="Visa" width={28} height={28} />
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-1/2">
                <input 
                  type="text" 
                  placeholder="Validade (MM/YY)" 
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  className="w-full bg-white rounded-lg px-4 py-3 text-black placeholder-gray-500"
                  required
                  maxLength={5}
                />
              </div>
              <div className="w-1/2 relative">
                <input 
                  type="text" 
                  placeholder="Código de segurança" 
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  className="w-full bg-white rounded-lg px-4 py-3 text-black placeholder-gray-500 pr-10"
                  required
                  maxLength={3}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <button 
                    type="button" 
                    className="text-gray-500 hover:text-gray-700"
                    title="O código de segurança é o número de 3 dígitos no verso do cartão"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-1.17 1.025-3.07 1.025-4.242 0-1.172-1.025-1.172-2.687 0-3.712z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-1.17 1.025-3.07 1.025-4.242 0-1.172-1.025-1.172-2.687 0-3.712z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <input 
                type="text" 
                placeholder="Nome no cartão" 
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                className="w-full bg-white rounded-lg px-4 py-3 text-black placeholder-gray-500"
                required
              />
            </div>
            
            <div>
              <input 
                type="text" 
                placeholder="CPF" 
                value={cpf}
                onChange={handleCpfChange}
                className="w-full bg-white rounded-lg px-4 py-3 text-black placeholder-gray-500"
                required
                maxLength={14}
              />
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="save-card-info" 
                checked={saveInfo}
                onChange={() => setSaveInfo(!saveInfo)}
                className="w-4 h-4 mr-2 accent-[#F25790]"
              />
              <label htmlFor="save-card-info" className="text-sm">
                Salvar as informações para futuras transações
              </label>
            </div>
            
            <div className="text-xs text-center text-gray-200">
              Em sua fatura você verá o nome CAM*R
            </div>
            
            <div className="border-t border-white border-opacity-20 pt-6">
              <div className="flex justify-between mb-6">
                <span>Valor selecionado</span>
                <span className="font-bold">R$ {selectedAmount.toFixed(2).replace('.', ',')}</span>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-6 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
                >
                  Voltar
                </button>
                
                <button
                  type="submit"
                  disabled={!cardNumber || !expiryDate || !cvv || !cardholderName || !cpf}
                  className={`py-2 px-8 rounded-full transition-colors ${
                    cardNumber && expiryDate && cvv && cardholderName && cpf
                      ? 'bg-[#F25790] hover:bg-[#e44a81]'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Avançar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </CheckoutModal>
  );
}
