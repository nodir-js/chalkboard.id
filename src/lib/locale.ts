export const locales = ['uz', 'ru', 'en'] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = 'uz';

const intlLocaleByAppLocale: Record<AppLocale, string> = {
  uz: 'uz-UZ',
  ru: 'ru-RU',
  en: 'en-US',
};

export function isAppLocale(locale: string | undefined | null): locale is AppLocale {
  return !!locale && locales.includes(locale as AppLocale);
}

export function getIntlLocale(locale: string | undefined | null): string {
  return intlLocaleByAppLocale[isAppLocale(locale) ? locale : defaultLocale];
}

export function formatCurrencyByLocale(
  amount: number | string,
  locale: string | undefined | null,
  currency = 'UZS',
): string {
  const numericAmount = typeof amount === 'string' ? Number.parseFloat(amount) : amount;

  return new Intl.NumberFormat(getIntlLocale(locale), {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number.isFinite(numericAmount) ? numericAmount : 0);
}

export function formatNumberByLocale(
  amount: number | string,
  locale: string | undefined | null,
): string {
  const numericAmount = typeof amount === 'string' ? Number.parseFloat(amount) : amount;

  return new Intl.NumberFormat(getIntlLocale(locale)).format(
    Number.isFinite(numericAmount) ? numericAmount : 0,
  );
}

export function formatDateByLocale(
  value: string | Date,
  locale: string | undefined | null,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = value instanceof Date ? value : new Date(value);
  return date.toLocaleDateString(getIntlLocale(locale), options);
}

export function formatDateTimeByLocale(
  value: string | Date,
  locale: string | undefined | null,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = value instanceof Date ? value : new Date(value);
  return date.toLocaleString(getIntlLocale(locale), options);
}

export function formatTimeByLocale(
  value: string | Date,
  locale: string | undefined | null,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = value instanceof Date ? value : new Date(value);
  return date.toLocaleTimeString(getIntlLocale(locale), options);
}
