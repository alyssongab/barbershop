import { Table, TableCell, TableHead, TableHeader, TableRow, TableBody } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProximoAgendamentoDTO } from "@/types/agendamento";
import { format } from 'date-fns';

interface TabelaGeralProps {
  agendamentos: ProximoAgendamentoDTO[];
}

const TabelaGeral = ({ agendamentos }: TabelaGeralProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#3d3939]">
                    Próximos Agendamentos
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-[#e4e4e4]">
                            <TableHead className="text-[#3d3939] font-medium">Data</TableHead>
                            <TableHead className="text-[#3d3939] font-medium">Horário</TableHead>
                            <TableHead className="text-[#3d3939] font-medium">Serviço</TableHead>
                            <TableHead className="text-[#3d3939] font-medium">Cliente</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {agendamentos.length > 0 ? (
                            agendamentos.map((appointment) => (
                                <TableRow key={appointment.id} className="border-b border-[#e4e4e4] text-base">
                                    <TableCell className="text-[#3d3939]">{format(new Date(appointment.dataHora), 'dd/MM/yyyy')}</TableCell>
                                    <TableCell className="text-[#3d3939]">{format(new Date(appointment.dataHora), 'HH:mm')}</TableCell>
                                    <TableCell className="text-[#3d3939]">{appointment.nomeServico}</TableCell>
                                    <TableCell className="text-[#3d3939]">{appointment.nomeCliente}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    Nenhum agendamento futuro.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default TabelaGeral;