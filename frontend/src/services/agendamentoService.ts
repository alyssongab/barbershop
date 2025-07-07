import api from './api';
import { Agendamento } from '@/types/agendamento'; // Importa nosso novo tipo
import { ProximoAgendamentoDTO } from "@/types/agendamento";

// Busca os agendamentos do cliente logado
export const getMeusAgendamentos = async (): Promise<Agendamento[]> => {
  try {
    const response = await api.get('/agendamentos/meus-agendamentos');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar agendamentos", error);
    throw error;
  }
};

// Cancela um agendamento específico
export const cancelarAgendamento = async (id: number): Promise<void> => {
  try {
    // Usamos o endpoint que criamos, o 'peloSalao' fica como false por padrão
    await api.patch(`/agendamentos/${id}/cancelar`);
  } catch (error) {
    console.error(`Erro ao cancelar agendamento ${id}`, error);
    throw error;
  }
}

// Tipagem para os dados do DTO de criação
export interface AgendamentoCreateDTO {
  idCliente: number;
  idBarbeiro: number;
  idServico: number;
  dataHoraAgendamento: string; // Formato ISO: "YYYY-MM-DDTHH:mm:ss"
}

export const getHorariosDisponiveis = async (barbeiroId: number, data: string): Promise<string[]> => {
  const response = await api.get('/agendamentos/horarios-disponiveis', {
    params: { barbeiroId, data } // Envia como query params: ?barbeiroId=1&data=2025-07-10
  });
  return response.data;
};

export const criarAgendamento = async (dados: AgendamentoCreateDTO): Promise<Agendamento> => {
  const response = await api.post('/agendamentos', dados);
  return response.data;
};

export const getAgendaBarbeiroPorData = async (data: string): Promise<Agendamento[]> => {
  const response = await api.get('/agendamentos/minha-agenda-por-data', {
    params: { data } // data no formato "YYYY-MM-DD"
  });
  return response.data;
};

type Status = 'AGENDADO' | 'CONCLUIDO' | 'CANCELADO_PELO_CLIENTE' | 'CANCELADO_PELO_SALAO';

export const atualizarStatusAgendamento = async (id: number, novoStatus: Status): Promise<Agendamento> => {
  const response = await api.patch(`/agendamentos/${id}/status`, { novoStatus });
  return response.data;
};

export const listarProximosDoBarbeiro = async (): Promise<ProximoAgendamentoDTO[]> => {
    const response = await api.get('/agendamentos/proximos');
    return response.data;
};