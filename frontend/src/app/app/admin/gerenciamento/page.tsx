import Template from "@/components/layout/admin/Template";
import Subheader from "@/components/layout/admin/Subheader";
import Abas from "@/components/admin/gerenciamento/Abas";

const GerenciamentoPage = () => {
  return (
    <Template>
        <Subheader titulo="Gerenciamento"/>
        <Abas />
    </Template>
  );
}

export default GerenciamentoPage;