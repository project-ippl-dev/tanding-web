import { getExternalApiUrl } from '@/utils/api';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest, {params}: {params: {uuid: string}}) {
/* 
    Warning :
    Kemungkinan bisa indirect access dengan ganti parameternya
*/
  const {uuid} = await params
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


  const response = await fetch(getExternalApiUrl(`/profile/${uuid}/basic`), {
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

export async function PUT(request: NextRequest, { params }: { params: { uuid: string } }) {
  const { uuid } = await params;
  const tokenHeader = request.headers.get('Authorization');

  if (!tokenHeader || !tokenHeader.startsWith('Bearer')) {
    return NextResponse.json(
      { error: 'Unauthorized: Bearer token is missing or invalid' },
      { status: 401 }
    );
  }

  const token = tokenHeader.split(' ')[1];
  const body = await request.json();

  const response = await fetch(getExternalApiUrl(`/profile/${uuid}/basic`), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return NextResponse.json(data, {
    headers: { 'Content-Type': 'application/json' },
  });
}