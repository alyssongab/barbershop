"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { login as loginService, getMe } from '@/services/authService'; // Importa getMe
import api from '@/services/api';
import { useRouter } from 'next/navigation';
import { Loading } from '@/components/ui/loading';

// Tipagem para os dados do usuário
interface User {
  id: number;
  nome: string;
  email: string;
  nivelAcesso: 'CLIENTE' | 'BARBEIRO' | 'ADMIN';
}

// Tipagem para o valor do Contexto
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  loading: boolean; // Para sabermos quando a verificação inicial terminou
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Efeito que roda UMA VEZ na inicialização da aplicação
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('authToken');

      if (token) {
        try {
          // Se tem token, configura o header e busca os dados do usuário
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const userData = await getMe();
          setUser(userData);
        } catch (error) {
          // Se o token for inválido ou expirado, limpa tudo
          console.error("Sessão inválida, fazendo logout.", error);
          localStorage.removeItem('authToken');
          delete api.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false); // Finaliza o loading inicial
    };

    initializeAuth();
  }, []);

  const login = async (email: string, senha: string) => {
    const { token } = await loginService(email, senha);
    localStorage.setItem('authToken', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Após o login, busca os dados do usuário e atualiza o estado
    const userData = await getMe();
    setUser(userData);
    
    // Redireciona com base no nível de acesso
    if (userData.nivelAcesso === 'BARBEIRO') {
      router.push('/app/barber/home'); // Exemplo de rota para barbeiro
    } else if (userData.nivelAcesso === 'ADMIN') {
      router.push('/app/admin/gerenciamento'); // Exemplo de rota para admin
    }
    else {
      router.push('/app/cliente/agendamento'); // Rota padrão para cliente
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
    router.push('/auth/login');
  };

  const value = {
    isAuthenticated: !!user,
    user,
    login,
    logout,
    loading,
  };

  // Enquanto estiver carregando a sessão, não renderiza o conteúdo
  if (loading) {
    return <Loading /> // Ou um componente de Spinner/Loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};