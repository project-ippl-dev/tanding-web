'use server';
import { handleFetch } from '@/utils/fetchHandler'; // Import handleFetch

interface InfinityQueryParams {
  limit: number;
  type: string;
  sport_id: string;
  search: string;
  remark: string;
}

export async function getTournamentDetail({ id }: { id: string }) {

  const url = `/event/${id}`;
  const result = await handleFetch({ url, method: 'GET' });

  return result;
}

export async function getTournamentInfinity(params: InfinityQueryParams) {

  const query: InfinityQueryParams = {
    limit: params.limit || 10,
    type: params.type || '',
    sport_id: params.sport_id || '',
    search: params.search || '',
    remark: params.remark || '',
  };

  const url = `/event/infinite?limit=${query.limit}&category=${query.type}&sport_id=${query.sport_id}&name=${query.search}&remark=${query.remark}`;
  const result = await handleFetch({ url, method: 'GET' });

  return result;
}

export async function getTournamentParticipants({ eventID }: { eventID: string | string[] }) {

  const url = `/event/${eventID}/participant`;
  const result = await handleFetch({ url, method: 'GET' });

  return result;
}

export async function registerToTournament({ eventID, payload }: { eventID: string, payload: object }) {

  const url = `/event/${eventID}/register`;
  const result = await handleFetch({ url, method: 'POST', data: payload });

  return result;
}

export async function sendFinishTournament({ eventID }: { eventID: string | string[] }) {

  const url = `/event/${eventID}/summary`;
  const result = await handleFetch({ url, method: 'POST' });

  return result;
}