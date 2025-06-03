'use server';
import { ClubFetchAllData, ClubFetchInviteRequestData, ClubFetchJoinRequestData, ClubFetchMemberData, ClubFetchOneData, CreateClubRequestBody } from '@/types/club.type';
import { FetchResponseBody } from '@/types/global';
import { getExternalApiUrl } from '@/utils/api';
import { handleFetch } from '@/utils/fetchHandler';
import { getAccessToken } from './auth';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function uploadClubLogo(image: any) {
  const accessToken = await getAccessToken();
  const formData = new FormData();
  formData.append("dir", "club");
  formData.append("file", image);
  try {
    // UPLOAD LOGO
    const imageResponse = await fetch(`${getExternalApiUrl('')}/storage/upload`, {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": `Bearer ${accessToken || ""}`,
      },
    })

    if (!imageResponse) {
      throw new Error('Failed in uploading image')
    }

    console.log(imageResponse)
    const responseData = await imageResponse.json();
    responseData.status = imageResponse.status; // Tambahkan status ke responseData

    if ([200, 201].includes(imageResponse.status)) {
      return responseData.data; // Kembalikan URL gambar
    } else {
      throw new Error()
    }
  } catch {
    throw new Error()
  }
}

export async function createClub(data: CreateClubRequestBody, logo: string) {

  // Create Club
  const dataClub = { ...data, logo: logo };

  const response = await handleFetch({ url: "/club", method: "POST", data: dataClub });

  // const response = await axios.post(`/club`, dataClub, {
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //   },
  // });
  return response;
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