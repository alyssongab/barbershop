// Tipos que espelham os DTOs do backend

export interface UsuarioSimples {
  id: number;
  nome: string;
}

export interface ServicoSimples {
  id: number;
  nome: string;
  preco: number;
}

export interface Avaliacao {
  nota: number;
  comentario: string;
}

export interface Agendamento {
  id: number;
  cliente: UsuarioSimples;
  barbeiro: UsuarioSimples;
  servico: ServicoSimples;
  dataHoraAgendamento: string; // Vem como string ISO da API
  status: 'AGENDADO' | 'CONCLUIDO' | 'CANCELADO_PELO_CLIENTE' | 'CANCELADO_PELO_SALAO';
  avaliacao: Avaliacao | null;
}

export interface ProximoAgendamentoDTO {
  id: number;
  dataHora: string; // Vem como string ISO da API
  nomeServico: string;
  nomeCliente: string;
}