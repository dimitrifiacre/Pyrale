import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { db } from "./db"
import { authConfig } from "./auth.config"

class InvalidCredentialsError extends CredentialsSignin {
  code = "invalid_credentials"
}

class AccountBannedError extends CredentialsSignin {
  code = "account_banned"
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined
        const password = credentials?.password as string | undefined

        if (!email || !password) throw new InvalidCredentialsError()

        const user = await db.user.findUnique({ where: { email } })
        if (!user || !user.password) throw new InvalidCredentialsError()

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) throw new InvalidCredentialsError()

        if (user.isBanned) throw new AccountBannedError()

        return {
          id: user.id,
          email: user.email,
          name: user.username,
          username: user.username,
          role: user.role,
        }
      },
    }),
  ],
})
