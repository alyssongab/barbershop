import { Agendamento } from "@/types/agendamento";
import { Calendar } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { format } from 'date-fns'; // Biblioteca para formatar datas
import { ptBR } from 'date-fns/locale'; // Localização para português

type CardDetalhesProps = {
  proximoAgendamento: Agendamento | undefined; // Recebe o próximo agendamento ou undefined
};

const CardDetalhes = ({ proximoAgendamento }: CardDetalhesProps) => {
  return (
    <Card className="card-detalhes w-3/5 gap-1 hover:scale-105 transform transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-md font-medium text-[#3d3939]">Próximo agendamento</CardTitle>
          <Calendar className="w-5 h-5 text-[#3d3939]" />
        </div>
      </CardHeader>
      <CardContent>
        {proximoAgendamento ? (
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-[#140f0b]">
              {format(new Date(proximoAgendamento.dataHoraAgendamento), "eeee, dd/MM", { locale: ptBR })}
            </h3>
            <p className="text-[#3d3939]">
              {format(new Date(proximoAgendamento.dataHoraAgendamento), "HH:mm")} - {proximoAgendamento.servico.nome}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-500">Você não tem agendamentos futuros.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CardDetalhes;