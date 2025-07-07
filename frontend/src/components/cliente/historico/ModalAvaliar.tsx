import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { ScissorsIcon, User as UserIcon, Calendar, Star, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Agendamento } from "@/types/agendamento"; // Importa o tipo
import { criarAvaliacao } from "@/services/avaliacaoService"; // Importa a função do serviço

interface ModalAvaliarProps {
  onClose: () => void;
  onAvaliacaoSuccess: () => void;
  appointment: Agendamento;
}

const ModalAvaliar: React.FC<ModalAvaliarProps> = ({ onClose, onAvaliacaoSuccess, appointment }) => {
  // 1. Estados para controlar a avaliação
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comentario, setComentario] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 2. Função para enviar a avaliação para a API
  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Por favor, selecione pelo menos uma estrela.");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      await criarAvaliacao({
        idAgendamento: appointment.id,
        nota: rating,
        comentario: comentario,
      });

      alert("Avaliação enviada com sucesso!");
      onAvaliacaoSuccess(); // Avisa a página pai para atualizar o histórico
    } catch (err: any) {
      const errorMessage = err.response?.data || "Não foi possível enviar a avaliação.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="!max-w-none w-1/2">
        <DialogHeader>
          <DialogTitle className="text-2xl">Avaliação de Serviço - Barbearia Santos</DialogTitle>
          <hr />
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-5">
          {/* Coluna dos detalhes (sem alterações) */}
          <div className="flex flex-col gap-2">
            <Card className="bg-[#f1f1f1] py-4"><CardContent className="flex flex-col gap-3"><CardTitle className="flex flex-row items-center gap-2"><ScissorsIcon /><h3>Serviço</h3></CardTitle><p>{appointment.servico.nome}</p></CardContent></Card>
            <Card className="bg-[#f1f1f1]"><CardContent className="flex flex-col gap-3"><CardTitle className="flex flex-row items-center gap-2"><UserIcon /><h3>Barbeiro</h3></CardTitle><p>{appointment.barbeiro.nome}</p></CardContent></Card>
            <Card className="bg-[#f1f1f1]"><CardContent className="flex flex-col gap-3"><CardTitle className="flex flex-row items-center gap-2"><Calendar /><h3>Data e Hora</h3></CardTitle><p>{new Date(appointment.dataHoraAgendamento).toLocaleString('pt-BR')}</p></CardContent></Card>
          </div>
          
          {/* Coluna da avaliação */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-center text-xl mb-2">Nota da Avaliação</h3>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(rating)} className="focus:outline-none cursor-pointer">
                    <Star className={`w-8 h-8 transition-colors duration-150 ${(hover || rating) >= star ? "text-yellow-400" : "text-gray-300"}`} fill={(hover || rating) >= star ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-center text-xl">Comentários (opcional)</h3>
              <Textarea value={comentario} onChange={(e) => setComentario(e.target.value)} />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            
            <div className="text-end">
              <Button className="cursor-pointer" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Salvar Avaliação"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAvaliar;