import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { registerSchema } from "@/lib/schemas/auth.schema"

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 })
  }

  const parsed = registerSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 })
  }

  const { username, email, password } = parsed.data

  const existingEmail = await db.user.findUnique({ where: { email } })
  if (existingEmail) {
    return NextResponse.json({ error: "email_taken" }, { status: 409 })
  }

  const existingUsername = await db.user.findFirst({
    where: { username: { equals: username, mode: "insensitive" } },
  })
  if (existingUsername) {
    return NextResponse.json({ error: "username_taken" }, { status: 409 })
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  await db.user.create({
    data: { email, password: hashedPassword, username },
  })

  return NextResponse.json({ success: true }, { status: 201 })
}
