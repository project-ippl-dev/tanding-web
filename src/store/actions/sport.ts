'use server';

import { handleFetch } from '@/utils/fetchHandler';


export async function getSport(page='', page_size='', keyword='', category='') {
  // Construct query parameters to match the original behavior (sending empty strings)
  const url = `/sport?page=${page}&page_size=${page_size}&keyword=${keyword}&category=${category}`;
  return await handleFetch({
    url: url,
    method: 'GET',
    isAuthorized: true,
  });

}
