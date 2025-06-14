"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableRow, TableHead, TableHeader, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "../../ui/button";
import { Star } from "lucide-react";
import ModalAvaliar from "./ModalAvaliar";
import { useState } from "react";

const TabelaHistorico = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleOpenModal = (appointment: any) => {
    setSelectedAppointment(appointment)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const appointments = [
    {
      id: 1,
      date: "08/06/2025",
      time: "17:30",
      service: "Corte degradê",
      barber: "Luiz David",
      value: "R$ 40,00",
      rate: 5
    },
    {
      id: 2,
      date: "10/06/2025",
      time: "19:00",
      service: "Corte + Barba + Sobrancelha",
      barber: "Matheus Victor",
      value: "R$ 80,00",
      rate: null
    },
    {
      id: 3,
      date: "11/06/2025",
      time: "16:00",
      service: "Corte + Barba + Sobrancelha",
      barber: "Bob Esponja",
      value: "R$ 80,00",
      rate: "cancelado"
    },
  ]

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
                    {appointments.map((appointment, index) => (
                        <TableRow key={index} className="border-b border-[#e4e4e4]">
                            <TableCell className="text-[#3d3939]">{appointment.date}</TableCell>
                            <TableCell className="text-[#3d3939]">{appointment.time}</TableCell>
                            <TableCell className="text-[#3d3939]">{appointment.service}</TableCell>
                            <TableCell className="text-[#3d3939]">{appointment.barber}</TableCell>
                            <TableCell className="text-[#3d3939] font-medium">{appointment.value}</TableCell>
                            <TableCell className="flex">
                              {typeof appointment.rate === "number" && (
                                <>
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`w-5 h-5 ${star <= appointment.rate ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                      fill={star <= appointment.rate ? "yellow" : "none"}
                                    />
                                  ))}
                                </>
                              )}
                              {appointment.rate === null && (
                                <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleOpenModal(appointment)} 
                                className="bg-black text-white hover:bg-[#4d4d4d] hover:text-white cursor-pointer">
                                  Avaliar
                                </Button>
                              )}
                              {appointment.rate === "cancelado" && (
                                <span className="text-gray-400 opacity-60">cancelado</span>
                              )}
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </CardContent>
            {isModalOpen && selectedAppointment && ( 
            <ModalAvaliar
              appointment={selectedAppointment}  
              onClose={handleCloseModal} 
              /> 
            )}
        </Card>
    );
}

export default TabelaHistorico;