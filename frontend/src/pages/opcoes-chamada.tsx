import Link from 'next/link';
import { useState } from 'react';

export default function OpcoesChamada() {
  return (
    <div className="min-h-screen bg-[#9968c7] text-white">
      <div className="flex h-screen flex-col">
        {/* Header */}
        <div className="flex items-center p-4 bg-[#8355a9] shadow-md">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#f3a9cc] flex items-center justify-center mr-3">
              <span className="text-white font-bold">A</span>
            </div>
            <h1 className="text-xl font-semibold">Anna</h1>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <div className="px-4 py-1 rounded-full bg-[#F25790] flex items-center">
              <span className="mr-1">+</span>
              <span>300,00</span>
            </div>
          </div>
        </div>
        
        {/* Main Chat Area */}
        <div className="flex-1 flex">
          {/* Central Video Stream */}
          <div className="flex-1 relative">
            {/* Modelo's video (stream principal) */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Video placeholder - normalmente seria um componente de vídeo real */}
              <div className="w-full h-full bg-gradient-to-b from-[#9968c7] to-[#7a4aa0]">
                {/* Menu de opções centralizado */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black bg-opacity-70 rounded-lg p-2 w-64">
                    <div className="space-y-2">
                      {/* Opção 1 */}
                      <button className="w-full flex items-center p-3 hover:bg-white hover:bg-opacity-10 rounded-md">
                        <span className="mr-3">💰</span>
                        <span className="text-left">Adicionar crédito</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {/* Opção 2 */}
                      <button className="w-full flex items-center p-3 hover:bg-white hover:bg-opacity-10 rounded-md">
                        <span className="mr-3">🔇</span>
                        <span className="text-left">Silenciar modelo</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {/* Opção 3 */}
                      <button className="w-full flex items-center p-3 hover:bg-white hover:bg-opacity-10 rounded-md">
                        <span className="mr-3">👁️</span>
                        <span className="text-left">Ocultar modelo</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {/* Opção 4 */}
                      <button className="w-full flex items-center p-3 hover:bg-white hover:bg-opacity-10 rounded-md">
                        <span className="mr-3">🔒</span>
                        <span className="text-left">Bloquear modelo</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {/* Opção 5 */}
                      <button className="w-full flex items-center p-3 hover:bg-white hover:bg-opacity-10 rounded-md">
                        <span className="mr-3">🛟</span>
                        <span className="text-left">Suporte técnico</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {/* Opção 6 */}
                      <button className="w-full flex items-center p-3 hover:bg-white hover:bg-opacity-10 rounded-md">
                        <span className="mr-3">📞</span>
                        <span className="text-left">Encerrar chamada</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Controles de vídeo no centro inferior */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                  <button className="w-12 h-12 rounded-full bg-[#8355a9] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button className="w-12 h-12 rounded-full bg-[#8355a9] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                  <button className="w-12 h-12 rounded-full bg-[#8355a9] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* User's video (PIP) */}
            <div className="absolute top-4 right-4 w-40 h-32 rounded-lg overflow-hidden border-2 border-white shadow-lg">
              {/* Mini video placeholder - normalmente seria um componente de vídeo real */}
              <div className="w-full h-full bg-[#f2f2f2]"></div>
            </div>
            
            {/* Chat interface no lado esquerdo */}
            <div className="absolute top-0 left-0 bottom-0 w-64 flex flex-col">
              {/* Mensagens do chat */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-3">
                  <div className="bg-[#F25790] text-white p-3 rounded-lg rounded-tl-none max-w-xs">
                    <p>Olá. Tudo bem?</p>
                  </div>
                  <div className="bg-white text-gray-800 p-3 rounded-lg rounded-tl-none max-w-xs ml-auto">
                    <p>Vamos falar por áudio... :-S</p>
                  </div>
                </div>
              </div>
              
              {/* Reações/Emojis */}
              <div className="p-2">
                <div className="flex space-x-2">
                  <button className="w-10 h-10 rounded-full bg-[#f3f3f3] flex items-center justify-center text-lg">
                    <span role="img" aria-label="Smile">😀</span>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-[#f3f3f3] flex items-center justify-center text-lg">
                    <span role="img" aria-label="Heart">❤️</span>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-[#f3f3f3] flex items-center justify-center text-lg">
                    <span role="img" aria-label="Wow">😮</span>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-[#f3f3f3] flex items-center justify-center text-lg">
                    <span role="img" aria-label="Cry">😢</span>
                  </button>
                </div>
              </div>
              
              {/* Input de mensagem */}
              <div className="p-2">
                <form className="flex">
                  <input
                    type="text"
                    placeholder="Escreve sua mensagem aqui..."
                    className="flex-1 py-2 px-4 bg-white text-gray-800 rounded-l-full focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#F25790] text-white rounded-r-full"
                  >
                    Enviar
                  </button>
                </form>
              </div>
            </div>
            
            {/* Controles lado direito */}
            <div className="absolute top-1/4 right-4 flex flex-col space-y-4">
              <button className="w-12 h-12 rounded-full bg-[#f3a9cc] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              
              {/* Botão Pular */}
              <div className="mt-auto">
                <button className="px-6 py-2 bg-[#F25790] text-white rounded-full font-medium flex items-center">
                  Pular
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
