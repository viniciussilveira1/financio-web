import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { me } from "@services/api.routes";

export default function RequireAuth() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: me,
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError || !data) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
}
