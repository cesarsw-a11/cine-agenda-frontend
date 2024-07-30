// src/app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {

  const token = request.cookies.get('accessToken')?.value;
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = '/login'

  // Define las rutas que quieres proteger
  const protectedPaths = ['/reservation'];

  // Verifica si la ruta es una de las protegidas
  if (protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(redirectUrl);
    }

  }

  return NextResponse.next();
}

// Configura las rutas a las que se aplicará el middleware
export const config = {
  matcher: ['/reservation/:path*'],
};
