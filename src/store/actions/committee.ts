import { handleFetch } from '@/utils/fetchHandler';

export async function getCommittee(eventId: string) {
  return handleFetch({
    url: `/event/${eventId}/committee`,
    method: 'GET',
  });
}

export async function createCommittee(eventId: string, data: any) {
  return handleFetch({
    url: `/event/${eventId}/committee`,
    method: 'POST',
    data,
  });
}

export async function updateCommitteeRole(eventId: string, committeeId: string, data: any) {
  return handleFetch({
    url: `/event/${eventId}/committee/${committeeId}`,
    method: 'PATCH',
    data,
  });
}

export async function deleteCommittee(eventId: string, committeeId: string) {
  return handleFetch({
    url: `/event/${eventId}/committee/${committeeId}`,
    method: 'DELETE',
  });
}
