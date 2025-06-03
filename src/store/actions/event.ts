'use server';
import { EventUpdatePayload,EventCreatePayload } from '@/types/event.type';
import { handleFetch } from '@/utils/fetchHandler'; // Import handleFetch
import { EVENT, EVENT_INFINITY, EVENT_PARTICIPANTS } from '../event';

interface InfinityQueryParams {
  limit: number;
  type: string;
  sport_id: string;
  search: string;
  remark: string;
}

export async function createTournamentEvent(data: EventCreatePayload) {
  // return {...EVENT_INFINITY, status:200}
  const url = `/event`;
  const result = await handleFetch({ url, method: 'POST', data });
  return result;
}

export async function getTournamentDetail({ id }: { id: string }) {
  // const testData = {
  //   ...EVENT,
  //   data:{
  //     ...EVENT.data,
  //     remark: 'open', // Simulating ongoing status for testing purposes
  //   },
  //   status: 200
  // }
  // // testData.data.remark = 'open'; // Simulating ongoing status for testing purposes
  // return testData
  const url = `/event/${id}`;
  const result = await handleFetch({ url, method: 'GET' });
  return result;
}


export async function getOwnTournament({ page = 1, page_size = 10 }) {
  // return {...EVENT_INFINITY, status:200}
  const url = `/event/own?page=${page}&page_size=${page_size}`;
  const result = await handleFetch({ url, method: 'GET' });
  return result;
}


export async function getTournamentInfinity(params: InfinityQueryParams) {
  const query: Partial<InfinityQueryParams> = {
    limit: params.limit || 10,
  };

  if (params.type) query.type = params.type;
  if (params.sport_id) query.sport_id = params.sport_id;
  if (params.search) query.search = params.search;
  if (params.remark) query.remark = params.remark;

  const url = `/event/infinite?limit=${query.limit}` +
    (query.type ? `&category=${query.type}` : '') +
    (query.sport_id ? `&sport_id=${query.sport_id}` : '') +
    (query.search ? `&name=${query.search}` : '') +
    (query.remark ? `&remark=${query.remark}` : '');

  const result = await handleFetch({ url, method: 'GET' });

  return result;
}

export async function getTournamentParticipants({ eventID }: { eventID: string | string[] }) {
  // return {...EVENT_PARTICIPANTS, status:200}
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
  eventData: Omit<EventUpdatePayload, "thumbnail">, // Consider defining a more specific type for eventData
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
        url: '/storage/upload',
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

export async function createTournament({
  data,
  bannerFile,
  proposalFile
}: {
  data: EventCreatePayload;
  bannerFile: File;
  proposalFile?: File;
}) {
  try {
    // Upload banner
    const formBanner = new FormData();
    formBanner.append("dir", "banner");
    formBanner.append("file", bannerFile);
    
    const bannerUploadResult = await handleFetch({
      url: '/storage/upload',
      method: 'POST',
      data: formBanner,
      // Remove contentType - let browser set it automatically for FormData
    });
    
    console.log("Banner upload result:", bannerUploadResult);
    
    if (bannerUploadResult.error || !bannerUploadResult.data) {
      return {
        error: bannerUploadResult.error || 'Failed to upload banner.',
        status: bannerUploadResult.status || 500,
      };
    }
    
    let proposalUrl = "";
   
    if (proposalFile) {
      const formProposal = new FormData();
      formProposal.append("dir", "proposal");
      formProposal.append("file", proposalFile);
     
      const proposalUploadResult = await handleFetch({
        url: '/storage/upload',
        method: 'POST',
        data: formProposal,
        // Remove contentType - let browser set it automatically for FormData
      });
      
      console.log("Proposal upload result:", proposalUploadResult);
     
      if (proposalUploadResult.error || !proposalUploadResult.data) {
        return {
          error: proposalUploadResult.error || 'Failed to upload proposal.',
          status: proposalUploadResult.status || 500,
        };
      }
     
      proposalUrl = proposalUploadResult.data;
    }
    
    // Create tournament with uploaded files
    const createResult = await handleFetch({
      url: '/event',
      method: 'POST',
      data: {
        ...data,
        thumbnail: bannerUploadResult.data,
        proposal_link: proposalUrl,
      },
    });
    
    console.log("Create tournament result:", createResult);
    
    if (createResult.error) {
      return {
        error: createResult.error,
        status: createResult.status || 500,
      };
    }
    
    return {
      success: true,
      message: "Tournament berhasil dibuat",
      data: createResult.data,
    };
  } catch (error: any) {
    console.error("Error in createTournament:", error);
    return {
      error: error.message || 'An unexpected error occurred while creating tournament.',
      status: error.status || 500,
    };
  }
}