import { FetchResponse } from "@/types/global";

export async function fetchProxyApi<T extends { error?: unknown }>(url: string, token: string): Promise<FetchResponse> {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return { success: false, error: `Failed to fetch data: ${response.statusText}` };
    }

    const data: T = await response.json();
    
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching API data:", error);
    return { success: false, error: "Error fetching API data" };
  }
}

export async function postProxyApi<T, U>(url: string, token: string, payload: U): Promise<FetchResponse> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { success: false, error: `Failed to post data: ${response.statusText}` };
    }

    const data: T = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error posting API data:", error);
    return { success: false, error: "Error posting API data" };
  }
}