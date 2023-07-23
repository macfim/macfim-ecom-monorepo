import * as zod from "zod";

const API_URL = "http://localhost:4000/api/auth";

const loginResponseSchema = zod.object({
  accessToken: zod.string(),
  refreshToken: zod.string(),
});

export type LoginApiParams = {
  email: string;
  password: string;
};

export async function loginApi({ email, password }: LoginApiParams) {
  const response = await fetch(`${API_URL}/local/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return Promise.reject(await response.json());
  }

  return loginResponseSchema.parse(await response.json());
}
