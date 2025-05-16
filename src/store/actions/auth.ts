'use server'
import { getExternalApiUrl } from "@/utils/api";
import { cookies } from "next/headers";

export const authLogin = async (username: string, password: string) => {
  const res = await fetch(
    getExternalApiUrl(`/auth/login`),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login failed");
  }

  // console.log(res)
  const result = await res.json();

  (await cookies()).set('access_token', result.data.token.access_token, {
    httpOnly: true, // Prevents client-side JavaScript access
    secure: true,   // Ensures cookie is only sent over HTTPS
    sameSite: 'strict',
  });

  return result

};

export const authLogout = async () => {
  (await cookies()).delete('access_token'); // Remove stored authentication token
  return { success: true, message: 'Logged out successfully' };

};

export const getAccessToken = async () => {
  const accessToken = (await cookies()).get('access_token')?.value;
  if (!accessToken) {
    return {
      error: 'Unauthorized: Bearer token is missing or invalid',
      status: 401
    };
  }
  return accessToken
}