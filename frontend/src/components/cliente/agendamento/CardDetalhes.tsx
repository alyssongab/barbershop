import { Calendar } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

const CardDetalhes = () => {
    return (
        <Card className="card-detalhes w-3/5 gap-1 hover:scale-105 transform transition-all duration-300">
            <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle className="text-md font-medium text-[#3d3939]">Próximo agendamento</CardTitle>
                <Calendar className="w-5 h-5 text-[#3d3939]" />
            </div>
            </CardHeader>
            <CardContent>
            <div className="space-y-3">
                <h3 className="text-2xl font-bold text-[#140f0b]">Hoje</h3>
                <p className="text-[#3d3939]">14:30 - Corte degradê</p>
            </div>
            </CardContent>
        </Card>
    );
}

export default CardDetalhes;