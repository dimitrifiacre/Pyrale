import NextAuth from "next-auth"
import { NextResponse } from "next/server"
import { authConfig } from "@/lib/auth.config"

const SUPPORTED_LOCALES = ["fr", "en"]
const DEFAULT_LOCALE = "fr"

const PROTECTED_PATHS = ["/profile", "/admin"]

const AUTH_PATHS = ["/login", "/register", "reset-password", "forgot-password"]

const { auth } = NextAuth(authConfig)

export default auth(function middleware(req) {
  const { pathname } = req.nextUrl

  const cookieLocale = req.cookies.get("locale")?.value
  const locale =
    cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)
      ? cookieLocale
      : DEFAULT_LOCALE

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set("x-locale", locale)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set("x-locale", locale)

  const session = req.auth

  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p))
  if (isProtected && !session) {
    const url = req.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  const isAuthPage = AUTH_PATHS.some((p) => pathname.startsWith(p))
  if (isAuthPage && session) {
    const url = req.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  return response
})

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
}
