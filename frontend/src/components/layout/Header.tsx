"use client";

import Link from "next/link";

const Header = () => {

    const person = {
        nome: "Alysson",
        role: "cliente"
    }

    const fazerLogout = () => {
        window.location.href = '/'
    }

    return(
        <header className="bg-[#140F0B] w-full h-[70px] flex justify-between p-3">
            {/* parte esquerda */}
            <Link href="#" className="flex items-center cursor-pointer">
                <div>
                    <img src="/logo.png" alt="Logo Barbearia" className="w-[65%]"/>
                </div>
                <div>
                    <span className="text-3xl text-white">Painel Cliente</span>
                </div>
            </Link>

            {/* parte direita */}
            <div className="flex items-center gap-5">
                <div className="text-white">
                    <p>Olá, <span className="font-bold">{person.nome}</span></p>
                </div>
                <div>
                    <button onClick={fazerLogout} className="bg-[#C02222] hover:bg-[#e25d5d] flex py-1 px-3 items-center cursor-pointer rounded-md justify-between">
                        <div>
                            <p className="text-white font-bold text-sm">Sair</p>
                        </div>
                            <img src="/logout.svg" alt="Logout" className="w-[35%]"/>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header;