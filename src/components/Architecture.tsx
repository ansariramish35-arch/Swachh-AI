import { Fragment } from "react";
import {
  Braces,
  Cpu,
  Network,
  Database,
  Zap,
  ArrowRight,
  RefreshCcw,
  Leaf,
  MessagesSquare,
} from "lucide-react";
import { Reveal, SectionHead, Serif } from "./ui";

const NODES = [
  {
    icon: MessagesSquare,
    title: "Inputs",
    sub: "Text · photo · voice",
    desc: "Hinglish, typos, or a snapshot with a label from any resident.",
    tag: "multimodal",
    accent: "#62c6ff",
  },
  {
    icon: Braces,
    title: "Preprocess",
    sub: "Normalize & transliterate",
    desc: "Token cleanup, case folding, alias expansion, language cues.",
    tag: "deterministic",
    accent: "#5ce0b8",
  },
  {
    icon: Cpu,
    title: "Granite-style LLM",
    sub: "Intent + entities",
    desc: "Small model extracts the item and its material clues, not just words.",
    tag: "ibm granite (sim)",
    accent: "#b8f34d",
  },
  {
    icon: Network,
    title: "Taxonomy graph",
    sub: "95 items · 8 streams",
    desc: "Curated knowledge graph encodes SWM Rules 2016 stream logic.",
    tag: "knowledge base",
    accent: "#b79cff",
  },
  {
    icon: Database,
    title: "RAG layer",
    sub: "20-doc corpus",
    desc: "Rules, CPCB notes & science retrieved before any answer is written.",
    tag: "grounding",
    accent: "#ffb35c",
  },
  {
    icon: Zap,
    title: "Action layer",
    sub: "Guide · nudge · forecast",
    desc: "Bin instruction, habit nudge and per-home carbon projection.",
    tag: "decision support",
    accent: "#ff6b6b",
  },
];

const CAPABILITIES = [
  "Prompt engineering",
  "Entity extraction",
  "Classification",
  "Retrieval-augmented generation",
  "Confidence calibration",
  "Summarization",
  "Multimodal input (mocked)",
  "Agentic nudges (roadmap)",
];

export default function Architecture() {
  return (
    <section id="system" className="relative py-24 md:py-36 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          index="05"
          kicker="System architecture"
          title={
            <>
              One pipeline. <Serif className="text-lime">Zero guesswork.</Serif>
            </>
          }
          sub={
            <>
              Every user touchpoint — the classifier, the assistant, the forecast — runs the same
              perception-to-action pipeline. The demo executes all routing logic client-side; in
              production, the marked stages map 1:1 onto IBM Granite + watsonx services.
            </>
          }
        />

        {/* pipeline */}
        <div className="flex flex-col xl:flex-row xl:items-stretch gap-0">
          {NODES.map((n, i) => (
            <Fragment key={n.title}>
              <Reveal delay={i * 0.07} className="flex-1">
                <div className="group relative h-full rounded-2xl border border-line bg-pine/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-mist/25">
                  <span
                    className="absolute top-0 left-5 right-5 h-[2px] rounded-full opacity-70"
                    style={{ background: n.accent }}
                  />
                  <div className="flex items-start justify-between">
                    <span
                      className="grid place-items-center w-10 h-10 rounded-xl"
                      style={{ background: `${n.accent}1a`, color: n.accent }}
                    >
                      <n.icon size={17} />
                    </span>
                    <span className="font-mono text-[10px] text-dim">0{i + 1}</span>
                  </div>
                  <h3 className="mt-4 text-[15px] font-medium">{n.title}</h3>
                  <p className="font-mono text-[9.5px] tracking-[0.1em] uppercase text-dim mt-0.5">
                    {n.sub}
                  </p>
                  <p className="mt-2.5 text-[12px] leading-relaxed text-fog">{n.desc}</p>
                  <span
                    className="mt-3.5 inline-block rounded-full border px-2.5 py-0.5 font-mono text-[8.5px] tracking-[0.14em] uppercase"
                    style={{ borderColor: `${n.accent}55`, color: n.accent }}
                  >
                    {n.tag}
                  </span>
                </div>
              </Reveal>
              {i < NODES.length - 1 && (
                <div className="flex xl:items-center justify-center py-1 xl:py-0 xl:px-1 shrink-0">
                  <svg width="34" height="26" viewBox="0 0 34 26" className="hidden xl:block">
                    <line x1="0" y1="13" x2="26" y2="13" stroke="#b8f34d" strokeWidth="1.5" className="flow-dash" />
                    <path d="M22 7 L29 13 L22 19" fill="none" stroke="#b8f34d" strokeWidth="1.5" />
                  </svg>
                  <svg width="26" height="30" viewBox="0 0 26 30" className="xl:hidden">
                    <line x1="13" y1="0" x2="13" y2="22" stroke="#b8f34d" strokeWidth="1.5" className="flow-dash" />
                    <path d="M7 18 L13 25 L19 18" fill="none" stroke="#b8f34d" strokeWidth="1.5" />
                  </svg>
                </div>
              )}
            </Fragment>
          ))}
        </div>

        {/* agent loop + capabilities */}
        <div className="mt-6 grid lg:grid-cols-12 gap-6">
          <Reveal className="lg:col-span-7">
            <div className="h-full rounded-2xl border border-line bg-moss/60 p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <p className="font-mono text-[10.5px] tracking-[0.24em] uppercase text-dim">
                  Agentic loop · how it stays useful
                </p>
                <RefreshCcw size={15} className="text-lime animate-spin-slow" />
              </div>
              <div className="grid sm:grid-cols-4 gap-3">
                {[
                  { t: "Perceive", d: "resident asks / scans" },
                  { t: "Decide", d: "classify + retrieve rules" },
                  { t: "Act", d: "guidance + nudge + log" },
                  { t: "Learn", d: "feedback expands taxonomy" },
                ].map((s, i) => (
                  <div key={s.t} className="relative rounded-xl border border-line bg-ink/50 p-4">
                    <span className="font-serif italic text-2xl text-lime/90">{i + 1}</span>
                    <p className="mt-1.5 text-[13px] font-medium">{s.t}</p>
                    <p className="mt-1 text-[11px] leading-snug text-dim">{s.d}</p>
                    {i < 3 && (
                      <ArrowRight size={12} className="absolute -right-2 top-1/2 -translate-y-1/2 text-lime hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {CAPABILITIES.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-line bg-ink/50 px-3 py-1.5 font-mono text-[10px] tracking-[0.1em] uppercase text-fog"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="h-full rounded-2xl border border-lime/25 bg-gradient-to-b from-lime/[0.08] to-transparent p-6 md:p-8">
              <div className="flex items-center gap-2.5 text-lime">
                <Leaf size={18} />
                <p className="font-mono text-[10.5px] tracking-[0.22em] uppercase">
                  Green AI, deliberately
                </p>
              </div>
              <p className="mt-4 text-[14.5px] leading-relaxed text-mist/90">
                A sustainability tool shouldn't burn a data centre per query. That's why the design
                prefers <span className="text-lime">small Granite-class models</span> over
                jumbo LLMs, retrieval over regeneration, and batch nudges over always-on polling.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[
                  { v: "8B", l: "target model class" },
                  { v: "20", l: "docs, not the whole web" },
                  { v: "~0", l: "cloud calls in this demo" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl border border-line bg-ink/50 py-4">
                    <p className="text-xl font-medium text-lime">{s.v}</p>
                    <p className="mt-1 font-mono text-[8.5px] tracking-[0.1em] uppercase text-dim px-1">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
