import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Protect /admin routes (except /admin/login)
  if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Use jose for edge runtime verification
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      // Invalid token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Also protect write API routes for testing in browser (if auth header missing but cookie present)
  // But normally API routes use the Bearer token.
  if (request.nextUrl.pathname.startsWith('/api/blogs') && ['POST', 'PUT', 'DELETE'].includes(request.method)) {
    // If it's the client dashboard making the call, token is in headers or cookie
    if (!token && !request.headers.get('authorization')) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Unauthorized middleware' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/blogs/:path*'],
};
