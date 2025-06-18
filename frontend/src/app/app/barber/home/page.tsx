import Template from "@/components/layout/barber/Template";
import CardAgendamento from "@/components/barber/home/CardAgendamento";
import Subheader from "@/components/layout/cliente/Subheader";
import TabelaGeral from "@/components/barber/home/TabelaGeral";

const HomeBarber = () => {
    return(
        <Template>
            <Subheader titulo="Home" />
            {/* div dos cards */}
            <div className="flex justify-items-center">
                <CardAgendamento />
            </div>

            {/* div da table */}
            <div className="mt-8">
                <TabelaGeral />
            </div>
        </Template>
    )
}

export default HomeBarber;