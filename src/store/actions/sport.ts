'use server';
import { getExternalApiUrl } from "@/utils/api";
import { getAccessToken } from "./auth";

interface GetAllSportParams {
  page?: number;
  page_size?: number;
  keyword?: string;
  category?: string;
}

export async function getAllSports(query: GetAllSportParams) {
  const accessToken = getAccessToken();
  const queryParams = new URLSearchParams();
  ['page', 'page_size', 'keyword', 'category'].forEach((param) => {
    const value = query[param as keyof GetAllSportParams];
    if (value) {
      queryParams.append(param, value.toString())
    } else {
      queryParams.append(param, '')
    }
  })
  const queryString = queryParams.toString()
  const basePath = '/sport'
  const finalFetchUrl = queryString ? `${basePath}?${queryString}` : basePath

  const response = await fetch(getExternalApiUrl(finalFetchUrl), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json()
  return data;
}