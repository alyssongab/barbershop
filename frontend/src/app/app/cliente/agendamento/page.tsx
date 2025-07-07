import DashboardLayout from "@/components/layout/DashboardLayout";
import Subheader from "@/components/layout/Subheader";
import CardDetalhes from "@/components/cliente/agendamento/CardDetalhes";
import CardAgendamento from "@/components/cliente/agendamento/CardAgendamento";
import TabelaAgendamentos from "@/components/cliente/agendamento/TabelaAgendamentos";

const PaginaAgendamento = () => {
    return (
        // 1. Você envolve a página com o Layout principal.
        // Ele vai automaticamente renderizar o Header e a Sidebar corretos para o cliente.
        <DashboardLayout>
            
            {/* 2. AQUI, dentro da página, você usa o Subheader
                   e passa o título que você quer para ESTA página. */}
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

        </DashboardLayout>
    );
}

export default PaginaAgendamento;