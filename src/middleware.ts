import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Specify protected and public routes
// const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/register']

export default async function middleware(req: NextRequest) {
  // Check if the current route is public
  const path = req.nextUrl.pathname
  const isPublicRoute = publicRoutes.includes(path)

  // Get accessToken from cookie
  const accessToken = (await cookies()).get('access_token')?.value
  //TODO: Check session expiration

  // Redirect to /login if the user is not authenticated
  if (!isPublicRoute && !accessToken) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // Redirect to home if the user is authenticated and wanted to access publicRoutes
  if (
    isPublicRoute &&
    accessToken
  ) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}