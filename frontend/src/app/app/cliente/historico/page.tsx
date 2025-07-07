import DashboardLayout from "@/components/layout/DashboardLayout";
import Subheader from "@/components/layout/Subheader";
import TabelaHistorico from "@/components/cliente/historico/TabelaHistorico";

const Historico = () => {
    return(
        <DashboardLayout>
            <Subheader titulo="Histórico"/>
            <TabelaHistorico />
        </DashboardLayout>
    )
}

export default Historico;