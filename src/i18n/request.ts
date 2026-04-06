import { getRequestConfig } from "next-intl/server";

export const SUPPORTED_LOCALES = ["fr", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";

export default getRequestConfig(async ({ locale }) => {
  const currentLocale = SUPPORTED_LOCALES.includes(locale as Locale) ? (locale as Locale) : DEFAULT_LOCALE;

  return {
    locale: currentLocale,
    messages: (await import(`@/locales/${currentLocale}.json`)).default,
  };
});