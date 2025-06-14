import { Dialog, DialogOverlay, DialogContent, DialogTitle, DialogClose, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { ScissorsIcon, LucideUser, Calendar, Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
interface ModalAvaliarProps {
  onClose: () => void;
  appointment: {
    id: number,
    date: string;
    time: string;
    service: string;
    barber: string;
    value: number,
    rate: number
  };
}

const ModalAvaliar: React.FC<ModalAvaliarProps> = ({ onClose, appointment }) => {

const [rating, setRating] = useState(0);
const [hover, setHover] = useState(0);

 return (
    <Dialog open onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black/50 z-50" />
      <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-md p-6 shadow-lg w-full max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Avaliação de Serviço - Barbearia Santos</DialogTitle>
          <hr />
        </DialogHeader>

        {/* 2 colunas - detalhes e avaliacao */}
        <div className="grid grid-cols-2 gap-5">

            {/* coluna dos detalhes */}
            <div className="flex flex-col gap-2">
                    <Card className="bg-[#f1f1f1] py-4">
                        <CardContent className="flex flex-col gap-3">
                            <CardTitle className="flex flex-row items-center gap-2">
                                <ScissorsIcon />
                                <h3 className="text-xl font-normal">Serviço</h3>
                            </CardTitle>
                            <p>{appointment.service}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-[#f1f1f1]">
                        <CardContent className="flex flex-col gap-3">
                            <CardTitle className="flex flex-row items-center gap-2">
                                <LucideUser />
                                <h3>Barbeiro</h3>
                            </CardTitle>
                            <p>{appointment.barber}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-[#f1f1f1]">
                        <CardContent className="flex flex-col gap-3">
                            <CardTitle className="flex flex-row items-center gap-2">
                                <Calendar />
                                <h3>Data e Hora</h3>
                            </CardTitle>
                            <p>{appointment.date}</p>
                        </CardContent>
                    </Card>
            </div>
            {/* coluna da avaliacao */}
            <div className="flex flex-col justify-around">
                {/* avaliacao */}
               <div>
                    <h3 className="text-center text-xl mb-2">Nota da Avaliação</h3>
                        <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                            key={star}
                            type="button"
                            onClick={() => setRating(rating === star ? 0 : star)}
                            onMouseEnter={() => {
                                if (rating === 0) setHover(star);
                            }}
                            onMouseLeave={() => {
                                if (rating === 0) setHover(0);
                            }}
                            className="focus:outline-none cursor-pointer"
                            aria-label={`Avaliar com ${star} estrela${star > 1 ? "s" : ""}`}
                            >
                            <Star
                                className={`w-8 h-8 transition-colors duration-150 ${
                                (hover || rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                                fill={(hover || rating) >= star ? "yellow" : "none"}
                            />
                            </button>
                        ))}
                        </div>
                </div>
                {/* comentarios */}
                <div className="space-y-3">
                    <h3 className="text-center text-xl">Comentários (opcional)</h3>
                    <Textarea />
                </div>
                <div className="text-end">
                    <Button className="cursor-pointer">Salvar</Button>
                </div>
            </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}

export default ModalAvaliar;