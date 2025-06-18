import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    console.log("Received message:", message);

    if (!message || typeof message !== "string") {
      console.error("Invalid message format:", message);
      return NextResponse.json({ error: "Invalid message format" }, { status: 400 });
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    // Log whether the API key is present (do NOT log the actual key in production!)
    if (!OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is missing!");
      return NextResponse.json({ error: "OpenAI API key not set in environment" }, { status: 500 });
    }
    console.log("OPENAI_API_KEY found.");

    // Make the OpenAI API call
    const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
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
    });

    console.log("OpenAI API response status:", apiRes.status);

    // If OpenAI returns an error, print it.
    if (!apiRes.ok) {
      let errorMsg = "Failed to contact OpenAI.";
      try {
        const errorData = await apiRes.json();
        console.error("OpenAI API Error:", errorData);
        if (errorData.error?.message) errorMsg = errorData.error.message;
      } catch (e) {
        console.error("Failed to parse OpenAI error response:", e);
      }
      return NextResponse.json({ error: errorMsg }, { status: 500 });
    }

    const data = await apiRes.json();
    console.log("OpenAI API data:", data);

    const reply = data.choices?.[0]?.message?.content?.trim() || "Sorry, I couldn't generate a response.";
    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Unhandled server error:", error);
    return NextResponse.json({ error: `Internal server error: ${error?.message || error}` }, { status: 500 });
  }
}