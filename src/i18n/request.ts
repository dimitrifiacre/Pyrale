import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";
import fr from "@/locales/fr.json";
import en from "@/locales/en.json";

const messages = { fr, en };

export const SUPPORTED_LOCALES = ["fr", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";

export default getRequestConfig(async () => {
  let locale: Locale = DEFAULT_LOCALE;
  try {
    const headerStore = await headers();
    const rawLocale = headerStore.get("x-locale");
    if ((SUPPORTED_LOCALES as readonly string[]).includes(rawLocale ?? "")) {
      locale = rawLocale as Locale;
    }
  } catch {
    // During static generation (e.g. /_not-found), headers are unavailable
  }

  return { locale, messages: messages[locale] };
});