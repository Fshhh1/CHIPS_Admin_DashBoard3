import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  if (!code) {
    // Redirect to GitHub OAuth
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=repo,user&redirect_uri=${process.env.GITHUB_REDIRECT_URI}`
    return NextResponse.redirect(githubAuthUrl)
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.access_token) {
      // Store token in session/cookie (simplified for demo)
      const response = NextResponse.redirect(new URL("/dashboard", request.url))
      response.cookies.set("github_token", tokenData.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
      return response
    }
  } catch (error) {
    console.error("GitHub OAuth error:", error)
  }

  return NextResponse.redirect(new URL("/?error=github_auth_failed", request.url))
}
