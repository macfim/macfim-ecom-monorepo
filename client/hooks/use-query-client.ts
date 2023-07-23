import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import * as z from "zod";
import { ToastType, useToast } from "@client/components/ui/use-toast";

const errorSchema = z.object({
  error: z.string(),
  message: z.string(),
  statusCode: z.number(),
});

const onError = (error: unknown, toast: (params: ToastType) => void) => {
  const parsedError = errorSchema.safeParse(error);

  if (parsedError.success) {
    return toast({
      title: parsedError.data.error,
      description: parsedError.data.message,
    });
  }

  return toast({ title: "Error", description: "Something went wrong" });
};

export const useQueryClient = () => {
  const { toast } = useToast();

  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => onError(error, toast),
    }),
    mutationCache: new MutationCache({
      onError: (error) => onError(error, toast),
    }),
  });
};
