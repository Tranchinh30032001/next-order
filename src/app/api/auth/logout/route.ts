import { authApiRequest } from '@/configs/apiUrl/authApi';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value as string
  const refreshToken = cookieStore.get('refreshToken')?.value as string

  try {
    const result = await authApiRequest.s_Logout({
      refreshToken,
      accessToken
    })
    return Response.json(result.payload)
  } catch (error) {
    return Response.json({
      message: error
    }, {
      status: 200
    })
  } finally {
    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')
  }
}
