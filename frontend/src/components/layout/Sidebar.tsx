import Link from "next/link";
import { Calendar, Clock, FileText, LogOut, Plus, X } from "lucide-react"

const Sidebar = () => {
    return (
        <div className="h-full bg-[#272727] w-56 text-white shrink-0">
            <nav>
                <ul>
                    <li>
                        <Link href="/" className="bg-[#747474] p-3 flex gap-3 items-center justify-start">
                            <Calendar className="w-5 h-5" />
                            <span className="text-lg font-medium">Agendamento</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="p-3 flex gap-3 items-center justify-start hover:bg-[#414141]">
                            <Clock className="w-5 h-5" />
                            <span className="text-lg">Histórico</span>
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