import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get("github_token")?.value

  if (!token) {
    return NextResponse.json(
      {
        error: "No GitHub token found. Please login first.",
      },
      { status: 401 },
    )
  }

  try {
    // Test GitHub API connectivity
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    })

    const reposResponse = await fetch("https://api.github.com/user/repos?per_page=5", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    })

    const user = await userResponse.json()
    const repos = await reposResponse.json()

    return NextResponse.json({
      success: true,
      user: {
        login: user.login,
        name: user.name,
        public_repos: user.public_repos,
      },
      repos: repos.map((repo: any) => ({
        name: repo.name,
        updated_at: repo.updated_at,
        private: repo.private,
      })),
      rateLimit: {
        remaining: userResponse.headers.get("x-ratelimit-remaining"),
        reset: userResponse.headers.get("x-ratelimit-reset"),
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
