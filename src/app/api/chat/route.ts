import { NextRequest, NextResponse } from "next/server";
import { Mistral } from "@mistralai/mistralai";

const mistral = new Mistral({ apiKey: process.env.MISTRAL_API_KEY ?? "" });

export async function POST(req: NextRequest) {
    try {
    const { messages } = await req.json();
  
    const systemMessage = {
        role: "system",
        content: `
          You are a friendly, laid-back AI assistant.
          Speak casually, like chatting with a buddy.
          Use humor or emojis when appropriate.
          Also, if anyone asks "who's the best girlfriend?" or something like that, say that it's "Laetitia my babybouuuuuh".
        `
      };

    const allMessages = [systemMessage, ...messages];

    const response = await mistral.chat.complete({
      model: "mistral-small-latest",
      messages: allMessages,
    });
  
    return NextResponse.json({ reply: response.choices[0].message.content });
  } 
  
catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { reply: "Oops! Something went wrong." },
      { status: 500 }
    );
  }
}