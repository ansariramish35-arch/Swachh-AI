import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  ScanSearch,
  MessageCircle,
  CheckCircle2,
  Recycle,
  Sprout,
  Activity,
} from "lucide-react";
import { Marquee, Serif } from "./ui";

const MARQUEE_ITEMS = [
  "GREEN BIN = WET",
  "BLUE BIN = DRY",
  "HAZARDOUS ≠ DUSTBIN",
  "COMPOST, DON'T DUMP",
  "RAG-GROUNDED ANSWERS",
  "SDG 12 · 11 · 13",
  "CLASSIFY IN MILLISECONDS",
];

const SDGS = [
  { code: "SDG 12", name: "Responsible Consumption", hex: "#bf8b2e", primary: true },
  { code: "SDG 11", name: "Sustainable Cities", hex: "#fd9d24", primary: false },
  { code: "SDG 13", name: "Climate Action", hex: "#3f7e44", primary: false },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full bg-lime/10 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 -right-48 w-[520px] h-[520px] rounded-full bg-emer/10 blur-[150px]" />
      <div className="dotgrid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-28 md:pt-36 pb-10 md:pb-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ------------------------- copy ------------------------- */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-2.5"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-lime/35 bg-lime/10 px-3.5 py-1.5 font-mono text-[10.5px] tracking-[0.16em] uppercase text-lime">
                <Sparkles size={12} />
                1M1B × IBM SkillsBuild · AI + Sustainability Internship
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 font-mono text-[10.5px] tracking-[0.16em] uppercase text-dim">
                Student prototype · in collaboration with AICTE
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 text-[clamp(2.7rem,7.2vw,5.9rem)] leading-[0.98] font-medium tracking-[-0.02em]"
            >
              Waste is a <span className="text-stroke">language</span>
              <br />
              <Serif className="text-lime">AI can read fluently.</Serif>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-fog text-base md:text-lg leading-relaxed"
            >
              <span className="text-mist font-medium">SwachhAI</span> classifies any household
              item in milliseconds, answers municipal waste rules through a{" "}
              <span className="text-mist">grounded RAG assistant</span>, and forecasts the carbon
              your family keeps out of landfills — turning the most confusing bin into the easiest
              climate action.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a
                href="#classifier"
                className="group inline-flex items-center gap-2.5 rounded-full bg-lime px-7 py-3.5 font-medium text-[15px] text-ink transition-all hover:shadow-[0_0_44px_rgba(184,243,77,0.4)] hover:-translate-y-0.5"
              >
                <ScanSearch size={18} className="group-hover:rotate-12 transition-transform" />
                Run the classifier
              </a>
              <a
                href="#assistant"
                className="inline-flex items-center gap-2.5 rounded-full border border-line bg-pine/60 px-7 py-3.5 font-medium text-[15px] text-mist hover:border-lime/50 hover:text-lime transition-colors"
              >
                <MessageCircle size={18} />
                Ask the RAG assistant
              </a>
            </motion.div>

            {/* SDG chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.42 }}
              className="mt-10 flex flex-wrap items-center gap-2.5"
            >
              {SDGS.map((s) => (
                <span
                  key={s.code}
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[10.5px] tracking-[0.12em] uppercase ${
                    s.primary
                      ? "border-mist/35 bg-mist/10 text-mist"
                      : "border-line text-dim"
                  }`}
                >
                  <span className="w-2 h-2 rounded-[3px]" style={{ background: s.hex }} />
                  {s.code}
                  <span className="hidden sm:inline opacity-70 normal-case tracking-normal font-display">
                    {s.primary ? "· primary" : ""}
                  </span>
                </span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.55 }}
              className="mt-6 font-mono text-[10px] tracking-[0.18em] uppercase text-dim"
            >
              concept & build ·{" "}
              <a
                href="https://www.linkedin.com/in/ramish-ansari"
                target="_blank"
                rel="noreferrer"
                className="text-fog hover:text-lime transition-colors underline decoration-dotted underline-offset-4"
              >
                Mohammad Ramish Ansari
              </a>{" "}
              · University of Lucknow
            </motion.p>
          </div>

          {/* ------------------------- visual ------------------------- */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
              style={{ y: cardY }}
            >
              <div className="relative rounded-[28px] border border-line bg-moss p-2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]">
                <div className="relative overflow-hidden rounded-[20px] aspect-[4/5]">
                  <motion.img
                    src="images/hero-collage.jpg"
                    alt="Recycled objects overgrown with living green vines — waste returning to nature"
                    className="h-full w-full object-cover"
                    style={{ y: imgY, scale: 1.12 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/20" />

                  {/* top-left classification toast */}
                  <motion.div
                    className="absolute left-4 top-4 flex items-center gap-2.5 rounded-2xl border border-mist/15 bg-ink/80 backdrop-blur-md px-3.5 py-2.5"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <CheckCircle2 size={16} className="text-leaf shrink-0" />
                    <div>
                      <p className="text-[12.5px] font-medium leading-none">PET bottle → Dry</p>
                      <p className="mt-1 font-mono text-[9.5px] text-dim tracking-[0.08em]">
                        confidence 96% · blue bin
                      </p>
                    </div>
                  </motion.div>

                  {/* bottom card */}
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-mist/12 bg-ink/80 backdrop-blur-md p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Recycle size={15} className="text-lime" />
                        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-fog">
                          RAG engine · live
                        </span>
                      </div>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-60" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-lime" />
                      </span>
                    </div>
                    <p className="mt-2.5 text-[13px] text-mist/90 leading-snug font-serif italic">
                      "Chips packets can't be un-layered — send MLP to co-processing, or skip the
                      small pack."
                    </p>
                  </div>
                </div>
              </div>

              {/* floating side chip */}
              <motion.div
                className="absolute -left-6 md:-left-12 top-1/4 hidden sm:flex items-center gap-2 rounded-full border border-line bg-pine/90 backdrop-blur px-4 py-2.5 shadow-xl"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              >
                <Sprout size={15} className="text-emer" />
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-fog">
                  −0.5 kg CO₂e / kg composted
                </span>
              </motion.div>

              <motion.div
                className="absolute -right-4 md:-right-8 bottom-1/4 hidden sm:flex items-center gap-2 rounded-full border border-line bg-pine/90 backdrop-blur px-4 py-2.5 shadow-xl"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              >
                <Activity size={15} className="text-dry" />
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-fog">
                  landfill forecast ↓
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* marquee strip */}
      <div className="relative border-y border-line bg-pine/50 py-4">
        <Marquee>
          {MARQUEE_ITEMS.map((t, i) => (
            <span key={i} className="flex items-center">
              <span
                className={`px-6 font-mono text-[12.5px] tracking-[0.3em] uppercase ${
                  i % 2 === 0 ? "text-mist/85" : "text-stroke"
                }`}
              >
                {t}
              </span>
              <Sparkles size={13} className="text-lime/60 shrink-0" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
