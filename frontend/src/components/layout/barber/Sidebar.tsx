"use client";
import Link from "next/link";
import { Calendar, Clock, CalendarCheck } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="h-full bg-[#272727] w-56 text-white shrink-0">
            <nav>
                <ul>
                    {/* home */}
                    <li>
                        <Link
                            href="#"
                            className={`p-3 flex gap-3 items-center justify-start ${
                                pathname === "/app/barber/home" ? "bg-[#747474]" : "hover:bg-[#414141]"
                            }`}
                        >
                            <Calendar className="w-5 h-5" />
                            <span className={`text-lg ${pathname === "/app/barber/home" ? "font-medium" : ""} `}>Home</span>
                        </Link>
                    </li>

                    {/* agenda */}
                    <li>
                        <Link
                            href="#"
                            className={`p-3 flex gap-3 items-center justify-start ${
                                pathname === "/app/barber/agenda" ? "bg-[#747474]" : "hover:bg-[#414141]"
                            }`}
                        >
                            <CalendarCheck className="w-5 h-5" />
                            <span className={`text-lg ${pathname === "/app/barber/agenda" ? "font-medium" : ""} `}>Agenda</span>
                        </Link>
                    </li>

                    {/* historico */}
                    <li>
                        <Link
                            href="#"
                            className={`p-3 flex gap-3 items-center justify-start ${
                                pathname === "/app/barber/historico" ? "bg-[#747474]" : "hover:bg-[#414141]"
                            }`}
                        >
                            <Clock className="w-5 h-5" />
                            <span className={`text-lg ${pathname === "/app/barber/historico" ? "font-medium" : ""} `}>Histórico</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar;