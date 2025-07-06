"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { login as loginService } from '@/services/authService';
import api from '@/services/api';
import { useRouter } from 'next/navigation';

// 1. Tipagem para os dados do usuário que queremos armazenar
interface User {
  id: number;
  nome: string;
  email: string;
  nivelAcesso: 'CLIENTE' | 'BARBEIRO' | 'ADMIN';
}

// 2. Tipagem para o valor que o nosso Contexto vai fornecer
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// 3. Criação do Contexto com um valor padrão
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. Criação do "Provedor" do Contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Efeito que roda na inicialização para verificar se já existe um token
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Aqui, o ideal seria ter um endpoint /me para validar o token e buscar os dados do usuário
      // Por enquanto, vamos simplificar e futuramente adicionar essa validação
      setLoading(false); // Simulação de verificação
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, senha: string) => {
    const { token } = await loginService(email, senha);

    // Salva o token no localStorage para persistir a sessão
    localStorage.setItem('authToken', token);

    // Adiciona o token aos cabeçalhos padrão do Axios para as próximas requisições
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Decodificar o token para pegar os dados do usuário seria o ideal aqui.
    // Como simplificação, vamos redirecionar. No próximo passo, podemos buscar os dados do usuário.
    // setUser(dadosDoUsuario);
    
    // Redireciona para a página de agendamento do cliente
    router.push('/app/cliente/agendamento'); 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
    router.push('/login'); // Redireciona para a página de login
  };

  const value = {
    isAuthenticated: !!user,
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 5. Hook customizado para facilitar o uso do contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};