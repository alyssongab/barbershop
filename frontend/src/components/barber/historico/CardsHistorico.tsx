"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface CardProps {
  valor: number;
}

export function CardTotal({ valor }: CardProps) {
    return (
        <Card className="gap-4">
            <CardHeader>
                <CardTitle className="opacity-80">Total</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <p className="text-2xl font-semibold">{valor}</p>
                <CardDescription>Serviço(s) realizados</CardDescription>
            </CardContent>
        </Card>
    );
}

export function CardAvaliacao({ valor }: CardProps) {
    return (
        <Card className="gap-4">
            <CardHeader>
                <CardTitle className="opacity-80">Total de Avaliações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <p className="text-2xl font-semibold">{valor}</p>
                <CardDescription>Avaliação(ões) recebida(s)</CardDescription>
            </CardContent>
        </Card>
    );
}

export function CardMedia({ valor }: CardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="opacity-80">Média de Avaliação</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2 justify-start items-center">
                <Star className="fill-yellow-400 text-yellow-400"/>
                {/* Mostra 'N/A' se a média for 0 */}
                <p className="text-2xl font-semibold">{valor > 0 ? valor.toFixed(1) : 'N/A'}</p>
            </CardContent>
        </Card>
    );
}