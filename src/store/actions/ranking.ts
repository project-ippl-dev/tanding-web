'use server';

import { handleFetch } from "@/utils/fetchHandler";

interface GetPowerListParam {
  id?: string;
  page?: number | string;
  page_size?: number | string;
}

export async function getPowerListUser({ id, page, page_size }: GetPowerListParam) {
  const url = `/rank/user?sport_id=${id}&page=${page}&page_size=${page_size}`;
  return await handleFetch({
    url: url,
    method: 'GET',
    isAuthorized: true,
  });
};

export async function getPowerListClub({ id, page, page_size }: GetPowerListParam) {
  const url = `/rank/club?sport_id=${id}&page=${page}&page_size=${page_size}`;
  return await handleFetch({
    url: url,
    method: 'GET',
    isAuthorized: true,
  });
};