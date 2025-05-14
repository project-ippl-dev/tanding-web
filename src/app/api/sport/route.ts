import { getExternalApiUrl } from '@/utils/api';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const tokenHeader = request.headers.get('Authorization')
  if (!tokenHeader || !tokenHeader.startsWith('Bearer')) {
    return NextResponse.json(
      { error: 'Unauthorized: Bearer token is missing or invalid' },
      { status: 401 }
    );
  }

  // Akses nilai token
  const token = tokenHeader.split(' ')[1];

  const searchParams = request.nextUrl.searchParams;
  const queryParams = new URLSearchParams();
  ['page', 'page_size', 'keyword', 'category'].forEach((param) => {
    const value = searchParams.get(param);
    if (value) {
      queryParams.append(param, value)
    }
  })

  const queryString = queryParams.toString()
  const basePath = '/sport'
  const finalFetchUrl = queryString ? `${basePath}?${queryString}` : basePath

  const response = await fetch(getExternalApiUrl(finalFetchUrl), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });
  const data = await response.json()
  // console.log(await response.json())

  return NextResponse.json(data, {
    headers: { 'Content-Type': 'application/json' },
  });
}