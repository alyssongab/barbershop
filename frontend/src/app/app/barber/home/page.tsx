import DashboardLayout from "@/components/layout/DashboardLayout";
import Subheader from "@/components/layout/Subheader";
import CardAgendamento from "@/components/barber/home/CardAgendamento";
import TabelaGeral from "@/components/barber/home/TabelaGeral";
import PrivateRoute from "@/components/auth/PrivateRoutes";

const HomeBarber = () => {
    return(
        <PrivateRoute>
            <DashboardLayout>
                <Subheader titulo="Home" />
                {/* div dos cards */}
                <div className="flex justify-items-center">
                    <CardAgendamento />
                </div>
                {/* div da table */}
                <div className="mt-8">
                    <TabelaGeral />
                </div>
            </DashboardLayout>
        </PrivateRoute>
    )
}

export default HomeBarber;