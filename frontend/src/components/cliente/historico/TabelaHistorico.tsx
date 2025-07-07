"use client";

import { useState } from "react";
import { format } from 'date-fns';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableRow, TableHead, TableHeader, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import ModalAvaliar from "./ModalAvaliar";
import { Agendamento } from "@/types/agendamento"; // Importa o nosso tipo

// 1. Define as props que o componente recebe
interface TabelaHistoricoProps {
  historico: Agendamento[];
  onAvaliacaoSuccess: () => void; // Função para recarregar os dados
}

const TabelaHistorico = ({ historico, onAvaliacaoSuccess }: TabelaHistoricoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Agendamento | null>(null);

  const handleOpenModal = (appointment: Agendamento) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const renderCellAvaliacao = (appointment: Agendamento) => {
    // Caso 1: Agendamento foi cancelado
    if (appointment.status.startsWith("CANCELADO")) {
      return <span className="text-gray-400 opacity-60">Cancelado</span>;
    }

    // Caso 2: Agendamento concluído e JÁ AVALIADO
    if (appointment.status === "CONCLUIDO" && appointment.avaliacao) {
      return (
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${star <= appointment.avaliacao!.nota ? "text-yellow-400" : "text-gray-300"}`}
              fill={star <= appointment.avaliacao!.nota ? "currentColor" : "none"}
            />
          ))}
        </div>
      );
    }
    
    // Caso 3: Agendamento concluído e AINDA NÃO AVALIADO
    if (appointment.status === "CONCLUIDO" && !appointment.avaliacao) {
      return (
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => handleOpenModal(appointment)} 
          className="bg-black text-white hover:bg-[#4d4d4d] hover:text-white cursor-pointer"
        >
          Avaliar
        </Button>
      );
    }

    // Caso padrão (não deve acontecer no histórico, mas é uma boa prática)
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#3d3939]">Histórico de Agendamentos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#e4e4e4]">
              <TableHead className="text-[#3d3939] font-medium">Data</TableHead>
              <TableHead className="text-[#3d3939] font-medium">Horário</TableHead>
              <TableHead className="text-[#3d3939] font-medium">Serviço</TableHead>
              <TableHead className="text-[#3d3939] font-medium">Barbeiro</TableHead>
              <TableHead className="text-[#3d3939] font-medium">Valor</TableHead>
              <TableHead className="text-[#3d3939] font-medium">Avaliação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historico.length > 0 ? historico.map((appointment) => (
              <TableRow key={appointment.id} className="border-b border-[#e4e4e4] text-base">
                <TableCell className="text-[#3d3939]">{format(new Date(appointment.dataHoraAgendamento), 'dd/MM/yyyy')}</TableCell>
                <TableCell className="text-[#3d3939]">{format(new Date(appointment.dataHoraAgendamento), 'HH:mm')}</TableCell>
                <TableCell className="text-[#3d3939]">{appointment.servico.nome}</TableCell>
                <TableCell className="text-[#3d3939]">{appointment.barbeiro.nome}</TableCell>
                <TableCell className="text-[#3d3939] font-medium">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(appointment.servico.preco)}
                </TableCell>
                <TableCell>
                  {renderCellAvaliacao(appointment)}
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500 py-4">
                  Nenhum histórico de agendamentos encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      {isModalOpen && selectedAppointment && (
        <ModalAvaliar
          appointment={selectedAppointment}
          onClose={handleCloseModal}
          onAvaliacaoSuccess={() => {
            onAvaliacaoSuccess(); // Chama a função do pai para recarregar os dados
            handleCloseModal(); // Fecha o modal
          }}
        />
      )}
    </Card>
  );
};

export default TabelaHistorico;