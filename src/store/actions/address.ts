'use server'
import { handleFetch } from "@/utils/fetchHandler";

export async function getProvince() {
  return handleFetch({
    url: `https://api.general.eoatech.com/provinces/search?kata_kunci=`,
    method: "GET",
    externalURL: true,
  });
}


export const getCities = async (id_province: string) => {
  return handleFetch({
    url: `https://api.general.eoatech.com/regencies/search?kata_kunci=&id_province=${id_province}`,
    method: "GET",
    externalURL: true,
  });
};