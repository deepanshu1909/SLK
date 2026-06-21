import { useEffect, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const suggested = [
  "Why are Saturdays so booked?",
  "Write a birthday SMS for VIP clients",
  "Which service has the best margin?",
  "How can I improve my Google ranking?",
];

const initial = [
  { role: "ai", text: "Hi Camille — your AI business analyst. What would you like to know about your salon today?" },
];

export default function ChatPage() {
  useEffect(() => {
    document.title = "AI Chat — ZarkloAI";
  }, []);

  const [msgs, setMsgs] = useState(initial);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [...m, {
        role: "ai",
        text: "Looking at your last 30 days — bookings are up 24%, with Saturdays at 92% capacity. I'd suggest opening two evening slots on Thursday and Friday to capture overflow demand. Want me to draft the schedule update?",
      }]);
    }, 700);
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-4">
        <h1 className="font-display text-4xl flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-brand" /> AI Business Analyst
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">Ask anything about your salon. Powered by your real data.</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 px-1">
        {msgs.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 rounded-full grid place-items-center text-xs shrink-0 ${m.role === "user" ? "bg-muted" : "bg-gradient-brand text-white"}`}>
              {m.role === "user" ? "CV" : <Sparkles className="w-3.5 h-3.5" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "bg-gradient-brand text-white" : "bg-card border shadow-card"}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 space-y-3">
        <div className="flex flex-wrap gap-2">
          {suggested.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="text-xs px-3 py-1.5 rounded-full border bg-card hover:bg-muted transition"
            >
              {s}
            </button>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything…" className="h-12 rounded-full bg-card" />
          <Button type="submit" className="rounded-full h-12 w-12 p-0 bg-gradient-brand border-0">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
