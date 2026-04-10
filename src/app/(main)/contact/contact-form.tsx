"use client"

import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import emailjs from "@emailjs/browser"
import { toast } from "sonner"

import {
  createContactSchema,
  CONTACT_CONSTRAINTS,
  type ContactFormData,
} from "@/lib/schemas/contact.schema"
import { useRecaptcha } from "@/hooks/use-recaptcha"
import { useSubmit } from "@/hooks/use-submit"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"

export function ContactForm() {
  const t = useTranslations("contact.form")
  const tc = useTranslations("common")

  const schema = useMemo(
    () =>
      createContactSchema({
        pseudoMin: tc("validation.min_username", { count: CONTACT_CONSTRAINTS.pseudoMin }),
        pseudoMax: tc("validation.max_username", { count: CONTACT_CONSTRAINTS.pseudoMax }),
        emailInvalid: tc("validation.email_invalid"),
        messageMin: tc("validation.min_message", { count: CONTACT_CONSTRAINTS.messageMin }),
        messageMax: tc("validation.max_message", { count: CONTACT_CONSTRAINTS.messageMax }),
      }),
    [tc]
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(schema) })

  const { executeRecaptcha } = useRecaptcha()
  const { submit, isLoading } = useSubmit()

  const onSubmit = async (data: ContactFormData) => {
    if (data.company) return

    try {
      await submit(async () => {
        const token = await executeRecaptcha("contact")

        if (!token) {
          throw new Error("reCAPTCHA_failed")
        }

        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          {
            pseudo: data.pseudo,
            email: data.email,
            message: data.message,
            "g-recaptcha-response": token,
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        )
      })

      toast.success(t("success.title"), {
        description: t("success.description", { pseudo: data.pseudo }),
      })
      reset()
    } catch (error) {
      if (error instanceof Error && error.message === "reCAPTCHA_failed") {
        toast.error(tc("form.error.title"), {
          description: tc("form.error.description"),
        })
      } else {
        toast.error(tc("form.error.title"), {
          description: tc("form.error.description"),
        })
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full max-w-lg"
      noValidate
    >
      {/* Honeypot – hidden from real users, catches bots */}
      <input
        {...register("company")}
        type="text"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        className="absolute -left-[9999px] opacity-0 pointer-events-none"
      />

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
        <FieldLabel htmlFor="message">{t("message")}</FieldLabel>
        <Textarea
          id="message"
          className="min-h-28"
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && <FieldError>{errors.message.message}</FieldError>}
      </Field>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? ( <Spinner /> ) : ( tc("form.send") )}
      </Button>

      <p className="text-xs text-muted-foreground">
        {tc.rich('form.recaptcha', {
          privacy: (chunks) => ( <a href="https://policies.google.com/privacy">{chunks}</a> ),
          terms: (chunks) => ( <a href="https://policies.google.com/terms">{chunks}</a> ),
        })}
      </p>
    </form>
  )
}
