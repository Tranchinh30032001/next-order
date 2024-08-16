import { NextRequest, NextResponse } from 'next/server';
import { intlMiddleware } from './intlMiddleware'
import { authMiddleware } from './authMiddleware'

const middlewares = [
  authMiddleware,
  intlMiddleware
];

export async function middlewarePipeline(request: NextRequest): Promise<NextResponse> {
  let currentRequest = request;
  let finalResponse: NextResponse | null = null;

  for (const middleware of middlewares) {
    try {
      const result = middleware(currentRequest);

      if (result instanceof NextResponse) {
        if (finalResponse) {
          // Merge cookies từ response hiện tại vào finalResponse
          result.cookies.getAll().forEach(cookie => {
            (finalResponse as NextResponse).cookies.set(cookie.name, cookie.value);
          });
        } else {
          finalResponse = result;
        }
        // Cập nhật currentRequest cho middleware tiếp theo
        currentRequest = new NextRequest(result.url || currentRequest.url, {
          headers: result.headers
        });
      }
    } catch (error) {
      console.error(`Error in ${middleware.name}:`, error);
      return handleMiddlewareError(error, request);
    }
  }
  // Nếu không có response nào được trả về, sử dụng authResponse hoặc NextResponse.next()
  return finalResponse || NextResponse.next();
}

function handleMiddlewareError(error: unknown, request: NextRequest): NextResponse {
  if (error instanceof Error) {
    if (error.name === 'UnauthorizedError') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // Handle other specific errors here
  }
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
}
