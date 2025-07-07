"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Scissors, User, Calendar as CalendarIcon, Clock, Check, Loader2 } from "lucide-react";
import { DateSelector } from "@/components/ui/date-selector";
import { SelectedDate } from "@/types/Date";
import { Card, CardContent } from "@/components/ui/card";

// Hooks, Serviços e Tipos
import { useAuth } from "@/contexts/AuthContext";
import { getServicos } from "@/services/servicoService";
import { Servico } from "@/types/servico";
import { getBarbeiros, Barbeiro } from "@/services/userService";
import { getHorariosDisponiveis, criarAgendamento } from "@/services/agendamentoService";

// Propriedades que o Modal recebe
interface ModalAgendarProps {
  onClose: () => void;
  onAgendamentoSuccess: () => void;
}

// Configuração dos passos (estático)
const stepConfig = [
  { icon: Scissors, label: "Serviço" },
  { icon: User, label: "Barbeiro" },
  { icon: CalendarIcon, label: "Data" },
  { icon: Clock, label: "Horário" },
  { icon: Check, label: "Confirmação" },
];

const ModalAgendar = ({ onClose, onAgendamentoSuccess }: ModalAgendarProps) => {
  // Estados para os dados da API
  const [services, setServices] = useState<Servico[]>([]);
  const [barbers, setBarbers] = useState<Barbeiro[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  // Estados de loading para cada chamada de API
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingBarbers, setLoadingBarbers] = useState(true);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados de seleção do usuário
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const { user } = useAuth(); // Pega o usuário logado

  // Efeito para buscar dados iniciais (serviços e barbeiros) ao montar o modal
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const servicesData = await getServicos();
        setServices(servicesData);
      } catch (error) {
        console.error("Erro ao buscar serviços", error);
      } finally {
        setLoadingServices(false);
      }

      try {
        const barbersData = await getBarbeiros();
        setBarbers(barbersData);
      } catch (error) {
        console.error("Erro ao buscar barbeiros", error);
      } finally {
        setLoadingBarbers(false);
      }
    };
    fetchInitialData();
  }, []);

  // Efeito para buscar horários disponíveis sempre que um barbeiro ou data for selecionado
  useEffect(() => {
    if (selectedBarber !== null && selectedDate !== null) {
      const fetchTimes = async () => {
        setLoadingTimes(true);
        setSelectedTime(null); // Reseta o horário selecionado
        try {
          const dateString = selectedDate.date.toISOString().split('T')[0];
          const times = await getHorariosDisponiveis(selectedBarber, dateString);
          setTimeSlots(times);
        } catch (error) {
          console.error("Erro ao buscar horários", error);
          setTimeSlots([]);
        } finally {
          setLoadingTimes(false);
        }
      };
      fetchTimes();
    }
  }, [selectedBarber, selectedDate]);

  // Lógica de navegação e validação
  const isStepValid = (step: number) => {
    switch (step) {
      case 0: return selectedService !== null;
      case 1: return selectedBarber !== null;
      case 2: return selectedDate !== null;
      case 3: return selectedTime !== null;
      case 4: return true;
      default: return false;
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

const handleSubmit = async () => {
    if (!isStepValid(4) || !user || !selectedService || !selectedBarber || !selectedDate || !selectedTime) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. CORREÇÃO: Acessando a data de 'selectedDate.date' (conforme seu código) 
      // ou 'selectedDate.value' (conforme a interface que sugeri). Ajuste se necessário.
      const agendamentoDate = new Date(selectedDate.date); 
      
      const [hours, minutes] = selectedTime.split(':').map(Number);
      agendamentoDate.setHours(hours, minutes, 0, 0);

      // 2. MELHORIA: Formatando a data manualmente para evitar problemas de fuso horário (UTC)
      // O backend espera um LocalDateTime, então não enviamos a informação de fuso (Z).
      const pad = (num: number) => num.toString().padStart(2, '0');
      const dataHoraParaAPI = `${agendamentoDate.getFullYear()}-${pad(agendamentoDate.getMonth() + 1)}-${pad(agendamentoDate.getDate())}T${pad(agendamentoDate.getHours())}:${pad(agendamentoDate.getMinutes())}:${pad(agendamentoDate.getSeconds())}`;

      await criarAgendamento({
        idCliente: user.id,
        idServico: selectedService,
        idBarbeiro: selectedBarber,
        dataHoraAgendamento: dataHoraParaAPI,
      });

      alert("Agendamento realizado com sucesso!");
      onAgendamentoSuccess();
      onClose();
    } catch (error) {
      // Agora este catch só será executado se houver um erro de verdade (ex: regra de negócio)
      alert("Erro ao finalizar o agendamento. Verifique os dados e tente novamente.");
      console.error(error); // Adicione um console.error para ver detalhes do erro no futuro
    } finally {
      setIsSubmitting(false);
    }
  };

  // Funções para pegar os detalhes dos itens selecionados para a tela de confirmação
  const getSelectedService = () => services.find((s) => s.id === selectedService);
  const getSelectedBarber = () => barbers.find((b) => b.id === selectedBarber);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Seleção de Serviço
        if (loadingServices) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-6">Selecione o serviço desejado:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <Card key={service.id} onClick={() => setSelectedService(service.id)} className={`cursor-pointer ${selectedService === service.id ? "ring-2 ring-black" : ""}`}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">{service.nome}</h4>
                      <p className="text-sm text-gray-500">{service.duracaoEstimadaMin} min</p>
                    </div>
                    <span className="font-bold">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(service.preco)}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 1: // Seleção de Barbeiro
        if (loadingBarbers) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-6">Selecione o barbeiro:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {barbers.map((barber) => (
                <Card key={barber.id} onClick={() => setSelectedBarber(barber.id)} className={`cursor-pointer ${selectedBarber === barber.id ? "ring-2 ring-black" : ""}`}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">{barber.nome}</h4>
                      {/*  Add more barber info here if needed */}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 2: // Seleção de Data
        return <DateSelector selectedDate={selectedDate} onDateSelect={setSelectedDate} />;
      case 3: // Seleção de Horário
        if (loadingTimes) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-6">Selecione o horário:</h3>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {timeSlots.length > 0 ? timeSlots.map((time) => (
                <Button key={time} variant={selectedTime === time ? "default" : "outline"} onClick={() => setSelectedTime(time)}>
                  {time}
                </Button>
              )) : <p className="col-span-full text-center text-gray-500">Nenhum horário disponível para esta data.</p>}
            </div>
          </div>
        );
      case 4: // Confirmação
        const servico = getSelectedService();
        const barbeiro = getSelectedBarber();
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-6">Confirme seu agendamento:</h3>
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex justify-between"><span className="text-gray-600">Serviço:</span><span className="font-medium">{servico?.nome}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Barbeiro:</span><span className="font-medium">{barbeiro?.nome}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Data:</span><span className="font-medium">{selectedDate?.display}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Horário:</span><span className="font-medium">{selectedTime}</span></div>
              <div className="flex justify-between border-t pt-4 mt-4"><span className="text-gray-600 text-lg">Preço:</span><span className="font-bold text-lg">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(servico?.preco || 0)}</span></div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] !max-w-none h-[90vh] md:w-[90vw] md:h-[90vh] rounded-xl flex flex-col" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-2xl">Novo Agendamento</DialogTitle>
          <DialogDescription>Siga os passos para realizar seu agendamento.</DialogDescription>
        </DialogHeader>

        {/* Steps/Progress UI */}
        <div className="flex justify-between items-center p-4">
          {stepConfig.map((step, index) => (
            <div key={step.label} className="flex items-center">
              {index > 0 && <div className="h-1 w-8 bg-gray-300"></div>}
              <div className={`flex items-center justify-center rounded-full h-8 w-8 ${index === currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {index === currentStep ? <step.icon size={16} /> : step.icon ? <step.icon size={16} /> : index + 1}
              </div>
              <span className="ml-2 text-sm">{step.label}</span>
            </div>
          ))}
        </div>

        <div className="flex-grow overflow-y-auto p-1">{renderStepContent()}</div>

        <DialogFooter className="mt-auto !flex !justify-between pt-4 border-t">
          <Button variant="secondary" onClick={handleBack} disabled={currentStep === 0 || isSubmitting}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Button>

          {currentStep === 4 ? (
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
              Confirmar Agendamento
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={!isStepValid(currentStep)}>
              Próximo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAgendar;