import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Square, Bot, RotateCcw } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string; error?: boolean };

const suggestions = [
  "What is his strongest tech stack?",
  "Tell me about the Temar Lije project.",
  "Which certificates does he hold?",
  "What is his role at Hundaf Digital Solution?",
];

export function AskKiya() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    const history: Msg[] = [...messages.filter((m) => !m.error), { role: "user", content: q }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    const controller = new AbortController();
    abortRef.current = controller;
    const update = (content: string, error = false) =>
      setMessages((prev) => [...prev.slice(0, -1), { role: "assistant", content, error }]);
    let answer = "";
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        update(data.error ?? "Something went wrong. Please try again.", true);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const frames = buffer.split("\n\n");
        buffer = frames.pop() ?? "";
        for (const frame of frames) {
          const line = frame.split("\n").find((l) => l.startsWith("data:"));
          if (!line) continue;
          const payload = line.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          try {
            const evt = JSON.parse(payload);
            if (evt.type === "response.output_text.delta") {
              answer += evt.delta;
              update(answer);
            } else if (evt.type === "response.failed" || evt.type === "error") {
              update(answer || "The assistant could not answer that. Please try again.", true);
            }
          } catch { /* partial frame */ }
        }
      }
      if (!answer) update("No answer was returned. Please try rephrasing or email directly.", true);
    } catch (e) {
      if ((e as Error).name === "AbortError") update(answer ? `${answer}\n\n— stopped` : "Stopped.");
      else update("Network error. Please try again.", true);
    } finally {
      setBusy(false);
      abortRef.current = null;
      inputRef.current?.focus();
    }
  }

  return (
    <section id="ask" className="px-5 py-16 md:px-10"><div className="mx-auto max-w-6xl">
      <p className="font-display text-xs uppercase text-muted-foreground">05.5 / Ask about Kiya</p>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95]">Recruiter?<br />Just ask.</h2>
          <p className="mt-6 max-w-md text-muted-foreground">An AI assistant that answers questions about my skills, experience, projects and certificates — using only what's in this portfolio.</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button key={s} type="button" disabled={busy} onClick={() => ask(s)} className="brutal-card brutal-lift px-3 py-2 text-left text-xs disabled:opacity-50">{s}</button>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="brutal-card flex h-[520px] flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-foreground px-4 py-3">
            <span className="flex items-center gap-2 font-display text-xs uppercase"><Bot className="h-4 w-4" /> Kiya's portfolio assistant</span>
            {messages.length > 0 && <button type="button" onClick={() => { abortRef.current?.abort(); setMessages([]); }} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><RotateCcw className="h-3 w-3" /> Reset</button>}
          </div>
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4" aria-live="polite">
            {messages.length === 0 && <p className="text-sm text-muted-foreground">Ask anything — e.g. "Has he built multi-tenant SaaS?"</p>}
            {messages.map((m, i) => m.role === "user" ? (
              <div key={i} className="ml-auto max-w-[85%] bg-foreground px-4 py-2 text-sm text-background">{m.content}</div>
            ) : (
              <div key={i} className={`max-w-[95%] whitespace-pre-wrap text-sm leading-6 ${m.error ? "text-destructive" : ""}`}>
                {m.content || <span className="inline-flex gap-1 text-muted-foreground"><span className="animate-pulse">●</span><span className="animate-pulse [animation-delay:150ms]">●</span><span className="animate-pulse [animation-delay:300ms]">●</span></span>}
              </div>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); ask(input); }} className="flex items-end gap-2 border-t border-foreground p-3">
            <textarea ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(input); } }} rows={1} maxLength={1000} placeholder="Ask about skills, projects, certificates…" aria-label="Your question" className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none" />
            {busy ? (
              <button type="button" onClick={() => abortRef.current?.abort()} aria-label="Stop" className="grid h-10 w-10 shrink-0 place-items-center bg-foreground text-background"><Square className="h-4 w-4" /></button>
            ) : (
              <button type="submit" disabled={!input.trim()} aria-label="Send" className="grid h-10 w-10 shrink-0 place-items-center bg-foreground text-background disabled:opacity-40"><ArrowUp className="h-4 w-4" /></button>
            )}
          </form>
        </motion.div>
      </div>
    </div></section>
  );
}
