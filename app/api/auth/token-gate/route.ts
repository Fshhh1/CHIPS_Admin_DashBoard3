import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    // Use server-side environment variable (not exposed to client)
    const validToken = process.env.GENESIS_TOKEN || "REDMELON-IAIIPS-CHIPS-GENESIS-TOKEN-001"

    if (token === validToken) {
      // Set secure HTTP-only cookie
      const response = NextResponse.json({
        success: true,
        message: "Token valid. Access granted.",
      })

      response.cookies.set("chips_auth", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      })

      return response
    } else {
      return NextResponse.json({ success: false, message: "Invalid token. Access denied." }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Invalid request format." }, { status: 400 })
  }
}
