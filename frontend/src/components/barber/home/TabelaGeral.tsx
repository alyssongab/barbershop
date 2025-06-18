import { Table, TableCell, TableHead, TableHeader, TableRow, TableBody } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const appointments = [
  {
    date: "20/06/2025",
    time: "14:30",
    service: "Corte de cabelo",
    cliente: "Luis Suarez",
  },
  {
    date: "19/06/2025",
    time: "15:00",
    service: "Corte + Barba + Sobrancelha",
    cliente: "Rian Rodrigues",
  },
  {
    date: "19/06/2025",
    time: "19:00",
    service: "Barba completa",
    cliente: "Jorge Abílio",
  },
];

const TabelaGeral = () => {
    return(
        <Card>
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
                        <TableHead className="text-[#3d3939] font-medium">Cliente</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appointments.map((appointment, index) => (
                    <TableRow key={index} className="border-b border-[#e4e4e4] text-base">
                        <TableCell className="text-[#3d3939]">{appointment.date}</TableCell>
                        <TableCell className="text-[#3d3939]">{appointment.time}</TableCell>
                        <TableCell className="text-[#3d3939]">{appointment.service}</TableCell>
                        <TableCell className="text-[#3d3939]">{appointment.cliente}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
        </Card>
    );
}

export default TabelaGeral;