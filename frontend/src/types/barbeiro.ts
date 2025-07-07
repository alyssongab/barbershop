// Este tipo representa o usuário com o perfil de Barbeiro,
// espelhando o UsuarioResponseDTO do backend.
export interface Barbeiro {
  id: number;
  nome: string;
  email: string;
  telefone: string | null;
  nivelAcesso: 'BARBEIRO';
  dataCadastro: string;
  ativo: boolean;
}