import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = cookies()
  const authCookie = cookieStore.get("chips_auth")

  if (authCookie?.value === "authenticated") {
    return NextResponse.json({ authenticated: true })
  } else {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
