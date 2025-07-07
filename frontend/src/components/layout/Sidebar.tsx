"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react"; // Importa o tipo base para os ícones

// 1. Define o tipo para cada item da sidebar
export type SidebarItem = {
  href: string;
  label: string;
  icon: LucideIcon; // O ícone será um componente
  disabled?: boolean; // Opcional para itens desabilitados
};

// 2. Define a tipagem das props da Sidebar
type SidebarProps = {
  items: SidebarItem[]; // Recebe um array de itens
};

const Sidebar = ({ items }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="h-full bg-[#272727] w-56 text-white shrink-0">
      <nav>
        <ul>
          {/* 3. Mapeia o array de itens para renderizar os links dinamicamente */}
          {items.map((item) => {
            const Icon = item.icon; // Pega o componente do ícone
            const isActive = pathname === item.href;

            if (item.disabled) {
              return (
                <li key={item.href} className="flex gap-3 items-center justify-start opacity-30 cursor-not-allowed side-items">
                  <Icon className="w-5 h-5" />
                  <span className="text-lg">{item.label}</span>
                </li>
              );
            }

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex gap-3 items-center justify-start side-items ${
                    isActive ? "bg-[#747474]" : "hover:bg-[#414141]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className={`text-lg ${isActive ? "font-medium" : ""}`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;