import Template from "@/components/layout/Template";
import CardDetalhes from "@/components/client/CardDetalhes";
import CardAgendamento from "@/components/client/CardAgendamento";
import AgendamentosAndamento from "@/components/client/AgendamentosAndamento";

const HomeCliente = () => {
    return(
        <Template>
            <div className="border-b-2 pb-2 mb-4 px-6">
                <h1 className="text-xl text-[#242424] opacity-70">Agendamento</h1>
            </div>
            {/* div dos cards - 2 colunas */}
            <div className="grid grid-cols-2 justify-items-center">
                <CardDetalhes />
                <CardAgendamento />
            </div>

            {/* div da table */}
            <div className="mt-8">
                <AgendamentosAndamento />
            </div>
        </Template>
    );
}

export default HomeCliente;