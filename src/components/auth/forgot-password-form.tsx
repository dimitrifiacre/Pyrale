"use client"

import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { MailCheckIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"

type FormData = { email: string }

export function ForgotPasswordForm() {
  const t = useTranslations("auth.forgot_password")
  const tc = useTranslations("common")

  const [sent, setSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const schema = useMemo(
    () => z.object({ email: z.email(tc("validation.email_invalid")) }),
    [tc]
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      // Toujours afficher le succès (anti-énumération d'emails)
      setSent(true)
    } catch {
      toast.error(t("errors.server_error"))
    } finally {
      setIsLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
          <MailCheckIcon className="size-6 text-primary" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold">{t("success.title")}</p>
          <p className="text-sm text-muted-foreground">{t("success.description")}</p>
        </div>
        <Button asChild variant="secondary" className="w-full">
          <Link href="/login">{t("success.back_to_login")}</Link>
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      <Field>
        <FieldLabel htmlFor="email">{tc("fields.email")}</FieldLabel>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && <FieldError>{errors.email.message}</FieldError>}
      </Field>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Spinner /> : t("submit")}
      </Button>
    </form>
  )
}
