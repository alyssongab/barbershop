import Template from "@/components/layout/barber/Template";
import Subheader from "@/components/layout/barber/Subheader";
import { CardTotal, CardAvaliacao, CardMedia } from "@/components/barber/historico/CardsHistorico";

const HistoricoBarber = () => {
    return(
        <Template>
            <Subheader titulo="Histórico"/>
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
        </Template>
    )
}

export default HistoricoBarber;