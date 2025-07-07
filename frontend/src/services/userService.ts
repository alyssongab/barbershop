import api from './api';
import { Barbeiro } from '@/types/barbeiro';

// ======================================================
// === TIPOS E FUNÇÕES PARA O REGISTRO PÚBLICO (CLIENTE) ===
// ======================================================

export type RegisterUserData = {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  nivelAcesso: 'CLIENTE';
};

export const registerUser = async (userData: RegisterUserData) => {
  try {
    const response = await api.post('/usuarios', userData);
    return response.data;
  } catch (error) {
    console.error("Erro no cadastro de cliente:", error);
    throw error;
  }
};


// ======================================================
// === TIPOS E FUNÇÕES PARA O PAINEL DO ADMIN (BARBEIRO) ===
// ======================================================

// DTO para criar um barbeiro (com senha)
export interface BarbeiroCreateDTO {
  nome: string;
  email: string;
  telefone?: string;
  senha: string;
}

// DTO para atualizar um barbeiro
export interface BarbeiroUpdateDTO {
    nome: string;
    email: string;
    telefone?: string;
}

// --- FUNÇÕES DE API ---

export const getBarbeiros = async (): Promise<Barbeiro[]> => {
  const response = await api.get('/usuarios/barbeiros');
  return response.data;
};

/**
 * Cria um novo BARBEIRO através do endpoint seguro de admin.
 */
export const createBarbeiro = async (data: BarbeiroCreateDTO) => {
    // Aponta para a nova rota de admin segura
    const response = await api.post('/admin/usuarios', {
        ...data,
        nivelAcesso: 'BARBEIRO'
    });
    return response.data;
};

export const updateBarbeiro = async (id: number, data: BarbeiroUpdateDTO): Promise<Barbeiro> => {
    // O endpoint de update também precisa ser protegido
    const response = await api.put(`/admin/usuarios/${id}`, data);
    return response.data;
};

export const deleteBarbeiro = async (id: number): Promise<void> => {
    await api.delete(`/admin/usuarios/${id}`);
};

export const toggleBarbeiroStatus = async (id: number): Promise<void> => {
    await api.patch(`/admin/usuarios/${id}/toggle-status`);
};