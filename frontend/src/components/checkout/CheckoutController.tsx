import React, { useState } from 'react';
import SelectAmountModal from './SelectAmountModal';
import SelectPaymentMethodModal from './SelectPaymentMethodModal';
import PixPaymentForm from './PixPaymentForm';
import CreditCardForm from './CreditCardForm';
import SuccessModal from './SuccessModal';

interface CheckoutControllerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number) => void;
}

type CheckoutStep = 'select-amount' | 'select-payment' | 'pix-form' | 'credit-card-form' | 'success';

export default function CheckoutController({ isOpen, onClose, onSuccess }: CheckoutControllerProps) {
  const [step, setStep] = useState<CheckoutStep>('select-amount');
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit-card' | null>(null);

  const handleSelectAmount = (amount: number) => {
    setSelectedAmount(amount);
  };

  const handleSelectPaymentMethod = (method: 'pix' | 'credit-card') => {
    setPaymentMethod(method);
  };

  const handleSubmitPayment = () => {
    // Simulação de processamento de pagamento
    setTimeout(() => {
      onSuccess(selectedAmount);
      resetAndClose();
    }, 1000);
  };

  const resetAndClose = () => {
    setStep('select-amount');
    setSelectedAmount(0);
    setPaymentMethod(null);
    onClose();
  };

  const goToNextStep = () => {
    switch (step) {
      case 'select-amount':
        setStep('select-payment');
        break;
      case 'select-payment':
        if (paymentMethod === 'pix') {
          setStep('pix-form');
        } else if (paymentMethod === 'credit-card') {
          setStep('credit-card-form');
        }
        break;
      case 'pix-form':
      case 'credit-card-form':
        setStep('success');
        break;
      case 'success':
        resetAndClose();
        break;
    }
  };

  return (
    <>
      <SelectAmountModal
        isOpen={isOpen && step === 'select-amount'}
        onClose={resetAndClose}
        onSelectAmount={handleSelectAmount}
        onNext={goToNextStep}
      />

      <SelectPaymentMethodModal
        isOpen={isOpen && step === 'select-payment'}
        onClose={() => setStep('select-amount')}
        selectedAmount={selectedAmount}
        onSelectMethod={handleSelectPaymentMethod}
        onNext={goToNextStep}
      />

      <PixPaymentForm
        isOpen={isOpen && step === 'pix-form'}
        onClose={() => setStep('select-payment')}
        selectedAmount={selectedAmount}
        onSubmit={handleSubmitPayment}
      />

      <CreditCardForm
        isOpen={isOpen && step === 'credit-card-form'}
        onClose={() => setStep('select-payment')}
        selectedAmount={selectedAmount}
        onSubmit={handleSubmitPayment}
      />
      
      <SuccessModal
        isOpen={isOpen && step === 'success'}
        onClose={resetAndClose}
        amount={selectedAmount}
      />
    </>
  );
}
