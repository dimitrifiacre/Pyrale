import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["fr", "en"];
const DEFAULT_LOCALE = "fr";

export function middleware(request: NextRequest) {
  const cookieLocale = request.cookies.get("locale")?.value;
  const locale =
    cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)
      ? cookieLocale
      : DEFAULT_LOCALE;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("x-locale", locale);
  
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};