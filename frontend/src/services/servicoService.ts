import api from './api';
import { Servico } from '@/types/servico'; // Usaremos o tipo que já criamos

// DTO para criar/atualizar um serviço
export interface ServicoDTO {
  nome: string;
  descricao: string;
  preco: number;
  duracaoEstimadaMin: number;
}

export const getServicos = async (): Promise<Servico[]> => {
  const response = await api.get<Servico[]>('/servicos');
  return response.data;
};

export const createServico = async (data: ServicoDTO): Promise<Servico> => {
  const response = await api.post<Servico>('/servicos', data);
  return response.data;
};

export const updateServico = async (id: number, data: ServicoDTO): Promise<Servico> => {
  const response = await api.put<Servico>(`/servicos/${id}`, data);
  return response.data;
};

export const deleteServico = async (id: number): Promise<void> => {
  await api.delete(`/servicos/${id}`);
};

export const toggleServicoStatus = async (id: number): Promise<void> => {
  await api.patch(`/servicos/${id}/toggle-status`);
};