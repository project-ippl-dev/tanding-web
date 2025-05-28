'use server';

import { handleFetch } from "@/utils/fetchHandler";

export async function getProfileData({ uuid }: { uuid: string }) {
  const url = `/profile/${uuid}/basic`
  const result = await handleFetch({ url, method: 'GET' });
  // return Promise.reject({message: 'error'});
  return result;
}

export async function updateProfileData({ uuid, payload }: { uuid: string; payload: object }) {
  const url = `/profile/${uuid}/basic`
  const result = await handleFetch({ url, method: 'PUT', data: payload });

  return result;
}