import { getExternalApiUrl } from '@/utils/api';
import { NextResponse, NextRequest } from 'next/server'

// Example of api accessible from BASE_URL/api
// Useful to proxy an external API
export async function GET(request: NextRequest) {
  const response = await fetch(getExternalApiUrl('/ale'), {
    // Optional: forward some headers, add auth tokens, etc.
  });

  // Transform or forward the response
  const data = await response.json();
  const transformed = { ...data, source: 'proxied-through-nextjs' };

  // console.log(transformed[0])
  return NextResponse.json(transformed[0], {
    headers: { 'Content-Type': 'application/json' },
  });
}