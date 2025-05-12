'use server';
import { LockOrderBracketData, LockSingleBracketData } from '@/types/bracket.type';
import { handleFetch } from '@/utils/fetchHandler'; // Import the new handler


export async function getBracketDetails({ eventID, classID }: { eventID: string | string[], classID: string }) {
  const url = `/event/${eventID}/class/${classID}/bracket`;
  const result = await handleFetch({ url, method: 'GET' });

  return result;
}

export async function getBracketRandom({ eventID, classID }: { eventID: string | string[], classID: string }) {
  const url = `/event/${eventID}/class/${classID}/bracket`;
  const result = await handleFetch({ url, method: 'GET' });

  return result;
}

export async function lockBracketOrder({ eventID, classID, data }: { eventID: string | string[], classID: string, data: LockOrderBracketData }) {
  const url = `/event/${eventID}/class/${classID}/bracket/order/lock`;
  const result = await handleFetch({ url, method: 'PATCH', data });

  return result;
}

export async function lockBracketSingle({ eventID, classID, data }: { eventID: string | string[], classID: string, data: LockSingleBracketData }) {
  const url = `/event/${eventID}/class/${classID}/bracket/single/lock`;
  const result = await handleFetch({ url, method: 'PATCH', data });

  return result;
}

export async function lockBracketScore({ eventID, classID }: { eventID: string | string[], classID: string }) {
  const url = `/event/${eventID}/class/${classID}/score/lock`;
  const result = await handleFetch({ url, method: 'PATCH', data: { status: true } });

  if (result.error) {
    throw new Error(result.error);
  }
  return result;
}

export async function lockTurnBracketSingle({ eventID }: { eventID: string | string[] }) {
  const url = `/event/${eventID}/turn/lock`;
  const result = await handleFetch({ url, method: 'PATCH' }); // No data/body

  if (result.error) {
    throw new Error(result.error);
  }
  return result;
}

export async function generateBracket({ eventID, classID }: { eventID: string | string[], classID: string }) {
  const url = `/event/${eventID}/class/${classID}/bracket`;
  const result = await handleFetch({ url, method: 'POST' }); // No data/body

  if (result.error) {
    throw new Error(result.error);
  }
  return result;
}




