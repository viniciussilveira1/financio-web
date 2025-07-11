import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { me } from "@services/api.routes";

export default function RequireAuth() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: me,
  });

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-app-secondary'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
          <p className='text-app font-medium'>Carregando...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
}
