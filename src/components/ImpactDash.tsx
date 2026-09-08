import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Recycle, Wind, TreePine, Car, Gauge, PieChart, SlidersHorizontal, Building } from "lucide-react";
import { computeImpact, fmt, type HouseholdInputs, type PlanFlags } from "../lib/impact";
import { CountUp, Reveal, SectionHead, Serif } from "./ui";

const SCALES = [
  { key: "home", label: "Home", mult: 1, icon: null },
  { key: "block", label: "Apartment block ×100", mult: 100, icon: null },
  { key: "ward", label: "City ward ×2,000", mult: 2000, icon: Building },
];

function Toggle({
  on,
  onChange,
  label,
  hint,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint: string;
}) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`w-full flex items-center gap-3.5 rounded-xl border px-4 py-3.5 text-left transition-all ${
        on ? "border-lime/50 bg-lime/[0.08]" : "border-line bg-ink/40 hover:border-mist/25"
      }`}
    >
      <span
        className={`relative h-5 w-10 shrink-0 rounded-full border transition-colors ${
          on ? "bg-lime border-lime" : "bg-fern border-line"
        }`}
      >
        <motion.span
          layout
          className={`absolute top-0.5 h-3.5 w-3.5 rounded-full ${on ? "bg-ink" : "bg-dim"}`}
          animate={{ x: on ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
        />
      </span>
      <span>
        <span className={`block text-[13px] font-medium ${on ? "text-mist" : "text-fog"}`}>
          {label}
        </span>
        <span className="block text-[11px] text-dim mt-0.5">{hint}</span>
      </span>
    </button>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  onChange: (v: number) => void;
  hint?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[13px] text-fog">{label}</span>
        <span className="font-mono text-[13px] text-lime">
          {value}
          <span className="text-dim text-[10px] ml-1">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      {hint && <p className="mt-1.5 font-mono text-[9.5px] text-dim">{hint}</p>}
    </div>
  );
}

