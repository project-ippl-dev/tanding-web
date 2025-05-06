import { getExternalApiUrl } from '@/utils/api';
import { NextResponse, NextRequest } from 'next/server';


export async function GET(request: NextRequest, {params}: {params: {eventID: string, classID: string}}) {
/* 
    Warning :
    Kemungkinan bisa indirect access dengan ganti parameternya
*/
  const {eventID, classID} = await params

  const tokenHeader = request.headers.get('Authorization')
  // console.log(request.headers.get('Authorization'))
  if (!tokenHeader || !tokenHeader.startsWith('Bearer')) {
    return NextResponse.json(
        { error: 'Unauthorized: Bearer token is missing or invalid' },
        { status: 401 }
      );
  }

  // Akses nilai token
  const token = tokenHeader.split(' ')[1];
  // console.log(getExternalApiUrl(`/profile/${uuid}/basic`))

  const url = `/event/${eventID}/class/${classID}/bracket`

  const response = await fetch( getExternalApiUrl(url), {
        method: "GET",
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });
  const data = await response.json()
  // console.log(await response.json())

  return NextResponse.json(data, {
    headers: { 'Content-Type': 'application/json' },
  });
}