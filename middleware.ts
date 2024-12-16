import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of protected routes
const protectedRoutes = ['/dashboard', '/profile', '/settings'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Check if the route is protected
  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    // Redirect to login if no token is found
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Define the routes where the middleware applies
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*'], // Match only these routes
};
