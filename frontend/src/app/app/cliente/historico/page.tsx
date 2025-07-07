"use client";

import { useEffect, useState, useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Subheader from "@/components/layout/Subheader";
import TabelaHistorico from "@/components/cliente/historico/TabelaHistorico";
import PrivateRoute from "@/components/auth/PrivateRoutes";
import { getMeusAgendamentos } from "@/services/agendamentoService";
import { Agendamento } from "@/types/agendamento";
import { Loader2 } from "lucide-react";

const PaginaHistorico = () => {
    // 1. Estados para os dados, loading e erros
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 2. Função para buscar os dados, que pode ser reutilizada
    const fetchHistorico = async () => {
        setIsLoading(true);
        try {
            const data = await getMeusAgendamentos();
            setAgendamentos(data);
        } catch (err) {
            setError("Não foi possível carregar seu histórico.");
        } finally {
            setIsLoading(false);
        }
    };

    // 3. Busca os dados quando a página é carregada pela primeira vez
    useEffect(() => {
        fetchHistorico();
    }, []);

    // 4. Filtra a lista completa para pegar apenas o que é "histórico"
    const historico = useMemo(() => {
        return agendamentos
            .filter(ag => ag.status === 'CONCLUIDO' || ag.status.startsWith('CANCELADO'))
            .sort((a, b) => new Date(b.dataHoraAgendamento).getTime() - new Date(a.dataHoraAgendamento).getTime()); // Ordena do mais novo para o mais antigo
    }, [agendamentos]);

    return (
        <PrivateRoute>
            <DashboardLayout>
                <Subheader titulo="Histórico de Agendamentos" />
                <div className="p-4">
                    {isLoading ? (
                        <div className="flex h-64 w-full items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                        </div>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : (
                        // 5. Passa a lista filtrada e a função de recarregar para a tabela
                        <TabelaHistorico
                            historico={historico}
                            onAvaliacaoSuccess={fetchHistorico}
                        />
                    )}
                </div>
            </DashboardLayout>
        </PrivateRoute>
    );
}

export default PaginaHistorico;