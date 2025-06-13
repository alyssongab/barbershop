import Image from "next/image"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center bg-[#140f0b] text-white p-4">
        <div className="flex items-center gap-4">
          <Image
            src="/images/santosbarbearia.png"
            alt="Santos Barbearia Logo"
            width={64}
            height={64}
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold">Painel de usuários</h1>
        </div>
        <div className="flex items-center gap-4">
          <span>Olá, Aysson Gabriel</span>
          <Button className="bg-[#c02222] hover:bg-[#a51d1d] text-white flex items-center gap-2">
            Sair
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M16 17L21 12L16 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 12H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-[332px] bg-[#242424] text-white">
          <nav>
            <ul>
              <li className="p-4 flex items-center gap-4 hover:bg-[#3d3939] cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 4H20V7H4V4Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 10H20V13H4V10Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 16H20V19H4V16Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xl">Agendamento</span>
              </li>
              <li className="p-4 flex items-center gap-4 bg-[#3d3939] cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 7V12L15 15"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xl">Histórico</span>
              </li>
              <li className="p-4 flex items-center gap-4 hover:bg-[#3d3939] cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 7H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 11H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 15H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 19H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-xl">Assinaturas</span>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-white">
          <div className="mb-8">
            <h2 className="text-2xl font-normal text-[#242424]">Histórico</h2>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-[#242424] mb-6">Histórico de Agendamentos</h3>

            <div className="border border-[#e4e4e4] rounded">
              {/* Table Header */}
              <div className="grid grid-cols-6 bg-[#ebebeb] p-4 font-medium">
                <div>Data</div>
                <div>Horário</div>
                <div>Serviço</div>
                <div>Barbeiro</div>
                <div>Valor</div>
                <div>Avaliação</div>
              </div>

              {/* Table Rows */}
              <div className="grid grid-cols-6 p-4 border-b border-[#e4e4e4]">
                <div>04/06/2025</div>
                <div>18:00</div>
                <div>Corte Navalhado</div>
                <div>Luiz David</div>
                <div>R$ 40,00</div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-6 p-4 border-b border-[#e4e4e4]">
                <div>29/05/2025</div>
                <div>14:30</div>
                <div>Barba + Sobrancelha</div>
                <div>Rian Rodrigues</div>
                <div>R$ 60,00</div>
                <div>
                  <Button className="bg-black hover:bg-gray-800 text-white text-xs px-4 py-1 h-8 rounded">
                    Avaliar
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-6 p-4">
                <div>31/05/2025</div>
                <div>18:00</div>
                <div>Corte + Barba + Sobrancelha</div>
                <div>Rian Rodrigues</div>
                <div>R$ 70,00</div>
                <div className="text-gray-500">Cancelado</div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-[#ebebeb] p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/images/santosbarbearia.png"
            alt="Santos Barbearia Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-[#242424]">Sistema v.1.0</span>
        </div>
        <div className="text-[#242424]">
          powered by <span className="font-bold">RMA</span>
        </div>
      </footer>
    </div>
  )
}
