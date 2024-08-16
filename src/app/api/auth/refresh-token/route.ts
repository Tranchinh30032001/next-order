import { cookies } from 'next/headers';
import { authApiRequest } from '@/configs/apiUrl/authApi';
import { handleSetCookieToken } from '@/utils/handleSetCookieToken';

export async function POST() {
  const cookieStore = cookies()
  const refreshToken = cookieStore.get('refreshToken')?.value as string

  try {
    const { payload } = await authApiRequest.s_RefreshToken({
      refreshToken
    })
    const { data }= payload
    //set token with cookie
    handleSetCookieToken({ cookieStore, accessToken: data.accessToken, refreshToken: data.refreshToken })

    return Response.json(payload)
  } catch (error) {
    return Response.json({
      message: 'Error Internal'
    }, {
      status: 401
    })
  }
}
