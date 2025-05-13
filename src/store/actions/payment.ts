import { handleFetch } from "@/utils/fetchHandler";

export const getPaymentForOwner = async (id: string, status: string = "") => {
  return handleFetch({
    url: `/event/${id}/payment?status=${status}`,
    method: "GET",
  });
};

export const getPaymentTotalForOwner = async (id: string) => {
  return handleFetch({
    url: `/event/${id}/payment/summary`,
    method: "GET",
  });
};
