import { getExternalApiUrl } from '@/utils/api';
import { NextResponse, NextRequest } from 'next/server';

interface InfinityQueryParams {
  limit: number;
  type: string;
  sport_id: string;
  search: string;
  remark: string;
}

export async function GET(request: NextRequest) {
/* 
    Warning :
    Kemungkinan bisa indirect access dengan ganti parameternya
*/

  const urlObject = new URL(request.url || "/")
  const query: InfinityQueryParams = {
    limit: parseInt(urlObject.searchParams.get('limit') || '0', 10),
    type: urlObject.searchParams.get('type') || '',
    sport_id: urlObject.searchParams.get('sport_id') || '',
    search: urlObject.searchParams.get('search') || '',
    remark: urlObject.searchParams.get('remark') || '',
  };

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

  const url = `/event/infinite?limit=${query.limit}&category=${query.type}&sport_id=${query.sport_id}&name=${query.search}&remark=${query.remark}`

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