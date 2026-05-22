import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { z } from "zod"
import { db } from "@/lib/db"
import { sendPasswordResetEmail } from "@/lib/email"

const schema = z.object({ email: z.email() })

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: "invalid_request" }, { status: 400 })

  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "invalid_request" }, { status: 400 })

  const { email } = parsed.data

  const user = await db.user.findUnique({ where: { email } })
  if (!user) return NextResponse.json({ success: true })

  await db.passwordResetToken.deleteMany({ where: { userId: user.id } })

  const token = crypto.randomBytes(32).toString("hex")
  const expires = new Date(Date.now() + 60 * 60 * 1000)

  await db.passwordResetToken.create({
    data: { token, userId: user.id, expires },
  })

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  const resetUrl = `${siteUrl}/reset-password?token=${token}`

  const locale = request.cookies.get("locale")?.value ?? "fr"
  await sendPasswordResetEmail(email, resetUrl, locale)

  return NextResponse.json({ success: true })
}
