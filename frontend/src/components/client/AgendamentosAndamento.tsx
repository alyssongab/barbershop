"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableRow, TableHead, TableHeader, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import ModalCancelar from "./ModalCancelar";
import { useState } from "react";

const AgendamentosAndamento = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const appointments = [
    {
      date: "10/06/2025",
      time: "14:30",
      service: "Corte degradê",
      barber: "Matheus Victor",
      value: "R$ 40,00",
    },
    {
      date: "12/06/2025",
      time: "15:00",
      service: "Corte + Barba + Sobrancelha",
      barber: "Matheus Victor",
      value: "R$ 80,00",
    },
  ]

    return (
        <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#3d3939]">Agendamentos em andamento</CardTitle>
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
                    {appointments.map((appointment, index) => (
                        <TableRow key={index} className="border-b border-[#e4e4e4]">
                            <TableCell className="text-[#3d3939]">{appointment.date}</TableCell>
                            <TableCell className="text-[#3d3939]">{appointment.time}</TableCell>
                            <TableCell className="text-[#3d3939]">{appointment.service}</TableCell>
                            <TableCell className="text-[#3d3939]">{appointment.barber}</TableCell>
                            <TableCell className="text-[#3d3939] font-medium">{appointment.value}</TableCell>
                            <TableCell>
                                <Button
                                size="sm"
                                className="bg-[#c02222] hover:bg-[#a01d1d] text-white px-3 py-1 rounded-md flex items-center gap-1 text-xs cursor-pointer"
                                onClick={handleOpenModal}
                                >
                                <X className="w-3 h-3" />
                                Cancelar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </CardContent>
            {isModalOpen && <ModalCancelar onClose={handleCloseModal} /> }
        </Card>
    )
}

export default AgendamentosAndamento;