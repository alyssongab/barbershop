import DashboardLayout from "@/components/layout/DashboardLayout";
import Subheader from "@/components/layout/Subheader";
import Abas from "@/components/admin/gerenciamento/Abas";

const GerenciamentoPage = () => {
  return (
    <DashboardLayout>
        <Subheader titulo="Gerenciamento"/>
        <Abas />
    </DashboardLayout>
  );
}

export default GerenciamentoPage;