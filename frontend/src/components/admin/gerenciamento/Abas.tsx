"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Scissors, Plus, MoreHorizontal, Pencil, Trash2, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ModalNovoServico from "./ModalNovoServico";
import ModalNovoBarbeiro from "./ModalNovoBarbeiro";
import ModalEditarServico from "./ModalEditarServico";
import ModalEditarBarbeiro from "./ModalEditarBarbeiro";

interface Servico {
    nome: string;
    duracao: string;
    preco: string;
    status: string;
}

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

const servicosData: Servico[] = [
  {
    nome: "Corte de Cabelo",
    duracao: "30min",
    preco: "R$ 30,00",
    status: "ativo",
  },
  {
    nome: "Barba",
    duracao: "15min",
    preco: "R$ 15,00",
    status: "ativo",
  },
  {
    nome: "Pezinho",
    duracao: "10min",
    preco: "R$ 10,00",
    status: "inativo",
  },
];

const barbeirosData: Barbeiro[] = [
    {
        nome: "João Silva",
        contato: {
            email: "joao.silva@barbershop.com",
            telefone: "(11) 98765-4321",
            fotoUrl: "https://github.com/shadcn.png",
        },
        dataContratacao: "01/01/2023",
        status: "ativo",
    },
    {
        nome: "Carlos Souza",
        contato: {
            email: "carlos.souza@barbershop.com",
            telefone: "(11) 91234-5678",
            fotoUrl: "https://github.com/shadcn.png",
        },
        dataContratacao: "15/03/2023",
        status: "ativo",
    },
    {
        nome: "Pedro Santos",
        contato: {
            email: "pedro.santos@barbershop.com",
            telefone: "(11) 99999-8888",
            fotoUrl: "https://github.com/shadcn.png",
        },
        dataContratacao: "01/07/2024",
        status: "inativo",
    },
];


