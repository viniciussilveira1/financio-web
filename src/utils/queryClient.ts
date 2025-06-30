import { QueryClient } from "@tanstack/react-query";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shouldRetry = (failureCount: number, error: any) => {
  if (error?.code === "ERR_BAD_REQUEST") {
    return false;
  }
  return failureCount < 3;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: shouldRetry,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
    mutations: {
      retry: shouldRetry,
    },
  },
});

export const refetchData = (queryKey: string) =>
  queryClient.invalidateQueries({ queryKey: [queryKey] });
