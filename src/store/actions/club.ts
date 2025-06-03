'use server';
import { ClubFetchAllData, ClubFetchInviteRequestData, ClubFetchJoinRequestData, ClubFetchMemberData, ClubFetchOneData, CreateClubRequestBody } from '@/types/club.type';
import { getExternalApiUrl } from '@/utils/api';
import { getAccessToken } from './auth';
import { FetchResponseBody } from '@/types/global';
import { handleFetch } from '@/utils/fetchHandler';

export async function getMembersOfClub({ clubID }: { clubID: string }): Promise<FetchResponseBody<ClubFetchMemberData>> {
  // const accessToken = getAccessToken();

  // const url = `/club/${clubID}/participant`

  // const response = await fetch(getExternalApiUrl(url), {
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   }
  // });
  // if (!response.ok) {
  //   throw new Error("Failed to fetch data");
  // }
  // const data = await response.json()

  // return data;

  const url = `/club/${clubID}/participant`
  const result = await handleFetch({ url, method: "GET" });
  return result
}

interface GetAllClubsParams {
  page?: number;
  page_size?: number;
  sport_id?: string;
}

export async function getAllClubs(query: GetAllClubsParams): Promise<FetchResponseBody<ClubFetchAllData[]>> {
  // const accessToken = getAccessToken();
  const queryParams = new URLSearchParams();
  ['page', 'page_size', 'sport_id'].forEach((param) => {
    const value = query[param as keyof GetAllClubsParams];
    if (value) {
      queryParams.append(param, value.toString())
    } else {
      queryParams.append(param, '')
    }
  })
  const queryString = queryParams.toString()
  const basePath = '/club'
  const finalFetchUrl = queryString ? `${basePath}?${queryString}` : basePath

  // const response = await fetch(getExternalApiUrl(finalFetchUrl), {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // });
  // if (!response.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  // const data = await response.json()
  // return data;

  const result = await handleFetch({ url: finalFetchUrl, method: 'GET' });
  return result;

}

export async function getOneClub(clubId: string): Promise<FetchResponseBody<ClubFetchOneData>> {
  // const accessToken = getAccessToken();

  // const response = await fetch(getExternalApiUrl(`/club/${clubId}`), {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // });

  // if (!response.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  // const data = await response.json()
  // return data;

  const url = `/club/${clubId}`
  const result = await handleFetch({ url, method: "GET" });
  return result
}

export async function getInviteRequest(): Promise<FetchResponseBody<ClubFetchInviteRequestData[]>> {
  const url = `/club/invite/approval`
  const result = await handleFetch({ url, method: "GET" });
  return result
}

export async function getJoinRequest(clubId: string): Promise<FetchResponseBody<ClubFetchJoinRequestData[]>> {
  const url = `/club/${clubId}/join/approval`
  const result = await handleFetch({ url, method: "GET" });
  return result
}

export async function createClub(data: CreateClubRequestBody) {
  const accessToken = getAccessToken();
  const res = await fetch(
    getExternalApiUrl(`/club`),
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    }
  );

  console.log('res', res)

  if (!res.ok) {
    const err = await res.json();
    console.log('hai', err)
    throw new Error(`Create club failed: ${err.message}`);
  }

  // console.log(res)
  const result = await res.json();

  return result
}

export async function approveInviteRequest(approval_id: number, status: boolean) {
  const url = `/club/invite/approval/${approval_id}`
  const result = await handleFetch({ url, method: 'PATCH', data: { status } });

  return result;
}

export async function approveJoinRequest(club_id: string, approval_id: number, status: boolean) {
  const url = `/club/${club_id}/join/approval/${approval_id}`
  const result = await handleFetch({ url, method: 'PATCH', data: { status } });

  return result;
}

export async function joinClub(club_id: string, data: { sport_id: string }) {
  const url = `/club/${club_id}/join`
  const result = await handleFetch({ url, method: 'POST', data });

  return result;
}

export async function inviteToClub(club_id: string, data: { participants: { user_id: string; sport_id: string }[] }) {
  const url = `/club/${club_id}/invite`
  const result = await handleFetch({ url, method: 'POST', data });

  return result;
}