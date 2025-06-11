"use client";

import Link from "next/link";

const Header = () => {

    const fazerLogout = () => {
        window.location.href = '/'
    }

    return(
        <header className="bg-[#140F0B] w-full h-[80px] flex justify-between p-3">
            {/* parte esquerda */}
            <div className="flex items-center">
                <div>
                    <img src="/logo.png" alt="Logo Barbearia" className="w-[70%]"/>
                </div>
                <div>
                    <span className="text-3xl text-white">Painel Cliente</span>
                </div>
            </div>
            {/* parte direita */}
            <div className="flex items-center gap-5">
                <div className="text-white">
                    <p>Olá, <span className="font-bold">Alysson Gabriel</span></p>
                </div>
                <div>
                    <button onClick={fazerLogout} className="bg-[#C02222] flex py-1 px-3 items-center cursor-pointer rounded-md justify-between">
                        <div>
                            <p className="text-white font-bold">Sair</p>
                        </div>
                            <img src="/logout.svg" alt="Logout" className="w-[35%]"/>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header;