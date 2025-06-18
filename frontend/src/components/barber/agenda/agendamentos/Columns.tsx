"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Agendamento = {
  id: number
  time: string
  client: string
  service: string
  price: number
  status: "concluido" | "pendente" | "confirmado" | "cancelado"
}

export const columns: ColumnDef<Agendamento>[] = [
  {
    accessorKey: "time",
    header: "Horário",
  },
  {
    accessorKey: "client",
    header: "Cliente"
  },
  {
    accessorKey: "service",
    header: "Serviço"
  },
  {
    accessorKey: "price",
    header: "Valor"
  },
  {
    accessorKey: "status",
    header: "Status"
  },
{
    id: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="w-5 h-5" />
      </Button>
    ),
    enableSorting: false,
    enableHiding: false,
  }
];