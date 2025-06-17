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
import { ArrowLeft, ArrowRight, Scissors, User, Calendar as CalendarIcon, Clock, Check } from "lucide-react";
import { useState } from "react";
import { DateSelector } from "@/components/ui/date-selector";
import { SelectedDate } from "@/types/Date";
import { Card, CardContent } from "@/components/ui/card";

interface ModalAgendarProps {
    onClose: () => void;
}

const services = [
    { id: 1, name: "Corte Degradê", duration: "30min", price: "R$ 30,00" },
    { id: 2, name: "Corte + Barba + Sobrancelha", duration: "60min", price: "R$ 70,00" },
    { id: 3, name: "Corte + Barba", duration: "45min", price: "R$ 50,00" },
    { id: 4, name: "Apenas Barba ou Sobrancelha", duration: "15min", price: "R$ 20,00" },
];

const barbers = [
    { id: 1, name: "João Silva", experience: "5 anos" },
    { id: 2, name: "Pedro Santos", experience: "3 anos" },
    { id: 3, name: "Carlos Oliveira", experience: "7 anos" },
    { id: 4, name: "Rafael Costa", experience: "4 anos" },
];

const timeSlots = [
    { id: 1, time: "09:00", available: true },
    { id: 2, time: "10:00", available: true },
    { id: 3, time: "11:00", available: false },
    { id: 4, time: "14:00", available: true },
    { id: 5, time: "15:00", available: true },
    { id: 6, time: "16:00", available: true },
];

const stepConfig = [
    { icon: Scissors, label: "Serviço" },
    { icon: User, label: "Barbeiro" },
    { icon: CalendarIcon, label: "Data" },
    { icon: Clock, label: "Horário" },
    { icon: Check, label: "Confirmação" },
];

const ModalAgendar = ({ onClose }: ModalAgendarProps) => {
    // MultiStep state
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedService, setSelectedService] = useState<number | null>(null);
    const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null);
    const [selectedTime, setSelectedTime] = useState<number | null>(null);

    const isStepValid = (step: number) => {
        switch (step) {
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
    };

    const handleNext = () => {
        if (currentStep < 4 && isStepValid(currentStep)) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const getSelectedService = () => services.find((s) => s.id === selectedService);
    const getSelectedBarber = () => barbers.find((b) => b.id === selectedBarber);
    const getSelectedDate = () => selectedDate;
    const getSelectedTime = () => timeSlots.find((t) => t.id === selectedTime);

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-6">Selecione o serviço desejado:</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {services.map((service) => (
                                <Card
                                    key={service.id}
                                    className={`cursor-pointer transition-all hover:shadow-md ${selectedService === service.id ? "ring-2 ring-blue-500 bg-blue-50" : ""}`}
                                    onClick={() => setSelectedService(service.id)}
                                >
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">{service.name}</h4>
                                                <p className="text-sm text-gray-600">{service.duration}</p>
                                            </div>
                                            <div className="bg-gray-100 px-3 py-1 rounded-md">
                                                <span className="text-sm font-medium text-gray-700">{service.price}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-6">Selecione o barbeiro:</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {barbers.map((barber) => (
                                <Card
                                    key={barber.id}
                                    className={`cursor-pointer transition-all hover:shadow-md ${selectedBarber === barber.id ? "ring-2 ring-blue-500 bg-blue-50" : ""}`}
                                    onClick={() => setSelectedBarber(barber.id)}
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                                <User className="w-6 h-6 text-gray-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{barber.name}</h4>
                                                <p className="text-sm text-gray-600">{barber.experience}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                );
            case 2:
                return <DateSelector selectedDate={selectedDate} onDateSelect={setSelectedDate} />;
            case 3:
                return (
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-6">Selecione o horário:</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {timeSlots.map((slot) => (
                                <Card
                                    key={slot.id}
                                    className={`cursor-pointer transition-all ${!slot.available
                                        ? "opacity-50 cursor-not-allowed"
                                        : selectedTime === slot.id
                                            ? "ring-2 ring-blue-500 bg-blue-50 hover:shadow-md"
                                            : "hover:shadow-md"
                                        }`}
                                    onClick={() => slot.available && setSelectedTime(slot.id)}
                                >
                                    <CardContent className="p-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <Clock className="w-4 h-4 text-gray-600" />
                                            <span className={`font-medium ${!slot.available ? "text-gray-400" : "text-gray-900"}`}>
                                                {slot.time}
                                            </span>
                                        </div>
                                        <p className={`text-xs mt-1 ${!slot.available ? "text-gray-400" : "text-gray-600"}`}>
                                            {slot.available ? "Disponível" : "Ocupado"}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-6">Confirme seu agendamento:</h3>
                        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Serviço:</span>
                                <span className="font-medium">{getSelectedService()?.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Barbeiro:</span>
                                <span className="font-medium">{getSelectedBarber()?.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Data:</span>
                                <span className="font-medium">{getSelectedDate()?.display}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Horário:</span>
                                <span className="font-medium">{getSelectedTime()?.time}</span>
                            </div>
                            <div className="flex justify-between border-t pt-4">
                                <span className="text-gray-600">Preço:</span>
                                <span className="font-bold text-lg">{getSelectedService()?.price}</span>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent
                className="w-[95vw] !max-w-none h-[90vh] md:w-[90vw] md:h-[90vh] rounded-xl flex flex-col overflow-y-scroll"
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

                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-12">
                    {stepConfig.map((step, index) => (
                        <div key={index} className="flex items-center">
                            <div className={`flex flex-col items-center ${index < stepConfig.length - 1 ? "mr-8" : ""}`}>
                                <div
                                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-colors ${index === currentStep
                                        ? "bg-black text-white"
                                        : index < currentStep
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-300 text-gray-600"
                                        }`}
                                >
                                    {index < currentStep ? <Check className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
                                </div>
                                <span
                                    className={`text-sm font-medium ${index === currentStep
                                        ? "text-black"
                                        : index < currentStep
                                            ? "text-green-600"
                                            : "text-gray-500"
                                        }`}
                                >
                                    {step.label}
                                </span>
                            </div>
                            {index < stepConfig.length - 1 && (
                                <div className="flex-1 h-px bg-gray-300 mx-4 mb-6" style={{ width: "60px" }}>
                                    <div className="flex justify-center">
                                        <div className="flex gap-1">
                                            {[...Array(4)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-1 h-1 rounded-full ${index < currentStep ? "bg-green-400" : "bg-gray-400"}`}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <div className="">{renderStepContent()}</div>

                <DialogFooter className="mt-auto !flex !justify-between">
                        <Button
                            className="cursor-pointer"
                            type="button"
                            variant="secondary"
                            onClick={handleBack}
                            disabled={currentStep === 0}
                        >
                            <ArrowLeft />
                            Voltar
                        </Button>
                    <Button
                        type="button"
                        className="cursor-pointer bg-[#000000] hover:bg-[#2e2e2e]"
                        onClick={handleNext}
                        disabled={!isStepValid(currentStep)}
                    >
                        Próximo
                        <ArrowRight />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ModalAgendar;