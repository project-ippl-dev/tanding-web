// External API URL utility functions
// Used in API Routes as a proxy or forwarding layer
export const getExternalApiUrl = (endpoint: string) => {
  const baseUrl = process.env.TANDING_API_BASE_URL;
  if (!baseUrl) {
    throw new Error('TANDING_API_BASE_URL is not defined in environment variables');
  }
  return `${baseUrl}${endpoint}`;
}

// Backend For FrontEnd URL
// Used in components code
export const getBffApiUrl = (endpoint: string) => {
  const baseUrl = process.env.NEXT_APP_API_BASE_URL;
  if (!baseUrl) {
    throw new Error('NEXT_APP_API_BASE_URL is not defined in environment variables');
  }
  return `${baseUrl}${endpoint}`;
}