"use client";

import { useEffect, useState, useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Subheader from "@/components/layout/Subheader";
import CardAgendamento from "@/components/barber/home/CardAgendamento";
import TabelaGeral from "@/components/barber/home/TabelaGeral";
import PrivateRoute from "@/components/auth/PrivateRoutes";
import { Loader2 } from "lucide-react";

// Serviços e Tipos
import { listarProximosDoBarbeiro } from "@/services/agendamentoService";
import { ProximoAgendamentoDTO } from "@/types/agendamento"; // Precisamos deste tipo

const HomeBarberPage = () => {
    const [proximosAgendamentos, setProximosAgendamentos] = useState<ProximoAgendamentoDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProximos = async () => {
            try {
                const data = await listarProximosDoBarbeiro();
                setProximosAgendamentos(data);
            } catch (error) {
                console.error("Erro ao buscar próximos agendamentos:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProximos();
    }, []);

    // O próximo agendamento é simplesmente o primeiro item da lista recebida
    const proximoAgendamento = useMemo(() => proximosAgendamentos[0], [proximosAgendamentos]);

    return (
        <PrivateRoute>
            <DashboardLayout>
                <Subheader titulo="Home" />
                {isLoading ? (
                    <div className="flex h-64 w-full items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                    </div>
                ) : (
                    <>
                        {/* div dos cards */}
                        <div className="p-4 flex justify-items-center">
                            {/* Passa o primeiro agendamento da lista para o card */}
                            <CardAgendamento proximoAgendamento={proximoAgendamento} />
                        </div>
                        {/* div da table */}
                        <div className="mt-8 p-4">
                            {/* Passa a lista completa para a tabela */}
                            <TabelaGeral agendamentos={proximosAgendamentos} />
                        </div>
                    </>
                )}
            </DashboardLayout>
        </PrivateRoute>
    );
}

export default HomeBarberPage;