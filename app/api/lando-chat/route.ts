import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message format" }, { status: 400 })
    }

    // Simulate Lando's response (placeholder logic)
    const reply = `Lando says: "${message}" (simulated response)`

    return NextResponse.json({ reply })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
