"use client";

import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { Scissors, User, Calendar1, Clock, Check, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

interface ModalAgendarProps{
    onClose: () => void;
}

const services = [
    {
        id: 1,
        name: "Corte Degradê",
        duration: "30min",
        price: "R$ 30,00",
    },
    {
        id: 2,
        name: "Corte + Barba + Sobrancelha",
        duration: "60min",
        price: "R$ 70,00",
    },
    {
        id: 3,
        name: "Corte + Barba",
        duration: "45min",
        price: "R$ 50,00",
    },
    {
        id: 4,
        name: "Apenas Barba ou Sobrancelha",
        duration: "15min",
        price: "R$ 20,00",
    },
]

const barbers = [
    { id: 1, name: "João Silva", experience: "5 anos" },
    { id: 2, name: "Pedro Santos", experience: "3 anos" },
    { id: 3, name: "Carlos Oliveira", experience: "7 anos" },
    { id: 4, name: "Rafael Costa", experience: "4 anos" },
]

const timeSlots = [
    { id: 1, time: "09:00", available: true },
    { id: 2, time: "10:00", available: true },
    { id: 3, time: "11:00", available: false },
    { id: 4, time: "14:00", available: true },
    { id: 5, time: "15:00", available: true },
    { id: 6, time: "16:00", available: true },
]

const stepConfig = [
    { icon: Scissors, label: "Serviço" },
    { icon: User, label: "Barbeiro" },
    { icon: Calendar, label: "Data" },
    { icon: Clock, label: "Horário" },
    { icon: Check, label: "Confirmação" },
]

// The component receives the 'onClose' prop from its parent
const ModalAgendar = ({ onClose }: ModalAgendarProps) => {

    
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedService, selectServico] = useState<number | null>(null);
    const [selectedBarber, selectBarber] = useState<number | null>(null);
    const [selectedDate, selectData] = useState< | null>(null);
    const [selectedTime, selectTime] = useState<number | null>(null);

    const isStepValid = (step: number) => {
        switch(step){
            case 0:
                return selectedService !== null;
            case 1:
                return selectedBarber !== null;
            case 2:
                return selectedDate !== null;
            case 3:
                return selectedTime !== null;
            case 4:
                return true;
            default:
                return false;
        }
    }

    const handleNext = (step: number) => {
        if(step < 4 && isStepValid(currentStep)){
            setCurrentStep(currentStep + 1);
        }
    }

    const handleBack = (step: number) => {
        if(step > 0){
            setCurrentStep(currentStep - 1);
        }
    }

    const getSelectedService = () => services.find((s) => s.id === selectedService);
    const getSelectedBarber = () => barbers.find((b) => b.id === selectedBarber);
    const getSelectedDate = () => {}

    return(
        
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent 
                className="w-[95vw] !max-w-none h-[90vh] md:w-[90vw] md:h-[90vh] rounded-xl flex flex-col"
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
            >
                <DialogHeader>
                    <DialogTitle className="text-2xl">Novo Agendamento</DialogTitle>
                    <DialogDescription>
                        Siga os passos para realizar seu agendamento.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-grow overflow-y-auto py-4">
                    {/* YOUR FORM AND CONTENT GO HERE 
                      This area will scroll if the content is too long.
                    */}
                    <p>Conteúdo do modal aqui...</p>
                    <p>Formulários, seletores de data, etc.</p>
                </div>

                <DialogFooter className="mt-auto !flex !justify-between">
                    <DialogClose asChild>
                        <Button className="cursor-pointer" type="button" variant="secondary">
                            <ArrowLeft />
                            Voltar
                        </Button>
                    </DialogClose>
                    <Button type="button" className="cursor-pointer bg-[#000000] hover:bg-[#2e2e2e]">
                        Próximo
                        <ArrowRight />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ModalAgendar;