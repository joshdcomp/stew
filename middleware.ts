import { NextRequest, NextResponse } from "next/server"

export default async (req: NextRequest) => {
  const headers = new Headers(req.headers)
  headers.set("x-current-path", req.nextUrl.pathname);
  return NextResponse.next({ headers })
}
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
