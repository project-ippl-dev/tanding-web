'use server';

import { getExternalApiUrl } from '@/utils/api';
import { cookies } from 'next/headers';

interface GetSportParams {
  keyword?: string;
  category?: string;
  page?: string | number;
  page_size?: string | number;
}

export async function getSport(params: GetSportParams) {
  const tokenHeader = (await cookies()).get('access_token')?.value;

  if (!tokenHeader && !(process.env.BYPASS_REQ_AUTH === 'true')) {
    return {
      error: 'Unauthorized: Bearer token is missing or invalid',
      status: 401,
    };
  }

  const {
    keyword = '',
    category = '',
    page = '', // Default to empty string as per original sport.js
    page_size = '', // Default to empty string as per original sport.js
  } = params;

  // Construct query parameters to match the original behavior (sending empty strings)
  const queryParams = new URLSearchParams({
    page: String(page),
    page_size: String(page_size),
    keyword: String(keyword),
    category: String(category),
  });

  const url = `/sport?${queryParams.toString()}`;

  const response = await fetch(getExternalApiUrl(url), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokenHeader}`,
    },
  });

  if (!response.ok) {
    // Consistent with error handling in reference server action files
    throw new Error('Failed to fetch sport data');
  }

  // Assuming the API response body is an object like: { data: <sport_data>, last_page: <number> }
  // This matches the structure implied by `response.data.data` and `response.data.last_page` in the axios version.
  const data = await response.json();

  return data
}
