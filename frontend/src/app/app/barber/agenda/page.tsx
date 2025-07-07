import DashboardLayout from "@/components/layout/DashboardLayout";
import Subheader from "@/components/layout/Subheader";
import { CardData, CardTotal, CardFaturamento } from "@/components/barber/agenda/CardsAgenda";
import Agendamentos from "@/components/barber/agenda/Agendamentos";

const AgendaBarber = () => {
    return(
        <DashboardLayout>
            <Subheader titulo="Agenda"/>
            {/* cards */}
            <div className="flex flex-col gap-4 md:flex-row md:gap-6 w-full items-center">
                <div className="flex-1 min-w-[250px]">
                    <CardData />
                </div>
                <div className="flex-1 min-w-[200px]">
                    <CardTotal />
                </div>
                <div className="flex-1 min-w-[200px]">
                    <CardFaturamento />
                </div>
            </div>

            {/* agenda */}
            <div className="mt-5">
                <Agendamentos />
            </div>
        </DashboardLayout>
    )
}

export default AgendaBarber;