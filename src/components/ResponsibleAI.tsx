import { Scale, Eye, ShieldAlert, Lock, FileCheck2, UserCheck, RefreshCcw } from "lucide-react";
import { Reveal, SectionHead, Serif } from "./ui";

const PILLARS = [
  {
    icon: Scale,
    title: "Fairness",
    color: "#b8f34d",
    points: [
      "Inputs accepted the way Indians speak: Hinglish, transliterations, misspellings — no 'correct English' gatekeeping.",
      "No income-coded assumptions: shared bins, rented homes and informal settlements are first-class scenarios.",
      "Sanitation workers are treated as stakeholders to protect, not problems to police.",
    ],
  },
  {
    icon: Eye,
    title: "Transparency",
    color: "#62c6ff",
    points: [
      "Every classification shows its confidence score; every chat answer shows the passages it retrieved and relied on.",
      "Mocked layers (image captioning) are labelled as mocked, in the UI, not in a footnote.",
      "Impact coefficients and composition priors are published under the dashboard.",
    ],
  },
  {
    icon: ShieldAlert,
    title: "Ethics",
    color: "#ffb35c",
    points: [
      "Refuses to guess: below grounding threshold the system says 'I don't know' instead of inventing waste rules.",
      "Guidance for sharps, mercury and batteries prioritises human safety over recycling purity.",
      "No shame-based messaging, no guilt metrics, no greenwashed claims — nudges stay factual and kind.",
    ],
  },
  {
    icon: Lock,
    title: "Privacy",
    color: "#b79cff",
    points: [
      "This demo runs 100% in your browser: zero uploads, zero storage, zero tracking.",
      "Photos never leave the device; the prediction model needs no names, addresses or IDs.",
      "Production deployment would inherit the same data-minimisation contract by design.",
    ],
  },
];

const MODEL_CARD = [
  { k: "Model", v: "granite-swachh v0.3 (simulated)" },
  { k: "Task", v: "waste-stream classification + grounded QA" },
  { k: "Knowledge", v: "95-item taxonomy · 20-doc curated corpus" },
  { k: "Data provenance", v: "public SWM Rules 2016, CPCB, MoHUA, BIS notes" },
  { k: "Known limits", v: "India-urban context; local bylaws may differ" },
  { k: "Failure mode", v: "returns 'unknown' instead of hallucinating" },
  { k: "Human oversight", v: "required for hazard & compliance decisions" },
];

export default function ResponsibleAI() {
  return (
    <section id="responsible" className="relative py-24 md:py-36 scroll-mt-20">
      <div className="pointer-events-none absolute bottom-0 -left-32 w-[440px] h-[440px] rounded-full bg-emer/[0.05] blur-[120px]" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          index="07"
          kicker="Responsible AI · mandatory"
          title={
            <>
              Rules <Serif className="text-lime">before</Serif> code.
            </>
          }
          sub={
            <>
              Internship guidelines require every project to answer for fairness, transparency,
              ethics and privacy. Here is SwachhAI's answer — not as policy wallpaper, but as
              behaviours you can test in the demos above.
            </>
          }
        />

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07}>
                <div className="group h-full rounded-2xl border border-line bg-pine/70 p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-mist/20">
                  <div className="flex items-center gap-3">
                    <span
                      className="grid place-items-center w-11 h-11 rounded-xl"
                      style={{ background: `${p.color}1a`, color: p.color }}
                    >
                      <p.icon size={18} />
                    </span>
                    <h3 className="text-lg font-medium">{p.title}</h3>
                  </div>
                  <ul className="mt-5 space-y-3">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5 text-[12.5px] leading-relaxed text-fog">
                        <span
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                          style={{ background: p.color }}
                        />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* model card */}
          <Reveal delay={0.12} className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-lime/25 bg-gradient-to-b from-moss to-ink overflow-hidden">
              <div className="border-b border-line px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileCheck2 size={16} className="text-lime" />
                  <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-fog">
                    System card
                  </span>
                </div>
                <span className="rounded-full bg-lime/15 border border-lime/40 px-2.5 py-0.5 font-mono text-[9px] text-lime uppercase tracking-[0.1em]">
                  disclosed
                </span>
              </div>
              <div className="p-6 space-y-0">
                {MODEL_CARD.map((row, i) => (
                  <div
                    key={row.k}
                    className={`flex flex-col gap-1 py-3 ${i < MODEL_CARD.length - 1 ? "border-b border-line/60" : ""}`}
                  >
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-dim">
                      {row.k}
                    </span>
                    <span className="text-[13px] text-mist/90 leading-snug">{row.v}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-line px-6 py-4 flex items-center gap-3 bg-ink/50">
                <UserCheck size={15} className="text-lime shrink-0" />
                <p className="text-[11.5px] leading-snug text-fog">
                  Human-in-the-loop by default: guidance is advisory, and local municipal rules
                  always win.
                </p>
              </div>
              <div className="border-t border-line px-6 py-4 flex items-center gap-3 bg-ink/50">
                <RefreshCcw size={15} className="text-lime shrink-0" />
                <p className="text-[11.5px] leading-snug text-fog">
                  Review cadence: taxonomy quarterly; bias + misuse checks at every release.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
