"use client";

import { useEffect, useState, useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Subheader from "@/components/layout/Subheader";
import { CardTotal, CardAvaliacao, CardMedia } from "@/components/barber/historico/CardsHistorico";
import TabelaHistorico from "@/components/barber/historico/TabelaHistorico";
import PrivateRoute from "@/components/auth/PrivateRoutes";
import { getMinhaAgendaCompleta } from "@/services/agendamentoService";
import { Agendamento } from "@/types/agendamento";
import { Loader2 } from "lucide-react";

const HistoricoBarberPage = () => {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMinhaAgendaCompleta();
                setAgendamentos(data);
            } catch (error) {
                console.error("Erro ao buscar histórico do barbeiro:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
    
    // Calcula os dados para os cards
    const stats = useMemo(() => {
        const concluidos = agendamentos.filter(ag => ag.status === 'CONCLUIDO');
        const avaliados = concluidos.filter(ag => ag.avaliacao !== null);
        
        const totalServicos = concluidos.length;
        const totalAvaliacoes = avaliados.length;
        
        const somaNotas = avaliados.reduce((acc, ag) => acc + (ag.avaliacao?.nota || 0), 0);
        const mediaAvaliacoes = totalAvaliacoes > 0 ? somaNotas / totalAvaliacoes : 0;
        
        return { totalServicos, totalAvaliacoes, mediaAvaliacoes };
    }, [agendamentos]);
    
    // Filtra os dados para a tabela
    const historicoTabela = useMemo(() => {
        return agendamentos
            .filter(ag => ag.status !== 'AGENDADO')
            .sort((a, b) => new Date(b.dataHoraAgendamento).getTime() - new Date(a.dataHoraAgendamento).getTime());
    }, [agendamentos]);


    return(
        <PrivateRoute>
            <DashboardLayout>
                <Subheader titulo="Histórico"/>
                {isLoading ? (
                    <div className="flex h-64 w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
                ) : (
                    <>
                        {/* cards */}
                        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <CardTotal valor={stats.totalServicos} />
                            <CardAvaliacao valor={stats.totalAvaliacoes} />
                            <CardMedia valor={stats.mediaAvaliacoes} />
                        </div>
                        {/* tabela */}
                        <div className="mt-4 p-4">
                            <TabelaHistorico historico={historicoTabela} />
                        </div>
                    </>
                )}
            </DashboardLayout>
        </PrivateRoute>
    )
}

export default HistoricoBarberPage;