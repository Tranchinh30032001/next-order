import { accountApiRequest } from '@/configs/apiUrl/authApi'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { cookies } from 'next/headers'
import React from 'react'

const DashBoardPage = async ({ params: { locale } }: {
  params: {locale: string}
}
) => {
  unstable_setRequestLocale(locale);
  const t= await getTranslations('DashboardPage')
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value!
  const result = await accountApiRequest.s_Me(accessToken)

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <p>status: {JSON.stringify(result.status)}</p>
    </div>
  )
}

export default DashBoardPage
