import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { ArrowLeftIcon } from "lucide-react"

import { Logo } from "@/components/ui/logo"
import { LoginForm } from "@/components/auth/login-form"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("meta.login.title"),
    description: t("meta.login.description"),
    openGraph: {
      title: `${t("meta.login.title")} | Pyrale`,
      description: t("meta.login.description"),
      url: "https://pyrale.fr/login",
    },
    robots: {
      index: false,
      follow: true,
    }
  };
}

export default async function LoginPage() {
  const t = await getTranslations("auth.login")

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden flex-1 overflow-hidden md:block">
        <Image src="/images/hero.webp" alt="" fill className="object-cover" priority />
      </div>

      <div className="flex w-full flex-col gap-12 px-6 py-12 md:p-20 md:w-[560px] md:justify-center md:shrink-0 md:overflow-y-auto">
        <Link href="/" className="flex w-fit items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeftIcon className="size-4" />
          {t("back")}
        </Link>

        <div className="flex flex-col gap-6">
          <Logo />
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
            <p className="text-sm text-muted-foreground">
              {t("subtitle")}{" "}
              <Link href="/register" className="text-primary hover:underline">
                {t("subtitle_link")}
              </Link>
            </p>
          </div>
        </div>

        <LoginForm />
      </div>

    </div>
  )
}
