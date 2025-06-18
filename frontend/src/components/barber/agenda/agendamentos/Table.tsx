import { columns, Agendamento } from "./Columns";
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
    return(
        <div className="container mx-auto py-5">
            <DataTable columns={columns} data={agendamentos} />
        </div>
    );
}

export default AgendaTabela;