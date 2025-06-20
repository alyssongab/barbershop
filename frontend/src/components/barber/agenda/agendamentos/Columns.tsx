"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export type Agendamento = {
  id: number
  time: string
  client: string
  service: string
  price: number
  status: "concluido" | "pendente" | "confirmado" | "cancelado"
}

const statusOptions = [
  { value: "concluido", label: "Concluído" },
  { value: "pendente", label: "Pendente" },
  { value: "confirmado", label: "Confirmado" },
  { value: "cancelado", label: "Cancelado" },
];

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
    cell: ({ row, handleStatusChange }: any) => {
return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-2">
            <div className="flex flex-col gap-1">
              {statusOptions.map(option => (
                <Button
                  key={option.value}
                  variant="ghost"
                  className="justify-start w-full"
                  onClick={() => handleStatusChange(row.original.id, option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      );
    },
    enableSorting: false,
    enableHiding: false,
  }
];