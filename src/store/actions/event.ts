'use server';
import { EventUpdatePayload } from '@/types/event.type';
import { handleFetch } from '@/utils/fetchHandler'; // Import handleFetch

interface InfinityQueryParams {
  limit: number;
  type: string;
  sport_id: string;
  search: string;
  remark: string;
}

export async function getTournamentDetail({ id }: { id: string }) {

  const url = `/event/${id}`;
  const result = await handleFetch({ url, method: 'GET' });

  return result;
}

export async function getTournamentInfinity(params: InfinityQueryParams) {

  const query: InfinityQueryParams = {
    limit: params.limit || 10,
    type: params.type || '',
    sport_id: params.sport_id || '',
    search: params.search || '',
    remark: params.remark || '',
  };

  const url = `/event/infinite?limit=${query.limit}&category=${query.type}&sport_id=${query.sport_id}&name=${query.search}&remark=${query.remark}`;
  const result = await handleFetch({ url, method: 'GET' });

  return result;
}

export async function getTournamentParticipants({ eventID }: { eventID: string | string[] }) {

  const url = `/event/${eventID}/participant`;
  const result = await handleFetch({ url, method: 'GET' });

  return result;
}

export async function registerToTournament({ eventID, payload }: { eventID: string, payload: object }) {

  const url = `/event/${eventID}/register`;
  const result = await handleFetch({ url, method: 'POST', data: payload });

  return result;
}

export async function sendFinishTournament({ eventID }: { eventID: string | string[] }) {

  const url = `/event/${eventID}/summary`;
  const result = await handleFetch({ url, method: 'POST' });

  return result;
}

export async function updateTournamentDetail(
  id: string,
  eventData: EventUpdatePayload, // Consider defining a more specific type for eventData
  newImageFile: File | null,
  oldImageUrl: string | undefined,
  changeNewImage: boolean
) {
  let imageUrl = oldImageUrl;

  try {
    // UPLOAD BANNER if a new image is provided and changeNewImage is true
    if (changeNewImage && newImageFile) {
      const formBanner = new FormData();
      formBanner.append("dir", "banner");
      formBanner.append("file", newImageFile);

      const uploadResult = await handleFetch({
        url: '/file/upload',
        method: 'POST',
        data: formBanner,
        contentType: undefined, // Let fetch set Content-Type for FormData
      });

      if (uploadResult.error || !uploadResult.data) {
        return {
          error: uploadResult.error || 'File upload failed or did not return data.',
          status: uploadResult.status,
        };
      }
      imageUrl = uploadResult.data; // Assuming the URL is in uploadResult.data
    }

    // Update tournament details
    const updatePayload = { ...eventData, thumbnail: imageUrl };
    const result = await handleFetch({
      url: `/event/${id}`,
      method: 'PUT',
      data: updatePayload,
    });

    return result;
  } catch (error) {
    // Catch any unexpected errors during the process
    console.error("Error in updateTournamentDetail:", error);
    return {
      error: error.message || 'An unexpected error occurred while updating tournament details.',
      status: 500, // Generic server error status
    };
  }
}
