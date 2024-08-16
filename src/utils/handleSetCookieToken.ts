import jwt from 'jsonwebtoken';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

type Props = {
  cookieStore: ReadonlyRequestCookies,
  accessToken: string,
  refreshToken: string
}

export const handleSetCookieToken = ({ cookieStore, accessToken, refreshToken }: Props): void => {
  const decodeAccessToken = jwt.decode(accessToken) as { exp: number };
  const decodeRefreshToken = jwt.decode(refreshToken) as { exp: number };

  cookieStore.set('accessToken', accessToken, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    expires: decodeAccessToken.exp * 1000
  });

  cookieStore.set('refreshToken', refreshToken, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    expires: decodeRefreshToken.exp * 1000
  });
};
