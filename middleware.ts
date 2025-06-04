import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if accessing admin dashboard
  if (request.nextUrl.pathname.startsWith("/admin-dashboard")) {
    const authCookie = request.cookies.get("chips_auth")

    if (!authCookie || authCookie.value !== "authenticated") {
      return NextResponse.redirect(new URL("/token-gate", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin-dashboard/:path*"],
}
