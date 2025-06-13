import Template from "@/components/layout/Template";
import CardDetalhes from "@/components/cliente/agendamento/CardDetalhes";
import CardAgendamento from "@/components/cliente/agendamento/CardAgendamento";
import TabelaAgendamentos from "@/components/cliente/agendamento/TabelaAgendamentos";
import Subheader from "@/components/layout/Subheader";

const HomeCliente = () => {
    return(
        <Template>
            <Subheader titulo="Agendamento" />
            {/* div dos cards - 2 colunas */}
            <div className="grid grid-cols-2 justify-items-center">
                <CardDetalhes />
                <CardAgendamento />
            </div>

            {/* div da table */}
            <div className="mt-8">
                <TabelaAgendamentos />
            </div>
        </Template>
    );
}

export default HomeCliente;