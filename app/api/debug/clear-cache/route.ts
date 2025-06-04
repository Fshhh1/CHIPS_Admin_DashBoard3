import { NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"

export async function POST() {
  try {
    // Clear all relevant cache tags and paths
    revalidatePath("/")
    revalidatePath("/dashboard")
    revalidatePath("/api/github/repos")
    revalidateTag("github-repos")
    revalidateTag("github-files")
    revalidateTag("github-contents")

    return NextResponse.json({
      success: true,
      message: "All caches cleared successfully",
      clearedAt: new Date().toISOString(),
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
