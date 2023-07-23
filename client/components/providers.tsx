"use client";

import { FC, ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { useQueryClient } from "@client/hooks/use-query-client";

type Props = {
  children: ReactNode;
};

const Providers: FC<Props> = ({ children }) => {
  const queryClient = useQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
