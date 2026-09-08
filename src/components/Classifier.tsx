import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ScanSearch,
  ImagePlus,
  X,
  Check,
  ArrowRight,
  AlertCircle,
  Quote,
  Trash2,
  Cpu,
  Camera,
} from "lucide-react";
import {
  CATEGORIES,
  QUICK_CHIPS,
  SAMPLE_SEARCHES,
  classifyItem,
  type MatchResult,
} from "../lib/wasteData";
import { SectionHead, Serif } from "./ui";

const PIPELINE_STEPS = [
  "Tokenizing & normalizing input",
  "Extracting entities · Granite-style NLP",
  "Matching taxonomy knowledge graph · 95 items",
  "Calibrating confidence score",
  "Composing disposal guidance",
];

type Stage = "idle" | "processing" | "done" | "unknown";

export default function Classifier() {
  const [stage, setStage] = useState<Stage>("idle");
  const [step, setStep] = useState(0);
  const [query, setQuery] = useState("");
  const [activeItem, setActiveItem] = useState("");
  const [result, setResult] = useState<MatchResult | null>(null);
  const [image, setImage] = useState<{ url: string; name: string } | null>(null);
  const timers = useRef<number[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = (raw: string) => {
    const q = raw.trim();
    if (!q) return;
    timers.current.forEach(clearTimeout);
    setQuery(raw);
    setActiveItem(q);
    setStage("processing");
    setStep(0);
    PIPELINE_STEPS.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setStep(i + 1), 400 + i * 380));
    });
    timers.current.push(
      window.setTimeout(() => {
        const res = classifyItem(q);
        setResult(res);
        setStage(res ? "done" : "unknown");
      }, 400 + PIPELINE_STEPS.length * 380 + 250)
    );
  };

  const askAssistant = (q: string) => {
    window.dispatchEvent(new CustomEvent("swachh:ask", { detail: q }));
    document.getElementById("assistant")?.scrollIntoView({ behavior: "smooth" });
  };

  const onFile = (f: File | undefined) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setImage({ url: String(reader.result), name: f.name });
    reader.readAsDataURL(f);
  };

  const cat = result ? CATEGORIES[result.item.category] : null;

  return (
    <section id="classifier" className="relative py-24 md:py-36 scroll-mt-20">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-leaf/[0.05] blur-[130px] rounded-full" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          index="02"
          kicker="Live demo · AI classifier"
          title={
            <>
              Throw <Serif className="text-lime">anything</Serif> at it.
            </>
          }
          sub={
            <>
              Type an item — typos, Hinglish and all — or attach a photo with a short label. The
              pipeline simulates an IBM Granite-style classification workflow: entities → taxonomy
              match → calibrated confidence → actionable guidance.
            </>
          }
        />

        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
          {/* ================= input console ================= */}
          <div className="flex flex-col rounded-[24px] border border-line bg-pine/80 overflow-hidden">
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-hazard/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-sanit/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-lime/70" />
              </div>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dim">
                input console · granite.classify(v0.3)
              </span>
            </div>

            <div className="p-6 md:p-7 flex-1 flex flex-col gap-6">
              {/* image upload */}
              <div>
                {image ? (
                  <div className="relative rounded-2xl overflow-hidden border border-line">
                    <img src={image.url} alt={image.name} className="h-44 w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                    <button
                      onClick={() => setImage(null)}
                      className="absolute top-3 right-3 grid place-items-center w-8 h-8 rounded-full bg-ink/80 border border-line text-mist hover:text-hazard"
                      aria-label="Remove image"
                    >
                      <X size={14} />
                    </button>
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-ink/80 backdrop-blur border border-line px-3 py-1.5">
                      <Camera size={12} className="text-lime" />
                      <span className="font-mono text-[10px] text-fog tracking-wide">
                        frame attached · vision layer mocked
                      </span>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="group w-full rounded-2xl border border-dashed border-mist/20 hover:border-lime/50 bg-ink/40 transition-colors py-8 px-6 flex flex-col items-center gap-2.5"
                  >
                    <span className="grid place-items-center w-12 h-12 rounded-xl bg-fern text-lime group-hover:scale-110 transition-transform">
                      <ImagePlus size={20} />
                    </span>
                    <span className="text-[13.5px] text-mist font-medium">
                      Attach a photo of the item
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.08em] text-dim">
                      multimodal demo · combine with a 2–3 word label below
                    </span>
                  </button>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onFile(e.target.files?.[0])}
                />
              </div>

              {/* label input */}
              <div>
                <label className="font-mono text-[10px] tracking-[0.24em] uppercase text-dim">
                  Describe the item
                </label>
                <div className="mt-2.5 flex gap-2.5">
                  <div className="relative flex-1">
                    <ScanSearch
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-dim"
                    />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && run(query)}
                      placeholder="e.g. doodh ka packet, powerbank, bananna peel…"
                      className="w-full rounded-xl border border-line bg-ink/70 pl-11 pr-4 py-3.5 text-[14.5px] text-mist placeholder:text-dim/70 focus:outline-none focus:border-lime/60 transition-colors"
                    />
                  </div>
                  <button
                    onClick={() => run(query)}
                    disabled={!query.trim() || stage === "processing"}
                    className="rounded-xl bg-lime px-5 font-medium text-[14px] text-ink hover:shadow-[0_0_30px_rgba(184,243,77,0.35)] disabled:opacity-40 disabled:shadow-none transition-all"
                  >
                    Classify
                  </button>
                </div>
              </div>

              {/* quick chips */}
              <div>
                <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dim mb-2.5">
                  Quick test items
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_CHIPS.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setQuery(c);
                        run(c);
                      }}
                      className="rounded-full border border-line bg-ink/50 px-3.5 py-1.5 text-[12px] text-fog hover:text-lime hover:border-lime/50 transition-colors"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-line/60">
                <p className="font-mono text-[10px] leading-relaxed text-dim">
                  <span className="text-fog">try:</span>{" "}
                  {SAMPLE_SEARCHES.join(" · ")}
                  <br />
                  <span className="text-fog">transparency note:</span> vision captioning is mocked
                  in this browser build; the text pipeline below is real logic.
                </p>
              </div>
            </div>
          </div>

          {/* ================= result panel ================= */}
          <div className="relative rounded-[24px] border border-line bg-gradient-to-b from-moss/80 to-pine overflow-hidden min-h-[560px]">
            <div className="dotgrid absolute inset-0 opacity-30" />
            <AnimatePresence mode="wait">
              {/* ---------- idle ---------- */}
              {stage === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative h-full flex flex-col items-center justify-center text-center p-10"
                >
                  <motion.div
                    animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3.4, repeat: Infinity }}
                    className="grid place-items-center w-20 h-20 rounded-2xl border border-lime/30 bg-lime/10 text-lime"
                  >
                    <ScanSearch size={30} />
                  </motion.div>
                  <p className="mt-6 font-mono text-[11px] tracking-[0.3em] uppercase text-dim">
                    awaiting input
                  </p>
                  <p className="mt-3 max-w-xs text-[13.5px] text-fog leading-relaxed">
                    The classifier is standing by. Feed it anything from your bin — it knows{" "}
                    <span className="text-lime font-medium">95 household items</span> across 8
                    waste streams.
                  </p>
                  <div className="mt-8 w-full max-w-sm space-y-2 opacity-70">
                    {["green bin → wet organics", "blue bin → dry recyclables", "sealed → hazardous"].map(
                      (t) => (
                        <div
                          key={t}
                          className="rounded-lg border border-line/70 bg-ink/40 px-4 py-2 font-mono text-[10.5px] tracking-[0.14em] text-dim text-left"
                        >
                          {t}
                        </div>
                      )
                    )}
                  </div>
                </motion.div>
              )}

              {/* ---------- processing ---------- */}
              {stage === "processing" && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative h-full flex flex-col justify-center p-8 md:p-12"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <Cpu size={18} className="text-lime animate-pulse" />
                    <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-fog">
                      pipeline executing · “{activeItem}”
                    </p>
                  </div>
                  <div className="space-y-3">
                    {PIPELINE_STEPS.map((label, i) => {
                      const done = step > i;
                      const active = step === i;
                      return (
                        <div
                          key={label}
                          className={`flex items-center gap-3.5 rounded-xl border px-4 py-3.5 transition-all duration-500 ${
                            done
                              ? "border-lime/30 bg-lime/[0.07]"
                              : active
                                ? "border-mist/25 bg-mist/[0.04]"
                                : "border-line/50 opacity-40"
                          }`}
                        >
                          <span
                            className={`grid place-items-center w-6 h-6 rounded-md border text-[11px] font-mono ${
                              done
                                ? "bg-lime text-ink border-lime"
                                : active
                                  ? "border-lime/60 text-lime"
                                  : "border-line text-dim"
                            }`}
                          >
                            {done ? (
                              <Check size={13} strokeWidth={3} />
                            ) : (
                              String(i + 1).padStart(2, "0")
                            )}
                          </span>
                          <span
                            className={`text-[13px] ${done ? "text-mist" : active ? "text-mist/90" : "text-dim"}`}
                          >
                            {label}
                          </span>
                          {active && (
                            <motion.span
                              className="ml-auto h-1.5 w-14 overflow-hidden rounded-full bg-fern"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              <motion.span
                                className="block h-full w-1/2 rounded-full bg-lime"
                                animate={{ x: ["-100%", "220%"] }}
                                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                              />
                            </motion.span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ---------- done ---------- */}
              {stage === "done" && result && cat && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="relative h-full flex flex-col p-6 md:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dim">
                        classified item
                      </p>
                      <h3 className="mt-1.5 text-2xl md:text-[26px] font-medium capitalize tracking-tight">
                        {result.item.name}
                      </h3>
                    </div>
                    {image && (
                      <img
                        src={image.url}
                        alt="attached frame"
                        className="w-14 h-14 rounded-xl object-cover border border-line"
                      />
                    )}
                  </div>

                  {/* category banner */}
                  <motion.div
                    initial={{ scaleX: 0.92, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="mt-5 rounded-2xl border p-5"
                    style={{ borderColor: `${cat.color}55`, background: cat.soft }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="grid place-items-center w-11 h-11 rounded-xl"
                          style={{ background: `${cat.color}22`, color: cat.color }}
                        >
                          <Trash2 size={19} />
                        </span>
                        <div>
                          <p className="font-semibold text-[16px]" style={{ color: cat.color }}>
                            {cat.label}
                          </p>
                          <p className="text-[12px] text-mist/70">{cat.sub}</p>
                        </div>
                      </div>
                      <span
                        className="rounded-full border px-3.5 py-1.5 font-mono text-[10px] tracking-[0.12em] uppercase"
                        style={{ borderColor: `${cat.color}66`, color: cat.color }}
                      >
                        {cat.bin}
                      </span>
                    </div>
                    {/* confidence */}
                    <div className="mt-4">
                      <div className="flex justify-between font-mono text-[10px] tracking-[0.16em] uppercase">
                        <span className="text-dim">model confidence</span>
                        <span style={{ color: cat.color }}>{result.confidence}%</span>
                      </div>
                      <div className="mt-1.5 h-1.5 rounded-full bg-ink/60 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence}%` }}
                          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full"
                          style={{ background: cat.color }}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* guidance */}
                  <div className="mt-6">
                    <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-dim mb-3">
                      correct disposal protocol
                    </p>
                    <ol className="space-y-2.5">
                      {result.item.guidance.map((g, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.35 + i * 0.1 }}
                          className="flex gap-3 text-[13.5px] leading-relaxed text-mist/90"
                        >
                          <span className="mt-0.5 grid shrink-0 place-items-center w-5 h-5 rounded-md border border-line font-mono text-[10px] text-lime">
                            {i + 1}
                          </span>
                          {g}
                        </motion.li>
                      ))}
                    </ol>
                  </div>

                  {/* fact */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-6 rounded-xl border-l-2 border-lime bg-lime/[0.07] p-4"
                  >
                    <div className="flex gap-2.5">
                      <Quote size={14} className="mt-0.5 shrink-0 text-lime" />
                      <p className="text-[12.5px] leading-relaxed text-mist/85 italic font-serif">
                        {result.item.fact}
                      </p>
                    </div>
                  </motion.div>

                  {/* actions */}
                  <div className="mt-auto pt-6 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() =>
                        askAssistant(`What are the disposal rules for ${result.item.name}?`)
                      }
                      className="inline-flex items-center gap-2 rounded-full bg-mist text-ink px-5 py-2.5 text-[13px] font-medium hover:bg-lime transition-colors"
                    >
                      Ask the assistant about this
                      <ArrowRight size={14} />
                    </button>
                    {result.alternatives.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-dim mr-1">
                          did you mean
                        </span>
                        {result.alternatives.map((a) => (
                          <button
                            key={a.name}
                            onClick={() => {
                              setQuery(a.name);
                              run(a.name);
                            }}
                            className="rounded-full border border-line px-2.5 py-1 text-[11px] text-fog hover:text-lime hover:border-lime/50 transition-colors"
                          >
                            {a.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* ---------- unknown ---------- */}
              {stage === "unknown" && (
                <motion.div
                  key="unknown"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="relative h-full flex flex-col items-center justify-center text-center p-10"
                >
                  <span className="grid place-items-center w-16 h-16 rounded-2xl border border-sanit/40 bg-sanit/10 text-sanit">
                    <AlertCircle size={26} />
                  </span>
                  <h3 className="mt-5 text-xl font-medium">Outside the demo's knowledge graph</h3>
                  <p className="mt-3 max-w-sm text-[13.5px] text-fog leading-relaxed">
                    “{activeItem}” isn't among the 95 curated items. Instead of hallucinating, the
                    system flags uncertainty —{" "}
                    <span className="text-mist">a deliberate responsible-AI choice</span>. The RAG
                    assistant may still have grounded guidance.
                  </p>
                  <button
                    onClick={() => askAssistant(`How should I dispose of ${activeItem}?`)}
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-[13.5px] font-medium text-ink hover:shadow-[0_0_30px_rgba(184,243,77,0.35)] transition-shadow"
                  >
                    Ask the RAG assistant instead
                    <ArrowRight size={15} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-6 max-w-3xl font-mono text-[10.5px] leading-relaxed tracking-[0.04em] text-dim">
          * Classifications follow Indian SWM Rules 2016 conventions: wet (green), dry (blue),
          hazardous & sanitary (wrapped, separate). Local municipal rules take precedence — always
          verify with your urban local body.
        </p>
      </div>
    </section>
  );
}
