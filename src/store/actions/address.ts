'use server'
import { cookies } from "next/headers";


export async function getProvince() {
    const tokenHeader = (await cookies()).get('access_token')?.value;
  // if (!tokenHeader || !tokenHeader.startsWith('Bearer')) {
  if (!tokenHeader) {
    return {
      error: 'Unauthorized: Bearer token is missing or invalid',
      status: 401
    };
  }

  // Akses nilai token
  // const token = tokenHeader.split(' ')[1];
  // console.log(getExternalApiUrl(`/profile/${uuid}/basic`))


  const endpoint = `https://api.general.eoatech.com/provinces/search?kata_kunci=`;
  const response = await fetch(endpoint, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json()
  // console.log(await response.json())

  // return NextResponse.json(data, {
  //   headers: { 'Content-Type': 'application/json' },
  // });
  return data;
}