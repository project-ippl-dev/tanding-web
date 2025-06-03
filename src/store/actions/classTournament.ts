import { handleFetch } from "@/utils/fetchHandler";
import { ClassAssignmentItem, CreateClassPayload, StoreClassTournamentPayload, UpdatePriceClassTournamentPayload } from "@/types/class.types";

// --- API Functions ---

/**
 * Fetches classes for a given sport ID.
 * GET /class/sport/{sportId}?page_size=100
 */
export const getClass = async (sportId: string) => {
  return handleFetch({
    url: `/class/sport/${sportId}?page_size=100`,
    method: "GET",
  });
};

/**
 * Fetches class rules with pagination.
 * GET /class/rules?page={page}&page_size={pageSize}
 */
export const getClassRules = async (page: string | number, pageSize: string | number) => {
  return handleFetch({
    url: `/class/rules?page=${page}&page_size=${pageSize}`,
    method: "GET",
  });
};

/**
 * Creates a new class.
 * POST /class
 */
export const createClass = async (payload: CreateClassPayload) => {
  return handleFetch({
    url: `/class`,
    method: "POST",
    data: payload,
  });
};

/**
 * Assigns classes to a tournament event.
 * POST /event/{eventId}/class/assign
 */
export const storeClassTournament = async (eventId: string, payload: StoreClassTournamentPayload) => {
  return handleFetch({
    url: `/event/${eventId}/class/assign`,
    method: "POST",
    data: payload,
  });
};

/**
 * Updates the price of a class in a tournament event.
 * PUT /event/{eventId}/class/{classId}
 */
export const updatePriceClassTournament = async (
  eventId: string,
  classId: string,
  payload: UpdatePriceClassTournamentPayload
) => {
  return handleFetch({
    url: `/event/${eventId}/class/${classId}`,
    method: "PUT",
    data: payload,
  });
};

/**
 * Deletes a class from a tournament event.
 * DELETE /event/{eventId}/class/{classId}
 */
export const deleteClassTournament = async (eventId: string, classId: string) => {
  return handleFetch({
    url: `/event/${eventId}/class/${classId}`,
    method: "DELETE",
  });
};
