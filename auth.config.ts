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
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }:{session: Session, token: JWT}) {
      // @ts-ignore
      session.user.id = token.id
      return session
    },
  },
  providers: [
    Google,
  ],
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)
