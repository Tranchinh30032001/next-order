import { NextRequest, NextResponse } from 'next/server';
import { intlMiddleware } from './intlMiddleware';
import { authMiddleware } from './authMiddleware';

// Danh sách các middleware
const middlewares = [authMiddleware, intlMiddleware];

export function middlewarePipeline(request: NextRequest): NextResponse {
  let currentRequest = request;
  let finalResponse: NextResponse | null = null;

  for (const middleware of middlewares) {
    try {
      const newResponse = middleware(currentRequest);

      if (newResponse instanceof NextResponse) {
        finalResponse = finalResponse ? mergeResponses(finalResponse, newResponse) : newResponse;

        currentRequest = new NextRequest(newResponse.url || currentRequest.url, {
          headers: new Headers(newResponse.headers)
        });
      }
    } catch (error) {
      return handleMiddlewareError(error, request);
    }
  }
  return finalResponse || NextResponse.next();
}

function handleMiddlewareError(error: unknown, request: NextRequest): NextResponse {
  if (error instanceof Error) {
    if (error.name === 'UnauthorizedError') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
}

function mergeResponses(currentResponse: NextResponse, newResponse: NextResponse): NextResponse {
  // Merge headers
  newResponse.headers.forEach((value, key) => {
    currentResponse.headers.set(key, value);
  });

  // Merge cookies
  newResponse.cookies.getAll().forEach(cookie => {
    currentResponse.cookies.set(cookie.name, cookie.value);
  });

  return currentResponse;
}
