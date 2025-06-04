import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request, { params }: { params: { owner: string; repo: string } }) {
  const cookieStore = cookies()
  const token = cookieStore.get("github_token")?.value
  const { searchParams } = new URL(request.url)
  const path = searchParams.get("path") || ""

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  try {
    const url = `https://api.github.com/repos/${params.owner}/${params.repo}/contents/${path}`
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch repository contents")
    }

    const contents = await response.json()
    return NextResponse.json(contents)
  } catch (error) {
    console.error("Error fetching repo contents:", error)
    return NextResponse.json({ error: "Failed to fetch repository contents" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { owner: string; repo: string } }) {
  const cookieStore = cookies()
  const token = cookieStore.get("github_token")?.value
  const { searchParams } = new URL(request.url)
  const path = searchParams.get("path")

  if (!token || !path) {
    return NextResponse.json({ error: "Not authenticated or missing path" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const url = `https://api.github.com/repos/${params.owner}/${params.repo}/contents/${path}`

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error("Failed to update file")
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error updating file:", error)
    return NextResponse.json({ error: "Failed to update file" }, { status: 500 })
  }
}
