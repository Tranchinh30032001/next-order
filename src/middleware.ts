import { NextRequest, NextResponse } from 'next/server';
import { middlewarePipeline } from './middlewares/pipeline'

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/_next/') ||
      request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  return middlewarePipeline(request);
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)']
};
