import {getRequestConfig} from 'next-intl/server';
import {defaultLocale, isAppLocale} from '@/lib/locale';

export default getRequestConfig(async ({requestLocale}) => {
  const requestedLocale = await requestLocale;
  const locale = isAppLocale(requestedLocale) ? requestedLocale : defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
