// import NextAuth from "next-auth"
// import { baseAuthConfig } from '@/auth.config'

// prisma doesn't play nicely on edge fn's so auth on middleware is a standalone instance
// export const { auth: middleware } = NextAuth(baseAuthConfig)
export default async () => {}
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
