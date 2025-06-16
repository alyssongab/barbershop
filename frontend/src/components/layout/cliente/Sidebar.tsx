"use client";
import Link from "next/link";
import { Calendar, Clock, FileText } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="h-full bg-[#272727] w-56 text-white shrink-0">
            <nav>
                <ul>
                    <li>
                        <Link
                            href="/app/cliente/agendamento"
                            className={`p-3 flex gap-3 items-center justify-start ${
                                pathname === "/app/cliente/agendamento" ? "bg-[#747474]" : "hover:bg-[#414141]"
                            }`}
                        >
                            <Calendar className="w-5 h-5" />
                            <span className={`text-lg ${pathname === "/app/cliente/agendamento" ? "font-medium" : ""} `}>Agendamento</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/app/cliente/historico"
                            className={`p-3 flex gap-3 items-center justify-start ${
                                pathname === "/app/cliente/historico" ? "bg-[#747474]" : "hover:bg-[#414141]"
                            }`}
                        >
                            <Clock className="w-5 h-5" />
                            <span className={`text-lg ${pathname === "/app/cliente/historico" ? "font-medium" : ""} `}>Histórico</span>
                        </Link>
                    </li>
                    <li className="p-3 flex gap-3 items-center justify-start opacity-30 cursor-not-allowed">
                        <FileText className="w-5 h-5" />
                        <span className="text-lg">Assinaturas</span>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar;