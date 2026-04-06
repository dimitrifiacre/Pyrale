"use client"

declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>
      ready: (callback: () => void) => void
    }
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

export function useRecaptcha() {
  const executeRecaptcha = async (action: string): Promise<string | null> => {
    if (!SITE_KEY) {
      console.warn("[reCAPTCHA] NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not defined")
      return null
    }

    if (typeof window === "undefined" || !window.grecaptcha) {
      console.warn("[reCAPTCHA] grecaptcha is not loaded yet")
      return null
    }

    try {
      return await window.grecaptcha.execute(SITE_KEY, { action })
    } catch (error) {
      console.error("[reCAPTCHA] Failed to execute:", error)
      return null
    }
  }

  return { executeRecaptcha }
}
