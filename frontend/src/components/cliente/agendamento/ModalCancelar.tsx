import { Dialog, DialogHeader, DialogClose, DialogContent, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Agendamento } from "@/types/agendamento";
import { format } from "date-fns";

interface ModalCancelarProps {
  onClose: () => void;
  onConfirm: () => void; // Função para confirmar o cancelamento
  isSubmitting: boolean; // Estado para desabilitar o botão
  appointment: Agendamento | null;
}

const ModalCancelar: React.FC<ModalCancelarProps> = ({ onClose, onConfirm, isSubmitting, appointment }) => {
  if (!appointment) return null;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black/50 z-50" />
      <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-md p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle>Cancelar Agendamento</DialogTitle>
        </DialogHeader>
        <div>
          <p className="text-[#3d3939] text-sm mb-4">
            Tem certeza que deseja cancelar o agendamento de <b>{appointment.servico.nome}</b> no dia <b>{format(new Date(appointment.dataHoraAgendamento), 'dd/MM/yyyy')}</b>? Esta ação não poderá ser desfeita.
          </p>
          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button size="sm" variant="secondary" className="text-[#3d3939] hover:bg-gray-100" disabled={isSubmitting}>
                Não, voltar
              </Button>
            </DialogClose>
            <Button size="sm" className="bg-red-500 text-white hover:bg-red-600" onClick={onConfirm} disabled={isSubmitting}>
              {isSubmitting ? 'Cancelando...' : 'Sim, cancelar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCancelar;