import { NextRequest, NextResponse } from 'next/server';
import { intlMiddleware } from './intlMiddleware'
import { authMiddleware } from './authMiddleware'

const middlewares = [
  authMiddleware,
  intlMiddleware
];

export async function middlewarePipeline(request: NextRequest): Promise<NextResponse> {
  let currentRequest = request;
  let authResponse: NextResponse | null = null;

  for (const middleware of middlewares) {
    try {
      const result = middleware(currentRequest);

      if (result instanceof NextResponse) {
        if (middleware === authMiddleware) {
          // Lưu lại kết quả của authMiddleware
          authResponse = result;
          // Không return ngay, tiếp tục với intlMiddleware
          currentRequest = new NextRequest(authResponse.url || currentRequest.url, {
            headers: authResponse.headers
          });
        }
        else {
          // Đây là kết quả của intlMiddleware
          let finalResponse = result;
          // Nếu authMiddleware đã tạo ra một redirect, áp dụng nó vào kết quả của intlMiddleware
          if (authResponse && authResponse.headers.get('Location')) {
            finalResponse = NextResponse.redirect(authResponse.headers.get('Location')!);
          }
          // Sao chép cookies từ authResponse (nếu có) và intlMiddleware response
          [authResponse, finalResponse].forEach(response => {
            if (response) {
              response.cookies.getAll().forEach(cookie => {
                finalResponse.cookies.set(cookie.name, cookie.value);
              });
            }
          });

          return finalResponse;
        }
      }
    } catch (error) {
      console.error(`Error in ${middleware.name}:`, error);
      return handleMiddlewareError(error, request);
    }
  }
  // Nếu không có response nào được trả về, sử dụng authResponse hoặc NextResponse.next()
  return authResponse || NextResponse.next();
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
