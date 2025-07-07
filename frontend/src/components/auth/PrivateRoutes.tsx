"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Loading } from "@/components/ui/loading";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Primeiro, esperamos a verificação inicial de autenticação terminar
    if (loading) {
      return; // Não faz nada enquanto o estado de auth está sendo carregado
    }

    // Se não estiver carregando e o usuário NÃO estiver autenticado, redireciona para o login
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, loading, router]); // O efeito roda sempre que esses valores mudam

  // Se a autenticação ainda está carregando, exibe o componente de Loading
  if (loading) {
    return <Loading />;
  }

  // Se estiver autenticado, renderiza a página solicitada (os "children")
  // Se não estiver autenticado, renderiza o Loading enquanto o redirecionamento acontece
  return isAuthenticated ? <>{children}</> : <Loading />;
};

export default PrivateRoute;