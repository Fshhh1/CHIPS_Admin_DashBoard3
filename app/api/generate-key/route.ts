import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json()

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "API key name is required" }, { status: 400 })
    }

    // Generate a secure API key
    const generateApiKey = () => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      let result = "chips_"
      for (let i = 0; i < 32; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
      }
      return result
    }

    const apiKey = {
      id: Date.now().toString(),
      name: name.trim(),
      key: generateApiKey(),
      createdAt: new Date().toISOString(),
      isActive: true,
    }

    // In a real application, you would save this to your database
    // For now, we'll just return the generated key

    return NextResponse.json({
      success: true,
      apiKey: apiKey,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate API key" }, { status: 500 })
  }
}
