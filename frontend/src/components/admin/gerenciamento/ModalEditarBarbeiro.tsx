"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Contato {
    email: string;
    telefone: string;
    fotoUrl: string;
}

interface Barbeiro {
    nome: string;
    contato: Contato;
    dataContratacao: string;
    status: string;
}

interface ModalEditarBarbeiroProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (barbeiro: Barbeiro) => void;
    barbeiro: Barbeiro | null;
}

const ModalEditarBarbeiro = ({ isOpen, onClose, onSave, barbeiro }: ModalEditarBarbeiroProps) => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");

    useEffect(() => {
        if (barbeiro) {
            setNome(barbeiro.nome);
            setEmail(barbeiro.contato.email);
            setTelefone(barbeiro.contato.telefone);
        }
    }, [barbeiro]);

    const handleSave = () => {
        if (barbeiro) {
            const updatedBarbeiro = {
                ...barbeiro,
                nome,
                contato: {
                    ...barbeiro.contato,
                    email,
                    telefone,
                },
            };
            onSave(updatedBarbeiro);
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar Barbeiro</DialogTitle>
                    <DialogDescription>
                        Atualize os detalhes do barbeiro.
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
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="telefone" className="text-right">
                            Telefone
                        </Label>
                        <Input id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleSave}>Salvar Alterações</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ModalEditarBarbeiro;
