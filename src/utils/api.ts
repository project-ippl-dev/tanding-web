// External API URL utility functions
// Used in API Routes as a proxy or forwarding layer
export const getExternalApiUrl = (endpoint: string) => {
  const baseUrl = process.env.TANDING_API_BASE_URL;
  if (!baseUrl) {
    throw new Error('TANDING_API_BASE_URL is not defined in environment variables');
  }
  return `${baseUrl}${endpoint}`;
}
