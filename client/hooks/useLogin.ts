import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@client/api/auth";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: loginApi,
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },
  });
};
