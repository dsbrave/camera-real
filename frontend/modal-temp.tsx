        {/* Modal de Presentes - Novo Design */}
        {showGiftModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="bg-black rounded-3xl max-w-2xl w-full mx-4 shadow-[0_0_50px_rgba(242,87,144,0.3)] border border-[#F25790]/30 overflow-hidden relative">
              {/* Efeitos neon de fundo */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#F25790]/10 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F25790] to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F25790] to-transparent opacity-40"></div>
              
              <div className="relative z-10 min-h-[400px]">
                {/* Conteúdo centralizado */}
                <div className="p-6 flex flex-col justify-center relative bg-gradient-to-br from-black/95 via-black/90 to-black/95">
                  
                  <div className="relative z-10">
                    {/* Título com efeito neon */}
                    <div className="text-center mb-6">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                        <Image
                          src="/icons/action/card_giftcard.svg"
                          alt="Presente"
                          width={32}
                          height={32}
                          className="w-8 h-8 filter invert"
                        />
                        <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                          Enviar Presente
                        </span>
                      </h2>
                      <h3 className="text-lg md:text-xl font-bold mb-3">
                        <span className="bg-gradient-to-r from-[#F25790] to-[#d93d75] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(242,87,144,0.5)]">
                          Surpreenda {currentModel.name}
                        </span>
                      </h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#F25790] to-[#d93d75] mx-auto rounded-full shadow-[0_0_15px_rgba(242,87,144,0.6)]"></div>
                    </div>
                    
                    {/* Descrição condensada */}
                    <div className="text-center mb-6">
                      <p className="text-white/90 text-base mb-4 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                        Demonstre seu carinho enviando <span className="text-[#F25790] font-bold">presentes especiais</span> para {currentModel.name}
                      </p>
                      
                      {/* Informações organizadas em bloco único */}
                      <div className="backdrop-blur-sm rounded-xl p-3 space-y-2 border border-[#F25790]/50 shadow-[0_0_15px_rgba(242,87,144,0.3)]">
                        <div className="flex items-center justify-between">
                          <span className="text-white/80 text-sm">Seus créditos:</span>
                          <span className="text-green-400 font-bold">{userCredits}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Grid de presentes */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {gifts.map((gift, index) => (
                        <button
                          key={gift.name || index}
                          onClick={() => handleSendGift(gift)}
                          disabled={userCredits < gift.price}
                          className={`p-3 rounded-2xl border transition-all ${
                            userCredits >= gift.price
                              ? 'border-[#F25790]/50 bg-gradient-to-br from-[#F25790]/20 to-[#d93d75]/20 hover:from-[#F25790]/30 hover:to-[#d93d75]/30 hover:scale-105'
                              : 'border-gray-600/50 bg-gray-800/50 opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <Image
                              src={gift.icon || '/icons/action/card_giftcard.svg'}
                              alt={gift.name}
                              width={24}
                              height={24}
                              className="w-6 h-6 mb-2 filter invert"
                            />
                            <div className="text-white font-semibold text-xs mb-1">{gift.name}</div>
                            <div className="text-[#F25790] font-bold text-xs">{gift.price} créditos</div>
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    {/* Botões de ação */}
                    <div className="space-y-3">
                      <button
                        onClick={() => setShowGiftModal(false)}
                        className="w-full py-3 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white font-medium rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span>Fechar</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
