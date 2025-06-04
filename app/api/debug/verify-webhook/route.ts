import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if webhook is properly configured
    const webhookUrl = `${process.env.VERCEL_URL || "http://localhost:3000"}/api/webhook/github`

    // In a real implementation, you'd verify the webhook with GitHub
    // For now, we'll just return the webhook configuration

    return NextResponse.json({
      webhookUrl,
      configured: false, // Would check actual webhook status
      events: ["push", "pull_request"],
      active: false,
      message: "Webhook verification not implemented yet",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
