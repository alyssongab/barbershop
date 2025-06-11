import Link from "next/link";

const Sidebar = () => {
    return (
        <div className="fixed h-full bg-[#272727] w-52 left-0 text-white">
            <nav>
                <ul>
                    <li>
                        <Link href="/" className="bg-[#747474] p-4 flex gap-3 items-center justify-start">
                            <img src="/calendar.svg" alt="" className="w-[10%]"/>
                            <span className="text-xl font-semibold">Agendamento</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="p-4 flex gap-3 items-center justify-start hover:bg-[#414141]">
                            <img src="/historico.svg" alt="" className="w-[10%]"/>
                            <span className="text-xl">Histórico</span>
                        </Link>
                    </li>
                    <li className="p-4 flex gap-3 items-center justify-start opacity-30 cursor-not-allowed">
                        <img src="/assinaturas.svg" alt="" className="w-[10%]"/>
                        <span className="text-xl">Assinaturas</span>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar;