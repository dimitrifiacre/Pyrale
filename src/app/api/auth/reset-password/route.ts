import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { db } from "@/lib/db"

const postSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8).max(72),
})

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token")
  if (!token) return NextResponse.json({ valid: false }, { status: 400 })

  const record = await db.passwordResetToken.findUnique({ where: { token } })
  if (!record || record.expires < new Date()) {
    return NextResponse.json({ valid: false })
  }

  return NextResponse.json({ valid: true })
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: "invalid_request" }, { status: 400 })

  const parsed = postSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "invalid_request" }, { status: 400 })

  const { token, password } = parsed.data

  const record = await db.passwordResetToken.findUnique({
    where: { token },
    include: { user: true },
  })

  if (!record || record.expires < new Date()) {
    return NextResponse.json({ error: "invalid_token" }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  await db.$transaction([
    db.user.update({
      where: { id: record.userId },
      data: { password: hashedPassword },
    }),
    db.passwordResetToken.delete({ where: { token } }),
  ])

  return NextResponse.json({ success: true })
}
