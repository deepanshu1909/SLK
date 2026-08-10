import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { replyAsZarkloAgent } from "@/lib/site-content";

type Msg = { role: "user" | "assistant"; text: string };

export function SiteChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hi — I’m Zarklo’s Conversion agent demo. Ask about pricing, salons, clinics, labs, CRM, or cancel policies.",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    window.setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: replyAsZarkloAgent(text) }]);
    }, 450);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3">
      {open ? (
        <div className="flex h-[min(480px,70vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-[var(--hairline)] bg-[var(--card)] shadow-[var(--shadow-elevated)]">
          <div className="flex items-center justify-between border-b border-[var(--hairline)] bg-[#0d0617] px-4 py-3">
            <div>
              <div className="text-sm font-medium text-[var(--heading)]">Zarklo Conversion Agent</div>
              <div className="text-[10px] text-[var(--muted-ink)]">Live product demo · instant answers</div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-lg text-[var(--muted-ink)] hover:bg-[var(--brand-soft)]"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={`max-w-[90%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-[var(--primary)] text-white"
                    : "bg-[var(--background)] text-[var(--ink)] border border-[var(--hairline)]"
                }`}
              >
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form onSubmit={send} className="flex gap-2 border-t border-[var(--hairline)] p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about pricing, modules…"
              className="h-10 flex-1 rounded-lg border border-[var(--hairline)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--gold)]"
            />
            <button type="submit" className="zk-btn-primary !min-h-10 !px-3" aria-label="Send">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--primary)] px-4 text-sm font-medium text-white shadow-glow"
        aria-label={open ? "Close chat" : "Open Zarklo chat"}
      >
        <MessageCircle className="h-4 w-4" />
        {open ? "Close" : "Ask Zarklo"}
      </button>
    </div>
  );
}
