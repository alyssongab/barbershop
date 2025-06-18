import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const CardAgendamento = () => {
    return (
        <Card className="card-detalhes w-1/3 gap-1 hover:scale-105 transform transition-all duration-300">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-md font-medium text-[#3d3939]">Próximo agendamento</CardTitle>
                    <Calendar className="w-5 h-5 text-[#3d3939]" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-[#140f0b]">Hoje - 11:00</h3>
                    <p className="text-[#3d3939]">Ancelotti - Corte + Barba</p>
                </div>
            </CardContent>
        </Card>
    );
}

export default CardAgendamento;