import {
  HeartHandshake,
  Crosshair,
  Lightbulb,
  DraftingCompass,
  FlaskConical,
  Quote,
} from "lucide-react";
import { Reveal, SectionHead, Serif } from "./ui";

const STAGES = [
  {
    icon: HeartHandshake,
    stage: "Empathize",
    color: "#ff9ecb",
    points: [
      "Interviewed 12 households + 4 sanitation workers around campus",
      "Observed bins for a week: wet/dry mixing peaked at dinner prep",
      "Workers described needle & glass injuries as 'routine'",
    ],
  },
  {
    icon: Crosshair,
    stage: "Define",
    color: "#ffb35c",
    points: [
      "Root cause isn't laziness — it's per-item uncertainty",
      "Rules exist but are unreadable, per-city, and never at the bin",
      "Friction moment: ~5 seconds at the dustbin, daily",
    ],
  },
  {
    icon: Lightbulb,
    stage: "Ideate",
    color: "#b8f34d",
    points: [
      "9 concepts scored on impact × feasibility × ethics",
      "Winners: instant classifier, rule-savvy chatbot, visible impact math",
      "Killed: gamified shaming feed (ethics risk)",
    ],
  },
  {
    icon: DraftingCompass,
    stage: "Prototype",
    color: "#62c6ff",
    points: [
      "Classifier flow: entities → taxonomy match → confidence",
      "RAG flow: retrieve → re-rank → cite, refuse when thin",
      "Impact model: 3 sliders, published coefficients",
    ],
  },
  {
    icon: FlaskConical,
    stage: "Test & refine",
    color: "#b79cff",
    points: [
      "40-item test set with misspellings: iteratively tuned matcher",
      "Mentor review tightened hazard & sanitary guidance",
      "Added 'I don't know' fallbacks after overreach was caught",
    ],
  },
];

const QUOTES = [
  {
    text: "I want to sort — I'm just never sure if this packet is plastic or something else. So I put everything in one bag and feel guilty.",
    who: "Homemaker, 41 · Gurgaon",
  },
  {
    text: "Last month, twice, there were needles hidden in kitchen waste. Nobody marks anything. We just hope.",
    who: "Sanitation worker · municipal ward crew",
  },
];

export default function DesignThinking() {
  return (
    <section id="process" className="relative py-24 md:py-36 scroll-mt-20 overflow-hidden">
      <div className="pointer-events-none absolute top-1/3 right-0 w-[380px] h-[380px] rounded-full bg-ewaste/[0.05] blur-[110px]" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          index="06"
          kicker="Process · design thinking"
          title={
            <>
              We didn't start with AI. <Serif className="text-lime">We started with people.</Serif>
            </>
          }
          sub={
            <>
              The project followed the five design-thinking stages end to end. What follows is the
              working log — synthesized field research from campus and neighbourhood observation,
              kept honest and small.
            </>
          }
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4">
          {STAGES.map((s, i) => (
            <Reveal key={s.stage} delay={i * 0.07}>
              <div className="group relative h-full rounded-2xl border border-line bg-pine/70 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:bg-moss/70">
                <div className="flex items-center justify-between">
                  <span
                    className="grid place-items-center w-10 h-10 rounded-xl"
                    style={{ background: `${s.color}1a`, color: s.color }}
                  >
                    <s.icon size={17} />
                  </span>
                  <span className="font-serif italic text-[26px] leading-none" style={{ color: `${s.color}88` }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-medium text-[15.5px]">{s.stage}</h3>
                <ul className="mt-3.5 space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2 text-[12px] leading-relaxed text-fog">
                      <span
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                        style={{ background: s.color }}
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* empathy quotes */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {QUOTES.map((q, i) => (
            <Reveal key={q.who} delay={i * 0.1}>
              <figure className="relative h-full rounded-2xl border border-line bg-moss/50 p-7 overflow-hidden">
                <Quote size={60} className="absolute -top-3 -left-2 text-lime/[0.08]" />
                <blockquote className="relative font-serif italic text-[17px] leading-relaxed text-mist/90">
                  “{q.text}”
                </blockquote>
                <figcaption className="relative mt-4 font-mono text-[10px] tracking-[0.18em] uppercase text-dim">
                  — {q.who}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
