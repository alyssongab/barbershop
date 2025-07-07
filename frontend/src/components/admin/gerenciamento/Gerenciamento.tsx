"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Scissors, Plus, MoreHorizontal, Pencil, Trash2, Power, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { format } from 'date-fns';

import { getServicos, createServico, updateServico, deleteServico, toggleServicoStatus, ServicoDTO } from "@/services/servicoService";
import { Servico } from "@/types/servico";
import { getBarbeiros, createBarbeiro, updateBarbeiro, deleteBarbeiro, toggleBarbeiroStatus, BarbeiroCreateDTO, BarbeiroUpdateDTO } from "@/services/userService";
import { Barbeiro } from "@/types/barbeiro";

const Gerenciamento = () => {
    // Estados gerais
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tab, setTab] = useState("servicos");

    // Estados para modais e formulários
    const [showServicoModal, setShowServicoModal] = useState(false);
    const [editServico, setEditServico] = useState<Servico | null>(null);
    const [servicoForm, setServicoForm] = useState<ServicoDTO>({ nome: "", descricao: "", preco: 0, duracaoEstimadaMin: 0 });

    const [showBarbeiroModal, setShowBarbeiroModal] = useState(false);
    const [editBarbeiro, setEditBarbeiro] = useState<Barbeiro | null>(null);
    const [barbeiroForm, setBarbeiroForm] = useState<BarbeiroCreateDTO>({ nome: "", email: "", telefone: "", senha: "" });

    // Carregar dados
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [servicosData, barbeirosData] = await Promise.all([getServicos(), getBarbeiros()]);
            setServicos(servicosData);
            setBarbeiros(barbeirosData);
        } catch (error) {
            alert("Erro ao carregar dados.");
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => { fetchData(); }, []);

    // Handlers CRUD Serviço
    const openNovoServico = () => {
        setServicoForm({ nome: "", descricao: "", preco: 0, duracaoEstimadaMin: 0 });
        setEditServico(null);
        setShowServicoModal(true);
    };
    const openEditarServico = (servico: Servico) => {
        setServicoForm({ nome: servico.nome, descricao: servico.descricao, preco: servico.preco, duracaoEstimadaMin: servico.duracaoEstimadaMin });
        setEditServico(servico);
        setShowServicoModal(true);
    };
    const handleServicoFormChange = (e: any) => {
        const { name, value } = e.target;
        setServicoForm(prev => ({ ...prev, [name]: name === "preco" || name === "duracaoEstimadaMin" ? Number(value) : value }));
    };
    const handleSalvarServico = async () => {
        try {
            if (editServico) {
                await updateServico(editServico.id, servicoForm);
            } else {
                await createServico(servicoForm);
            }
            setShowServicoModal(false);
            fetchData();
        } catch {
            alert("Erro ao salvar serviço.");
        }
    };
    const handleDeleteServico = async (id: number) => {
        if (confirm("Excluir este serviço?")) {
            try { await deleteServico(id); fetchData(); } catch { alert("Erro ao excluir serviço."); }
        }
    };
    const handleToggleStatusServico = async (id: number) => {
        try { await toggleServicoStatus(id); fetchData(); } catch { alert("Erro ao alterar status."); }
    };

    // Handlers CRUD Barbeiro
    const openNovoBarbeiro = () => {
        setBarbeiroForm({ nome: "", email: "", telefone: "", senha: "" });
        setEditBarbeiro(null);
        setShowBarbeiroModal(true);
    };
    const openEditarBarbeiro = (barbeiro: Barbeiro) => {
        setBarbeiroForm({ nome: barbeiro.nome, email: barbeiro.email, telefone: barbeiro.telefone || "", senha: "" });
        setEditBarbeiro(barbeiro);
        setShowBarbeiroModal(true);
    };
    const handleBarbeiroFormChange = (e: any) => {
        const { name, value } = e.target;
        setBarbeiroForm(prev => ({ ...prev, [name]: value }));
    };
    const handleSalvarBarbeiro = async () => {
        try {
            if (editBarbeiro) {
                const { nome, email, telefone } = barbeiroForm;
                await updateBarbeiro(editBarbeiro.id, { nome, email, telefone });
            } else {
                await createBarbeiro(barbeiroForm);
            }
            setShowBarbeiroModal(false);
            fetchData();
        } catch {
            alert("Erro ao salvar barbeiro.");
        }
    };
    const handleDeleteBarbeiro = async (id: number) => {
        if (confirm("Excluir este barbeiro?")) {
            try { await deleteBarbeiro(id); fetchData(); } catch { alert("Erro ao excluir barbeiro."); }
        }
    };
    const handleToggleStatusBarbeiro = async (id: number) => {
        const original = [...barbeiros];
        setBarbeiros(prev => prev.map(b => b.id === id ? { ...b, ativo: !b.ativo } : b));
        try { await toggleBarbeiroStatus(id); } catch { alert("Falha ao alterar status. Mudança desfeita."); setBarbeiros(original); }
    };

    if (isLoading) {
        return <div className="flex h-64 w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-gray-500" /></div>;
    }

    return (
        <div className="flex-1 p-8">
            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#140f0b] mb-2">Gerencie serviços e barbeiros da sua barbearia</h3>
                    <Tabs value={tab} onValueChange={setTab} className="mt-6">
                        <TabsList className="bg-[#d9d9d9] p-1 rounded-lg">
                            <TabsTrigger value="servicos"><Scissors size={16} className="mr-2"/> Serviços</TabsTrigger>
                            <TabsTrigger value="barbeiros"><Users size={16} className="mr-2"/> Barbeiros</TabsTrigger>
                        </TabsList>
                        <TabsContent value="servicos" className="mt-8">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h4 className="text-lg font-semibold text-[#140f0b]">Serviços</h4>
                                    <p className="text-[#818181] text-sm">Serviços oferecidos pela barbearia</p>
                                </div>
                                <Button className="bg-[#140f0b] hover:bg-[#242424] text-white" onClick={openNovoServico}><Plus size={16} className="mr-2"/> Novo Serviço</Button>
                            </div>
                            <div className="border border-[#e4e4e4] rounded-lg overflow-hidden">
                                <Table>
                                    <TableHeader><TableRow className="bg-[#d8d8d8] hover:bg-[#d8d8d8]"><TableHead>Nome</TableHead><TableHead>Duração</TableHead><TableHead>Preço</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Ações</TableHead></TableRow></TableHeader>
                                    <TableBody>
                                        {servicos.map((servico) => (
                                            <TableRow key={servico.id}>
                                                <TableCell>{servico.nome}</TableCell>
                                                <TableCell>{servico.duracaoEstimadaMin} min</TableCell>
                                                <TableCell>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(servico.preco)}</TableCell>
                                                <TableCell><Badge className={servico.ativo ? 'bg-green-600 hover:bg-green-700' : 'bg-red-500 hover:bg-red-600'}>{servico.ativo ? 'Ativo' : 'Inativo'}</Badge></TableCell>
                                                <TableCell className="text-right">
                                                    <Popover><PopoverTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal size={16} /></Button></PopoverTrigger>
                                                        <PopoverContent className="w-40"><div className="grid gap-1">
                                                            <Button variant="ghost" size="sm" className="justify-start" onClick={() => openEditarServico(servico)}><Pencil size={14} className="mr-2"/> Editar</Button>
                                                            <Button variant="ghost" size="sm" className="justify-start" onClick={() => handleToggleStatusServico(servico.id)}><Power size={14} className="mr-2"/> {servico.ativo ? 'Desativar' : 'Ativar'}</Button>
                                                            <Button variant="destructive" size="sm" className="justify-start" onClick={() => handleDeleteServico(servico.id)}><Trash2 size={14} className="mr-2"/> Excluir</Button>
                                                        </div></PopoverContent>
                                                    </Popover>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>
                        <TabsContent value="barbeiros" className="mt-8">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h4 className="text-lg font-semibold text-[#140f0b]">Barbeiros</h4>
                                    <p className="text-[#818181] text-sm">Equipe de Barbeiros</p>
                                </div>
                                <Button className="bg-[#140f0b] hover:bg-[#242424] text-white" onClick={openNovoBarbeiro}><Plus size={16} className="mr-2"/> Novo Barbeiro</Button>
                            </div>
                            <div className="border rounded-lg overflow-hidden">
                                <Table>
                                    <TableHeader><TableRow className="bg-[#d8d8d8] hover:bg-[#d8d8d8]"><TableHead>Barbeiro</TableHead><TableHead>Email</TableHead><TableHead>Telefone</TableHead><TableHead>Data de Cadastro</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Ações</TableHead></TableRow></TableHeader>
                                    <TableBody>
                                        {barbeiros.map((barbeiro) => (
                                            <TableRow key={barbeiro.id}>
                                                <TableCell className="font-medium">{barbeiro.nome}</TableCell>
                                                <TableCell>{barbeiro.email}</TableCell>
                                                <TableCell>{barbeiro.telefone || 'N/A'}</TableCell>
                                                <TableCell>{format(new Date(barbeiro.dataCadastro), 'dd/MM/yyyy')}</TableCell>
                                                <TableCell><Badge className={barbeiro.ativo ? 'bg-green-600 hover:bg-green-700' : 'bg-red-500 hover:bg-red-600'}>{barbeiro.ativo ? 'Ativo' : 'Inativo'}</Badge></TableCell>
                                                <TableCell className="text-right">
                                                     <Popover><PopoverTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal size={16} /></Button></PopoverTrigger>
                                                        <PopoverContent className="w-40"><div className="grid gap-1">
                                                            <Button variant="ghost" size="sm" className="justify-start" onClick={() => openEditarBarbeiro(barbeiro)}><Pencil size={14} className="mr-2"/> Editar</Button>
                                                            <Button variant="ghost" size="sm" className="justify-start" onClick={() => handleToggleStatusBarbeiro(barbeiro.id)}><Power size={14} className="mr-2"/> {barbeiro.ativo ? 'Desativar' : 'Ativar'}</Button>
                                                            <Button variant="destructive" size="sm" className="justify-start" onClick={() => handleDeleteBarbeiro(barbeiro.id)}><Trash2 size={14} className="mr-2"/> Excluir</Button>
                                                        </div></PopoverContent>
                                                    </Popover>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Modal Serviço */}
            <Dialog open={showServicoModal} onOpenChange={setShowServicoModal}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{editServico ? "Editar Serviço" : "Novo Serviço"}</DialogTitle>
                        <DialogDescription>{editServico ? "Atualize os detalhes do serviço." : "Preencha os detalhes para adicionar um novo serviço."}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nome" className="text-right">Nome</Label>
                            <Input id="nome" name="nome" value={servicoForm.nome} onChange={handleServicoFormChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="descricao" className="text-right">Descrição</Label>
                            <Textarea id="descricao" name="descricao" value={servicoForm.descricao} onChange={handleServicoFormChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="duracaoEstimadaMin" className="text-right">Duração (min)</Label>
                            <Input id="duracaoEstimadaMin" name="duracaoEstimadaMin" type="number" value={servicoForm.duracaoEstimadaMin} onChange={handleServicoFormChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="preco" className="text-right">Preço (R$)</Label>
                            <Input id="preco" name="preco" type="number" value={servicoForm.preco} onChange={handleServicoFormChange} className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowServicoModal(false)}>Cancelar</Button>
                        <Button onClick={handleSalvarServico}>{editServico ? "Salvar Alterações" : "Salvar"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal Barbeiro */}
            <Dialog open={showBarbeiroModal} onOpenChange={setShowBarbeiroModal}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{editBarbeiro ? "Editar Barbeiro" : "Novo Barbeiro"}</DialogTitle>
                        <DialogDescription>{editBarbeiro ? "Atualize os detalhes do barbeiro." : "Preencha os detalhes para adicionar um novo barbeiro."}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nomeBarbeiro" className="text-right">Nome</Label>
                            <Input id="nomeBarbeiro" name="nome" value={barbeiroForm.nome} onChange={handleBarbeiroFormChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" name="email" type="email" value={barbeiroForm.email} onChange={handleBarbeiroFormChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="telefone" className="text-right">Telefone</Label>
                            <Input id="telefone" name="telefone" value={barbeiroForm.telefone} onChange={handleBarbeiroFormChange} className="col-span-3" />
                        </div>
                        {!editBarbeiro && (
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="senha" className="text-right">Senha Provisória</Label>
                                <Input id="senha" name="senha" type="password" value={barbeiroForm.senha} onChange={handleBarbeiroFormChange} className="col-span-3" />
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowBarbeiroModal(false)}>Cancelar</Button>
                        <Button onClick={handleSalvarBarbeiro}>{editBarbeiro ? "Salvar Alterações" : "Salvar"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Gerenciamento;
