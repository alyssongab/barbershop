import DashboardLayout from "@/components/layout/DashboardLayout";
import Subheader from "@/components/layout/Subheader";
import Gerenciamento from "@/components/admin/gerenciamento/Gerenciamento";
import PrivateRoute from "@/components/auth/PrivateRoutes";

const GerenciamentoPage = () => {
  return (
    <PrivateRoute>
      <DashboardLayout>
          <Subheader titulo="Gerenciamento"/>
          <Gerenciamento />
      </DashboardLayout>
    </PrivateRoute>
  );
}

export default GerenciamentoPage;