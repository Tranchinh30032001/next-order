'use client'

import { useEffect, useRef } from 'react';
import { getAccessToken, setAccessToken, setRefreshToken } from '@/utils/common';
import { authApiRequest } from '@/configs/apiUrl/authApi';
import { GLOBAL_VARIABLE } from '@/constant/common';
import { PUBLIC_ROUTES } from '@/configs/routes'
import { usePathname } from '@/navigation'

const HandleRefreshToken = () => {
  const pathName = usePathname();
  const listPublicPath = [...PUBLIC_ROUTES, '/login'];
  const isLogin = getAccessToken()
  let flagRefreshToken = useRef<Boolean | Promise<any>>(false)

  useEffect(() => {
    let interval: any = null;
    const logicRefreshToken = async () => {
      try {
        const {
          payload: { data }
        } = await authApiRequest.refreshToken();
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
      } catch (error) {
        clearInterval(interval);
      }
    };
    // kiểm tra xem nếu như pathName thuộc 1 trong listPublicPath thì sẽ ko thực thi logic này
    if (listPublicPath.every((path) => !pathName.startsWith(path))) {
      interval = setInterval(async() => {
        if (!flagRefreshToken.current) {
          flagRefreshToken.current = logicRefreshToken()
          await flagRefreshToken.current
          flagRefreshToken.current = false
        }
      }, GLOBAL_VARIABLE.TIME_TO_REFRESH_TOKEN);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isLogin]);

  return null;
};

export default HandleRefreshToken
