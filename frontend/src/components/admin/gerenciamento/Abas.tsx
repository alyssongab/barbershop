import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Scissors, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Abas = () => {
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
                    <Button className="bg-[#140f0b] hover:bg-[#242424] text-white px-4 py-2 rounded-lg flex items-center gap-2">
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
                        <TableRow className="hover:bg-[#ffffff]">
                          <TableCell className="font-medium text-[#140f0b]">Corte de Cabelo</TableCell>
                          <TableCell className="text-[#818181]">30min</TableCell>
                          <TableCell className="text-[#818181]">R$ 30,00</TableCell>
                          <TableCell>
                            <Badge className="bg-[#140f0b] text-white hover:bg-[#242424] rounded-full px-3 py-1">
                              ativo
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="text-[#818181] hover:text-[#140f0b]">
                              <MoreHorizontal size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-[#ffffff]">
                          <TableCell className="font-medium text-[#140f0b]">Barba</TableCell>
                          <TableCell className="text-[#818181]">15min</TableCell>
                          <TableCell className="text-[#818181]">R$ 15,00</TableCell>
                          <TableCell>
                            <Badge className="bg-[#140f0b] text-white hover:bg-[#242424] rounded-full px-3 py-1">
                              ativo
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="text-[#818181] hover:text-[#140f0b]">
                              <MoreHorizontal size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="barbeiros" className="mt-8">
                  <div className="text-center py-12">
                    <p className="text-[#818181]">Conteúdo dos barbeiros será exibido aqui</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
    )
}

export default Abas;