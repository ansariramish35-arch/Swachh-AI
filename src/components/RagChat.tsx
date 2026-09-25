import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Send,
  User,
  FileText,
  Database,
  GitBranch,
  BadgeCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { answer, SUGGESTED_PROMPTS, type RagAnswer, type Retrieved } from "../lib/rag";
import { SectionHead, Serif, Reveal } from "./ui";

interface Msg {
  id: number;
  role: "user" | "bot";
  text: string;
  streaming?: boolean;
  citations?: Retrieved[];
  confidence?: number;
  kind?: RagAnswer["kind"];
}

const HOW_IT_WORKS = [
  {
    icon: Database,
    step: "Retrieve",
    line: "TF-IDF vectors score 20 curated policy & science documents against your question.",
  },
  {
    icon: GitBranch,
    step: "Re-rank",
    line: "Sentence-level overlap re-ranking picks the most relevant passages — not whole docs.",
  },
  {
    icon: BadgeCheck,
    step: "Compose + cite",
    line: "The answer is built only from retrieved text, with sources attached. No sources → no guess.",
  },
];

let uid = 1;

export default function RagChat() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: uid++,
      role: "bot",
      text: "Namaste! I'm the SwachhAI assistant — grounded in Indian solid-waste rules, CPCB practice notes and circular-economy facts.\nAsk me anything about sorting, composting, e-waste, plastics or household carbon. I'll show the exact sources behind every answer.",
      kind: "meta",
      confidence: 99,
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const timers = useRef<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const updateMsg = (id: number, patch: Partial<Msg>) =>
    setMessages((m) => m.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const send = (raw: string) => {
    const q = raw.trim();
    if (!q || busy) return;
    setBusy(true);
    setInput("");
    setMessages((m) => [...m, { id: uid++, role: "user", text: q }]);

    const ans = answer(q);
    const fulltext =
      ans.kind === "answer"
        ? `${ans.lead}\n${ans.sentences.map((s) => `• ${s}`).join("\n")}`
        : ans.lead;

    const botId = uid++;
    timers.current.push(
      window.setTimeout(() => {
        setMessages((m) => [
          ...m,
          {
            id: botId,
            role: "bot",
            text: "",
            streaming: true,
            kind: ans.kind,
            confidence: ans.confidence,
            citations: ans.citations,
          },
        ]);
        let i = 0;
        const tick = () => {
          i = Math.min(fulltext.length, i + 3 + Math.floor(Math.random() * 4));
          updateMsg(botId, { text: fulltext.slice(0, i) });
          if (i < fulltext.length) {
            timers.current.push(window.setTimeout(tick, 14));
          } else {
            updateMsg(botId, { streaming: false });
            setBusy(false);
          }
        };
        tick();
      }, 700 + Math.random() * 500)
    );
  };

  // classifier handoff
  useEffect(() => {
    const h = (e: Event) => {
      const q = (e as CustomEvent<string>).detail;
      if (typeof q === "string") send(q);
    };
    window.addEventListener("swachh:ask", h);
    return () => window.removeEventListener("swachh:ask", h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busy]);

  const renderBody = (text: string, streaming?: boolean) => (
    <div className={streaming ? "caret" : ""}>
      {text.split("\n").map((line, i) =>
        line.startsWith("• ") ? (
          <div key={i} className="flex gap-2.5 mt-2">
            <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-lime shrink-0" />
            <span className="text-[13.5px] leading-relaxed text-mist/90">{line.slice(2)}</span>
          </div>
        ) : (
          line.trim() && (
            <p key={i} className="text-[13.5px] leading-relaxed text-mist/90 mt-1.5 first:mt-0">
              {line}
            </p>
          )
        )
      )}
    </div>
  );

  return (
    <section id="assistant" className="relative py-24 md:py-36 scroll-mt-20">
      <div className="pointer-events-none absolute top-1/4 -left-32 w-[420px] h-[420px] rounded-full bg-dry/[0.07] blur-[120px]" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          index="03"
          kicker="Live demo · RAG assistant"
          title={
            <>
              Answers that are <Serif className="text-lime">grounded, not guessed.</Serif>
            </>
          }
          sub={
            <>
              A retrieval-augmented generation pattern: every question first searches a corpus of
              municipal rules and material science, then composes a reply strictly from what it
              found — citations attached. When evidence is thin, it says so.
            </>
          }
        />

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* left explainer */}
          <Reveal className="lg:col-span-4 xl:col-span-4 space-y-4">
            <div className="rounded-2xl border border-lime/25 bg-gradient-to-b from-moss/70 to-pine/60 p-6">
              <p className="font-mono text-[10px] tracking-[0.26em] uppercase text-dim mb-4">
                About the builder
              </p>
              <div className="flex items-center gap-3">
                <span className="grid place-items-center w-11 h-11 rounded-full bg-lime text-ink font-mono text-[10.5px] font-medium shrink-0">
                  MRA
                </span>
                <div>
                  <a
                    href="https://www.linkedin.com/in/ramish-ansari"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[14.5px] font-medium leading-tight hover:text-lime transition-colors"
                  >
                    Mohammad Ramish Ansari
                  </a>
                  <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-dim mt-0.5">
                    CSE · University of Lucknow
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[12.5px] leading-relaxed text-fog">
                An AI · ML and data-science student drawn to how raw information becomes
                intelligent, scalable systems. Toolkit: Python, SQL, NumPy, Pandas — extended
                through hands-on work with Generative AI, LLMs, RAG, IBM Granite and Agentic AI,
                on CS foundations of DSA, OOPS, OS and DBMS. I learn by building: prototypes,
                experiments, analysis, iteration.
              </p>
              <p className="mt-4 font-serif italic text-[15px] text-lime">
                &quot;Learn. Build. Experiment. Improve.&quot;
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-pine/70 p-6">
              <p className="font-mono text-[10px] tracking-[0.26em] uppercase text-dim mb-5">
                The RAG pattern, visible
              </p>
              <div className="space-y-5">
                {HOW_IT_WORKS.map((h, i) => (
                  <div key={h.step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="grid place-items-center w-10 h-10 rounded-xl bg-fern text-lime shrink-0">
                        <h.icon size={17} />
                      </span>
                      {i < HOW_IT_WORKS.length - 1 && (
                        <span className="mt-2 w-px flex-1 bg-gradient-to-b from-lime/40 to-transparent" />
                      )}
                    </div>
                    <div className="pb-1">
                      <p className="font-medium text-[14.5px]">
                        <span className="font-mono text-[10px] text-dim mr-2">0{i + 1}</span>
                        {h.step}
                      </p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-fog">{h.line}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-lime/25 bg-lime/[0.06] p-5">
              <div className="flex items-center gap-2 text-lime mb-2">
                <ShieldCheck size={16} />
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase">
                  anti-hallucination contract
                </span>
              </div>
              <p className="text-[12.5px] leading-relaxed text-mist/80">
                If retrieval confidence drops below threshold, the assistant refuses to invent a
                rule and asks you to rephrase — watch for the honest "I don't know".
              </p>
            </div>
          </Reveal>

          {/* chat */}
          <Reveal delay={0.1} className="lg:col-span-8">
            <div className="rounded-[24px] border border-line bg-gradient-to-b from-moss/80 to-pine overflow-hidden">
              {/* header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 md:px-7 py-4">
                <div className="flex items-center gap-3">
                  <span className="relative grid place-items-center w-10 h-10 rounded-xl bg-lime text-ink">
                    <Bot size={19} />
                    <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emer border-2 border-moss" />
                  </span>
                  <div>
                    <p className="font-medium text-[14.5px]">SwachhAI Assistant</p>
                    <p className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-dim">
                      granite-rag v0.3 · corpus: 20 docs · SWM Rules + CPCB + BIS
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emer/40 bg-emer/10 px-3 py-1 font-mono text-[9.5px] tracking-[0.16em] uppercase text-emer">
                  <span className="h-1.5 w-1.5 rounded-full bg-emer animate-pulse" />
                  grounded mode
                </span>
              </div>

              {/* messages */}
              <div
                ref={scrollRef}
                className="thin-scroll h-[480px] md:h-[540px] overflow-y-auto px-4 md:px-6 py-6 space-y-5"
              >
                {messages.map((m) => (
                  <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                    <span
                      className={`grid shrink-0 place-items-center w-8 h-8 rounded-lg mt-0.5 ${
                        m.role === "user" ? "bg-fern text-fog" : "bg-lime text-ink"
                      }`}
                    >
                      {m.role === "user" ? <User size={14} /> : <Bot size={15} />}
                    </span>
                    <div className={`max-w-[85%] ${m.role === "user" ? "items-end" : ""}`}>
                      <div
                        className={`rounded-2xl px-4 py-3.5 ${
                          m.role === "user"
                            ? "bg-mist/[0.08] border border-mist/15 rounded-tr-sm"
                            : "bg-ink/60 border border-line rounded-tl-sm"
                        }`}
                      >
                        {renderBody(m.text, m.streaming)}
                      </div>

                      {/* citations */}
                      {!m.streaming && m.citations && m.citations.length > 0 && (
                        <div className="mt-2.5 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <Sparkles size={11} className="text-lime" />
                            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-dim">
                              retrieved sources
                            </span>
                            <span
                              className={`rounded-full border px-2 py-0.5 font-mono text-[9px] ${
                                (m.confidence ?? 0) >= 60
                                  ? "border-emer/40 text-emer"
                                  : "border-sanit/40 text-sanit"
                              }`}
                            >
                              grounding {m.confidence}%
                            </span>
                          </div>
                          {m.citations.map((c, i) => (
                            <div
                              key={c.chunk.id}
                              className="flex items-center gap-2.5 rounded-lg border border-line bg-ink/40 px-3 py-2"
                            >
                              <FileText size={12} className="text-dim shrink-0" />
                              <span className="text-[11.5px] text-mist/80 truncate">
                                [{i + 1}] {c.chunk.title}
                              </span>
                              <span className="ml-auto font-mono text-[9px] text-dim shrink-0">
                                {c.chunk.source.split("·")[0].split(",")[0]}
                              </span>
                              <span className="h-1 w-10 rounded-full bg-fern overflow-hidden shrink-0">
                                <span
                                  className="block h-full bg-lime/80"
                                  style={{ width: `${Math.min(100, Math.round(c.score * 130))}%` }}
                                />
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* typing indicator */}
                {busy && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex gap-3">
                    <span className="grid shrink-0 place-items-center w-8 h-8 rounded-lg bg-lime text-ink mt-0.5">
                      <Bot size={15} />
                    </span>
                    <div className="rounded-2xl rounded-tl-sm border border-line bg-ink/60 px-5 py-4 flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-fog"
                          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* suggestions + input */}
              <div className="border-t border-line px-4 md:px-6 py-4">
                <AnimatePresence>
                  {messages.length <= 1 && !busy && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap gap-2 pb-3.5">
                        {SUGGESTED_PROMPTS.map((p) => (
                          <button
                            key={p}
                            onClick={() => send(p)}
                            className="rounded-full border border-line bg-ink/50 px-3.5 py-1.5 text-[12px] text-fog hover:text-lime hover:border-lime/50 transition-colors"
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="flex gap-2.5">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send(input)}
                    placeholder="Ask about any waste rule — “where do tube lights go?”"
                    className="flex-1 rounded-xl border border-line bg-ink/70 px-4 py-3.5 text-[14px] text-mist placeholder:text-dim/70 focus:outline-none focus:border-lime/60 transition-colors"
                  />
                  <button
                    onClick={() => send(input)}
                    disabled={!input.trim() || busy}
                    className="rounded-xl bg-lime px-4 text-ink hover:shadow-[0_0_28px_rgba(184,243,77,0.35)] disabled:opacity-40 disabled:shadow-none transition-all"
                    aria-label="Send"
                  >
                    <Send size={17} />
                  </button>
                </div>
                <p className="mt-2.5 font-mono text-[9.5px] tracking-[0.08em] text-dim">
                  Demo build: retrieval runs in-browser over a curated corpus. Production would
                  swap in IBM Granite + watsonx vector store with the same pattern.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
