// Utilitário para gerenciar dados do usuário no localStorage
export interface UserData {
  name: string;
  username: string;
  email: string;
  phone: string;
  photo: string;
  profilePic?: string;
  isModel?: boolean;
  gender?: 'male' | 'female' | 'couple' | 'trans';
  country?: string;
  language?: string;
  birthDate?: string;
  bio?: string;
  credits?: number;
}

export const userStorage = {
  // Carregar dados do usuário
  getUserData: (): UserData | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        // Garantir que photo e profilePic estejam sincronizados
        if (userData.photo && !userData.profilePic) {
          userData.profilePic = userData.photo;
        } else if (userData.profilePic && !userData.photo) {
          userData.photo = userData.profilePic;
        }
        return userData;
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
    return null;
  },

  // Salvar dados do usuário
  saveUserData: (userData: Partial<UserData>): boolean => {
    if (typeof window === 'undefined') return false;
    
    try {
      const currentUser = userStorage.getUserData();
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          ...userData,
          // Garantir sincronização de photo e profilePic
          photo: userData.photo || userData.profilePic || currentUser.photo,
          profilePic: userData.profilePic || userData.photo || currentUser.profilePic,
        };
        
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Disparar evento para sincronização
        window.dispatchEvent(new CustomEvent('userDataUpdated', { 
          detail: updatedUser 
        }));
        
        return true;
      }
    } catch (error) {
      console.error('Erro ao salvar dados do usuário:', error);
    }
    return false;
  },

  // Atualizar um campo específico
  updateField: (field: keyof UserData, value: any): boolean => {
    return userStorage.saveUserData({ [field]: value });
  },

  // Limpar dados do usuário
  clearUserData: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      window.dispatchEvent(new CustomEvent('userDataUpdated', { detail: null }));
    }
  }
}; 