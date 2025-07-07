// Este arquivo define a estrutura de dados de um Serviço,
// espelhando a entidade que temos no backend.

export interface Servico {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  duracaoEstimadaMin: number;
  ativo: boolean
}