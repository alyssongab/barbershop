"use client";

import { useState } from "react";
import { columns as baseColumns, Agendamento } from "./Columns";
import { DataTable } from "./DataTable";

const agendamentos: Agendamento[] = [
    {
        id: 1,
        time: "14:00",
        client: "Cypher da Silva",
        service: "Corte + Barba",
        price: 60.00,
        status: "confirmado"
    },
    {
        id: 2,
        time: "14:30",
        client: "Neon Val",
        service: "Sobrancelha",
        price: 15.00,
        status: "pendente"
    },
    {
        id: 3,
        time: "16:30",
        client: "Sova Ruim",
        service: "Corte + Barba + Sobrancelha",
        price: 80.00,
        status: "concluido"
    },
    {
        id: 4,
        time: "17:30",
        client: "Lionel Messi",
        service: "Corte + Barba + Sobrancelha",
        price: 80.00,
        status: "cancelado"
    },
];

const AgendaTabela = () => {
  const [data, setData] = useState<Agendamento[]>(agendamentos);

  const handleStatusChange = (id: number, newStatus: Agendamento["status"]) => {
    setData(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  // Only override the "actions" column
  const columns = baseColumns.map(col =>
    col.id === "actions"
      ? {
          ...col,
          cell: ({ row }: any) =>
            (baseColumns.find(c => c.id === "actions")?.cell as any)?.({ row, handleStatusChange }),
        }
      : col
  );

  return (
    <div className="container mx-auto py-5">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AgendaTabela;