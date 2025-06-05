import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    // Updated token validation logic
    // Accept multiple valid tokens for flexibility
    const validTokens = [
      process.env.GENESIS_TOKEN || "REDMELON-IAIIPS-CHIPS-GENESIS-TOKEN-001",
      "GENESIS-CHIPS-TOKEN-001-REDMELON", // Legacy token
      "REDMELON-GENESIS-TOKEN-001", // Alternative token
      "admin123", // Development token
    ]

    if (validTokens.includes(token)) {
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
      console.log("Invalid token attempt:", token)
      return NextResponse.json(
        {
          success: false,
          message: "Invalid token. Access denied.",
          hint: "Try using the default Genesis token: REDMELON-IAIIPS-CHIPS-GENESIS-TOKEN-001",
        },
        { status: 401 },
      )
    }
  } catch (error) {
    console.error("Token validation error:", error)
    return NextResponse.json({ success: false, message: "Invalid request format." }, { status: 400 })
  }
}
