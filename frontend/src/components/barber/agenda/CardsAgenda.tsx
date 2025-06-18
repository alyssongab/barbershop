"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DateSelector } from "@/components/ui/date-selector";
import { SelectedDate } from "@/types/Date";
import { useState } from "react";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function CardData() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [open, setOpen] = useState(false);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Selecionar Data</CardTitle>
                <CardDescription>
                    Escolha o dia para visualizar os agendamentos
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate
                                ? format(selectedDate, "PPP", { locale: ptBR })
                                : <span className="text-gray-400">Escolha uma data</span>
                            }
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={selectedDate ?? undefined}
                            onSelect={(date) => setSelectedDate(date ?? null)}
                            locale={ptBR}
                        />
                    </PopoverContent>
                </Popover>
            </CardContent>
        </Card>
    );
}

export function CardTotal() {
    return (
        <Card className="gap-4">
            <CardHeader>
                <CardTitle className="opacity-80">Total</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <p className="text-2xl font-semibold">4</p>
                <CardDescription>agendamentos</CardDescription>
            </CardContent>
        </Card>
    );
}

export function CardFaturamento() {
    return (
        <Card className="gap-4">
            <CardHeader>
                <CardTitle className="opacity-80">Faturamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <p className="text-2xl font-semibold">R$100,00</p>
                <CardDescription>Concluídos</CardDescription>
            </CardContent>
        </Card>
    );
}