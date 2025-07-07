import DashboardLayout from "@/components/layout/DashboardLayout";
import Subheader from "@/components/layout/Subheader";
import TabelaHistorico from "@/components/cliente/historico/TabelaHistorico";
import PrivateRoute from "@/components/auth/PrivateRoutes";

const Historico = () => {
    return(
        <PrivateRoute>
            <DashboardLayout>
                <Subheader titulo="Histórico"/>
                <TabelaHistorico />
            </DashboardLayout>
        </PrivateRoute>
    )
}

export default Historico;