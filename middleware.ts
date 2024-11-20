import { NextRequest, NextResponse } from "next/server"

export default async (req: NextRequest) => {
  // keeping empty for now
}
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
