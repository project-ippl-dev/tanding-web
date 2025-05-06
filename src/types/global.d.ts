export type styleData = Record<string, Record<string, unknown>>

export interface FetchResponse{
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

