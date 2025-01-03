import NextAuth, { Session, NextAuthConfig } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"

import Google from 'next-auth/providers/google'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }:{session: Session, token: JWT}) {
      if (token) {
        session = {
          ...session,
          user: {
            ...session.user,
            id: `${token.id}` || ''
          }
        }
      }
      return session
    },
  },
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)
