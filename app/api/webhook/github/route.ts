import { NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const event = request.headers.get("x-github-event")

    // Verify webhook signature (in production, you should verify this)
    // const signature = request.headers.get("x-hub-signature-256")

    console.log(`Received GitHub webhook: ${event}`)

    // Handle different GitHub events
    switch (event) {
      case "push":
        // Clear cache when code is pushed
        revalidatePath("/dashboard")
        revalidateTag("github-repos")
        revalidateTag("github-files")
        console.log("Cache cleared due to push event")
        break

      case "repository":
        // Handle repository events (created, deleted, etc.)
        revalidateTag("github-repos")
        console.log("Repository cache cleared")
        break

      case "pull_request":
        // Handle pull request events
        revalidateTag("github-repos")
        console.log("Pull request event processed")
        break

      default:
        console.log(`Unhandled webhook event: ${event}`)
    }

    return NextResponse.json({
      success: true,
      event,
      processed: true,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Webhook processing error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
