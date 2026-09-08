import { ArrowRight, GraduationCap, Building2, Satellite, CheckCircle2 } from "lucide-react";
import { Reveal, SectionHead, Serif, CountUp } from "./ui";

const BEFORE = [
  "One mixed bag per home — recyclables ruined by wet waste",
  "Workers hand-sort toxins, sharps get handled bare",
  "Organics ferment into landfill methane, invisible and unpriced",
  "Municipalities fly blind: zero per-locality stream data",
];

const AFTER = [
  "95% source segregation becomes the default, not the exception",
  "Wrapped, marked hazard & sanitary flows protect workers daily",
  "Organics loop back to soil via compost — methane never forms",
  "Anonymised stream analytics guide ward-level routes & tariffs",
];

const PHASES = [
  {
    icon: GraduationCap,
    phase: "Phase 01",
    name: "Campus pilot",
    window: "Months 0–3",
    color: "#b8f34d",
    items: [
      "Deploy to 500 students + 2 hostels; run a 1-week waste audit baseline",
      "Expand taxonomy 95 → 250 items from real campus queries",
      "KPI: ≥60% weekly actives; ±40% cut in hostel mixed waste",
    ],
  },
  {
    icon: Building2,
    phase: "Phase 02",
    name: "Ward partnership",
    window: "Months 3–9",
    color: "#62c6ff",
    items: [
      "Partner with the urban local body: align streams with collection routes",
      "Add multilingual voice input + ward-level collection calendars",
      "KPI: 1 ward onboarded; MRF reports higher dry-waste purity",
    ],
  },
  {
    icon: Satellite,
    phase: "Phase 03",
    name: "Citizen data layer",
    window: "Months 9–18",
    color: "#b79cff",
    items: [
      "Aggregate anonymised stream analytics for city dashboards",
      "API for housing societies; recycler take-back integrations",
      "KPI: verifiable tonnes diverted, published quarterly",
    ],
  },
];

export default function ImpactStatement() {
  return (
    <section id="impact-statement" className="relative py-24 md:py-36 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          index="08"
          kicker="Impact statement · roadmap"
          title={
            <>
              If 10,000 homes sort right, <Serif className="text-lime">a landfill shrinks.</Serif>
            </>
          }
          sub={
            <>
              The prototype's promise, restated as a thesis: behaviour is the cheapest upgrade any
              city's waste system can buy — and AI is how you buy it at scale. Here is what
              changes, and the path to get there.
            </>
          }
        />

        {/* before / after */}
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-5 items-stretch">
          <Reveal>
            <div className="h-full rounded-2xl border border-line bg-pine/60 p-7">
              <p className="font-mono text-[10.5px] tracking-[0.24em] uppercase text-hazard">
                Today · status quo
              </p>
              <ul className="mt-5 space-y-4">
                {BEFORE.map((b) => (
                  <li key={b} className="flex gap-3 text-[13.5px] leading-relaxed text-fog">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-hazard/70" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal className="hidden md:flex items-center">
            <span className="grid place-items-center w-12 h-12 rounded-full bg-lime text-ink shadow-[0_0_34px_rgba(184,243,77,0.35)]">
              <ArrowRight size={19} />
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-lime/30 bg-gradient-to-b from-lime/[0.09] to-transparent p-7">
              <p className="font-mono text-[10.5px] tracking-[0.24em] uppercase text-lime">
                With SwachhAI · the shift
              </p>
              <ul className="mt-5 space-y-4">
                {AFTER.map((a) => (
                  <li key={a} className="flex gap-3 text-[13.5px] leading-relaxed text-mist/90">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-lime" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* big number */}
        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-[26px] border border-line bg-moss/60 px-8 md:px-14 py-12 md:py-16 text-center">
            <div className="dotgrid absolute inset-0 opacity-40" />
            <div className="rings absolute inset-0" />
            <div className="relative">
              <p className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-dim">
                Modelled potential · one city ward of ~10,000 homes
              </p>
              <p className="mt-5 text-[clamp(2.6rem,6.5vw,5rem)] font-medium tracking-tight text-lime leading-none">
                <CountUp to={1560} /> <span className="text-[0.5em] text-mist/80">tonnes</span>
              </p>
              <p className="mt-4 max-w-xl mx-auto text-fog text-[15px] leading-relaxed">
                of waste per year diverted from landfill if the ward adopts guided segregation and
                composting — roughly{" "}
                <span className="text-mist">one garbage truck every single day</span>, retiring
                the confusion tax for good.
              </p>
            </div>
          </div>
        </Reveal>

        {/* roadmap */}
        <div className="mt-14 grid lg:grid-cols-3 gap-4">
          {PHASES.map((p, i) => (
            <Reveal key={p.phase} delay={i * 0.09}>
              <div className="group relative h-full rounded-2xl border border-line bg-pine/70 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-mist/20">
                <span
                  className="absolute top-0 left-7 right-7 h-[2px] rounded-full"
                  style={{ background: p.color }}
                />
                <div className="flex items-center justify-between">
                  <span
                    className="grid place-items-center w-11 h-11 rounded-xl"
                    style={{ background: `${p.color}1a`, color: p.color }}
                  >
                    <p.icon size={18} />
                  </span>
                  <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-dim">
                    {p.window}
                  </span>
                </div>
                <p className="mt-5 font-mono text-[10px] tracking-[0.24em] uppercase" style={{ color: p.color }}>
                  {p.phase}
                </p>
                <h3 className="mt-1 text-xl font-medium">{p.name}</h3>
                <ul className="mt-4 space-y-2.5">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-[12.5px] leading-relaxed text-fog">
                      <span
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                        style={{ background: p.color }}
                      />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* closing thesis */}
        <Reveal className="mt-16 text-center max-w-3xl mx-auto">
          <p className="font-serif italic text-[clamp(1.4rem,2.8vw,2.1rem)] leading-[1.35] text-mist/90">
            "AI will not pick up a single wrapper for us. But it can make the{" "}
            <span className="text-lime">right choice the effortless choice</span> — for every
            home, every ward, every day. That is how small models move mountains of waste."
          </p>
        </Reveal>
      </div>
    </section>
  );
}
