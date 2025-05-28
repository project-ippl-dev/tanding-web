"use server";

import { getExternalApiUrl } from '@/utils/api';
import { cookies } from 'next/headers';

interface FetchHandlerParams {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  isAuthorized?: boolean;
  contentType?: string;
  externalURL?: boolean; // Optional, default is false
}

export async function handleFetch({
  url,
  method,
  data,
  isAuthorized = true, // Default to true, as most of your functions require authorization
  contentType = 'application/json',
  externalURL = false,
}: FetchHandlerParams) {
  const headers: HeadersInit = {};
  // throw new Error(`This function is not implemented yet ${url}`); // Placeholder for the actual implementation
  if (isAuthorized) {
    const tokenHeader = (await cookies()).get('access_token')?.value;
    if (!tokenHeader && !(process.env.BYPASS_REQ_AUTH === 'true')) {
      return {
        error: 'Unauthorized: Bearer token is missing or invalid',
        status: 401,
      };
    }
    if (tokenHeader) {
      headers['Authorization'] = `Bearer ${tokenHeader}`;
    }
  }

  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  const fetchOptions: RequestInit = {
    method,
    headers,
  };

  if (data && (method === 'POST' || method === 'PATCH' || method === 'PUT')) {
    if (contentType === 'application/json') {
      fetchOptions.body = JSON.stringify(data);
    } else {
      fetchOptions.body = data; // For FormData or other types
    }
  }
  
  let apiUrl = url;
  if (!externalURL) {
    apiUrl = getExternalApiUrl(url);
  }
  
  const response = await fetch(apiUrl, fetchOptions);

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: 'Failed to parse error response or no error body' };
    }
    return {
      error: errorData.message || 'An unknown error occurred',
      status: response.status,
    };
  }

  // If the response is successful but there's no content (e.g., 204 No Content)
  if (response.status === 204 || response.headers.get("content-length") === "0") {
    return { success: true, status: response.status };
  }

  try {
    const responseData = await response.json();
    
    if (Array.isArray(responseData)) return { data:responseData, status: response.status }
    else return { ...responseData, status: response.status };
    
  } catch (e) {
    // Handle cases where response.ok is true, but body is not valid JSON
    // This might indicate an issue with the API returning non-JSON success responses
    // or an empty body that isn't explicitly a 204 or content-length: 0
    return {
      error: "Failed to parse successful response, or body was empty but not a 204.",
      status: response.status,
    };
  }
}
