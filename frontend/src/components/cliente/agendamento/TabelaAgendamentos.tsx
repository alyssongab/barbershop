"use client";

import { useState } from "react";
import { format } from 'date-fns';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableRow, TableHead, TableHeader, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "../../ui/button";
import { X } from "lucide-react";
import ModalCancelar from "./ModalCancelar";
import { Agendamento } from "@/types/agendamento";
import { cancelarAgendamento } from "@/services/agendamentoService";

interface TabelaAgendamentosProps {
  agendamentos: Agendamento[];
  onCancelSuccess: (idCancelado: number) => void; 
}

const TabelaAgendamentos = ({ agendamentos, onCancelSuccess }: TabelaAgendamentosProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Agendamento | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenModal = (appointment: Agendamento) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };
  
  const handleConfirmCancel = async () => {
    if (!selectedAppointment) return;

    setIsSubmitting(true);
    try {
        await cancelarAgendamento(selectedAppointment.id);
        
        // 3. Chame a função recebida via prop em vez de recarregar a página
        onCancelSuccess(selectedAppointment.id);
        
        handleCloseModal();
    } catch (error) {
        alert("Erro ao cancelar o agendamento.");
    } finally {
        setIsSubmitting(false);
    }
  };


  return (
    <Card>
      {/* O resto do seu componente JSX continua exatamente o mesmo... */}
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
              <TableHead className="text-[#3d3939] font-medium">Barbeiro</TableHead>
              <TableHead className="text-[#3d3939] font-medium">Valor</TableHead>
              <TableHead className="w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agendamentos.length > 0 ? agendamentos.map((appointment) => (
              <TableRow key={appointment.id} className="border-b border-[#e4e4e4] text-base">
                <TableCell className="text-[#3d3939]">{format(new Date(appointment.dataHoraAgendamento), 'dd/MM/yyyy')}</TableCell>
                <TableCell className="text-[#3d3939]">{format(new Date(appointment.dataHoraAgendamento), 'HH:mm')}</TableCell>
                <TableCell className="text-[#3d3939]">{appointment.servico.nome}</TableCell>
                <TableCell className="text-[#3d3939]">{appointment.barbeiro.nome}</TableCell>
                <TableCell className="text-[#3d3939] font-medium">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(appointment.servico.preco)}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    className="bg-[#c02222] hover:bg-[#a01d1d] text-white px-3 py-1 rounded-md flex items-center gap-1 text-xs cursor-pointer"
                    onClick={() => handleOpenModal(appointment)}
                  >
                    <X className="w-3 h-3" />
                    Cancelar
                  </Button>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500 py-4">
                  Nenhum agendamento futuro encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      {isModalOpen && (
        <ModalCancelar
          onClose={handleCloseModal}
          onConfirm={handleConfirmCancel}
          isSubmitting={isSubmitting}
          appointment={selectedAppointment}
        />
      )}
    </Card>
  );
};

export default TabelaAgendamentos;