"use client"

import { useMemo, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { Field, FieldLabel, FieldError, FieldContent } from "@/components/ui/field"

type RegisterFormData = {
  pseudo: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.113 18.1.134 18.11a19.904 19.904 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

function TwitchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
    </svg>
  )
}

export function RegisterForm() {
  const t = useTranslations("auth.register")
  const tc = useTranslations("common")

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const schema = useMemo(
    () =>
      z
        .object({
          pseudo: z
            .string()
            .min(3, tc("validation.min_username", { count: 3 }))
            .max(16, tc("validation.max_username", { count: 16 })),
          email: z.string().email(tc("validation.email_invalid")),
          password: z.string().min(8, tc("validation.min_chars", { count: 8 })),
          confirmPassword: z.string().min(1, tc("validation.required")),
          terms: z.boolean().refine((v) => v === true, { message: tc("validation.terms_required") }),
        })
        .superRefine(({ password, confirmPassword }, ctx) => {
          if (confirmPassword && password !== confirmPassword) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: tc("validation.passwords_mismatch"),
              path: ["confirmPassword"],
            })
          }
        }),
    [tc, t]
  )

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: { terms: false },
  })

  const onSubmit = async (_data: RegisterFormData) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      <Field>
        <FieldLabel htmlFor="pseudo">{tc("fields.username")}</FieldLabel>
        <Input
          id="pseudo"
          type="text"
          autoComplete="username"
          aria-invalid={!!errors.pseudo}
          {...register("pseudo")}
        />
        {errors.pseudo && <FieldError>{errors.pseudo.message}</FieldError>}
      </Field>

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

      <Field>
        <FieldLabel htmlFor="password">{tc("fields.password")}</FieldLabel>
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
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            className="pr-10"
            aria-invalid={!!errors.confirmPassword}
            {...register("confirmPassword")}
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => setShowConfirmPassword((v) => !v)}
            aria-label={showConfirmPassword ? tc("fields.hide_password") : tc("fields.show_password")}
            className="absolute inset-y-0 right-0 hover:bg-transparent"
            isIcon
          >
            {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
        </div>
        {errors.confirmPassword && <FieldError>{errors.confirmPassword.message}</FieldError>}
      </Field>

      <Field orientation="horizontal">
        <Controller
          name="terms"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="terms"
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-invalid={!!errors.terms}
            />
          )}
        />
        <FieldContent>
          <FieldLabel htmlFor="terms" className="font-normal leading-snug">
            <p>
              {t.rich('terms', {
                privacy: (chunks) => ( <a href="https://policies.google.com/privacy" className="text-primary hover:underline">{chunks}</a> ),
                terms: (chunks) => ( <a href="https://policies.google.com/terms" className="text-primary hover:underline">{chunks}</a> ),
              })}
            </p>
          </FieldLabel>
          {errors.terms && <FieldError>{errors.terms.message}</FieldError>}
        </FieldContent>
      </Field>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Spinner /> : t("submit")}
      </Button>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-sm text-muted-foreground">{tc("form.or")}</span>
        <Separator className="flex-1" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Button type="button" variant="secondary" className="w-full" aria-label={t("submit_google")}>
          <GoogleIcon />
        </Button>
        <Button type="button" variant="secondary" className="w-full" aria-label={t("submit_discord")}>
          <DiscordIcon />
        </Button>
        <Button type="button" variant="secondary" className="w-full" aria-label={t("submit_twitch")}>
          <TwitchIcon />
        </Button>
      </div>
    </form>
  )
}
