import api from './api'; // Importamos a instância do Axios configurada
import { AxiosError } from 'axios'; // Importamos o tipo de erro do Axios

// 1. Definimos uma interface para a resposta da API de login.
// O backend nos retorna um objeto com uma propriedade "token" que é uma string.
interface LoginResponse {
  token: string;
}

// 2. Tipamos os parâmetros da função (email e senha são strings)
// e o seu retorno (uma Promise que resolve para o tipo LoginResponse).
export const login = async (email: string, senha: string): Promise<LoginResponse> => {
  try {
    // 3. Usamos o generic do Axios para dizer a ele qual é o tipo de dado esperado na resposta.
    // Assim, `response.data` será automaticamente tipado como LoginResponse.
    const response = await api.post<LoginResponse>('/login', {
      email,
      senha,
    });

    return response.data;
  } catch (error) {

    if (error instanceof AxiosError) {
      console.error("Erro no login (Axios):", error.response?.data);
    } else {
      console.error("Erro no login (Geral):", error);
    }
    throw error;
  }
};

export const getMe = async () => {
    try {
        // Note que não precisamos enviar o token aqui. O axios (api) já está
        // configurado no AuthContext para enviar o token em todas as requisições.
        const response = await api.get('/usuarios/me');
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        throw error;
    }
}