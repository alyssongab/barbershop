"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Subheader from "@/components/layout/Subheader";
import PrivateRoute from "@/components/auth/PrivateRoutes";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { DataTable } from "@/components/barber/agenda/agendamentos/DataTable"; // Este componente é reutilizável e deve ser mantido
import { Agendamento } from "@/types/agendamento";
import { getAgendaBarbeiroPorData, atualizarStatusAgendamento } from "@/services/agendamentoService";

// Definindo o tipo para os status que o barbeiro pode selecionar
type StatusOption = "AGENDADO" | "CONCLUIDO" | "CANCELADO_PELO_SALAO";

const statusOptions: { value: StatusOption; label: string }[] = [
  { value: "AGENDADO", label: "Reagendar/Confirmar" },
  { value: "CONCLUIDO", label: "Concluído" },
  { value: "CANCELADO_PELO_SALAO", label: "Cancelar" },
];

const AgendaBarberPage = () => {
    // === ESTADOS ===
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCalendarOpen, setCalendarOpen] = useState(false);
    
    // === LÓGICA DE DADOS ===
    const fetchAgenda = useCallback(async () => {
        setIsLoading(true);
        try {
            const dateString = format(selectedDate, "yyyy-MM-dd");
            const data = await getAgendaBarbeiroPorData(dateString);
            setAgendamentos(data);
        } catch (error) {
            console.error("Erro ao buscar agenda:", error);
            setAgendamentos([]); // Limpa a lista em caso de erro
        } finally {
            setIsLoading(false);
        }
    }, [selectedDate]);

    useEffect(() => {
        fetchAgenda();
    }, [fetchAgenda]);

    const handleStatusChange = async (id: number, newStatus: StatusOption) => {
        // Atualiza a UI otimisticamente para uma resposta mais rápida
        setAgendamentos(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
        try {
            await atualizarStatusAgendamento(id, newStatus);
        } catch (error) {
            alert("Falha ao atualizar o status. A lista será recarregada.");
            fetchAgenda(); // Recarrega os dados em caso de falha
        }
    };
    
    // === DADOS CALCULADOS PARA OS CARDS ===
    const faturamentoDoDia = useMemo(() => {
        return agendamentos
            .filter(ag => ag.status === 'CONCLUIDO')
            .reduce((total, ag) => total + ag.servico.preco, 0);
    }, [agendamentos]);

    // === DEFINIÇÃO DAS COLUNAS DA TABELA (Internalizado de Columns.tsx) ===
    const columns: ColumnDef<Agendamento>[] = [
        { accessorKey: "dataHoraAgendamento", header: "Horário", cell: ({ row }) => format(new Date(row.original.dataHoraAgendamento), "HH:mm") },
        { accessorKey: "cliente.nome", header: "Cliente" },
        { accessorKey: "servico.nome", header: "Serviço" },
        { accessorKey: "servico.preco", header: "Valor", cell: ({ row }) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(row.original.servico.preco) },
        { accessorKey: "status", header: "Status" },
        {
            id: "actions", header: "Ações", cell: ({ row }) => (
                <Popover>
                    <PopoverTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="w-5 h-5" /></Button></PopoverTrigger>
                    <PopoverContent className="w-48 p-2">
                        {statusOptions.map(option => (
                            <Button key={option.value} variant="ghost" className="justify-start w-full" onClick={() => handleStatusChange(row.original.id, option.value)}>
                                {option.label}
                            </Button>
                        ))}
                    </PopoverContent>
                </Popover>
            )
        }
    ];

    return(
        <PrivateRoute>
            <DashboardLayout>
                <Subheader titulo="Agenda"/>
                {/* cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                        <CardHeader><CardTitle>Selecionar Data</CardTitle><CardDescription>Escolha o dia para visualizar</CardDescription></CardHeader>
                        <CardContent>
                            <Popover open={isCalendarOpen} onOpenChange={setCalendarOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {format(selectedDate, "PPP", { locale: ptBR })}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={selectedDate} onSelect={(date) => { if(date) setSelectedDate(date); setCalendarOpen(false); }} locale={ptBR} />
                                </PopoverContent>
                            </Popover>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="opacity-80">Total de Agendamentos</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-3xl font-bold">{agendamentos.length}</p>
                            <CardDescription>Para o dia selecionado</CardDescription>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="opacity-80">Faturamento do Dia</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-3xl font-bold">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(faturamentoDoDia)}</p>
                            <CardDescription>Total de serviços concluídos</CardDescription>
                        </CardContent>
                    </Card>
                </div>
                
                {/* agenda */}
                <Card>
                    <CardHeader>
                        <CardTitle>Agendamentos - {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}</CardTitle>
                        <CardDescription>{agendamentos.length} agendamento(s) para este dia</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                             <div className="flex h-64 w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-gray-500" /></div>
                        ) : (
                            <DataTable columns={columns} data={agendamentos} />
                        )}
                    </CardContent>
                </Card>
            </DashboardLayout>
        </PrivateRoute>
    );
};

export default AgendaBarberPage;