import type { ReactNode } from "react";
import {
  ArrowLeft,
  FileDown,
  Leaf,
  CheckCircle2,
  Award,
  Scale,
  Eye,
  ShieldAlert,
  Lock,
} from "lucide-react";

/* ================= theme ================= */
const GREEN = "#2f7a3d";
const INKTXT = "#182019";
const BODY = "#3a473c";
const MUTED = "#6a786b";
const BORDER = "#dfe6dc";
const ZEBRA = "#fafcf8";
const HEADBG = "#f0f4ec";
const BOXBG = "#f6faf2";
const BOBORDER = "#cfe0c6";

/* ================= atoms ================= */
function Val({ children, mono = false }: { children: ReactNode; mono?: boolean }) {
  return (
    <p
      className={`text-[13px] ${mono ? "font-mono text-[10.5px] break-all leading-snug font-normal" : "font-semibold"}`}
      style={{ color: "#182019" }}
    >
      {children}
    </p>
  );
}

const Label = ({ children }: { children: ReactNode }) => (
  <p className="font-mono text-[8.5px] tracking-[0.22em] uppercase mb-1" style={{ color: MUTED }}>
    {children}
  </p>
);

const P = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <p className={`text-[11.8px] leading-[1.78] ${className}`} style={{ color: BODY }}>
    {children}
  </p>
);

function PartBand({ n, title, blurb }: { n: string; title: string; blurb: string }) {
  return (
    <div
      className="px-8 md:px-12 py-7 print:[print-color-adjust:exact]"
      style={{ background: GREEN }}
    >
      <p className="font-mono text-[9px] tracking-[0.32em] uppercase text-white/70">{n}</p>
      <h2 className="mt-1.5 text-[26px] md:text-[30px] font-semibold tracking-tight text-white leading-tight">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-[11.5px] leading-relaxed text-white/85">{blurb}</p>
    </div>
  );
}

function Sub({ id, title }: { id: string; title: string }) {
  return (
    <div className="mt-9 mb-4 first:mt-0">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[10px] tracking-[0.14em] font-medium" style={{ color: GREEN }}>
          {id}
        </span>
        <h3 className="text-[16.5px] font-semibold tracking-tight" style={{ color: INKTXT }}>
          {title}
        </h3>
      </div>
      <div className="mt-2 h-px w-full" style={{ background: BORDER }} />
    </div>
  );
}

