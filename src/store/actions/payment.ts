"use server";

import { getExternalApiUrl } from "@/utils/api";
import { getAccessToken } from "./auth";
import { FetchResponseBody } from "@/types/global";
import {
  PaymentStoreData,
  PaymentQueryParams,
  PaymentData,
  PaymentSummary,
} from "@/types/paymet.type";
import { handleFetch } from "@/utils/fetchHandler";

// Payment Actions
export async function storePayment(
  id: string,
  data: PaymentStoreData,
  image: File
): Promise<FetchResponseBody<any>> {
  const accessToken = await getAccessToken();

  try {
    // Upload image first
    const imageForm = new FormData();
    imageForm.append("dir", "payment");
    imageForm.append("file", image);

    const imageResponse = await fetch(getExternalApiUrl("/storage/upload"), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: imageForm,
    });

    if (!imageResponse.ok) {
      const errData = await imageResponse.json();
      throw new Error(errData.message || "Failed to upload image");
    }

    const imageData = await imageResponse.json();

    // Then create payment with the image URL
    const paymentResponse = await fetch(
      getExternalApiUrl(`/event/${id}/payment`),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ ...data, link: imageData.data.data }),
      }
    );

    if (!paymentResponse.ok) {
      const errData = await paymentResponse.json();
      throw new Error(errData.message || "Failed to create payment");
    }

    return await paymentResponse.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Payment creation failed: ${error}`);
  }
}

export async function getAllPaymentForClub(): Promise<
  FetchResponseBody<any[]>
> {
  const accessToken = await getAccessToken();

  try {
    const response = await fetch(getExternalApiUrl(`/event/cart`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "Failed to fetch payments for club");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Fetch club payments failed: ${error}`);
  }
}

export async function getDetailPaymentForClub(
  id: string
): Promise<FetchResponseBody<any>> {
  const accessToken = await getAccessToken();

  try {
    const response = await fetch(
      getExternalApiUrl(`/event/${id}/cart/detail`),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "Failed to fetch payment details");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Fetch payment details failed: ${error}`);
  }
}

export async function getPaymentForOwner(
  id: string,
  status: string = "",
) {
  const url = `/event/${id}/payment?status=${status}`;
  
  return handleFetch({
    url: url,
    method: "GET",
  });
}

export async function getPaymentTotalForOwner(
  id: string,
) {

  const url = `/event/${id}/payment/summary`;

  return handleFetch({
    url: url,
    method: "GET",
  });
}

export async function getPaymentForClubOwner(
  id: string,
  params: PaymentQueryParams = {}
): Promise<FetchResponseBody<PaymentData[]>> {
  const accessToken = await getAccessToken();

  try {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    const queryString = queryParams.toString();
    const basePath = `/event/${id}/payment/club`;
    const finalUrl = queryString ? `${basePath}?${queryString}` : basePath;

    const response = await fetch(getExternalApiUrl(finalUrl), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "Failed to fetch club owner payments");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Fetch club owner payments failed: ${error}`);
  }
}

export async function updatePaymentStatus(
  eventId: string,
  paymentId: string,
  status: "approved" | "rejected" | "refund"
): Promise<FetchResponseBody<any>> {
  const accessToken = await getAccessToken();

  try {
    const response = await fetch(
      getExternalApiUrl(`/event/${eventId}/payment/${paymentId}`),
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "Failed to update payment status");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Update payment status failed: ${error}`);
  }
}
