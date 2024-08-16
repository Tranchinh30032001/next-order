'use client'

import { authApiRequest } from '@/configs/apiUrl/authApi'
import { useRouter } from '@/navigation'
import { getRefreshToken, setAccessToken, setRefreshToken } from '@/utils/common'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

const RefreshTokenPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const destinationUrl = searchParams.get('redirect') as string
  const refreshTokenUrl = searchParams.get('refreshToken') as string
  const refreshTokenLocalstorage = getRefreshToken()
  const flagRefreshToken = useRef<boolean | Promise<any>>(false)

  const handleRefreshToken = async() => {
    try {
      const { payload } = await authApiRequest.refreshToken()
      const { accessToken, refreshToken } = payload.data
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)
      if (destinationUrl) {
        return router.push(destinationUrl)
      }
      return router.push('/dashboard')
    } catch (error) {
      location.href = '/login'
    }
  }

  useEffect(() => {
    if (!flagRefreshToken.current && refreshTokenLocalstorage === refreshTokenUrl) {
      flagRefreshToken.current = handleRefreshToken().then(() => {
        flagRefreshToken.current = false
      })
    }
    else if (refreshTokenLocalstorage !== refreshTokenUrl) {
      router.push('/dashboard')
    }
  }, [])

  return (
    <>
      refreshToken
    </>
  )
}

export default RefreshTokenPage