const Abas = () => {
    const [servicos, setServicos] = useState<Servico[]>(servicosData);
    const [barbeiros, setBarbeiros] = useState<Barbeiro[]>(barbeirosData);

    const [isServicoModalOpen, setServicoModalOpen] = useState(false);
    const [isBarbeiroModalOpen, setBarbeiroModalOpen] = useState(false);

    const [isServicoEditModalOpen, setServicoEditModalOpen] = useState(false);
    const [servicoToEdit, setServicoToEdit] = useState<Servico | null>(null);

    const [isBarbeiroEditModalOpen, setBarbeiroEditModalOpen] = useState(false);
    const [barbeiroToEdit, setBarbeiroToEdit] = useState<Barbeiro | null>(null);

    const handleSaveServico = (servico: { nome: string; duracao: string; preco: string }) => {
        setServicos([...servicos, { 
            ...servico, 
            preco: `R$ ${servico.preco.replace(".", ",")}`,
            duracao: `${servico.duracao}min`,
            status: "ativo" 
        }]);
    };

    const handleUpdateServico = (updatedServico: Servico) => {
        setServicos(servicos.map(s => s.nome === updatedServico.nome ? updatedServico : s));
    };

    const handleDeleteServico = (nome: string) => {
        setServicos(servicos.filter(s => s.nome !== nome));
    };

    const handleToggleStatusServico = (nome: string) => {
        setServicos(servicos.map(s => s.nome === nome ? { ...s, status: s.status === 'ativo' ? 'inativo' : 'ativo' } : s));
    };

    const handleSaveBarbeiro = (barbeiro: { nome: string; email: string; telefone: string; }) => {
        setBarbeiros([...barbeiros, {
            nome: barbeiro.nome,
            contato: {
                email: barbeiro.email,
                telefone: barbeiro.telefone,
                fotoUrl: "", // Você pode adicionar uma URL de foto padrão ou um campo para isso no modal
            },
            dataContratacao: new Date().toLocaleDateString('pt-BR'),
            status: "ativo",
        }]);
    };

    const handleUpdateBarbeiro = (updatedBarbeiro: Barbeiro) => {
        setBarbeiros(barbeiros.map(b => b.nome === updatedBarbeiro.nome ? updatedBarbeiro : b));
    };

    const handleDeleteBarbeiro = (nome: string) => {
        setBarbeiros(barbeiros.filter(b => b.nome !== nome));
    };

    const handleToggleStatusBarbeiro = (nome: string) => {
        setBarbeiros(barbeiros.map(b => b.nome === nome ? { ...b, status: b.status === 'ativo' ? 'inativo' : 'ativo' } : b));
    };


    return (
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#140f0b] mb-2">
                Gerencie serviços e barbeiros da sua barbearia
              </h3>

              <Tabs defaultValue="servicos" className="mt-6">
                <TabsList className="bg-[#d9d9d9] p-1 rounded-lg">
                  <TabsTrigger
                    value="servicos"
                  >
                    <Scissors size={16} />
                    Serviços
                  </TabsTrigger>
                  <TabsTrigger
                    value="barbeiros"
                  >
                    <Users size={16} />
                    Barbeiros
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="servicos" className="mt-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="text-lg font-semibold text-[#140f0b]">Serviços</h4>
                      <p className="text-[#818181] text-sm">Serviços oferecidos pela barbearia</p>
                    </div>
                    <Button className="bg-[#140f0b] hover:bg-[#242424] text-white px-4 py-2 rounded-lg flex items-center gap-2" onClick={() => setServicoModalOpen(true)}>
                      <Plus size={16} />
                      Novo Serviço
                    </Button>
                  </div>

                  <div className="border border-[#e4e4e4] rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-[#d8d8d8] hover:bg-[#d8d8d8]">
                          <TableHead className="text-[#140f0b] font-medium">Nome</TableHead>
                          <TableHead className="text-[#140f0b] font-medium">Duração</TableHead>
                          <TableHead className="text-[#140f0b] font-medium">Preço</TableHead>
                          <TableHead className="text-[#140f0b] font-medium">Status</TableHead>
                          <TableHead className="text-[#140f0b] font-medium">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {servicos.map((servico, index) => (
                          <TableRow key={index} className="hover:bg-[#ffffff]">
                            <TableCell className="font-medium text-[#140f0b]">{servico.nome}</TableCell>
                            <TableCell className="text-[#818181]">{servico.duracao}</TableCell>
                            <TableCell className="text-[#818181]">{servico.preco}</TableCell>
                            <TableCell>
                              <Badge className={`${servico.status === 'ativo' ? 'bg-[#140f0b]' : 'bg-red-500'} text-white hover:bg-[#242424] rounded-full px-3 py-1`}>
                                {servico.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="ghost" size="sm" className="text-[#818181] hover:text-[#140f0b]">
                                            <MoreHorizontal size={16} />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40">
                                        <div className="grid gap-2">
                                            <Button variant="ghost" size="sm" className="flex items-center justify-start gap-2" onClick={() => { setServicoToEdit(servico); setServicoEditModalOpen(true); }}>
                                                <Pencil size={14} /> Editar
                                            </Button>
                                            <Button variant="ghost" size="sm" className="flex items-center justify-start gap-2" onClick={() => handleToggleStatusServico(servico.nome)}>
                                                <Power size={14} /> {servico.status === 'ativo' ? 'Desativar' : 'Ativar'}
                                            </Button>
                                            <Button variant="destructive" size="sm" className="flex items-center justify-start gap-2" onClick={() => handleDeleteServico(servico.nome)}>
                                                <Trash2 size={14} /> Excluir
                                            </Button>
                                        </div>
                                    </PopoverContent>
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
                    <Button className="bg-[#140f0b] hover:bg-[#242424] text-white px-4 py-2 rounded-lg flex items-center gap-2" onClick={() => setBarbeiroModalOpen(true)}>
                      <Plus size={16} />
                      Novo Barbeiro
                    </Button>
                  </div>

                  <div className="border border-[#e4e4e4] rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-[#d8d8d8] hover:bg-[#d8d8d8]">
                          <TableHead className="text-[#140f0b] font-medium">Barbeiro</TableHead>
                          <TableHead className="text-[#140f0b] font-medium">Contato</TableHead>
                          <TableHead className="text-[#140f0b] font-medium">Data de Contratação</TableHead>
                          <TableHead className="text-[#140f0b] font-medium">Status</TableHead>
                          <TableHead className="text-[#140f0b] font-medium">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {barbeiros.map((barbeiro, index) => (
                          <TableRow key={index} className="hover:bg-[#ffffff]">
                            <TableCell className="font-medium text-[#140f0b]">{barbeiro.nome}</TableCell>
                            <TableCell>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Badge className="cursor-pointer bg-gray-200 text-[#140f0b] hover:bg-gray-300">
                                            Ver Contato
                                        </Badge>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-semibold">{barbeiro.nome}</h4>
                                            <p className="text-sm text-gray-500">{barbeiro.contato.email}</p>
                                            <p className="text-sm text-gray-500">{barbeiro.contato.telefone}</p>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                            <TableCell className="text-[#818181]">{barbeiro.dataContratacao}</TableCell>
                            <TableCell>
                                <Badge className={`${barbeiro.status === 'ativo' ? 'bg-[#140f0b]' : 'bg-red-500'} text-white hover:bg-[#242424] rounded-full px-3 py-1`}>
                                    {barbeiro.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="ghost" size="sm" className="text-[#818181] hover:text-[#140f0b]">
                                            <MoreHorizontal size={16} />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40">
                                        <div className="grid gap-2">
                                            <Button variant="ghost" size="sm" className="flex items-center justify-start gap-2" onClick={() => { setBarbeiroToEdit(barbeiro); setBarbeiroEditModalOpen(true); }}>
                                                <Pencil size={14} /> Editar
                                            </Button>
                                            <Button variant="ghost" size="sm" className="flex items-center justify-start gap-2" onClick={() => handleToggleStatusBarbeiro(barbeiro.nome)}>
                                                <Power size={14} /> {barbeiro.status === 'ativo' ? 'Desativar' : 'Ativar'}
                                            </Button>
                                            <Button variant="destructive" size="sm" className="flex items-center justify-start gap-2" onClick={() => handleDeleteBarbeiro(barbeiro.nome)}>
                                                <Trash2 size={14} /> Excluir
                                            </Button>
                                        </div>
                                    </PopoverContent>
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
          <ModalNovoServico isOpen={isServicoModalOpen} onClose={() => setServicoModalOpen(false)} onSave={handleSaveServico} />
          <ModalNovoBarbeiro isOpen={isBarbeiroModalOpen} onClose={() => setBarbeiroModalOpen(false)} onSave={handleSaveBarbeiro} />
          <ModalEditarServico isOpen={isServicoEditModalOpen} onClose={() => setServicoEditModalOpen(false)} onSave={handleUpdateServico} servico={servicoToEdit} />
          <ModalEditarBarbeiro isOpen={isBarbeiroEditModalOpen} onClose={() => setBarbeiroEditModalOpen(false)} onSave={handleUpdateBarbeiro} barbeiro={barbeiroToEdit} />
        </div>
    )
}

export default Abas;