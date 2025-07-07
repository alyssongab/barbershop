"use client";

import { useEffect, useState, useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Subheader from "@/components/layout/Subheader";
import CardDetalhes from "@/components/cliente/agendamento/CardDetalhes";
import CardAgendamento from "@/components/cliente/agendamento/CardAgendamento";
import TabelaAgendamentos from "@/components/cliente/agendamento/TabelaAgendamentos";
import PrivateRoute from "@/components/auth/PrivateRoutes";
import { Loader2 } from "lucide-react";

// Nossos tipos e serviços
import { getMeusAgendamentos } from "@/services/agendamentoService";
import { Agendamento } from "@/types/agendamento";

const PaginaAgendamento = () => {
  // 1. Estados para armazenar os dados, o carregamento e possíveis erros
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Função para buscar os dados, que será chamada no useEffect
  const fetchAgendamentos = async () => {
    try {
      setIsLoading(true); // Inicia o carregamento
      const data = await getMeusAgendamentos();
      // Ordena os agendamentos por data, do mais recente para o mais antigo
      data.sort((a, b) => new Date(b.dataHoraAgendamento).getTime() - new Date(a.dataHoraAgendamento).getTime());
      setAgendamentos(data);
    } catch (err) {
      setError("Não foi possível carregar seus agendamentos.");
    } finally {
      setIsLoading(false); // Finaliza o carregamento, mesmo se der erro
    }
  };
  
  // 3. useEffect para buscar os dados quando o componente é montado
  useEffect(() => {
    fetchAgendamentos();
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  // 4. Lógica para encontrar o próximo agendamento futuro
  // useMemo otimiza o cálculo, evitando que ele seja refeito a cada renderização
  const proximoAgendamento = useMemo(() => {
    const agora = new Date();
    return agendamentos
      .filter(ag => ag.status === 'AGENDADO' && new Date(ag.dataHoraAgendamento) > agora)
      .sort((a, b) => new Date(a.dataHoraAgendamento).getTime() - new Date(b.dataHoraAgendamento).getTime())[0];
  }, [agendamentos]);

  // 5. Filtra apenas os agendamentos que devem aparecer na tabela (status 'AGENDADO')
  const agendamentosNaTabela = useMemo(() => {
      return agendamentos.filter(ag => ag.status === 'AGENDADO');
  }, [agendamentos]);
  
  // 6. Função para ser chamada pela Tabela quando um agendamento é cancelado com sucesso
  // Isso atualiza a lista sem precisar recarregar a página inteira
  const handleCancelSuccess = (idCancelado: number) => {
    setAgendamentos(prev => prev.filter(ag => ag.id !== idCancelado));
  };

  return (
    <PrivateRoute>
      <DashboardLayout>
        <Subheader titulo="Agendamento" />
        {isLoading ? (
          // Enquanto carrega, mostra um ícone de loader centralizado
          <div className="flex h-full w-full items-center justify-center p-10">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        ) : error ? (
          // Se der erro, mostra a mensagem
          <p className="text-red-500 p-10">{error}</p>
        ) : (
          // Se carregou com sucesso, mostra o conteúdo
          <>
            {/* div dos cards */}
            <div className="grid grid-cols-2 justify-items-center p-4 gap-4">
              {/* 7. Passa o próximo agendamento como prop */}
              <CardDetalhes proximoAgendamento={proximoAgendamento} />
              <CardAgendamento onAgendamentoSuccess={fetchAgendamentos} />
            </div>
            {/* div da table */}
            <div className="mt-8 p-4">
              {/* 8. Passa a lista filtrada e a função de callback como prop */}
              <TabelaAgendamentos 
                agendamentos={agendamentosNaTabela}
                onCancelSuccess={handleCancelSuccess}
              />
            </div>
          </>
        )}
      </DashboardLayout>
    </PrivateRoute>
  );
};

export default PaginaAgendamento;