import { handleFetch } from '@/utils/fetchHandler';

// Fungsi berdiri sendiri untuk pencarian user
export const searchUser = async (keyword: string, limit: number) => {
  return await handleFetch({
    url: `/user/search?keyword=${keyword}&limit=${limit}`,
    method: 'GET',
    isAuthorized: true,
  });
};
