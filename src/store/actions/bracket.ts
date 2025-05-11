'use server';
import { getExternalApiUrl } from '@/utils/api';
import { cookies } from 'next/headers';


export async function getBracketDetails({ eventID, classID }: { eventID: string | string[], classID: string }) {
  /* 
      Warning :
      Kemungkinan bisa indirect access dengan ganti parameternya
  */
  // const { eventID, classID } = await params
  // const tokenHeader = request.headers.get('Authorization')
  // console.log(request.headers.get('Authorization'))
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

  const url = `/event/${eventID}/class/${classID}/bracket`

  const response = await fetch(getExternalApiUrl(url), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenHeader}`,
    }
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