function DataTable({
  head,
  rows,
  widths,
}: {
  head: string[];
  rows: ReactNode[][];
  widths?: string[];
}) {
  return (
    <div className="border rounded-md overflow-hidden break-inside-avoid" style={{ borderColor: BORDER }}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="print:[print-color-adjust:exact]" style={{ background: HEADBG }}>
            {head.map((h, i) => (
              <th
                key={h}
                style={widths?.[i] ? { width: widths[i] } : undefined}
                className="px-4 py-2.5 font-mono text-[8.5px] tracking-[0.16em] uppercase"
              >
                <span style={{ color: MUTED }}>{h}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr
              key={ri}
              className="print:[print-color-adjust:exact]"
              style={{ background: ri % 2 ? ZEBRA : "#ffffff" }}
            >
              {r.map((c, ci) => (
                <td
                  key={ci}
                  className="px-4 py-3 text-[11.2px] leading-relaxed align-top border-t"
                  style={{ borderColor: "#e4ebe0", color: ci === 0 ? INKTXT : BODY, fontWeight: ci === 0 ? 600 : 400 }}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Check({ children }: { children: ReactNode }) {
  return (
    <p className="flex gap-2 text-[11.3px] leading-relaxed" style={{ color: BODY }}>
      <CheckCircle2 size={13} className="mt-0.5 shrink-0" style={{ color: GREEN }} />
      <span>{children}</span>
    </p>
  );
}

function CodeBlock({ children, title }: { children: string; title: string }) {
  return (
    <div className="border rounded-md overflow-hidden break-inside-avoid" style={{ borderColor: BORDER }}>
      <div
        className="px-4 py-2 border-b font-mono text-[8.5px] tracking-[0.18em] uppercase print:[print-color-adjust:exact]"
        style={{ background: HEADBG, borderColor: BORDER, color: MUTED }}
      >
        {title}
      </div>
      <pre
        className="px-4 py-3.5 font-mono text-[9.3px] leading-[1.75] whitespace-pre-wrap break-inside-avoid print:[print-color-adjust:exact]"
        style={{ background: "#f7faf4", color: "#27331f" }}
      >
        {children}
      </pre>
    </div>
  );
}

function FlowDiag({
  nodes,
  caption,
}: {
  nodes: { n: string; t: string; d: string }[];
  caption: string;
}) {
  return (
    <div className="break-inside-avoid">
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
        {nodes.map((p, i) => (
          <div key={p.n} className="relative">
            <div
              className="h-full border rounded-md p-3 print:[print-color-adjust:exact]"
              style={{ borderColor: BOBORDER, background: BOXBG }}
            >
              <p className="font-mono text-[8px] tracking-[0.16em]" style={{ color: GREEN }}>
                {p.n}
              </p>
              <p className="mt-1 text-[10.6px] font-semibold leading-tight" style={{ color: INKTXT }}>
                {p.t}
              </p>
              <p className="mt-0.5 text-[8.4px] leading-snug" style={{ color: "#5f6d61" }}>
                {p.d}
              </p>
            </div>
            {i < nodes.length - 1 && (
              <span
                className="hidden sm:block absolute -right-[8px] top-1/2 -translate-y-1/2 z-10 text-[11px]"
                style={{ color: GREEN }}
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-2.5 font-mono text-[8.3px] tracking-[0.06em] italic" style={{ color: MUTED }}>
        {caption}
      </p>
    </div>
  );
}

/* ================= content data ================= */
const ROOT_CAUSES = [
  ["'One bag for everything' at home", "Residents lack per-item knowledge at the exact 5-second decision moment", "Field interviews; ~30% national source-segregation rates"],
  ["Recyclables rejected at the MRF", "Wet waste soaks dry recyclables — oil & food residue is the #1 contamination cause", "MRF operations guidance (MoHUA); facility worker accounts"],
  ["Sanitation worker injuries", "Sharps, CFL mercury and batteries hidden unmarked inside mixed bags", "Worker interviews: needle injuries described as 'routine'"],
  ["Landfill methane emissions", "50–60% of household waste is organic; unsegregated it rots anaerobically", "Composition priors (CPCB practice); IPCC AR6 methane data"],
];

const SDG_ROWS = [
  [
    <span key="a" className="inline-flex items-center gap-2">
      <span className="w-3 h-3 rounded-[3px] inline-block print:[print-color-adjust:exact]" style={{ background: "#BF8B2E" }} />
      SDG 12 — Responsible Consumption & Production
    </span>,
    "Target 12.5 — by 2030, substantially reduce waste generation through prevention, reduction, recycling and reuse.",
    "Primary. The classifier, RAG assistant and composting/rinse protocols directly raise prevention, recycling and reuse behaviour.",
  ],
  [
    <span key="b" className="inline-flex items-center gap-2">
      <span className="w-3 h-3 rounded-[3px] inline-block print:[print-color-adjust:exact]" style={{ background: "#FD9D24" }} />
      SDG 11 — Sustainable Cities & Communities
    </span>,
    "Target 11.6 — reduce the adverse per capita environmental impact of cities, with special attention to air quality and waste management.",
    "Secondary. Cleaner waste streams plus ward-level stream analytics improve municipal waste management and cut dumpsite/burning pollution.",
  ],
  [
    <span key="c" className="inline-flex items-center gap-2">
      <span className="w-3 h-3 rounded-[3px] inline-block print:[print-color-adjust:exact]" style={{ background: "#3F7E44" }} />
      SDG 13 — Climate Action
    </span>,
    "Target 13.3 — improve education, awareness-raising and human capacity on climate change mitigation and adaptation.",
    "Secondary. Explains landfill methane in plain language and converts behaviour into visible CO₂e numbers per family.",
  ],
];

const MODULES = [
  [
    "M1 · Waste Classifier",
    "Multimodal input (text (Hinglish/typos OK) + photo with label) → entity extraction → 8-stream taxonomy match → calibrated confidence → stepwise disposal protocol + impact fact.",
    "Granite-style few-shot classification over a 95-item curated knowledge graph; deterministic fallback matcher; confidence calibrated and always displayed.",
    "'bananna peel' → Wet/compost (89%) · 'tube light' → Domestic hazard (94%)",
  ],
  [
    "M2 · Rule Assistant (RAG)",
    "Natural-language question → corpus retrieval → sentence re-rank → grounded answer with citations → explicit refusal when evidence is thin.",
    "Retrieval-Augmented Generation over a 20-document corpus (SWM Rules 2016, E-Waste/Battery Rules 2022, CPCB, MoHUA, BIS). No grounding → no answer.",
    "'Where do old batteries go?' → cited answer from Battery Rules 2022 passages",
  ],
  [
    "M3 · Impact Forecaster",
    "Household sliders (size, kg/wk, segregation %, composting %) + plan toggles → 12-month diversion, CO₂e, tree & driving equivalents; scales to ward level.",
    "Transparent coefficient model (0.47 kg CO₂e/kg composted; 1.1 kg CO₂e/kg dry-recycled; 21 kg/yr/tree) — deliberately not a black-box ML model, for explainability.",
    "Family of 4, 13 kg/wk: ~435 kg/yr new diversion ≈ 268 kg CO₂e avoided",
  ],
];

const PERSONAS = [
  ["P1 · Urban homemaker / household head", "Manages daily kitchen & household disposal; time-poor at the bin.", "Instant per-item answers; family 'what changed this month' card from the forecaster.", "Correct-sort rate per household audit"],
  ["P2 · College student / hosteller", "Shared rooms & bins, almost no storage space for segregated waste.", "Quick-pick chips for hostel items (maggi cups, chargers, notebooks); compact audit method.", "Weekly active use; hostel mixed-waste reduction"],
  ["P3 · Sanitation worker (formal & informal)", "Handles unmarked sharps, acids, broken glass barehanded daily.", "Sharper resident-side protocols: wrap, mark, hand separately — guidance written for the generator, protecting the handler.", "Injury/exposure incidents per 1,000 shifts"],
  ["P4 · ULB / ward waste operations", "Contaminated loads make recycling financially unviable; zero stream-level data.", "Cleaner inbound streams; Phase-3 anonymized stream analytics for routing, MRF planning, user-charge design.", "Dry-stream purity %; MRF rejection rate"],
];

const RAI_DETAIL = [
  {
    icon: Scale,
    t: "Fairness",
    points: [
      "Language inclusion: accepts Hinglish, transliteration and misspellings — low digital English is never a barrier to correct disposal.",
      "No income-coded assumptions: shared bins, rented rooms and informal-settlement realities are modelled as first-class scenarios.",
      "Dignity framing: sanitation workers are treated as beneficiaries to protect, not as subjects to monitor or police.",
      "Knowledge base balanced across all 8 streams so affluent 'e-waste' questions and poor-household 'cloth reuse' questions get equal depth.",
    ],
  },
  {
    icon: Eye,
    t: "Transparency",
    points: [
      "Every classification surfaces its confidence score — a 72% answer looks different from a 96% answer.",
      "Every assistant answer lists the exact passages retrieved, with source name and relevance strength.",
      "Mocked layers are labelled as mocked in the UI itself (e.g., 'vision captioning mocked in this demo build').",
      "All impact coefficients and composition priors are published beneath the dashboard and in this report.",
    ],
  },
  {
    icon: ShieldAlert,
    t: "Ethics",
    points: [
      "Honest-refusal contract: below the grounding threshold the system says 'I don't know — please rephrase' instead of fabricating waste rules.",
      "Human safety outranks recycling purity in guidance (mercury bulbs, syringes, batteries, acids).",
      "No shame-based mechanics, guilt scores or public ranking; nudges are factual, kind and opt-in.",
      "No greenwashing: numbers are stated as directional estimates, never marketed as verified offsets.",
    ],
  },
  {
    icon: Lock,
    t: "Privacy",
    points: [
      "Demo build executes 100% client-side: zero uploads, zero storage, zero cookies/tracking.",
      "Photos never leave the device; the forecaster asks only quantities and percentages — never names, addresses or IDs.",
      "Phase-3 analytics designed as aggregate-only (ward minimum cohorts), with no household-level surveillance.",
      "Production deployment inherits the same data-minimization contract by design, not as a patch.",
    ],
  },
];

const SYSTEM_CARD = [
  ["System task", "Waste-stream classification + grounded question answering + impact forecasting for Indian households"],
  ["Model class", "IBM Granite-style small LLM (few-shot prompted) + deterministic post-processing; retrieval index over curated corpus"],
  ["Knowledge base", "95-item taxonomy (8 streams) · 20-document policy/science corpus"],
  ["Data provenance", "Public documents only: SWM Rules 2016 · E-Waste Rules 2022 · Battery Rules 2022 · C&D Rules 2016 · Plastic Waste Amendment 2021 · CPCB notes · MoHUA SBM-U guidance · BIS plastic codes"],
  ["Known limits", "Built for India-urban context; municipal bylaws vary and take precedence; 95-item demo scope; vision captioning mocked in demo build"],
  ["Intended use", "Educational decision support & habit formation — not regulatory compliance determination"],
  ["Failure behaviour", "Returns 'unknown / please rephrase' instead of inventing rules; hazard cases always append 'verify with your municipal body'"],
  ["Human oversight", "Required for hazardous-waste handling and any compliance decision; guidance is advisory"],
  ["Review cadence", "Taxonomy & corpus refresh quarterly; bias/misuse regression checks at every release"],
];

const IMPACT_NUMBERS = [
  ["1 household, full adoption (4 people · 13 kg/wk)", "≈ 435 kg/yr newly diverted · ≈ 268 kg CO₂e avoided", "≈ 13 trees' annual absorption · ≈ 1,400 petrol km offset"],
  ["1 hostel block (100 students)", "≈ 2.8 t/yr diverted from one building", "cleaner shared bins; fewer pest/odour complaints"],
  ["1 ward, ~36% of 10,000 homes adopt", "≈ 1,560 t/yr diverted (≈ 1 truck/day)", "measurable ward-level methane avoidance; safer worker flows"],
  ["City material recovery facility", "higher dry-stream purity → better bale prices", "recycling economics improve without new hardware"],
];

const SDG_TARGETS_EXTRA = "Tangential contributions: SDG 8.8 (safer work for informal-sector waste handlers) and SDG 3 (reduced exposure to dumpsite toxins & burning).";

/* ---------- Part 2 data ---------- */
const CLASSIFIER_SYSTEM_PROMPT = `[SYSTEM — SwachhAI classifier | granite-class small LLM | few-shot]
You are SwachhAI, a municipal solid-waste assistant for Indian households.
INPUT : an item description in any language/romanization; may contain
        typos or a photo caption stub.
TASK  : 1. Extract <item_name> and <material_clues>.
        2. Map to EXACTLY ONE stream from:
           wet | dry | ewaste | hazard | sanit | textil | debris | reject
           (streams follow Solid Waste Management Rules, 2016).
        3. Calibrate confidence (0-100). Below 75 → set stream="unknown".
        4. Produce steps[] (max 4, imperative, worker-safety first) and
           one fact citing scale or material truth.
RULES : - NEVER guess when unsure; "unknown" triggers the refusal path.
        - NEVER shame the user; tone is factual and encouraging.
        - Hazard/sharps instructions must mention wrap-mark-separate.
OUTPUT: strict JSON only →
{ "item": str, "material_clues": [str], "stream": str,
  "confidence": int, "steps": [str], "fact": str }`;

const CLASSIFIER_IO_EXAMPLE = `[INPUT]
"doodh ka packet"            ← Hinglish, unformalized

[MODEL OUTPUT]               ← parsed & rendered as the guidance card
{
  "item": "milk pouch",
  "material_clues": ["LDPE film", "single-layer", "liquid contact"],
  "stream": "dry",
  "confidence": 92,
  "steps": [
    "Cut open fully and rinse — residue gets batches rejected",
    "Sun-dry to prevent odour and mould",
    "Bundle pouches together so sorters don't miss them",
    "Hand over with dry waste (blue bin) or kabadiwala"
  ],
  "fact": "Milk pouches are pure LDPE — genuinely recyclable,
           but only when rinsed and dry."
}`;

const RAG_PROMPT_TEMPLATE = `[SYSTEM — SwachhAI grounded assistant | RAG compose stage]
Answer ONLY from the RETRIEVED PASSAGES below. Do not use outside
knowledge. If the passages do not contain the answer, output the
REFUSAL TEMPLATE and suggest 2 closer questions from the corpus.

STYLE : warm, precise, max 4 short points. Cite every claim in-line
as [n] against the passage list. Never invent rules or numbers.

RETRIEVED PASSAGES
[1] {chunk_1.title} :: {chunk_1.sentences}
[2] {chunk_2.title} :: {chunk_2.sentences}
[3] {chunk_3.title} :: {chunk_3.sentences}

QUESTION: {user_question}`;

const NUDGE_PROMPT = `[SYSTEM — weekly nudge agent (phase-2 roadmap feature)]
Using this household's week: {diverted_kg, delta_co2e, misses[]},
write ONE 40-character-max nudge. Rules: no guilt, no shaming,
celebrate the delta, suggest exactly one fixable miss. Output text only.`;

const RAG_RETRIEVAL_EXAMPLE = [
  ["1", "Battery take-back rules — Battery Waste Management Rules 2022", "0.41", "Tape lithium terminals; store leak-proof; retail take-back boxes; EPR on producers; fire risk of swollen cells"],
  ["2", "Domestic hazardous waste — SWM 2016 schedule guidance", "0.29", "Batteries listed as household hazardous; must not enter general bins; store safely, use drives/take-back"],
  ["3", "E-waste handling & EPR — E-Waste Rules 2022", "0.18", "Related devices context; authorised recycler route; data-wipe guidance"],
];

const RAG_FINAL_ANSWER = `"Old batteries must never go in any dustbin — they are domestic hazardous waste [2]. Tape the terminals of lithium cells, keep them in a leak-proof container, and return them through retail take-back boxes or authorised collection under the Battery Waste Management Rules 2022 [1]. Swollen or damaged cells can cause truck and facility fires, so isolate and drop them urgently [1]."
— grounding 93% · sources shown to user · refuse-if-thin path inactive`;

const CORPUS_SOURCES = [
  "Solid Waste Management Rules 2016 + schedule guidance (MoEFCC)",
  "E-Waste (Management) Rules 2022 · Battery Waste Management Rules 2022",
  "C&D Waste Management Rules 2016 · Plastic Waste Amendment 2021 (SUP ban)",
  "CPCB disposal practice notes · landfill fire advisories",
  "MoHUA Swachh Bharat Urban 2.0 citizen guides · MRF operations guidance",
  "BIS plastic identification (resin codes 1–7)",
  "UNEP Food Waste Index · IPCC AR6 methane summaries · BEE material facts",
];

const AGENT_TRACE = [
  ["1 · Perceive", "User attaches photo + label 'old jacket broken zip'", "multimodal stub (vision mocked, label parsed)", "raw input + caption"],
  ["2 · Normalize", "lowercase, tokenize, alias-map 'jacket' → textiles cluster", "deterministic preprocess", "tokens: jacket, broken, zip"],
  ["3 · Decide", "classify → textile (90%); damaged-condition rule selects reuse-first path", "Granite-style classifier + taxonomy", "stream = textile reuse"],
  ["4 · Ground", "retrieve textile-reuse passages for donation/downcycle hierarchy", "RAG retrieve (score 0.33)", "2 passages, chunk 11 top"],
  ["5 · Act", "guidance card: repair/donate if wearable → rag → downcycle; + impact fact + nudge log", "compose + action layer", "steps rendered to user"],
  ["6 · Learn", "anonymized pattern 'zip damage' logged; alias 'jacket zip' queued for taxonomy review", "feedback loop (roadmap)", "taxonomy candidate queued"],
];

const PIPELINE_NODES = [
  { n: "01", t: "Inputs", d: "text · photo · voice (Hinglish OK)" },
  { n: "02", t: "Preprocess", d: "normalize · transliterate · aliases" },
  { n: "03", t: "Granite LLM", d: "intent + entity extraction" },
  { n: "04", t: "Taxonomy", d: "95 items · 8 SWM streams" },
  { n: "05", t: "RAG layer", d: "20-doc grounding corpus" },
  { n: "06", t: "Action", d: "guide · nudge · forecast" },
];

const RAG_NODES = [
  { n: "A", t: "Question", d: "natural language, any phrasing" },
  { n: "B", t: "Embed", d: "TF-IDF vectors (demo) / embeddings (prod)" },
  { n: "C", t: "Retrieve", d: "cosine top-3 over 20 docs" },
  { n: "D", t: "Re-rank", d: "sentence-level overlap scoring" },
  { n: "E", t: "Compose", d: "grounded answer + [n] citations" },
  { n: "F", t: "Guard", d: "low score → honest refusal" },
];

const AGENT_NODES = [
  { n: "1", t: "Perceive", d: "resident asks / scans an item" },
  { n: "2", t: "Decide", d: "classify + retrieve rules" },
  { n: "3", t: "Act", d: "guidance · nudge · anonymized log" },
  { n: "4", t: "Learn", d: "patterns expand taxonomy" },
  { n: "↺", t: "Loop", d: "feeds back into Perceive" },
  { n: "+", t: "Oversight", d: "human review gates releases" },
];

const WALKTHROUGH = [
  "Classifier — type 'bananna peel' (typo) → watch the 5-step pipeline, then the Wet/green-bin result card with 89% confidence.",
  "Classifier edge case — type 'quantum battery' → system returns 'outside knowledge graph' instead of guessing, and offers the assistant.",
  "Assistant — ask 'Is a CFL bulb e-waste or hazardous?' → answer appears with 2–3 cited sources and a grounding %.",
  "Assistant refusal — ask 'best pizza toppings' → honest fallback; the anti-hallucination contract is shown working.",
  "Forecaster — set 4 people / 13 kg week / 30% segregation, flip all three plan toggles → 12-month curves and KPIs animate; switch scale to a ward.",
];

/* ---------- Part 3 data ---------- */
const CHANGE_ROWS = [
  ["Household waste stream", "1 mixed bag/day; recyclables contaminated by wet waste", "3 clean streams (wet/dry/haz-sanitary) — recyclables survive to market"],
  ["Worker safety exposure", "Unmarked sharps, acids, mercury handled barehanded", "Wrap-mark-separate protocol is the default; sharps never reached barehanded"],
  ["Organics & climate", "55% of household waste rots in landfills → methane (28–80× CO₂)", "Organics composted at home/community level → methane never forms; soil gains carbon"],
  ["MRF economics", "High rejection rates → recyclers pay little, plants run at loss", "Higher stream purity → better bale prices → viable city recycling without new capex"],
  ["Municipal visibility", "No per-locality data; routes & tariffs are guesswork", "Anonymized stream analytics (Phase 3) inform routing, MRF siting, user-charge design"],
];

const BENEFIT_ROWS = [
  ["Households & students", "Confusion removed at the decision moment; visible personal climate math keeps the habit alive", "Correct-sort rate in audits; weekly active households"],
  ["~4M sanitation workers", "Marked, wrapped hazardous/sanitary flows; dignified, safer handling", "Injury & exposure incidents per 1,000 shifts"],
  ["Urban local bodies", "Cleaner streams raise MRF revenue; analytics enable evidence-based routing & tariffs", "Dry-stream purity %; cost per tonne handled"],
  ["Recyclers / kabadi networks", "Higher-quality feedstock; predictable volumes", "Bale rejection rate; price realization per tonne"],
  ["Environment & public health", "Methane & dumpsite-fire pollution avoided; soil carbon restored via compost", "Modelled kg CO₂e/yr avoided (published quarterly)"],
];

const MEASURE_ROWS = [
  ["Adoption", "Weekly active households; before/after waste audits", "≥ 60% weekly actives in pilot cohort"],
  ["Stream quality", "MRF sampling: contamination % of dry loads", "−40% contamination vs baseline by Phase 2"],
  ["Diversion", "kg/household/week composted + recycled (audits + aggregator data)", "+300 g/hh/day by Phase 2"],
  ["Safety", "Worker injury/exposure reports per 1,000 shifts", "Downward trend every quarter"],
  ["Climate", "Modelled methane/CO₂e avoidance from audited diversion", "Published as quarterly impact bulletin"],
  ["Trust", "% answers with citations opened; refusal-rate monitoring", "Refusal precision > recall target set at review"],
];

const ROADMAP_ROWS = [
  ["Phase 01 · Campus pilot", "Months 0–3", "Deploy to 500 students + 2 hostels; baseline 1-week waste audit; taxonomy 95 → 250 items from real queries", "≥60% weekly actives · ~40% cut in hostel mixed waste"],
  ["Phase 02 · Ward partnership", "Months 3–9", "Align streams with ULB routes; multilingual voice input; ward collection calendars; nudge agent", "1 ward onboarded · MRF verifies higher dry purity"],
  ["Phase 03 · Citizen data layer", "Months 9–18", "Aggregate-only stream analytics on city dashboards; housing-society API; recycler take-back integration", "Verifiable tonnes diverted, published quarterly"],
];

/* ================= page ================= */
export default function ReportPage() {
  const f = {
    name: "Mohammad Ramish Ansari",
    college: "University of Lucknow",
    roll: "INTERNSHIP_17828984086a44dee80acf6",
    date: "15-9-2026",
  };

  return (
    <div className="min-h-screen bg-[#0a0f0b]">
      {/* toolbar */}
      <div className="print-hidden sticky top-0 z-50 backdrop-blur-xl bg-ink/85 border-b border-line">
        <div className="mx-auto max-w-[1000px] px-5 py-3 flex items-center justify-between gap-3">
          <a
            href="#top"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-fog hover:text-lime transition-colors"
          >
            <ArrowLeft size={14} />
            Back to prototype
          </a>
          <span className="hidden sm:block font-mono text-[10px] tracking-[0.2em] uppercase text-dim">
            final deliverable · follows internship submission pattern · A4
          </span>
          <div className="flex flex-col items-end gap-1">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-[12.5px] font-medium text-ink hover:shadow-[0_0_28px_rgba(184,243,77,0.35)] transition-shadow"
            >
              <FileDown size={15} />
              Download PDF
            </button>
            <span className="hidden md:block font-mono text-[8.5px] tracking-[0.06em] text-dim">
              enable “background graphics” in the print dialog
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1000px] px-4 md:px-6 py-8 md:py-12 print:p-0 print:m-0 print:max-w-none">
        {/* ============================================================
            PAGE 1 · COVER
        ============================================================ */}
        <section className="rp-paper rounded-sm bg-white shadow-2xl print:shadow-none" style={{ color: INKTXT }}>
          <div className="px-8 md:px-12 pt-10 pb-8 border-b-4" style={{ borderColor: GREEN }}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid place-items-center w-10 h-10 rounded-lg text-white print:[print-color-adjust:exact]" style={{ background: GREEN }}>
                  <Leaf size={19} />
                </span>
                <div>
                  <p className="font-mono text-[8.5px] tracking-[0.26em] uppercase" style={{ color: MUTED }}>
                    1M1B AI for Sustainability Virtual Internship
                  </p>
                  <p className="font-mono text-[8.5px] tracking-[0.26em] uppercase mt-0.5" style={{ color: MUTED }}>
                    In collaboration with IBM SkillsBuild &amp; AICTE
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block rounded-full border-2 px-3 py-1 font-mono text-[8.5px] tracking-[0.18em] uppercase" style={{ borderColor: GREEN, color: GREEN }}>
                Final Project Deliverable
              </span>
            </div>

            <div className="mt-10 grid md:grid-cols-[1fr_220px] gap-8 items-end">
              <div>
                <h1 className="text-[38px] md:text-[48px] leading-[1.02] font-semibold tracking-tight" style={{ color: "#0d140e" }}>
                  SwachhAI
                  <span className="block mt-2 font-serif italic font-normal text-[20px] md:text-[25px]" style={{ color: GREEN }}>
                    AI-guided waste segregation &amp; circularity assistant for India&apos;s households
                  </span>
                </h1>
                <p className="mt-5 max-w-xl text-[12px] leading-relaxed" style={{ color: BODY }}>
                  Part 1 — Project Description · Part 2 — Prototype &amp; Demo (prompt workflows,
                  RAG demo, agent logic, flow diagrams) · Part 3 — Impact Statement. Structured
                  exactly to the internship submission pattern.
                </p>
              </div>
              <figure className="hidden md:block rounded-md overflow-hidden border" style={{ borderColor: BORDER }}>
                <img src="images/hero-collage.jpg" alt="Prototype cover visual" className="w-full h-[190px] object-cover" />
                <figcaption className="px-2.5 py-1.5 font-mono text-[7.5px] tracking-[0.08em] uppercase" style={{ color: MUTED }}>
                  prototype · landing interface art
                </figcaption>
              </figure>
            </div>
          </div>

          {/* identity fields */}
          <div className="px-8 md:px-12 py-7 grid sm:grid-cols-2 gap-x-10 gap-y-5">
            <div>
              <Label>Student name</Label>
              <Val>{f.name}</Val>
            </div>
            <div>
              <Label>College / institution</Label>
              <Val>{f.college}</Val>
            </div>
            <div>
              <Label>Registration / roll no.</Label>
              <Val mono>{f.roll}</Val>
            </div>
            <div>
              <Label>Submission date</Label>
              <Val>{f.date}</Val>
            </div>
            <div>
              <Label>Author · LinkedIn</Label>
              <a
                href="https://www.linkedin.com/in/ramish-ansari"
                target="_blank"
                rel="noreferrer"
                className="text-[13px] font-semibold underline decoration-dotted underline-offset-4"
                style={{ color: GREEN }}
              >
                www.linkedin.com/in/ramish-ansari
              </a>
            </div>
            <div>
              <Label>Prototype access</Label>
              <p className="text-[13px] font-semibold" style={{ color: INKTXT }}>
                Single-file web build · runs offline
              </p>
              <p className="text-[12px] mt-0.5" style={{ color: BODY }}>
                Open → “Run the classifier” for the live demos
              </p>
            </div>
            <div className="sm:col-span-2">
              <Label>SDG alignment</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {[
                  ["SDG 12 · Responsible Consumption & Production", "#BF8B2E", true],
                  ["SDG 11 · Sustainable Cities", "#FD9D24", false],
                  ["SDG 13 · Climate Action", "#3F7E44", false],
                ].map(([t, c, prim]) => (
                  <span
                    key={String(t)}
                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10.5px] print:[print-color-adjust:exact]"
                    style={{
                      borderColor: String(c),
                      color: prim ? "#fff" : String(c),
                      background: prim ? String(c) : "transparent",
                      fontWeight: prim ? 600 : 500,
                    }}
                  >
                    {String(t)} {prim ? "— primary" : ""}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* spec band */}
          <div className="mx-8 md:mx-12 mb-10 rounded-md px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 print:[print-color-adjust:exact]" style={{ background: "#eef4e9", border: "1px solid #d5e2cc" }}>
            {[
              ["95", "items · taxonomy graph"],
              ["8", "SWM-2016 waste streams"],
              ["20", "docs · RAG corpus"],
              ["4", "demo elements delivered"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="text-[19px] font-semibold tracking-tight" style={{ color: GREEN }}>{v}</p>
                <p className="font-mono text-[7.5px] tracking-[0.14em] uppercase mt-0.5" style={{ color: MUTED }}>{l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            PART 1 · PROJECT DESCRIPTION  (pages 2–4)
        ============================================================ */}
        <section className="rp-paper mt-6 print:mt-0 rounded-sm bg-white shadow-2xl print:shadow-none break-before-page" style={{ color: INKTXT }}>
          <PartBand
            n="Part 1 of 3"
            title="Project Description"
            blurb="Title · Student & college · SDG alignment · Problem statement · AI solution overview · Target users · Responsible AI considerations · Expected impact."
          />

          <div className="px-8 md:px-12 py-10">
            {/* 1.1 Title */}
            <Sub id="1.1" title="Title" />
            <P>
              <strong style={{ color: INKTXT }}>SwachhAI — AI-Guided Waste Segregation &amp;
              Circularity Assistant.</strong> A decision-support system that classifies any
              household item into its correct SWM-2016 waste stream, answers municipal waste rules
              through a retrieval-grounded assistant, and forecasts each household&apos;s diversion
              and carbon impact — making the right bin the easy bin.
            </P>

            {/* 1.2 Name/college */}
            <Sub id="1.2" title="Student & College" />
            <P>
              Submitted by:{" "}
              <strong style={{ color: GREEN }}>{f.name.trim() || "(name — as filled on the cover page)"}</strong>{" "}
              ·{" "}
              <strong style={{ color: GREEN }}>{f.college.trim() || "(college — as filled on the cover page)"}</strong>{" "}
              {f.roll.trim() ? <>· Roll No. <strong style={{ color: GREEN }}>{f.roll}</strong></> : null}
              {f.date.trim() ? <> · Date: <strong style={{ color: GREEN }}>{f.date}</strong></> : null}
              . Program: 1M1B AI for Sustainability Virtual Internship, in collaboration with IBM
              SkillsBuild &amp; AICTE.
            </P>

            {/* 1.3 SDG */}
            <Sub id="1.3" title="SDG Alignment" />
            <DataTable
              head={["Goal", "UN target", "How this project contributes"]}
              widths={["26%", "34%", "40%"]}
              rows={SDG_ROWS}
            />
            <P className="mt-3">{SDG_TARGETS_EXTRA}</P>

            {/* 1.4 Problem */}
            <Sub id="1.4" title="Problem Statement" />
            <P>
              India generates roughly 62 million tonnes of municipal solid waste per year, yet only
              ~30% of households segregate it at source. The common diagnosis is &quot;people don&apos;t
              care&quot; — a week of field observation suggested the opposite: people hesitate. A
              resident holding a milk pouch, a CFL tube or a chips packet has about five seconds at
              the dustbin, and no way to know its correct stream. The guess is usually wrong: one
              careless item contaminates an entire batch of recyclables, and unmarked sharps or
              chemicals move silently into the hands of sanitation workers.
            </P>
            <div className="my-5 rounded-md p-5 print:[print-color-adjust:exact]" style={{ background: BOXBG, border: `1px solid ${BOBORDER}` }}>
              <p className="font-serif italic text-[15px] leading-relaxed" style={{ color: "#24301f" }}>
                &quot;How might we use AI to make correct waste sorting effortless for every
                household — so that India&apos;s cities become engines of a circular economy instead of
                methane factories?&quot;
              </p>
            </div>
            <Label>root-cause analysis (from field research synthesis)</Label>
            <DataTable
              head={["Observed symptom", "Underlying root cause", "Evidence source"]}
              widths={["27%", "41%", "32%"]}
              rows={ROOT_CAUSES}
            />
          </div>
        </section>

        {/* Part 1 continued — page 3 */}
        <section className="rp-paper mt-6 print:mt-0 rounded-sm bg-white shadow-2xl print:shadow-none break-before-page" style={{ color: INKTXT }}>
          <div className="px-8 md:px-12 py-10">
            {/* 1.5 AI solution */}
            <Sub id="1.5" title="AI Solution Overview" />
            <P className="mb-5">
              SwachhAI is not one model but three cooperating modules sharing one pipeline. The
              design principle: compress the 5 seconds of bin-side confusion to zero, then convert
              correct behaviour into visible progress. AI is required because the problem is
              <em> linguistic and contextual</em> — rigid rule-list apps cannot absorb &quot;doodh ka
              packet&quot;, a photo, or a question about your own city&apos;s rules; language
              understanding, retrieval and prediction can.
            </P>
            <DataTable
              head={["Module", "What it does", "AI technique used", "Example in the live demo"]}
              widths={["17%", "33%", "30%", "20%"]}
              rows={MODULES.map((m) => [
                <span key="t" className="font-semibold">{m[0]}</span>,
                m[1],
                m[2],
                <span key="e" className="font-mono text-[10px]">{m[3]}</span>,
              ])}
            />

            {/* 1.6 Target users */}
            <Sub id="1.6" title="Target Users" />
            <DataTable
              head={["Persona", "Context / pain", "How the project serves them", "Success signal"]}
              widths={["24%", "28%", "30%", "18%"]}
              rows={PERSONAS}
            />

            {/* 1.7 Responsible AI */}
            <Sub id="1.7" title="Responsible AI Considerations" />
            <P className="mb-5">
              The internship mandates fairness, transparency, ethics and privacy. SwachhAI treats
              these as <em>testable behaviours</em> in the product, not policy text.
            </P>
            <div className="grid sm:grid-cols-2 gap-3 mb-7">
              {RAI_DETAIL.map((r) => (
                <div key={r.t} className="border rounded-md p-4 break-inside-avoid" style={{ borderColor: BORDER }}>
                  <p className="flex items-center gap-2">
                    <r.icon size={15} style={{ color: GREEN }} />
                    <span className="text-[12.5px] font-semibold" style={{ color: INKTXT }}>{r.t}</span>
                  </p>
                  <div className="mt-2 space-y-1.5">
                    {r.points.map((pt) => (
                      <p key={pt} className="flex gap-2 text-[10.8px] leading-relaxed" style={{ color: BODY }}>
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full print:[print-color-adjust:exact]" style={{ background: GREEN }} />
                        {pt}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Label>system disclosure card</Label>
            <div className="mt-1 border rounded-md overflow-hidden break-inside-avoid" style={{ borderColor: BORDER }}>
              {SYSTEM_CARD.map(([k, v], i) => (
                <div
                  key={k}
                  className="grid sm:grid-cols-[190px_1fr] print:[print-color-adjust:exact]"
                  style={{ borderTop: i ? `1px solid #e4ebe0` : "none", background: i % 2 ? ZEBRA : "#fff" }}
                >
                  <p className="px-4 py-2.5 font-mono text-[8.5px] tracking-[0.16em] uppercase" style={{ color: MUTED }}>
                    {k}
                  </p>
                  <p className="px-4 py-2.5 text-[11.2px] leading-relaxed" style={{ color: BODY }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Part 1 continued — page 4 */}
        <section className="rp-paper mt-6 print:mt-0 rounded-sm bg-white shadow-2xl print:shadow-none break-before-page" style={{ color: INKTXT }}>
          <div className="px-8 md:px-12 py-10">
            {/* 1.8 Expected impact */}
            <Sub id="1.8" title="Expected Impact" />
            <P className="mb-5">
              Impact is modelled with published coefficients (0.47 kg CO₂e/kg organics composted;
              1.1 kg CO₂e/kg dry-stream recycled; 21 kg CO₂/tree/yr; 0.192 kg CO₂/km petrol) and a
              55/25/20 organic-dry-reject composition prior — estimates are directional, stated in
              ranges, and never presented as verified offsets.
            </P>
            <DataTable
              head={["Scale", "Material impact", "Equivalent meaning"]}
              widths={["32%", "34%", "34%"]}
              rows={IMPACT_NUMBERS}
            />

            <div className="mt-6 grid sm:grid-cols-3 gap-3 break-inside-avoid">
              {[
                ["Environmental", "Landfill methane avoided; recycling displaces virgin-production energy (up to 95% for aluminium); compost returns carbon to soil."],
                ["Social", "Sanitation workers handle marked, safer streams; households gain climate agency; rules become readable in everyday language."],
                ["Economic", "Cleaner MRF feedstock improves bale prices; cities spend less on remediation; kabadi networks get predictable quality supply."],
              ].map(([t, d]) => (
                <div key={t} className="border rounded-md p-4" style={{ borderColor: BORDER }}>
                  <p className="text-[12px] font-semibold" style={{ color: GREEN }}>{t}</p>
                  <p className="mt-1 text-[11px] leading-relaxed" style={{ color: BODY }}>{d}</p>
                </div>
              ))}
            </div>

            <Label>phased implementation plan</Label>
            <div className="mt-1">
              <DataTable
                head={["Phase", "Window", "Actions", "Exit criteria (KPIs)"]}
                widths={["20%", "11%", "41%", "28%"]}
                rows={ROADMAP_ROWS}
              />
            </div>
          </div>
        </section>

        {/* ============================================================
            PART 2 · PROTOTYPE / DEMO  (pages 5–7)
        ============================================================ */}
        <section className="rp-paper mt-6 print:mt-0 rounded-sm bg-white shadow-2xl print:shadow-none break-before-page" style={{ color: INKTXT }}>
          <PartBand
            n="Part 2 of 3"
            title="Prototype / Demo"
            blurb="The guideline asks for any one — this project ships all four elements: prompt workflows, a RAG demo, agent logic, and flow diagrams. The live build runs offline as a single web file."
          />

          <div className="px-8 md:px-12 py-10">
            {/* 2.1 Prompt workflows */}
            <Sub id="2.1" title="Element 1 · Prompt Workflows" />
            <P className="mb-5">
              All model behaviour is steered by constrained, safety-first prompts. Below is the
              classifier&apos;s actual system prompt — including the refusal rule, the language policy
              and the strict JSON contract which the UI parses into the guidance card.
            </P>
            <CodeBlock title="prompt workflow 1 — classifier system prompt">{CLASSIFIER_SYSTEM_PROMPT}</CodeBlock>

            <div className="mt-5">
              <CodeBlock title="worked example — the prompt in action">{CLASSIFIER_IO_EXAMPLE}</CodeBlock>
            </div>

            <p className="mt-6 mb-2 font-mono text-[8.5px] tracking-[0.18em] uppercase" style={{ color: MUTED }}>
              prompt workflow 2 — weekly nudge agent (roadmap, designed not yet deployed)
            </p>
            <CodeBlock title="nudge prompt — kindness-constrained">{NUDGE_PROMPT}</CodeBlock>
          </div>
        </section>

        {/* Part 2 — page 6: RAG + Agent */}
        <section className="rp-paper mt-6 print:mt-0 rounded-sm bg-white shadow-2xl print:shadow-none break-before-page" style={{ color: INKTXT }}>
          <div className="px-8 md:px-12 py-10">
            {/* 2.2 RAG demo */}
            <Sub id="2.2" title="Element 2 · RAG Demo (Retrieval-Augmented Generation)" />
            <P className="mb-5">
              The assistant never answers from parametric memory. It first retrieves passages from a
              20-document curated corpus — sources below — re-ranks them at sentence level against the
              question, composes only from what it found, and attaches citations. Below: the pipeline,
              the corpus, and one real traced query.
            </P>
            <FlowDiag nodes={RAG_NODES} caption="Fig. 1 — RAG pipeline as executed in the live demo (demo uses TF-IDF retrieval in-browser; production swaps embeddings + watsonx vector store, same pattern)." />

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div>
                <Label>grounding corpus sources (20 documents)</Label>
                <div className="space-y-1.5 mt-1">
                  {CORPUS_SOURCES.map((s) => (
                    <Check key={s}>{s}</Check>
                  ))}
                </div>
              </div>
              <div>
                <Label>compose-stage prompt template</Label>
                <CodeBlock title="rag compose template (with refusal contract)">{RAG_PROMPT_TEMPLATE}</CodeBlock>
              </div>
            </div>

            <p className="mt-7 mb-2 font-mono text-[8.5px] tracking-[0.18em] uppercase" style={{ color: MUTED }}>
              traced demo query — &quot;Where should I throw old batteries?&quot;
            </p>
            <DataTable
              head={["Rank", "Passage retrieved", "Score", "Sentences re-ranker kept"]}
              widths={["8%", "30%", "10%", "52%"]}
              rows={RAG_RETRIEVAL_EXAMPLE}
            />
            <div className="mt-4 rounded-md p-4 break-inside-avoid print:[print-color-adjust:exact]" style={{ background: BOXBG, border: `1px solid ${BOBORDER}` }}>
              <p className="font-mono text-[8.5px] tracking-[0.18em] uppercase mb-2" style={{ color: GREEN }}>
                → final grounded answer shown to the user
              </p>
              <p className="text-[11.3px] leading-relaxed font-serif italic" style={{ color: "#24301f" }}>
                {RAG_FINAL_ANSWER}
              </p>
            </div>

            {/* 2.3 Agent logic */}
            <Sub id="2.3" title="Element 3 · Agent Logic" />
            <P className="mb-5">
              SwachhAI is architected as a single perceive→decide→act→learn agent loop rather than a
              set of static screens. Each turn grounds itself, acts, and leaves a (privacy-safe)
              learning trace. The trace below walks through one real interaction end to end.
            </P>
            <FlowDiag nodes={AGENT_NODES} caption="Fig. 2 — agentic loop. 'Oversight' = human-in-the-loop gate on taxonomy/corpus releases (see Part 1.7)." />
            <div className="mt-6">
              <DataTable
                head={["Loop step", "What the agent does", "Tool / model invoked", "Output of the step"]}
                widths={["14%", "38%", "24%", "24%"]}
                rows={AGENT_TRACE}
              />
            </div>
          </div>
        </section>

        {/* Part 2 — page 7: flow diagrams + walkthrough */}
        <section className="rp-paper mt-6 print:mt-0 rounded-sm bg-white shadow-2xl print:shadow-none break-before-page" style={{ color: INKTXT }}>
          <div className="px-8 md:px-12 py-10">
            {/* 2.4 Flow diagrams */}
            <Sub id="2.4" title="Element 4 · Flow Diagrams" />
            <Label>fig. 3 — end-to-end system workflow (all three demos share this pipeline)</Label>
            <div className="mt-1 mb-8">
              <FlowDiag nodes={PIPELINE_NODES} caption="Stages 03 & 05 map 1:1 to IBM Granite + watsonx services in production; the demo executes the same routing client-side." />
            </div>

            <Label>data &amp; control flow, per user turn</Label>
            <div className="mt-1 mb-8 border rounded-md p-4 print:[print-color-adjust:exact]" style={{ borderColor: BOBORDER, background: BOXBG }}>
              <pre className="font-mono text-[9.2px] leading-[1.8] whitespace-pre-wrap" style={{ color: "#27331f" }}>
{`resident (text / photo+label / voice)
      │
      ▼
 preprocess ──► entity extraction (Granite-class LLM)
      │                    │ item + material clues
      ▼                    ▼
 taxonomy match (95 items·8 streams) ─── confidence < 75 ──► "unknown" refusal path
      │ confident                                           └─► offer RAG assistant
      ▼
 retrieval (20-doc corpus) ──► sentence re-rank ──► grounded guidance
      │
      ▼
 action layer: bin protocol + worker-safety steps + impact fact + nudge log
      │
      ▼
 anonymized pattern log ──► quarterly human-reviewed taxonomy expansion`}
              </pre>
            </div>

            <Label>live demo walkthrough (5 steps, ~4 minutes)</Label>
            <div className="mt-1 space-y-1.5">
              {WALKTHROUGH.map((w, i) => (
                <p key={w} className="flex gap-3 text-[11.3px] leading-relaxed" style={{ color: BODY }}>
                  <span className="font-mono text-[9px] pt-0.5 shrink-0" style={{ color: GREEN }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {w}
                </p>
              ))}
            </div>

            <div className="mt-7 rounded-md border p-4 break-inside-avoid" style={{ borderColor: BORDER }}>
              <p className="text-[11.3px] leading-relaxed" style={{ color: BODY }}>
                <strong style={{ color: INKTXT }}>Access.</strong> The prototype is a self-contained
                single-file web build — open it in any browser, fully offline. Buttons on the home
                screen lead directly to the two interactive demos (&quot;Run the classifier&quot;,
                &quot;Ask the RAG assistant&quot;); the Impact Model sits one scroll below. Results
                above are reproduced live in under a minute.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            PART 3 · IMPACT STATEMENT  (page 8)
        ============================================================ */}
        <section className="rp-paper mt-6 print:mt-0 rounded-sm bg-white shadow-2xl print:shadow-none break-before-page" style={{ color: INKTXT }}>
          <PartBand
            n="Part 3 of 3"
            title="Impact Statement"
            blurb="What changes if this solution is implemented — and who benefits, how, and how we would verify it."
          />

          <div className="px-8 md:px-12 py-10">
            <Sub id="3.1" title="What changes if implemented" />
            <DataTable
              head={["Dimension", "Today · without SwachhAI", "With SwachhAI deployed"]}
              widths={["22%", "36%", "42%"]}
              rows={CHANGE_ROWS}
            />
            <div className="mt-5 rounded-md p-5 break-inside-avoid print:[print-color-adjust:exact]" style={{ background: "#eef4e9", border: "1px solid #d5e2cc" }}>
              <p className="font-serif italic text-[14.5px] leading-relaxed text-center" style={{ color: "#24301f" }}>
                &quot;If ~36% of a 10,000-home ward adopts fully, ≈ 1,560 tonnes/year avoid landfill —
                about one garbage truck every day — while workers handle marked, safer flows and the
                city gains its first stream-level waste dataset.&quot;
              </p>
            </div>

            <Sub id="3.2" title="Who benefits & how" />
            <DataTable
              head={["Beneficiary", "Mechanism of benefit", "How we would measure it"]}
              widths={["24%", "44%", "32%"]}
              rows={BENEFIT_ROWS}
            />

            <Sub id="3.3" title="Measurement & verification plan" />
            <P className="mb-4">
              An impact claim is only as good as its instrumentation. The pilot is designed so every
              number in Part 1.8 can be re-derived from field data:
            </P>
            <DataTable
              head={["KPI family", "Metric & collection method", "Target"]}
              widths={["16%", "52%", "32%"]}
              rows={MEASURE_ROWS}
            />

            <div className="mt-7 rounded-md border p-4 break-inside-avoid" style={{ borderColor: BORDER }}>
              <p className="text-[11.3px] leading-relaxed" style={{ color: BODY }}>
                <strong style={{ color: INKTXT }}>Risks & honest limits.</strong> Behaviour change
                decays without reinforcement — mitigated by the nudge agent and society-level score
                cards rather than one-off drives. Municipal bylaws vary by city — mitigated by
                making the corpus per-city swappable and always deferring to the local body&apos;s
                rules. Estimates are directional; Phase-1 audits exist precisely to replace modelled
                numbers with measured ones.
              </p>
            </div>

            {/* references */}
            <Sub id="3.4" title="References & data sources" />
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1">
              {CORPUS_SOURCES.map((s) => (
                <Check key={s}>{s}</Check>
              ))}
            </div>
            <P className="mt-3">
              All are public documents; statistics quoted in this report are approximations compiled
              from these sources for prototype framing and are cited inline where used.
            </P>

            <Sub id="3.5" title="Author's Note — Development Process & Contribution" />
            <div className="rounded-md border p-5 break-inside-avoid" style={{ borderColor: BORDER }}>
              <p className="text-[13.5px] font-semibold" style={{ color: INKTXT }}>
                SwachhAI — AI for Sustainable Waste Management
              </p>
              <p className="mt-1 font-mono text-[8.5px] tracking-[0.16em] uppercase" style={{ color: MUTED }}>
                AI/ML &amp; Sustainability Project | 1M1B × IBM SkillsBuild
              </p>
              <P className="mt-3">
                SwachhAI is an AI-driven sustainability project focused on using artificial
                intelligence to address challenges in waste management and promote more responsible
                waste-handling practices.
              </P>
              <P className="mt-2.5">
                I worked on the project as part of my AI for Sustainability internship, exploring
                how modern AI technologies can be applied to real-world environmental problems. The
                project involved researching the problem domain, defining the proposed AI solution,
                understanding the role of machine learning and generative AI, and presenting the
                concept through an interactive web experience.
              </P>
              <P className="mt-2.5">
                This project was developed with significant AI assistance. I used AI-powered tools
                to help generate and structure the website, assist with content development, refine
                the presentation, and accelerate prototyping — while focusing on the problem
                statement, solution architecture, user experience, and technical communication.
                Rather than treating AI as a replacement for engineering, I used it as a
                productivity and development tool to rapidly prototype and communicate the solution.
              </P>
              <div className="mt-4">
                <Label>areas explored</Label>
                <div className="flex flex-wrap gap-1.5">
                  {["AI/ML", "Generative AI", "LLMs", "RAG", "Agentic AI", "Sustainability", "AI-assisted development"].map((c) => (
                    <span
                      key={c}
                      className="rounded-full border px-2.5 py-1 font-mono text-[8.5px] tracking-[0.08em] uppercase print:[print-color-adjust:exact]"
                      style={{ borderColor: BOBORDER, color: GREEN }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-3">
                <Label>my contribution</Label>
                <div className="flex flex-wrap gap-1.5">
                  {["Problem research", "Solution ideation", "AI/ML exploration", "Project structuring", "Website prototyping", "Technical presentation"].map((c) => (
                    <span
                      key={c}
                      className="rounded-full px-2.5 py-1 font-mono text-[8.5px] tracking-[0.08em] uppercase print:[print-color-adjust:exact]"
                      style={{ background: BOXBG, color: INKTXT, border: `1px solid ${BOBORDER}` }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* declaration */}
            <div className="mt-10 border-t-2 border-dashed pt-6" style={{ borderColor: "#cfd8cb" }}>
              <p className="flex items-center gap-2 font-mono text-[8.5px] tracking-[0.22em] uppercase" style={{ color: MUTED }}>
                <Award size={12} style={{ color: GREEN }} />
                Declaration
              </p>
              <P className="mt-2">
                I declare that this project is my original work, completed during the 1M1B AI for
                Sustainability Virtual Internship (IBM SkillsBuild × AICTE). Public statistics are
                approximate and cited inline; simulated layers of the prototype are transparently
                labelled. AI tools were used responsibly, as taught in the program.
              </P>
              <div className="mt-6 grid sm:grid-cols-3 gap-6">
                <div>
                  <Label>Student signature</Label>
                  <p className="mt-5 border-b font-serif italic text-[15px] pb-1 min-h-[24px]" style={{ borderColor: "#b9c6b6", color: INKTXT }}>
                    {f.name || ""}
                  </p>
                </div>
                <div>
                  <Label>College / institution</Label>
                  <p className="mt-5 border-b text-[12.5px] pb-1 min-h-[24px]" style={{ borderColor: "#b9c6b6", color: INKTXT }}>
                    {f.college || ""}
                  </p>
                </div>
                <div>
                  <Label>Date</Label>
                  <p className="mt-5 border-b text-[12.5px] pb-1 min-h-[24px]" style={{ borderColor: "#b9c6b6", color: INKTXT }}>
                    {f.date || ""}
                  </p>
                </div>
              </div>
              <p className="mt-8 text-center font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: "#9aa89c" }}>
                SwachhAI · SDG 12 / 11 / 13 · 1M1B × IBM SkillsBuild × AICTE
              </p>
              <p className="mt-1.5 text-center font-mono text-[8px] tracking-[0.22em] uppercase" style={{ color: "#9aa89c" }}>
                Author · Mohammad Ramish Ansari · University of Lucknow · www.linkedin.com/in/ramish-ansari
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
