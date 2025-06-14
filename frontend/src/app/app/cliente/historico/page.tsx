import Template from "@/components/layout/Template";
import Subheader from "@/components/layout/Subheader";
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