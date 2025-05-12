export type styleData = Record<string, Record<string, unknown>>

export interface FetchResponse{
    status: number;
    data?: unknown;
    error?: string;
    message?: string;
}

