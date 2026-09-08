import {
  ArrowUp,
  CheckCircle2,
  FileText,
  FileDown,
  Play,
  Target,
  Leaf,
  Sparkles,
} from "lucide-react";

function LinkedInGlyph({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}
import { Marquee, Reveal, Serif } from "./ui";

const DELIVERABLES = [
  {
    icon: FileText,
    title: "Project description",
    where: "Sections 01 · 07 · 08",
    items: ["Title + SDG alignment", "Problem & target users", "Responsible AI considerations"],
  },
  {
    icon: Play,
    title: "Working prototype",
    where: "Sections 02 · 03 · 04",
    items: ["Live classifier demo", "RAG assistant walkthrough", "Impact prediction model"],
  },
  {
    icon: Target,
    title: "Impact statement",
    where: "Section 08",
    items: ["Before → after thesis", "Ward-scale potential", "Three-phase rollout"],
  },
];

const TOOLS = [
  "Prompt engineering",
  "Granite-style classification",
  "Retrieval-augmented generation",
  "Entity extraction",
  "Confidence calibration",
  "Impact modelling",
  "React + TypeScript",
];

export default function Footer() {
  const name = "Mohammad Ramish Ansari";
  const college = "University of Lucknow";

  return (
    <footer id="facts" className="relative border-t border-line bg-pine/40 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-20 md:pt-28">
        {/* deliverables mapping */}
        <div className="grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-5">
            <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] uppercase text-lime/80 mb-5">
              <span className="h-px w-10 bg-lime/40" />
              <span>Deliverables · submission-ready</span>
            </div>
            <h2 className="text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.06] font-medium tracking-tight">
              Every requirement, <Serif className="text-lime">live on one page.</Serif>
            </h2>
            <p className="mt-5 text-fog text-[15px] leading-relaxed max-w-md">
              The internship asks for a project description, a working prototype or demo, and an
              impact statement. This site is all three — hosted as one interactive experience, with
              the printable report a click away.
            </p>

            {/* editable facts */}
            <div className="mt-9 rounded-2xl border border-lime/25 bg-moss/60 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} className="text-lime" />
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-fog">
                  Project facts · submission summary
                </span>
              </div>
              <div className="space-y-3.5 text-[13.5px]">
                <p className="text-fog">
                  <span className="text-dim">Project&nbsp;&nbsp;</span> SwachhAI — Guided Waste
                  Intelligence
                </p>
                <p className="text-fog">
                  <span className="text-dim">Student&nbsp;&nbsp;&nbsp;</span>
                  <span className="font-mono text-[12.5px] text-lime">{name}</span>
                </p>
                <p className="text-fog">
                  <span className="text-dim">College&nbsp;&nbsp;&nbsp;</span>
                  <span className="font-mono text-[12.5px] text-lime">{college}</span>
                </p>
                <p className="text-fog">
                  <span className="text-dim">SDG&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{" "}
                  12 (primary) · 11 + 13 (secondary)
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-line/60 flex flex-wrap gap-1.5">
                {TOOLS.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line bg-ink/50 px-2.5 py-1 font-mono text-[9px] tracking-[0.08em] uppercase text-dim"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-5 font-serif italic text-[15px] text-mist/85">
                Prepared by {name.trim() ? <span className="text-lime">{name}</span> : "—"} ·{" "}
                {college.trim() ? <span className="text-lime">{college}</span> : "—"}
              </p>
            </div>

          </Reveal>

          <div className="lg:col-span-7 grid sm:grid-cols-1 gap-4 content-start">
            {DELIVERABLES.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.08}>
                <div className="group flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl border border-line bg-ink/40 p-6 hover:border-lime/30 transition-colors">
                  <div className="flex items-center gap-4 sm:w-64 shrink-0">
                    <span className="grid place-items-center w-11 h-11 rounded-xl bg-lime/10 border border-lime/25 text-lime">
                      <d.icon size={18} />
                    </span>
                    <div>
                      <h3 className="font-medium text-[15px]">{d.title}</h3>
                      <p className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-dim mt-0.5">
                        {d.where}
                      </p>
                    </div>
                  </div>
                  <ul className="grid sm:grid-cols-3 gap-x-4 gap-y-2 flex-1">
                    {d.items.map((it) => (
                      <li key={it} className="flex gap-2 items-start text-[12px] text-fog">
                        <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-lime" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.24}>
              <div className="rounded-2xl border border-line bg-gradient-to-r from-lime/[0.08] to-transparent p-6 flex flex-wrap items-center justify-between gap-4">
                <p className="max-w-md text-[13.5px] leading-relaxed text-mist/85">
                  The complete submission — problem framing, prompt workflows, RAG demo, agent
                  logic, Responsible AI and impact statement — packaged as a print-ready A4 report.
                </p>
                <button
                  onClick={() => window.open(window.location.pathname + "#report", "_blank")}
                  className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-[13px] font-medium text-ink hover:shadow-[0_0_30px_rgba(184,243,77,0.35)] transition-shadow"
                >
                  <FileDown size={15} />
                  Final report · PDF
                </button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* about me */}
        <Reveal className="mt-16 md:mt-20">
          <div className="rounded-[26px] border border-line bg-gradient-to-b from-moss/70 to-pine/60 overflow-hidden">
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-7 p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-line">
                <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] uppercase text-lime/80 mb-6">
                  <span className="h-px w-10 bg-lime/40" />
                  <span>About me</span>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="grid place-items-center w-14 h-14 rounded-2xl bg-lime text-ink font-mono text-[13px] font-medium shrink-0 shadow-[0_0_28px_rgba(184,243,77,0.3)]">
                    MRA
                  </span>
                  <div>
                    <h3 className="text-xl font-medium">Mohammad Ramish Ansari</h3>
                    <p className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-dim mt-1">
                      Computer Science Engineering · University of Lucknow
                    </p>
                  </div>
                </div>
                <div className="space-y-3.5 text-[13px] leading-relaxed text-fog">
                  <p>
                    I&apos;m passionate about{" "}
                    <span className="text-mist">Artificial Intelligence, Machine Learning, Data
                    Engineering and Data Science</span> — and about understanding how raw
                    information becomes intelligent, scalable solutions.
                  </p>
                  <p>
                    My learning journey spans Python, SQL, databases, data processing, machine
                    learning and AI, with a particular interest in building reliable, data-driven
                    systems and applying AI to real-world problems. Through internships and
                    hands-on projects I&apos;ve gained practical exposure to Machine Learning, Data
                    Science, Generative AI, LLMs, RAG, IBM Granite and Agentic AI — working with
                    NumPy, Pandas, Python, SQL and modern AI-assisted development platforms across
                    data-analysis and sustainability-focused AI projects like this one.
                  </p>
                  <p>
                    Alongside, I keep strengthening core computer-science fundamentals — Java, C,
                    DSA, OOPS, Operating Systems and DBMS — because strong fundamentals combined
                    with practical experimentation make a better engineer.
                  </p>
                  <p>
                    I enjoy learning by building — turning ideas into working prototypes,
                    experimenting with new technologies, analyzing problems from different
                    perspectives and continuously improving. My long-term goal is to grow into a
                    strong AI/ML and Data Engineering professional: designing scalable data
                    pipelines, developing intelligent systems, and building technology with
                    meaningful real-world impact.
                  </p>
                </div>
                <p className="mt-6 font-serif italic text-[17px] text-lime">
                  &quot;Learn. Build. Experiment. Improve.&quot;
                </p>
              </div>
              <div className="lg:col-span-5 p-8 md:p-10 bg-ink/30">
                <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-fog mb-3">
                  Focus areas
                </p>
                <div className="flex flex-wrap gap-1.5 mb-7">
                  {["AI/ML", "Generative AI", "LLMs", "RAG", "Agentic AI", "Data Engineering", "Sustainability", "Technical presentation"].map((c) => (
                    <span key={c} className="rounded-full border border-line bg-pine px-2.5 py-1 font-mono text-[9px] tracking-[0.08em] uppercase text-fog">
                      {c}
                    </span>
                  ))}
                </div>
                <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-fog mb-3">
                  Toolkit
                </p>
                <div className="flex flex-wrap gap-1.5 mb-7">
                  {["Python", "SQL", "NumPy", "Pandas", "Java", "C", "DSA", "DBMS"].map((c) => (
                    <span key={c} className="rounded-full border border-line bg-pine px-2.5 py-1 font-mono text-[9px] tracking-[0.08em] uppercase text-dim">
                      {c}
                    </span>
                  ))}
                </div>
                <div className="rounded-xl border border-lime/25 bg-lime/[0.05] p-5">
                  <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-lime mb-2">
                    Build disclosure
                  </p>
                  <p className="text-[12px] leading-relaxed text-mist/85">
                    This project was developed with significant AI assistance — AI-powered tools
                    helped generate and structure the website, support content development, refine
                    the presentation and accelerate prototyping, while design, decisions and
                    direction stayed human.
                  </p>
                </div>
                <a
                  href="https://www.linkedin.com/in/ramish-ansari"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-line bg-pine px-5 py-2.5 text-[12.5px] font-medium text-mist hover:border-lime/60 hover:text-lime transition-colors"
                >
                  <LinkedInGlyph size={14} />
                  linkedin.com/in/ramish-ansari
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* giant outline marquee */}
        <div className="mt-24 -mx-5 md:-mx-8 border-y border-line py-6 overflow-hidden">
          <Marquee fast>
            {["SEGREGATE", "COMPOST", "RECYCLE", "REGENERATE", "SWACHHAI"].map((w, i) => (
              <span key={w} className="flex items-center">
                <span
                  className={`px-8 text-[clamp(3rem,7vw,5.2rem)] font-medium tracking-tight leading-none ${
                    i % 2 === 0 ? "text-stroke-lime" : "text-mist/90"
                  }`}
                >
                  {w}
                </span>
                <Leaf size={26} className="text-lime/50 shrink-0" />
              </span>
            ))}
          </Marquee>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-10">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-lime text-ink">
              <Leaf size={15} strokeWidth={2.4} />
            </span>
            <p className="font-mono text-[10px] leading-relaxed tracking-[0.06em] text-dim max-w-lg">
              Built as the final project for the{" "}
              <span className="text-fog">1M1B AI for Sustainability Virtual Internship</span> — in
              collaboration with IBM SkillsBuild & AICTE. Client-side demo build; figures are
              approximations for framing, with sources cited inline.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="https://www.linkedin.com/in/ramish-ansari"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-2xl border border-line bg-ink/50 pl-2 pr-4 py-2 hover:border-lime/50 transition-colors"
            >
              <span className="grid place-items-center w-9 h-9 rounded-full bg-lime text-ink font-mono text-[10px] font-medium tracking-wide">
                MRA
              </span>
              <span>
                <span className="block text-[12.5px] font-medium text-mist leading-tight">
                  Mohammad Ramish Ansari
                </span>
                <span className="block font-mono text-[8.5px] tracking-[0.08em] uppercase text-dim mt-0.5">
                  University of Lucknow
                </span>
              </span>
              <LinkedInGlyph size={14} className="ml-1 text-dim group-hover:text-lime transition-colors" />
            </a>
            <p className="font-mono text-[9.5px] tracking-[0.05em] text-dim">
              hero artwork · original &nbsp;·&nbsp; field photos · Pexels
            </p>
            <a
              href="#top"
              className="group grid place-items-center w-11 h-11 rounded-full border border-line text-fog hover:text-lime hover:border-lime/50 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={17} className="group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
