import { STATUS_ERROR } from '@/constant/status-error'
import { EntityError, EntityErrorPayload, HttpError } from '@/core/error'
import { normalizePath } from '@/utils/common'
import { CustomOptions, getAuthorizationHeader, getBaseHeaders, getBaseUrl, handleAuthenticationError, handleBodyData, handleClientSideLogic, isClient } from '@/utils/httpUtils'

export const request = async <TypeResponse>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOptions | undefined
) => {
  const body = handleBodyData(options)
  const baseHeaders = getBaseHeaders(body)

  const authorizationHeader = getAuthorizationHeader()
  if (authorizationHeader) {
    baseHeaders.Authorization = authorizationHeader
  }

  const baseUrl = getBaseUrl(options)

  const fullUrl = `${baseUrl}/${normalizePath(url)}`

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers
    } as any,
    body,
    method
  })
  const payload: TypeResponse = await res.json()
  const data = {
    status: res.status,
    payload
  }
  // Interceptor là nời chúng ta xử lý request và response trước khi trả về cho phía component
  if (!res.ok) {
    if (res.status === STATUS_ERROR.ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: typeof STATUS_ERROR.ENTITY_ERROR_STATUS
          payload: EntityErrorPayload
        }
      )
    } else if (res.status === STATUS_ERROR.AUTHENTICATION_ERROR_STATUS) {
      await handleAuthenticationError()
    } else {
      throw new HttpError(data)
    }
  }

  if (isClient) {
    handleClientSideLogic(url, payload)
  }

  return data
}
