import api from './api';

// 1. Define o tipo de dados que nosso endpoint de criação espera.
// O telefone é opcional e o nivelAcesso será fixo como 'CLIENTE' para o cadastro público.
export type RegisterUserData = {
  nome: string;
  email: string;
  senha: string;
  telefone?: string; // Opcional
  nivelAcesso: 'CLIENTE';
};

// 2. Cria a função que chama a API
export const registerUser = async (userData: RegisterUserData) => {
  try {
    // Faz a requisição POST para o endpoint /usuarios
    const response = await api.post('/usuarios', userData);
    return response.data; // Retorna os dados do usuário criado
  } catch (error) {
    console.error("Erro no cadastro:", error);
    throw error; // Lança o erro para ser tratado no componente
  }
};

export interface Barbeiro {
  id: number;
  nome: string;
}

export const getBarbeiros = async (): Promise<Barbeiro[]> => {
  const response = await api.get('/usuarios/barbeiros');
  return response.data;
};