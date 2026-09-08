import { Users, HardHat, Building2, Globe2, BrainCircuit, ScanLine, BookOpenText, TrendingUp } from "lucide-react";
import { CountUp, Reveal, SectionHead, Serif } from "./ui";

const STATS = [
  {
    value: 62,
    suffix: "M t/yr",
    label: "municipal solid waste generated in India annually (approx.)",
    accent: "#b8f34d",
  },
  {
    value: 30,
    suffix: "%",
    label: "of households segregate at source — the rest mixes wet, dry, toxic",
    accent: "#ffb35c",
  },
  {
    value: 80,
    suffix: "%+",
    label: "of the recyclable value in mixed waste is lost through contamination",
    accent: "#62c6ff",
  },
  {
    value: 3100,
    suffix: "+",
    label: "legacy dumpsites still leak methane and leachate into cities",
    accent: "#ff6b6b",
  },
];

const STAKEHOLDERS = [
  {
    icon: Users,
    name: "Households & students",
    pain: "“Is it wet or dry?” — one confusing item per day breaks the sorting habit entirely.",
  },
  {
    icon: HardHat,
    name: "Sanitation workers",
    pain: "Mixed dumps mean needle injuries, toxic exposure and dignity lost daily.",
  },
  {
    icon: Building2,
    name: "Municipal bodies",
    pain: "Contaminated trucks make recycling plants uneconomical and push waste to landfills.",
  },
  {
    icon: Globe2,
    name: "The climate",
    pain: "Buried organics rot into landfill methane — up to 80× more potent than CO₂.",
  },
];

const WHY_AI = [
  {
    icon: ScanLine,
    title: "Classification",
    line: "“What exactly is this thing?” — Granite-style entity extraction maps any item to its correct stream.",
  },
  {
    icon: BookOpenText,
    title: "Retrieval (RAG)",
    line: "“What do my city's rules say?” — grounded answers from a curated policy corpus. No hallucinated rules.",
  },
  {
    icon: TrendingUp,
    title: "Prediction",
    line: "“What changes if I comply?” — a transparent model forecasts diverted kilograms and CO₂e for your home.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="relative py-24 md:py-36 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          index="01"
          kicker="The Problem"
          title={
            <>
              Nobody ever taught the <Serif className="text-lime">dustbin to speak.</Serif>
            </>
          }
          sub={
            <>
              The enemy isn't plastic — it's <span className="text-mist">confusion</span>. One
              soggy tissue in a dry bag can send an entire kg of recyclables to landfill. The
              bottleneck is cognitive, so we attacked it with intelligence, not more bins.
            </>
          }
        />

        <div className="grid lg:grid-cols-12 gap-6">
          {/* problem statement poster */}
          <Reveal className="lg:col-span-7">
            <div className="relative h-full overflow-hidden rounded-[26px] border border-line bg-gradient-to-br from-moss via-pine to-ink p-8 md:p-12">
              <div className="dotgrid absolute inset-0 opacity-40" />
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-lime/10 blur-[90px]" />
              <div className="relative">
                <p className="font-mono text-[10.5px] tracking-[0.3em] uppercase text-lime">
                  Problem Statement
                </p>
                <p className="mt-6 font-serif italic text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.3] text-mist/95">
                  “How might we use AI to make correct waste sorting{" "}
                  <span className="text-lime">effortless for every household</span> — so that
                  India's cities become engines of a circular economy instead of methane
                  factories?”
                </p>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  <span className="rounded-full bg-lime/15 border border-lime/30 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-lime">
                    Primary · SDG 12
                  </span>
                  <span className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-fog">
                    Secondary · SDG 11
                  </span>
                  <span className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-fog">
                    Secondary · SDG 13
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* stacked stats */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="group relative overflow-hidden rounded-2xl border border-line bg-pine/70 px-6 py-5 hover:border-mist/20 transition-colors">
                  <span
                    className="absolute left-0 top-0 h-full w-[3px]"
                    style={{ background: s.accent }}
                  />
                  <p className="text-3xl md:text-4xl font-medium tracking-tight" style={{ color: s.accent }}>
                    <CountUp to={s.value} />
                    <span className="text-xl md:text-2xl text-dim ml-1">{s.suffix}</span>
                  </p>
                  <p className="mt-1.5 text-[13px] text-fog leading-snug">{s.label}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.32}>
              <p className="px-1 font-mono text-[10px] leading-relaxed tracking-[0.06em] text-dim italic">
                * Approximate figures compiled from CPCB & press-reported estimates — used for
                prototype framing, not policy.
              </p>
            </Reveal>
          </div>
        </div>

        {/* who is affected */}
        <div className="mt-16 md:mt-24">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-dim mb-6">
              Who carries the cost of a wrong toss?
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STAKEHOLDERS.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.08}>
                <div className="group h-full rounded-2xl border border-line bg-moss/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-lime/30 hover:bg-moss">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-fern text-lime group-hover:bg-lime group-hover:text-ink transition-colors">
                    <s.icon size={19} />
                  </span>
                  <h3 className="mt-5 font-medium text-[15.5px]">{s.name}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-fog">{s.pain}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* why AI */}
        <div className="mt-16 md:mt-24 grid lg:grid-cols-12 gap-6 items-start">
          <Reveal className="lg:col-span-4">
            <div className="rounded-2xl border border-lime/25 bg-lime/[0.06] p-7">
              <BrainCircuit size={26} className="text-lime" />
              <h3 className="mt-4 text-xl font-medium">
                Why AI, and <Serif className="text-lime">not just an app?</Serif>
              </h3>
              <p className="mt-3 text-[13.5px] text-fog leading-relaxed">
                Rule-based apps list rules. Humans ask messy questions — in Hinglish, with
                spelling mistakes, about items no database anticipated. Language understanding,
                retrieval and prediction are exactly where AI compresses effort.
              </p>
            </div>
          </Reveal>
          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-4">
            {WHY_AI.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.09}>
                <div className="h-full rounded-2xl border border-line bg-pine/60 p-6">
                  <span className="font-mono text-[10px] tracking-[0.24em] text-dim">
                    0{i + 1}
                  </span>
                  <div className="mt-3 flex items-center gap-2 text-lime">
                    <w.icon size={17} />
                    <h4 className="text-[15px] font-medium text-mist">{w.title}</h4>
                  </div>
                  <p className="mt-2.5 text-[12.5px] leading-relaxed text-fog">{w.line}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
