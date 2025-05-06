'use server';
import { getExternalApiUrl } from '@/utils/api';
import { cookies } from 'next/headers';

interface InfinityQueryParams {
  limit: number;
  type: string;
  sport_id: string;
  search: string;
  remark: string;
}

export async function getTournamentDetail({ id }: { id: string }) {
  /* 
      Warning :
      Kemungkinan bisa indirect access dengan ganti parameternya
  */
  // const {id} = await params

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

  const url = `/event/${id}`

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

export async function getTournamentInfinity(params: InfinityQueryParams) {
  /* 
      Warning :
      Kemungkinan bisa indirect access dengan ganti parameternya
  */

  // const urlObject = new URL(request.url || "/")
  const query: InfinityQueryParams = {
    limit: params.limit || 10,
    type: params.type || '',
    sport_id: params.sport_id || '',
    search: params.search || '',
    remark: params.remark || '',
  };

  // const tokenHeader = request.headers.get('Authorization')
  // console.log(request.headers.get('Authorization'))
  const tokenHeader = (await cookies()).get('access_token')?.value;
  if (!tokenHeader) {
    return {
      error: 'Unauthorized: Bearer token is missing or invalid',
      status: 401
    };
  }

  // Akses nilai token
  // const token = tokenHeader.split(' ')[1];
  // console.log(getExternalApiUrl(`/profile/${uuid}/basic`))

  const url = `/event/infinite?limit=${query.limit}&category=${query.type}&sport_id=${query.sport_id}&name=${query.search}&remark=${query.remark}`

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

export async function getTournamentParticipants({ eventID }: { eventID: string | string[] }) {
  /* 
      Warning :
      Kemungkinan bisa indirect access dengan ganti parameternya
  */
  // const {eventID} = await params

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

  const url = `/event/${eventID}/participant`

  const response = await fetch(getExternalApiUrl(url), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenHeader}`,
    },
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

export async function registerToTournament({ eventID, payload }: { eventID: string, payload: object }) {
  /* 
      Warning :
      Kemungkinan bisa indirect access dengan ganti parameternya
  */
  // const {eventID} = await params

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

  const url = `/event/${eventID}/register`

  const response = await fetch(getExternalApiUrl(url), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenHeader}`,
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(await request.json())
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error("Failed to register to tournament");
  }
  const data = await response.json()
  // console.log(await response.json())

  // return NextResponse.json(data, {
  //   headers: { 'Content-Type': 'application/json' },
  // });
  return data;
}