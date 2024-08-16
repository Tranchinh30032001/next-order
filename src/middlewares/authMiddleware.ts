import { PROTECTED_ROUTES, PUBLIC_ROUTES } from '@/configs/routes';
import { UnauthorizedError } from '@/core/error';
import { NextRequest, NextResponse } from 'next/server';

export function authMiddleware(request: NextRequest): NextResponse | null {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // Kiểm tra xem route hiện tại có phải là protected route không
  const isProtectedRoute = PROTECTED_ROUTES.some((item) => {
    const pathnameRemoveLocale = pathname.replace(/\/(vi|en)/, '');
    return pathnameRemoveLocale.startsWith(item);
  });

  if (isProtectedRoute && !accessToken && !refreshToken) {
    throw new UnauthorizedError('No valid token found');
  }

  if (isProtectedRoute && !accessToken && refreshToken) {
    const url = new URL('/refresh-token', request.url);
    url.searchParams.set('redirect', pathname);
    url.searchParams.set('refreshToken', refreshToken);
    return NextResponse.redirect(url);
  }

  if (accessToken && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return null;
}
