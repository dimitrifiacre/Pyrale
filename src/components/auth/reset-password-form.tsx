"use client"

import { useMemo, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { EyeIcon, EyeOffIcon, ShieldCheckIcon, TriangleAlertIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"

type FormData = { password: string; confirmPassword: string }
type PageState = "loading" | "invalid" | "form" | "success"

interface ResetPasswordFormProps {
  token: string | null
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const t = useTranslations("auth.reset_password")
  const tc = useTranslations("common")

  const [pageState, setPageState] = useState<PageState>("loading")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!token) {
      setPageState("invalid")
      return
    }

    fetch(`/api/auth/reset-password?token=${encodeURIComponent(token)}`)
      .then((res) => res.json())
      .then(({ valid }) => setPageState(valid ? "form" : "invalid"))
      .catch(() => setPageState("invalid"))
  }, [token])

  const schema = useMemo(
    () =>
      z
        .object({
          password: z.string().min(8, tc("validation.min_chars", { count: 8 })).max(72),
          confirmPassword: z.string().min(1, tc("validation.required")),
        })
        .superRefine(({ password, confirmPassword }, ctx) => {
          if (confirmPassword && password !== confirmPassword) {
            ctx.addIssue({
              code: "custom",
              message: tc("validation.passwords_mismatch"),
              path: ["confirmPassword"],
            })
          }
        }),
    [tc]
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    if (!token) return
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: data.password }),
      })

      if (!response.ok) {
        const json = await response.json()
        if (json.error === "invalid_token") {
          setPageState("invalid")
          return
        }
        toast.error(t("errors.server_error"))
        return
      }

      setPageState("success")
    } catch {
      toast.error(t("errors.server_error"))
    } finally {
      setIsLoading(false)
    }
  }

  if (pageState === "loading") {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    )
  }

  if (pageState === "invalid") {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
          <TriangleAlertIcon className="size-6 text-destructive" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold">{t("errors.invalid_link")}</p>
        </div>
        <Button asChild variant="secondary" className="w-full">
          <Link href="/forgot-password">{t("back")}</Link>
        </Button>
      </div>
    )
  }

  if (pageState === "success") {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
          <ShieldCheckIcon className="size-6 text-primary" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold">{t("success.title")}</p>
          <p className="text-sm text-muted-foreground">{t("success.description")}</p>
        </div>
        <Button asChild className="w-full">
          <Link href="/login">{t("success.back_to_login")}</Link>
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      <Field>
        <FieldLabel htmlFor="password">{t("new_password")}</FieldLabel>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            className="pr-10"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? tc("fields.hide_password") : tc("fields.show_password")}
            className="absolute inset-y-0 right-0 hover:bg-transparent"
            isIcon
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
        </div>
        {errors.password && <FieldError>{errors.password.message}</FieldError>}
      </Field>

      <Field>
        <FieldLabel htmlFor="confirmPassword">{t("confirm_password")}</FieldLabel>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            className="pr-10"
            aria-invalid={!!errors.confirmPassword}
            {...register("confirmPassword")}
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => setShowConfirm((v) => !v)}
            aria-label={showConfirm ? tc("fields.hide_password") : tc("fields.show_password")}
            className="absolute inset-y-0 right-0 hover:bg-transparent"
            isIcon
          >
            {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
        </div>
        {errors.confirmPassword && <FieldError>{errors.confirmPassword.message}</FieldError>}
      </Field>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Spinner /> : t("submit")}
      </Button>
    </form>
  )
}
