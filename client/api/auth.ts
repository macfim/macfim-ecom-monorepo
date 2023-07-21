const API_URL = "http://localhost:4000/api/auth";

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/local/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error("Network response was not ok.");
}
