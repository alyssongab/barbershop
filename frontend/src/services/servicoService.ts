import api from './api';
import { Servico } from '@/types/servico'; // Importa o tipo que acabamos de criar

/**
 * Busca a lista completa de serviços disponíveis no backend.
 * * @returns Uma Promise que resolve para um array de objetos Servico.
 */
export const getServicos = async (): Promise<Servico[]> => {
  try {
    // Faz a chamada GET para o endpoint /servicos
    // Usamos o tipo genérico <Servico[]> para que o Axios/TypeScript saiba
    // que `response.data` será um array de Serviços.
    const response = await api.get<Servico[]>('/servicos');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar a lista de serviços:", error);
    // Lança o erro para que o componente que chamou a função possa tratá-lo (ex: mostrar uma mensagem)
    throw error;
  }
};