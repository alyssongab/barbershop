"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export function CardTotal() {
    return (
        <Card className="gap-4">
            <CardHeader>
                <CardTitle className="opacity-80">Total</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <p className="text-2xl font-semibold">4</p>
                <CardDescription>Serviço(s) realizados</CardDescription>
            </CardContent>
        </Card>
    );
}

export function CardAvaliacao() {
    return (
        <Card className="gap-4">
            <CardHeader>
                <CardTitle className="opacity-80">Total de Avaliações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <p className="text-2xl font-semibold">1</p>
                <CardDescription>Avaliação</CardDescription>
            </CardContent>
        </Card>
    );
}

export function CardMedia() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="opacity-80">Média de Avaliação</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2 justify-start items-center">
                <Star className="fill-yellow-400 text-yellow-400"/>
                <p className="text-2xl font-semibold">5</p>
            </CardContent>
        </Card>
    );
}