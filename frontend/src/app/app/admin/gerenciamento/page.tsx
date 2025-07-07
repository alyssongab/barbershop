import DashboardLayout from "@/components/layout/DashboardLayout";
import Subheader from "@/components/layout/Subheader";
import Abas from "@/components/admin/gerenciamento/Abas";
import PrivateRoute from "@/components/auth/PrivateRoutes";

const GerenciamentoPage = () => {
  return (
    <PrivateRoute>
      <DashboardLayout>
          <Subheader titulo="Gerenciamento"/>
          <Abas />
      </DashboardLayout>
    </PrivateRoute>
  );
}

export default GerenciamentoPage;