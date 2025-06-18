import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message format" }, { status: 400 });
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      // Debug: env not loaded
      console.error("OPENAI_API_KEY is missing!");
      return NextResponse.json({ error: "OpenAI API key not set in environment" }, { status: 500 });
    }

    // Debug: print incoming message
    console.log("User Message:", message);

    const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are Lando, an AI assistant for the CHIPS Admin Dashboard. Help the user with their administrative tasks and answer questions clearly.",
          },
          { role: "user", content: message },
        ],
        max_tokens: 256,
        temperature: 0.7,
      }),
    });

    // Debug: print API response status
    console.log("OpenAI API Status:", apiRes.status);

    if (!apiRes.ok) {
      let errorMsg = "Failed to contact OpenAI.";
      try {
        const errorData = await apiRes.json();
        console.error("OpenAI API Error:", errorData);
        if (errorData.error?.message) errorMsg = errorData.error.message;
      } catch (e) {
        // Debug: unable to parse error
        console.error("Error parsing OpenAI error response", e);
      }
      return NextResponse.json({ error: errorMsg }, { status: 500 });
    }

    const data = await apiRes.json();
    // Debug: print full response
    console.log("OpenAI API Data:", JSON.stringify(data, null, 2));

    const reply = data.choices?.[0]?.message?.content?.trim() || "Sorry, I couldn't generate a response.";
    return NextResponse.json({ reply });

  } catch (error: any) {
    // Debug: print full error
    console.error("API Handler Error:", error);
    return NextResponse.json({ error: `Internal server error: ${error?.message || error}` }, { status: 500 });
  }
}