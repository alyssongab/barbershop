"use client";

import { ReactNode } from "react";
// 1. Importando todos os ícones que serão usados em TODAS as sidebars
import { 
    Calendar, 
    Clock, 
    FileText, 
    Home, 
    CalendarCheck, 
    Users, 
    Scissors 
} from "lucide-react";

import Header from "./Header";
import Sidebar, { SidebarItem } from "./Sidebar";
import Footer from "./Footer";
import { useAuth } from "@/contexts/AuthContext";

// --- CONFIGURAÇÃO DOS ITENS DA SIDEBAR PARA CADA PERFIL ---

// Itens para o Cliente (como definimos antes)
const clienteSidebarItems: SidebarItem[] = [
  { href: "/app/cliente/agendamento", label: "Agendamento", icon: Calendar },
  { href: "/app/cliente/historico", label: "Histórico", icon: Clock },
  { href: "/app/cliente/assinaturas", label: "Assinaturas", icon: FileText, disabled: true },
];

// Itens para o Barbeiro (com base no código que você enviou)
const barbeiroSidebarItems: SidebarItem[] = [
  { href: "/app/barber/home", label: "Home", icon: Home },
  { href: "/app/barber/agenda", label: "Agenda", icon: CalendarCheck },
  { href: "/app/barber/historico", label: "Histórico", icon: Clock },
];

// Itens para o Admin (com base no código que você enviou)
const adminSidebarItems: SidebarItem[] = [
  { href: "#", label: "Home", icon: Home, disabled: true }, // Link desabilitado
  { href: "/app/admin/gerenciamento", label: "Gerenciamento", icon: Users },
  { href: "/app/admin/servicos", label: "Serviços", icon: Scissors }, // Adicionando um exemplo
];
// -------------------------------------------------------------------

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useAuth();

  let sidebarItems: SidebarItem[] = [];
  let headerTitle = "Painel";

  // Decide qual configuração usar com base no nível de acesso
  switch (user?.nivelAcesso) {
    case 'CLIENTE':
      sidebarItems = clienteSidebarItems;
      headerTitle = "Painel do Cliente";
      break;
    case 'BARBEIRO':
      sidebarItems = barbeiroSidebarItems;
      headerTitle = "Painel do Barbeiro";
      break;
    case 'ADMIN':
      sidebarItems = adminSidebarItems;
      headerTitle = "Painel Administrativo";
      break;
  }

  // Se o usuário ainda não carregou, pode-se mostrar um loader
  if (!user) {
    return <div>Carregando...</div>; 
  }

  return (
    <div className="flex flex-col h-screen">
      <Header titulo={headerTitle} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar items={sidebarItems} />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <main className="flex-grow p-3">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;