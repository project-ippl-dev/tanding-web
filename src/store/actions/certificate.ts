"use server";
import { handleFetch } from "@/utils/fetchHandler";
import {
  CertificateResponse,
  UserCertificate,
  ClubCertificate,
  PaginationData,
} from "@/types/certificate.types";

export async function getListCertificateUser({
  user_id,
  page = 1,
  page_size = 10,
}: {
  user_id: string;
  page?: number;
  page_size?: number;
}): Promise<CertificateResponse> {
  try {
    const url = `/certificate/user/${user_id}?page=${page}&page_size=${page_size}`;
    const result = await handleFetch({ url, method: "GET" });

    const pagination: PaginationData = {
      current_page: result.current_page || 1,
      has_previous_page: result.has_previous_page || false,
      has_next_page: result.has_next_page || false,
      previous_page: result.previous_page || 0,
      next_page: result.next_page || 0,
      last_page: result.last_page || 1,
      total_item: result.total_item || 0,
    };

    return {
      message: result.message || "",
      data: result.data || [],
      pagination,
    };
  } catch (error: any) {
    console.error("Error in getListCertificateUser:", error);
    return {
      message: error.message || "Failed to fetch user certificates",
      data: [],
      pagination: {
        current_page: 1,
        has_previous_page: false,
        has_next_page: false,
        previous_page: 0,
        next_page: 0,
        last_page: 1,
        total_item: 0,
      },
      error: error.message || "Failed to fetch user certificates",
      status: error.status || 500,
    };
  }
}

export async function getListCertificateClub({
  club_id,
  page = 1,
  page_size = 10,
}: {
  club_id: string;
  page?: number;
  page_size?: number;
}): Promise<CertificateResponse> {
  try {
    const url = `/certificate/club/${club_id}?page=${page}&page_size=${page_size}`;
    const result = await handleFetch({ url, method: "GET" });

    const pagination: PaginationData = {
      current_page: result.current_page || 1,
      has_previous_page: result.has_previous_page || false,
      has_next_page: result.has_next_page || false,
      previous_page: result.previous_page || 0,
      next_page: result.next_page || 0,
      last_page: result.last_page || 1,
      total_item: result.total_item || 0,
    };

    return {
      message: result.message || "",
      data: result.data || [],
      pagination,
    };
  } catch (error: any) {
    console.error("Error in getListCertificateClub:", error);
    return {
      message: error.message || "Failed to fetch club certificates",
      data: [],
      pagination: {
        current_page: 1,
        has_previous_page: false,
        has_next_page: false,
        previous_page: 0,
        next_page: 0,
        last_page: 1,
        total_item: 0,
      },
      error: error.message || "Failed to fetch club certificates",
      status: error.status || 500,
    };
  }
}

export async function getDetailCertificate({
  certificate_id,
}: {
  certificate_id: string;
}) {
  try {
    const url = `/certificate/${certificate_id}`;
    const result = await handleFetch({ url, method: "GET" });

    return {
      data: result.data,
      message: result.message,
    };
  } catch (error: any) {
    console.error("Error in getDetailCertificate:", error);
    return {
      error: error.message || "Sertifikat tidak ditemukan atau tidak valid",
      status: error.status || 500,
    };
  }
}
