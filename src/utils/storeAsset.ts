"use client";
import { retrieveAPIURL } from "@/store/actions/profile";

export async function storeImage(dir: string,file: File, accessToken: string): Promise<string|boolean> {
      const data = new FormData();
      data.append("file", file);
      data.append("dir", dir); // Tambahkan tipe file jika diperlukan
      try{
        const APIURL = await retrieveAPIURL()
        const response = await fetch(`${APIURL}/storage/upload`,{
          method: "POST",
          body: data,
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        })
        const responseData = await response.json();
        responseData.status = response.status; // Tambahkan status ke responseData
        console.log("Response from image upload:", responseData);

        if ([200, 201].includes(response.status)) {
          return responseData.data; // Kembalikan URL gambar
        } else {
          return false
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        return false
      }
  }

  export const handleImageChange = async (
    file: File | null,
    image: { url: string | null; file: File | null },
    setImage: React.Dispatch<React.SetStateAction<{ url: string | null; file: File | null }>>
  ) => {
    if (file) {
      if (image.file && image.url) {
        URL.revokeObjectURL(image.url); // Hapus URL lama
      }
      setImage({
        url: URL.createObjectURL(file), // Buat URL baru untuk pratinjau
        file: file // Simpan file untuk diunggah nanti
      })
    }
  };