import { authApiRequest } from '@/configs/apiUrl/authApi';
import { LoginBodyType } from '@/schema/auth';
import { cookies } from 'next/headers';
import { HttpError } from '@/core/error';
import { handleSetCookieToken } from '@/utils/handleSetCookieToken';

export async function POST(request: Request) {
  const body = (await request.json()) as LoginBodyType;
  const cookieStore = cookies();
  try {
    const { payload } = await authApiRequest.s_Login(body);
    const { accessToken, refreshToken } = payload.data;
    // set token with cookie
    handleSetCookieToken({ cookieStore, accessToken, refreshToken });

    return Response.json(payload);
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status
      });
    } else {
      return Response.json({
        message: 'Internal Server Error',
        status: 500
      });
    }
  }
}
