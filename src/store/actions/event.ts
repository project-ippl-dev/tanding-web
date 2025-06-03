'use server';
import { EventCreatePayload, EventUpdatePayload } from '@/types/event.type';
import { handleFetch } from '@/utils/fetchHandler'; // Import handleFetch
import { EVENT, EVENT_INFINITY, EVENT_PARTICIPANTS } from '../event';

interface InfinityQueryParams {
  limit: number;
  type: string;
  sport_id: string;
  search: string;
  remark: string;
}

export async function createTournamentEvent(data: EventCreatePayload) {
  // return {...EVENT_INFINITY, status:200}
  const url = `/event`;
  const result = await handleFetch({ url, method: 'POST', data });
  return result;
}

export async function getTournamentDetail({ id }: { id: string }) {
  // const testData = {
  //   ...EVENT,
  //   data:{
  //     ...EVENT.data,
  //     remark: 'open', // Simulating ongoing status for testing purposes
  //   },
  //   status: 200
  // }
  // // testData.data.remark = 'open'; // Simulating ongoing status for testing purposes
  // return testData
  const url = `/event/${id}`;
  const result = await handleFetch({ url, method: 'GET' });
  return result;
}


export async function getOwnTournament({ page = 1, page_size = 10 }) {
  // return {...EVENT_INFINITY, status:200}
  const url = `/event/own?page=${page}&page_size=${page_size}`;
  const result = await handleFetch({ url, method: 'GET' });
  return result;
}


export async function getTournamentInfinity(params: InfinityQueryParams) {
  const query: Partial<InfinityQueryParams> = {
    limit: params.limit || 10,
  };

  if (params.type) query.type = params.type;
  if (params.sport_id) query.sport_id = params.sport_id;
  if (params.search) query.search = params.search;
  if (params.remark) query.remark = params.remark;

  const url = `/event/infinite?limit=${query.limit}` +
    (query.type ? `&category=${query.type}` : '') +
    (query.sport_id ? `&sport_id=${query.sport_id}` : '') +
    (query.search ? `&name=${query.search}` : '') +
    (query.remark ? `&remark=${query.remark}` : '');

  const result = await handleFetch({ url, method: 'GET' });

  return result;
}

export async function getTournamentParticipants({ eventID }: { eventID: string | string[] }) {
  // return {...EVENT_PARTICIPANTS, status:200}
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

export async function updateTournamentDetail(
  id: string,
  eventData: EventUpdatePayload, // Consider defining a more specific type for eventData
) {
    const url = `/event/${id}`;
    const result = await handleFetch({ url, method: 'PUT', data: eventData });
    return result;

}
