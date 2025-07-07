import DashboardLayout from "@/components/layout/DashboardLayout";
import Subheader from "@/components/layout/Subheader";
import { CardTotal, CardAvaliacao, CardMedia } from "@/components/barber/historico/CardsHistorico";
import TabelaHistorico from "@/components/barber/historico/TabelaHistorico";
import PrivateRoute from "@/components/auth/PrivateRoutes";

const HistoricoBarber = () => {
    return(
        <PrivateRoute>
            <DashboardLayout>
                <Subheader titulo="Histórico"/>
                {/* cards */}
                <div className="flex flex-col gap-4 md:flex-row md:gap-6 items-center">
                    <div className="flex-1 min-w-[200px]">
                        <CardTotal />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <CardAvaliacao />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <CardMedia />
                    </div>
                </div>
                {/* tabela */}
                <div className="mt-4">
                    <TabelaHistorico />
                </div>
            </DashboardLayout>
        </PrivateRoute>
    )
}

export default HistoricoBarber;