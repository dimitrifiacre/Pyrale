import type { NextAuthConfig, DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    username: string
    role: string
  }

  interface Session {
    user: {
      id: string
      username: string
      role: string
    } & DefaultSession["user"]
  }
}

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        ;(token as Record<string, unknown>).id = user.id
        ;(token as Record<string, unknown>).username = user.username
        ;(token as Record<string, unknown>).role = user.role
      }
      return token
    },
    session({ session, token }) {
      const t = token as Record<string, unknown>
      session.user.id = t.id as string
      session.user.username = t.username as string
      session.user.role = t.role as string
      return session
    },
  },

  providers: [],
}
