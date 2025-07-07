import api from './api';

export interface AvaliacaoCreateData {
  idAgendamento: number;
  nota: number;
  comentario?: string;
}

export const criarAvaliacao = async (data: AvaliacaoCreateData) => {
  const response = await api.post('/avaliacoes', data);
  return response.data;
};