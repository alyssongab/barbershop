"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ModalAgendar from "./ModalAgendar";

const CardAgendamento = () => {

    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    return (
        <Card className="card-detalhes w-3/5 gap-7 hover:scale-105 transform transition-all duration-300">
            <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium text-[#3d3939]">Marcar agendamento</CardTitle>
                <Calendar className="w-5 h-5 text-[#3d3939]" />
            </div>
            </CardHeader>
            <CardContent>
                <Button 
                className="bg-[#4aae71] hover:bg-[#3d8f5c] w-4/5 h-[3em] text-white rounded-lg flex items-center justify-center gap-3 cursor-pointer"
                onClick={handleOpenModal}
                >
                    <Plus />
                    Novo Agendamento
                </Button>
            </CardContent>
            {isModalOpen && (< ModalAgendar onClose={handleCloseModal}/>)}
        </Card>
    );
}

export default CardAgendamento;