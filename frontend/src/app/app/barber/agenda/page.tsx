import Template from "@/components/layout/barber/Template";
import Subheader from "@/components/layout/barber/Subheader";
import { CardData, CardTotal, CardFaturamento } from "@/components/barber/agenda/CardsAgenda";

const AgendaBarber = () => {
    return(
        <Template>
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
        </Template>
    )
}

export default AgendaBarber;