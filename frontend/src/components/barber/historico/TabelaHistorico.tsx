"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableRow, TableHead, TableHeader, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "../../ui/button";
import { Star } from "lucide-react";
import { useState } from "react";

const TabelaHistorico = () => {

  const appointments = [
    {
      id: 1,
      date: "08/06/2025",
      time: "17:30",
      service: "Corte degradê",
      client: "Mbappé",
      value: "R$ 40,00",
      rate: 5
    },
    {
      id: 2,
      date: "10/06/2025",
      time: "19:00",
      service: "Corte + Barba + Sobrancelha",
      client: "Haaland",
      value: "R$ 80,00",
      rate: null
    },
    {
      id: 3,
      date: "11/06/2025",
      time: "16:00",
      service: "Corte + Barba + Sobrancelha",
      client: "Yamal",
      value: "R$ 80,00",
      rate: "cancelado"
    },
  ]

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
                    {appointments.map((appointment, index) => (
                        <TableRow key={index} className="border-b border-[#e4e4e4] text-base">
                            <TableCell className="text-[#3d3939]">{appointment.date}</TableCell>
                            <TableCell className="text-[#3d3939]">{appointment.time}</TableCell>
                            <TableCell className="text-[#3d3939]">{appointment.service}</TableCell>
                            <TableCell className="text-[#3d3939]">{appointment.client}</TableCell>
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
                                <span>Sem avaliação</span>
                              )}
                              {appointment.rate === "cancelado" && (
                                <span className="text-gray-400 opacity-60">Cancelado</span>
                              )}
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>    
    );
}

export default TabelaHistorico;