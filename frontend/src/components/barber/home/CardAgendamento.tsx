import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { ProximoAgendamentoDTO } from "@/types/agendamento";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CardAgendamentoProps {
    proximoAgendamento: ProximoAgendamentoDTO | undefined;
}

const CardAgendamento = ({ proximoAgendamento }: CardAgendamentoProps) => {
    return (
        <Card className="w-1/3 gap-1 transform transition-all duration-300">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-md font-medium text-[#3d3939]">Próximo agendamento</CardTitle>
                    <Calendar className="w-5 h-5 text-[#3d3939]" />
                </div>
            </CardHeader>
            <CardContent>
                {proximoAgendamento ? (
                    <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-[#140f0b]">
                            {/* Formata a data e hora de forma amigável */}
                            {format(new Date(proximoAgendamento.dataHora), "PPP 'às' HH:mm", { locale: ptBR })}
                        </h3>
                        <p className="text-[#3d3939]">{proximoAgendamento.nomeCliente} - {proximoAgendamento.nomeServico}</p>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">Nenhum agendamento próximo.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default CardAgendamento;