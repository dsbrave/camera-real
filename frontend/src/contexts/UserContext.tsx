import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  userCredits: number;
  setUserCredits: React.Dispatch<React.SetStateAction<number>>;
  spendCredits: (amount: number) => boolean;
  addCredits: (amount: number) => void;
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
  const [userCredits, setUserCredits] = useState<number>(150);
  const [isClient, setIsClient] = useState(false);

  // Verificar se estamos no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Sincronizar com localStorage
  useEffect(() => {
    if (!isClient) return;
    
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      try {
        const user = JSON.parse(userStorage);
        if (user && user.creditos) {
          setUserCredits(user.creditos);
        }
      } catch (error) {
        console.error('Erro ao carregar créditos do localStorage:', error);
      }
    }
  }, [isClient]);

  // Atualizar localStorage quando créditos mudarem
  useEffect(() => {
    if (!isClient) return;
    
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      try {
        const user = JSON.parse(userStorage);
        user.creditos = userCredits;
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error('Erro ao salvar créditos no localStorage:', error);
      }
    }
  }, [userCredits, isClient]);

  const spendCredits = (amount: number): boolean => {
    if (userCredits >= amount) {
      setUserCredits(prev => prev - amount);
      return true;
    }
    return false;
  };

  const addCredits = (amount: number) => {
    setUserCredits(prev => prev + amount);
  };

  return (
    <UserContext.Provider value={{
      userCredits,
      setUserCredits,
      spendCredits,
      addCredits
    }}>
      {children}
    </UserContext.Provider>
  );
}; 