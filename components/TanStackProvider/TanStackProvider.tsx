"use client";

import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";

export default function TanStackProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient({queryCache: new QueryCache({
      onError: (error) => {
        if (error.config?.url?.includes("/users/me")) return;
        const message = error.response?.data?.message || error.message || "Something went wrong";
        toast.error(message);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        const message = error.response?.data?.message || error.message || "Something went wrong";
        toast.error(message);
      },
    }),
  }));
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
