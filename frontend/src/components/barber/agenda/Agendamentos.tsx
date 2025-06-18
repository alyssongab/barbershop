import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHead, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Clock } from "lucide-react";
import AgendaTabela from "./agendamentos/Table";

const Agendamentos = () => {
    return(
        <Card>
            <CardHeader>
                <CardTitle>Agendamentos - (Dia -- de --)</CardTitle>
                <CardDescription>4 agendamento(s) para este dia</CardDescription>
            </CardHeader>
            <CardContent>
                <AgendaTabela />
            </CardContent>
        </Card>
    )
}

export default Agendamentos;