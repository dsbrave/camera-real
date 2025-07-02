import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface UserContextType {
  userCredits: number;
  setUserCredits: React.Dispatch<React.SetStateAction<number>>;
  spendCredits: (amount: number) => boolean;
  addCredits: (amount: number) => void;
  refreshCredits: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userCredits, setUserCredits] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  // Verificar se estamos no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Função para carregar créditos do localStorage
  const loadCreditsFromStorage = () => {
    if (!isClient) return;
    
    try {
      const userStorage = localStorage.getItem('user');
      if (userStorage) {
        const user = JSON.parse(userStorage);
        if (user && typeof user.creditos === 'number') {
          setUserCredits(user.creditos);
          return user.creditos;
        }
      }
    } catch (error) {
      console.error('Erro ao carregar créditos do localStorage:', error);
    }
    return 0; // Valor padrão zerado para teste
  };

  // Função para salvar créditos no localStorage
  const saveCreditsToStorage = (credits: number) => {
    if (!isClient) return;
    
    try {
      const userStorage = localStorage.getItem('user');
      if (userStorage) {
        const user = JSON.parse(userStorage);
        user.creditos = credits;
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        // Se não existe usuário, criar um básico
        const newUser = {
          creditos: credits,
          name: 'Usuário',
          email: 'usuario@exemplo.com'
        };
        localStorage.setItem('user', JSON.stringify(newUser));
      }
    } catch (error) {
      console.error('Erro ao salvar créditos no localStorage:', error);
    }
  };

  // Carregar créditos na inicialização
  useEffect(() => {
    if (isClient) {
      const credits = loadCreditsFromStorage();
      setUserCredits(credits);
    }
  }, [isClient]);

  // Salvar créditos sempre que mudarem
  useEffect(() => {
    if (isClient) {
      saveCreditsToStorage(userCredits);
    }
  }, [userCredits, isClient]);

  const spendCredits = (amount: number): boolean => {
    if (userCredits >= amount) {
      setUserCredits(prev => {
        const newCredits = prev - amount;
        // Salvar imediatamente no localStorage
        setTimeout(() => saveCreditsToStorage(newCredits), 0);
        return newCredits;
      });
      return true;
    }
    return false;
  };

  const addCredits = (amount: number) => {
    setUserCredits(prev => {
      const newCredits = prev + amount;
      // Salvar imediatamente no localStorage
      setTimeout(() => saveCreditsToStorage(newCredits), 0);
      return newCredits;
    });
  };

  const refreshCredits = useCallback(() => {
    const credits = loadCreditsFromStorage();
    // Só atualiza se os créditos realmente mudaram
    setUserCredits(prev => {
      if (prev !== credits) {
        return credits;
      }
      return prev;
    });
  }, [isClient]);

  return (
    <UserContext.Provider value={{
      userCredits,
      setUserCredits,
      spendCredits,
      addCredits,
      refreshCredits
    }}>
      {children}
    </UserContext.Provider>
  );
}; 