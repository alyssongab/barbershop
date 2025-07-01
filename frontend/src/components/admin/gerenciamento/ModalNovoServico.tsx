"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ModalNovoServicoProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (servico: { nome: string; duracao: string; preco: string }) => void;
}

const ModalNovoServico = ({ isOpen, onClose, onSave }: ModalNovoServicoProps) => {
    const [nome, setNome] = useState("");
    const [duracao, setDuracao] = useState("");
    const [preco, setPreco] = useState("");

    const handleSave = () => {
        onSave({ nome, duracao, preco });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Novo Serviço</DialogTitle>
                    <DialogDescription>
                        Preencha os detalhes para adicionar um novo serviço.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nome" className="text-right">
                            Nome
                        </Label>
                        <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="duracao" className="text-right">
                            Duração
                        </Label>
                        <div className="col-span-3 flex items-center">
                            <Input id="duracao" type="number" value={duracao} onChange={(e) => setDuracao(e.target.value)} className="w-full" />
                            <span className="ml-2 text-gray-500">min</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="preco" className="text-right">
                            Preço
                        </Label>
                        <div className="col-span-3 flex items-center">
                            <span className="mr-2 text-gray-500">R$</span>
                            <Input id="preco" type="number" value={preco} onChange={(e) => setPreco(e.target.value)} className="w-full" />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleSave}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ModalNovoServico;