export default function ImpactDash() {
  const [inp, setInp] = useState<HouseholdInputs>({
    people: 4,
    weeklyWaste: 13,
    segregation: 30,
    composting: 10,
  });
  const [plan, setPlan] = useState<PlanFlags>({ segregate: true, compost: true, recycle: true });
  const [scale, setScale] = useState(1);

  const r = useMemo(() => computeImpact(inp, plan), [inp, plan]);
  const scaled = (kg: number) => kg * scale;

  /* ---------- area chart geometry ---------- */
  const W = 620, H = 210, PAD = 8;
  const maxV = Math.max(...r.monthly.map((m) => m.plan), 1);
  const px = (i: number) => PAD + (i * (W - PAD * 2)) / 11;
  const py = (v: number) => H - PAD - (v / maxV) * (H - PAD * 2);
  const linePath = (key: "plan" | "baseline") =>
    r.monthly.map((m, i) => `${i === 0 ? "M" : "L"}${px(i)},${py(m[key])}`).join(" ");
  const areaPath = `${linePath("plan")} L${px(11)},${H - PAD} L${px(0)},${H - PAD} Z`;

  /* ---------- donut geometry ---------- */
  const C = 2 * Math.PI * 42;
  const DONUT = [
    { label: "Organic", pct: 55, color: "#8bd94b" },
    { label: "Dry recyclable", pct: 25, color: "#62c6ff" },
    { label: "Reject", pct: 20, color: "#5c6f63" },
  ];

  const KPIS = [
    {
      icon: Recycle,
      color: "#b8f34d",
      label: "New diversion / year",
      value: scaled(r.deltaDiverted),
      fmtv: (n: number) => (n >= 1000 ? (n / 1000).toFixed(1) + " t" : fmt(Math.round(n)) + " kg"),
      sub: "fresh waste kept out of landfill",
    },
    {
      icon: Wind,
      color: "#62c6ff",
      label: "CO₂e avoided / year",
      value: scaled(r.deltaCO2),
      fmtv: (n: number) => (n >= 1000 ? (n / 1000).toFixed(1) + " t" : fmt(Math.round(n)) + " kg"),
      sub: "methane + virgin production avoided",
    },
    {
      icon: TreePine,
      color: "#57d97b",
      label: "Tree equivalent",
      value: scaled(r.trees),
      fmtv: (n: number) => fmt(Math.round(n)) + " trees",
      sub: "absorbing the same CO₂ annually",
    },
    {
      icon: Car,
      color: "#ffb35c",
      label: "Driving offset",
      value: scaled(r.carKm),
      fmtv: (n: number) => (n >= 10000 ? fmt(Math.round(n / 1000)) + "k km" : fmt(Math.round(n)) + " km"),
      sub: "of petrol-car emissions cancelled",
    },
  ];

  return (
    <section id="impact" className="relative py-24 md:py-36 scroll-mt-20">
      <div className="pointer-events-none absolute top-0 -right-40 w-[520px] h-[520px] rounded-full bg-lime/[0.06] blur-[140px]" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          index="04"
          kicker="Live demo · impact predictor"
          title={
            <>
              Turn <Serif className="text-lime">good intentions</Serif> into atoms of evidence.
            </>
          }
          sub={
            <>
              A transparent, coefficient-based model: describe your household, flip the behaviour
              switches, and watch the 12-month landfill, carbon and tree-equivalent forecasts
              respond. Every assumption is published below the charts.
            </>
          }
        />

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* ---------------- controls ---------------- */}
          <Reveal className="lg:col-span-5">
            <div className="rounded-[24px] border border-line bg-pine/80 p-6 md:p-7">
              <div className="flex items-center gap-2.5 mb-6">
                <SlidersHorizontal size={16} className="text-lime" />
                <span className="font-mono text-[10.5px] tracking-[0.24em] uppercase text-fog">
                  Your household profile
                </span>
              </div>

              <div className="space-y-6">
                <Slider
                  label="Household members"
                  value={inp.people}
                  min={1}
                  max={10}
                  unit="people"
                  onChange={(v) => setInp({ ...inp, people: v })}
                />
                <Slider
                  label="Total waste generated"
                  value={inp.weeklyWaste}
                  min={3}
                  max={45}
                  unit="kg / week"
                  onChange={(v) => setInp({ ...inp, weeklyWaste: v })}
                  hint={`≈ ${(inp.weeklyWaste / inp.people / 7).toFixed(2)} kg/day per person · urban India avg ~0.4`}
                />
                <Slider
                  label="Currently segregate at source"
                  value={inp.segregation}
                  min={0}
                  max={100}
                  unit="%"
                  onChange={(v) => setInp({ ...inp, segregation: v })}
                />
                <Slider
                  label="Currently compost organics"
                  value={inp.composting}
                  min={0}
                  max={100}
                  unit="%"
                  onChange={(v) => setInp({ ...inp, composting: v })}
                />
              </div>

              <div className="mt-7 pt-6 border-t border-line/70 space-y-2.5">
                <p className="font-mono text-[10.5px] tracking-[0.24em] uppercase text-fog mb-3">
                  Adopt the SwachhAI plan
                </p>
                <Toggle
                  on={plan.segregate}
                  onChange={(v) => setPlan({ ...plan, segregate: v })}
                  label="95% source segregation"
                  hint="green / blue / red-black streams always"
                />
                <Toggle
                  on={plan.compost}
                  onChange={(v) => setPlan({ ...plan, compost: v })}
                  label="Compost all organics"
                  hint="home compost, community pit or wet-waste pickup"
                />
                <Toggle
                  on={plan.recycle}
                  onChange={(v) => setPlan({ ...plan, recycle: v })}
                  label="Recycle 85% of dry stream"
                  hint="rinsed, dried, flattened — MRF-ready"
                />
              </div>

              <div className="mt-7 pt-6 border-t border-line/70">
                <p className="font-mono text-[10.5px] tracking-[0.24em] uppercase text-fog mb-3">
                  Scale the outcome
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {SCALES.map((s) => (
                    <button
                      key={s.key}
                      onClick={() => setScale(s.mult)}
                      className={`rounded-xl border px-2 py-2.5 text-center transition-all ${
                        scale === s.mult
                          ? "border-lime bg-lime text-ink"
                          : "border-line text-fog hover:border-mist/30"
                      }`}
                    >
                      <span className="block text-[11.5px] font-medium leading-tight">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* ---------------- results ---------------- */}
          <div className="lg:col-span-7 space-y-6">
            {/* KPI grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {KPIS.map((k, i) => (
                <Reveal key={k.label} delay={i * 0.06}>
                  <div className="rounded-2xl border border-line bg-moss/70 p-5 hover:border-mist/20 transition-colors">
                    <div className="flex items-center justify-between">
                      <span
                        className="grid place-items-center w-9 h-9 rounded-lg"
                        style={{ background: `${k.color}1c`, color: k.color }}
                      >
                        <k.icon size={16} />
                      </span>
                      <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-dim">
                        {k.label}
                      </span>
                    </div>
                    <p className="mt-3.5 text-[26px] font-medium tracking-tight" style={{ color: k.color }}>
                      <CountUp to={k.value} duration={900} format={k.fmtv} />
                    </p>
                    <p className="mt-1 text-[11.5px] text-dim">{k.sub}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* chart + gauge + donut */}
            <div className="grid md:grid-cols-5 gap-4">
              {/* area chart */}
              <Reveal className="md:col-span-3">
                <div className="rounded-2xl border border-line bg-pine/70 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-dim">
                        Cumulative diversion · 12 months
                      </span>
                    </div>
                    <div className="flex items-center gap-4 font-mono text-[9px] text-dim">
                      <span className="flex items-center gap-1.5">
                        <span className="h-0.5 w-4 bg-dim inline-block" /> today
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-0.5 w-4 bg-lime inline-block" /> with SwachhAI
                      </span>
                    </div>
                  </div>
                  <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
                    <defs>
                      <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#b8f34d" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#b8f34d" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>
                    {[0.25, 0.5, 0.75].map((f) => (
                      <line
                        key={f}
                        x1={PAD}
                        x2={W - PAD}
                        y1={H * f}
                        y2={H * f}
                        stroke="rgba(233,242,228,0.06)"
                        strokeDasharray="2 6"
                      />
                    ))}
                    <motion.path
                      d={areaPath}
                      fill="url(#areaFill)"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3 }}
                    />
                    <motion.path
                      d={linePath("baseline")}
                      fill="none"
                      stroke="#6b8271"
                      strokeWidth="1.6"
                      strokeDasharray="3 5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4 }}
                    />
                    <motion.path
                      d={linePath("plan")}
                      fill="none"
                      stroke="#b8f34d"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, ease: "easeInOut" }}
                    />
                    {r.monthly.map((m, i) => (
                      <circle key={m.month} cx={px(i)} cy={py(m.plan)} r="2.4" fill="#b8f34d" />
                    ))}
                    <text x={px(11) - 6} y={py(r.monthly[11].plan) - 10} textAnchor="end" fill="#b8f34d" fontSize="11" fontFamily="IBM Plex Mono">
                      {fmt(Math.round(scaled(r.monthly[11].plan)))} kg
                    </text>
                  </svg>
                  <p className="mt-1 font-mono text-[9px] text-dim">
                    values shown at selected scale · seasonal household curve applied
                  </p>
                </div>
              </Reveal>

              {/* gauge + donut */}
              <Reveal delay={0.08} className="md:col-span-2 space-y-4">
                <div className="rounded-2xl border border-line bg-pine/70 p-5 flex items-center gap-5">
                  <div className="relative">
                    <svg width="92" height="92" viewBox="0 0 92 92" className="-rotate-90">
                      <circle cx="46" cy="46" r="40" fill="none" stroke="#16241a" strokeWidth="9" />
                      <motion.circle
                        cx="46"
                        cy="46"
                        r="40"
                        fill="none"
                        stroke="#b8f34d"
                        strokeWidth="9"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 40}
                        initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                        whileInView={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - r.score / 100) }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="text-center">
                        <CountUp to={r.score} duration={1000} className="text-2xl font-medium text-lime" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-fog">
                      <Gauge size={13} />
                      <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase">Swachh score</span>
                    </div>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-dim">
                      landfill burden cut by{" "}
                      <span className="text-lime font-medium">{r.landfillCutPct}%</span> vs your
                      current routine
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-line bg-pine/70 p-5">
                  <div className="flex items-center gap-1.5 text-fog mb-4">
                    <PieChart size={13} />
                    <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase">
                      Typical composition
                    </span>
                  </div>
                  <div className="flex items-center gap-5">
                    <svg width="86" height="86" viewBox="0 0 100 100" className="-rotate-90 shrink-0">
                      {(() => {
                        let offset = 0;
                        return DONUT.map((d) => {
                          const frac = d.pct / 100;
                          const el = (
                            <circle
                              key={d.label}
                              cx="50"
                              cy="50"
                              r="42"
                              fill="none"
                              stroke={d.color}
                              strokeWidth="13"
                              strokeDasharray={`${frac * C} ${C}`}
                              strokeDashoffset={-offset}
                            />
                          );
                          offset += frac * C;
                          return el;
                        });
                      })()}
                    </svg>
                    <div className="space-y-2">
                      {DONUT.map((d) => (
                        <div key={d.label} className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: d.color }} />
                          <span className="text-[11.5px] text-fog">{d.label}</span>
                          <span className="ml-auto font-mono text-[10px] text-dim">{d.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* coefficient disclosure */}
            <Reveal>
              <div className="rounded-2xl border border-line/70 bg-ink/40 px-5 py-4">
                <p className="font-mono text-[9.5px] leading-relaxed tracking-[0.02em] text-dim">
                  <span className="text-fog">transparency · model coefficients —</span> composting
                  avoids 0.47 kg CO₂e/kg (landfill methane); mixed dry recycling 1.1 kg CO₂e/kg
                  (vs virgin material); 1 mature tree ≈ 21 kg CO₂/yr; petrol car ≈ 0.192 kg CO₂/km.
                  Composition priors: 55% organic / 25% dry / 20% reject (typical urban Indian
                  household). Estimates are directional, for motivation — not carbon credit
                  accounting.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
