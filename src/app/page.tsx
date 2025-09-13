"use client";

import { useState } from "react";
import { ChatMessage } from "../../types/chat";

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newMessage: ChatMessage = { role: "user", content: input };
    setMessages([...messages, newMessage]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: [...messages, newMessage] }),
    });

    const data = await res.json();
    setMessages([...messages, newMessage, { role: "assistant", content: data.reply }]);
  }

  return (
    <main className="p-6">
      <div className="mb-4 space-y-2">
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.role}:</b> {m.content}
          </p>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="border p-2 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Send
        </button>
      </form>
    </main>
  );
}

