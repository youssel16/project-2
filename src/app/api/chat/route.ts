import { NextRequest, NextResponse } from "next/server";
import { Mistral } from "@mistralai/mistralai";

const mistral = new Mistral({ apiKey: process.env.MISTRAL_API_KEY ?? "" });
export async function POST(req: NextRequest) {
    const { messages } = await req.json();
  
    const response = await mistral.chat.complete({
      model: "mistral-small-latest",
      messages,
    });
  
    return NextResponse.json({ reply: response.choices[0].message.content });
  }