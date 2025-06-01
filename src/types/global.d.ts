export type styleData = Record<string, Record<string, unknown>>

export interface FetchResponse{
    status: number;
    data?: unknown;
    error?: string;
    message?: string;
}

export interface FetchResponseBody<T> {
    message: string;
    data?: T;
    current_page?: number;
    has_previous_page?: boolean;
    has_next_page?: boolean;
    previous_page?: number;
    next_page?: number;
    last_page?: number;
    total_item?: number;
    status?: number;
    error?: string;
}