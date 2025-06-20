import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
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