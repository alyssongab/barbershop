"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext"; // 1. Importa o hook de autenticação

// 2. Define a tipagem das props que o Header vai receber
type HeaderProps = {
  titulo: string;
};

const Header = ({ titulo }: HeaderProps) => {
  // 3. Pega os dados do usuário e a função de logout do contexto global
  const { user, logout } = useAuth();

  return (
    <header className="bg-[#140F0B] w-full h-[70px] flex justify-between p-3">
      {/* parte esquerda */}
      <Link href="#" className="flex items-center cursor-pointer">
        <div>
          <img src="/logo.png" alt="Logo Barbearia" className="w-[65%]" />
        </div>
        <div>
          {/* 4. Usa o título recebido via props */}
          <span className="text-3xl text-white font-medium">{titulo}</span>
        </div>
      </Link>

      {/* parte direita */}
      <div className="flex items-center gap-5">
        <div className="text-white">
          {/* 5. Usa o nome do usuário vindo do contexto */}
          <p>Olá, <span className="font-bold">{user?.nome}</span></p>
        </div>
        <div>
          {/* 6. Usa a função de logout do contexto */}
          <button onClick={logout} className="bg-[#C02222] hover:bg-[#e25d5d] flex py-1 px-3 gap-2 cursor-pointer rounded-md justify-between">
            <p className="text-white font-bold text-sm">Sair </p>
            <LogOut color="white" size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;