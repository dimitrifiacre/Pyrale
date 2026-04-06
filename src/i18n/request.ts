import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";

export const SUPPORTED_LOCALES = ["fr", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";

export default getRequestConfig(async () => {
  const headerStore = await headers();
  const rawLocale = headerStore.get("x-locale");
  const locale: Locale = (SUPPORTED_LOCALES as readonly string[]).includes( rawLocale ?? "" ) ? (rawLocale as Locale) : DEFAULT_LOCALE;

  const messages = (await import(`@/locales/${locale}.json`)).default;

  return { locale, messages };
});