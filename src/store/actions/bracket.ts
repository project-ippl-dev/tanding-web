'use server';
import { ApiResponse, LockOrderBracketData, LockSingleBracketData, ScoreData, SingleMatchScoreData } from '@/types/bracket.type';
import { handleFetch } from '@/utils/fetchHandler'; // Import the new handler
import { BRACKET_SINGLE_RANDOM, BracketOrder, BracketSingle } from '../bracket';

export async function getBracketDetails({ eventID, classID }: { eventID: string | string[], classID: string }) {
  // return {
  //   ...BracketSingle,
  //   status: 200,
  // }

  const url = `/event/${eventID}/class/${classID}/bracket`;
  const result = await handleFetch({ url, method: 'GET' });

  return result;
}

export async function getBracketRandom({ eventID, classID }: { eventID: string | string[], classID: string }) {
  // return {
  //   ...BRACKET_SINGLE_RANDOM,
  //   status: 200,
  // } 
  
  const url = `/event/${eventID}/class/${classID}/bracket/random`;
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

export async function storeBracketOrderScore({ 
  eventID, 
  bracketID, 
  classID,
  data 
}: { 
  eventID: string | string[], 
  bracketID: string,
  classID: string, 
  data: ScoreData
}) {
  const url = `/event/${eventID}/bracket/${bracketID}/score/order`;
  const result = await handleFetch({ url, method: 'POST', data });
  if (result.error) {
    throw new Error(result.error);
  }
  return result;
}

// Fetch one bracket order score
export async function getBracketOrderScore({ 
  eventID, 
  bracketID 
}: { 
  eventID: string | string[], 
  bracketID: string 
}) {
  const url = `/event/${eventID}/bracket/${bracketID}/score/order`;
  const result = await handleFetch({ url, method: 'GET' });
  if (result.error) {
    throw new Error(result.error);
  }
  return result;
}

// Store bracket single score
export async function storeBracketSingleScore({ 
  eventID, 
  bracketID,
  classID, 
  data 
}: { 
  eventID: string | string[], 
  bracketID: string,
  classID: string, 
  data: SingleMatchScoreData 
}) {
  const url = `/event/${eventID}/bracket/${bracketID}/score/single`;
  const result = await handleFetch({ url, method: 'POST', data });
  if (result.error) {
    throw new Error(result.error);
  }
  return result;
}

// Fetch one bracket single score
export async function getBracketSingleScore({ 
  eventID, 
  bracketID 
}: { 
  eventID: string | string[], 
  bracketID: string 
}) {
  const url = `/event/${eventID}/bracket/${bracketID}/score/single`;
  const result = await handleFetch({ url, method: 'GET' });
  if (result.error) {
    throw new Error(result.error);
  }
  return result;
}


