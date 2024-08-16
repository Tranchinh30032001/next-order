import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { DEFAULT_LOCALE, LOCALES } from '@/configs/i18n'

const intlHandler = createIntlMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'as-needed',
  localeDetection: false
});

export function intlMiddleware(request: NextRequest): NextResponse | null {
  const locale = request.cookies.get('NEXT_LOCALE')?.value || DEFAULT_LOCALE;;
  const response = intlHandler(request);

  if (response) {
    response.headers.set('x-default-locale', locale);
    return response;
  }

  return null;
}
