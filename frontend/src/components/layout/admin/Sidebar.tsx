"use client";
import Link from "next/link";
import { Home, FileText, Users } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="h-full bg-[#272727] w-56 text-white shrink-0">
            <nav>
                <ul>
                    {/* home */}
                    <li className="flex gap-3 items-center justify-start opacity-30 cursor-not-allowed">
                        <div className="flex gap-3 items-center justify-start side-items side-items">
                            <Home className="w-5 h-5" />
                            <span className="text-lg">Home</span>
                        </div>
                    </li>

                    {/* gerenciamento */}
                    <li>
                        <Link
                            href="/app/admin/gerenciamento"
                            className={`flex gap-3 items-center justify-start side-items ${
                                pathname === "/app/barber/agenda" ? "bg-[#747474]" : "hover:bg-[#414141]"
                            }`}
                        >
                            <Users className="w-5 h-5" />
                            <span className={`text-lg ${pathname === "/app/admin/gerenciamento" ? "font-medium" : ""} `}>Gerenciamento</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar;