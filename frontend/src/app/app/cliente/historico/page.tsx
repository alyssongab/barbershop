import Template from "@/components/layout/cliente/Template";
import Subheader from "@/components/layout/cliente/Subheader";
import TabelaHistorico from "@/components/cliente/historico/TabelaHistorico";

const Historico = () => {
    return(
        <Template>
            <Subheader titulo="Histórico"/>
            <TabelaHistorico />
        </Template>
    )
}

export default Historico;