import React, { ReactNode } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  bgColor?: string;
}

export default function CheckoutModal({ isOpen, onClose, children, bgColor = 'bg-[#9C4EDD]' }: CheckoutModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className={`${bgColor} rounded-2xl p-8 w-full max-w-2xl relative z-10 text-white`}>
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {children}
      </div>
    </div>
  );
}
