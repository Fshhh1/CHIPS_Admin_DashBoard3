import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message format" }, { status: 400 })
    }

    // Call OpenAI API
    const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are Lando, an AI assistant for the CHIPS Admin Dashboard. Help the user with their administrative tasks and answer questions clearly." },
          { role: "user", content: message }
        ],
        max_tokens: 256,
        temperature: 0.7,
      }),
    })

    if (!apiRes.ok) {
      const errorData = await apiRes.json()
      return NextResponse.json({ error: errorData.error?.message || "Failed to contact OpenAI." }, { status: 500 })
    }

    const data = await apiRes.json()
    const reply = data.choices?.[0]?.message?.content?.trim() || "Sorry, I couldn't generate a response."

    return NextResponse.json({ reply })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}