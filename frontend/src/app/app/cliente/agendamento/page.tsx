import DashboardLayout from "@/components/layout/DashboardLayout";
import Subheader from "@/components/layout/Subheader";
import CardDetalhes from "@/components/cliente/agendamento/CardDetalhes";
import CardAgendamento from "@/components/cliente/agendamento/CardAgendamento";
import TabelaAgendamentos from "@/components/cliente/agendamento/TabelaAgendamentos";
import PrivateRoute from "@/components/auth/PrivateRoutes";

const PaginaAgendamento = () => {
    return (
        <PrivateRoute>
            <DashboardLayout>
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
        </PrivateRoute>
    );
}

export default PaginaAgendamento;