import { TableType } from '@/app/[locale]/(protected)/dish/components/ListTable'
import Http from '@/core/http';
import { AccountListResType, AccountResType } from '@/schema/account';
import { LoginBodyType, LoginResType, LogoutBodyType, RefreshTokenBodyType, RefreshTokenResType } from '@/schema/auth';
import { DishListResType } from '@/schema/dish';
import { revalidateTag } from 'next/cache';

/* Lưu ý các API được call từ phía client thì đã tự động được truyền accessToken vào
Authorization.
(Các api không có prefix s_ đứng đầu thì đều là các api sẽ được call từ phía client)
*/

export const authApiRequest = {
  s_Login: (body: LoginBodyType) => Http.post<LoginResType>('/auth/login', body),
  login: (body: LoginBodyType) => Http.post<LoginResType>('/api/auth/login', body, {
    baseUrl: ''
  }),
  /* cần truyền accessToken lên chỉ để truyền vào Authorization */
  s_Logout: (body: LogoutBodyType & {
      accessToken: string
    }) => Http.post<LogoutBodyType>('/auth/logout', {
      refreshToken: body.refreshToken
    }, {
      headers: {
        Authorization: `Bearer ${body.accessToken}`
      }
    }),
  // when call this api localstorage with be clear
  logout: () => Http.post<LogoutBodyType>('/api/auth/logout', null, {
    baseUrl: ''
  }),
  s_RefreshToken: (body: RefreshTokenBodyType) => Http.post<RefreshTokenResType>('/auth/refresh-token', body),

  refreshToken: () => Http.post<RefreshTokenResType>('/api/auth/refresh-token', null, {
    baseUrl: ''
  })
}

export const accountApiRequest = {
  s_Me: (accessToken: string) => Http.get<AccountResType>('/accounts/me', {
    headers:{
      Authorization: `Bearer ${accessToken}`
    }
  }),
  me: () => Http.get<AccountResType>('/accounts/me'),
  getAccounts: () => Http.get<AccountListResType>('/accounts')
}

export const dishesApiRequest = {
  getAllDishes: () => Http.get<DishListResType>('/dishes')
}

export const tableApiRequest = {
  getTables: () => Http.get<TableType[]>('/api/table-data/tables', {
    baseUrl: 'https://64bf79be5ee688b6250d7c34.mockapi.io',
    next: {
      tags: ['tables']
    }
  }),
  postTable: (data: any) => Http.post('/api/table-data/tables', data, {
    baseUrl: 'https://64bf79be5ee688b6250d7c34.mockapi.io'
  })
}

export const revalidateApiRequest = {
  revalidateTag: (tag: string) => Http.get(`/api/auth/revalidate?tag=${tag}`, {
    baseUrl: ''
  })
}
