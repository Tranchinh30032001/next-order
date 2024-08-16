'use client'

import React, { startTransition } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Locale } from '@/lib/locale'
import { useLocale, useTranslations } from 'next-intl'
import { locales } from '@/i18n'
import { usePathname, useRouter } from '../../navigation'

const LocaleSwitcher = () => {
  const locale = useLocale()
  const t = useTranslations('Language')
  const pathname = usePathname();
  const router = useRouter();

  const onSelectChange = (value: string) => {
    const locale = value as Locale
    startTransition(() => {
      router.replace(pathname, { locale });
    })
    router.refresh()
  }

  return (
    <Select defaultValue={locale} onValueChange={onSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue>{locale.toUpperCase()}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('language')}</SelectLabel>
          { locales.map((cur) => {
            return (
              <SelectItem key={cur} value={cur}>
                {t('locale', { locale: cur })}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default LocaleSwitcher
