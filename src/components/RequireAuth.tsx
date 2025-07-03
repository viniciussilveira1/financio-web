import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { me } from "@services/api.routes";

export default function RequireAuth() {
  // Chamada para o backend para verificar se o usuário está autenticado
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: me,
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError || !data) {
    // Se erro ou dados inválidos, redireciona para login
    return <Navigate to='/login' replace />;
  }

  // Se chegou aqui, está autenticado, libera a rota protegida
  return <Outlet />;
}
