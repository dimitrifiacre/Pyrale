import { Resend } from "resend"
import { PasswordResetEmail } from "@/components/emails/password-reset-email"

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.RESEND_FROM ?? "Pyrale <noreply@pyrale.com>"

export async function sendPasswordResetEmail(to: string, resetUrl: string, locale = "fr") {
  const isFr = locale === "fr"

  const subject = isFr
    ? "Réinitialisation de ton mot de passe – Pyrale"
    : "Reset your Pyrale password"

  const { error } = await resend.emails.send({
    from: FROM,
    to: "delivered@resend.dev",
    subject,
    react: PasswordResetEmail({ resetUrl, locale }),
  })

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`)
  }
}
