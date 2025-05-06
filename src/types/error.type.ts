export interface ServerError {
    error: {
        name: string;
        message: string;
        header: string;
    };
}