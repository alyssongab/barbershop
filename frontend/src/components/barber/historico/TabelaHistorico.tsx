"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableRow, TableHead, TableHeader, TableBody, TableCell } from "@/components/ui/table";
import { Star } from "lucide-react";
import { Agendamento } from "@/types/agendamento";
import { format } from "date-fns";

interface TabelaHistoricoProps {
  historico: Agendamento[];
}

const TabelaHistorico = ({ historico }: TabelaHistoricoProps) => {
    return (
        <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#3d3939]">Histórico de Serviços</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-[#e4e4e4]">
                            <TableHead className="text-[#3d3939] font-medium">Data</TableHead>
                            <TableHead className="text-[#3d3939] font-medium">Horário</TableHead>
                            <TableHead className="text-[#3d3939] font-medium">Serviço</TableHead>
                            <TableHead className="text-[#3d3939] font-medium">Cliente</TableHead>
                            <TableHead className="text-[#3d3939] font-medium">Valor</TableHead>
                            <TableHead className="text-[#3d3939] font-medium">Avaliação</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {historico.length > 0 ? (
                        historico.map((appointment) => (
                            <TableRow key={appointment.id} className="border-b border-[#e4e4e4] text-base">
                                <TableCell className="text-[#3d3939]">{format(new Date(appointment.dataHoraAgendamento), 'dd/MM/yyyy')}</TableCell>
                                <TableCell className="text-[#3d3939]">{format(new Date(appointment.dataHoraAgendamento), 'HH:mm')}</TableCell>
                                <TableCell className="text-[#3d3939]">{appointment.servico.nome}</TableCell>
                                <TableCell className="text-[#3d3939]">{appointment.cliente.nome}</TableCell>
                                <TableCell className="text-[#3d3939] font-medium">
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(appointment.servico.preco)}
                                </TableCell>
                                <TableCell className="flex">
                                  {appointment.status.startsWith("CANCELADO") && <span className="text-gray-400 opacity-60">Cancelado</span>}
                                  {appointment.status === "CONCLUIDO" && !appointment.avaliacao && <span className="text-gray-500">Sem avaliação</span>}
                                  {appointment.status === "CONCLUIDO" && appointment.avaliacao && (
                                    <div className="flex items-center gap-1">
                                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                        <span className="font-medium">{appointment.avaliacao.nota}</span>
                                    </div>
                                  )}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                      <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">Nenhum histórico encontrado.</TableCell>
                      </TableRow>
                    )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>    
    );
}

export default TabelaHistorico;