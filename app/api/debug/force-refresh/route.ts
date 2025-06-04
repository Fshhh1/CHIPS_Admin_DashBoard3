import { NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"

export async function POST() {
  try {
    // Clear Next.js cache
    revalidatePath("/dashboard")
    revalidatePath("/api/github/repos")
    revalidateTag("github-repos")
    revalidateTag("github-files")

    // Force refresh GitHub data
    const response = await fetch(`${process.env.VERCEL_URL || "http://localhost:3000"}/api/github/repos`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })

    return NextResponse.json({
      success: true,
      message: "Cache cleared and data refreshed",
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
