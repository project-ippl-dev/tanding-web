'use server';

import { getExternalApiUrl } from "@/utils/api";
import { cookies } from "next/headers";

export async function getProfileData({ uuid }: { uuid: string }) {
  /* 
      Warning :
      Kemungkinan bisa indirect access dengan ganti parameternya;
  */
  // const { uuid } = await params
  // const headerList = headers()
  // const tokenHeader = (await headerList).get('Authorization')
  // console.log(request.headers.get('Authorization'))
  const tokenHeader = (await cookies()).get('access_token')?.value;
  // console.log(tokenHeader)
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


  const response = await fetch(getExternalApiUrl(`/profile/${uuid}/basic`), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
      Authorization: `Bearer ${tokenHeader}`,
    }
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json()
  // console.log(await response.json())

  return data;
}

export async function updateProfileData({ uuid, payload }: { uuid: string; payload: object }) {
  // const { uuid } = await params;
  // const tokenHeader = request.headers.get('Authorization');
  const tokenHeader = (await cookies()).get('access_token')?.value;
  // if (!tokenHeader || !tokenHeader.startsWith('Bearer')) {
    if (!tokenHeader) {
    return {
      error: 'Unauthorized: Bearer token is missing or invalid',
      status: 401
    };
  }

  // const token = tokenHeader.split(' ')[1];
  // const body = await request.json();

  const response = await fetch(getExternalApiUrl(`/profile/${uuid}/basic`), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenHeader}`,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  const data = await response.json();

  // return NextResponse.json(data, {
  //   headers: { 'Content-Type': 'application/json' },
  // });
  return data
}