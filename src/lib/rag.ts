/* ------------------------------------------------------------------
   SwachhAI · retrieval-augmented answer engine (runs fully client-side)
   Pipeline: tokenize → tf-idf vectors over corpus → cosine retrieval
   → sentence-level re-ranking → grounded answer with citations.
------------------------------------------------------------------- */

export interface Chunk {
  id: number;
  title: string;
  source: string;
  text: string;
}

export const CORPUS: Chunk[] = [
  { id: 1, title: "Source segregation — SWM Rules 2016", source: "Solid Waste Management Rules, MoEFCC", text: "The Solid Waste Management Rules 2016 make every household and institution responsible for segregating waste at source into three streams. Wet biodegradable waste goes to the green bin, dry recyclable material goes to the blue bin, and domestic hazardous and sanitary waste must be wrapped, marked and handed over separately to authorised collectors. Mixed waste handed to collectors can legally be refused or charged extra in many cities." },
  { id: 2, title: "Home composting basics", source: "Swachh Bharat Urban · citizen guide", text: "Home composting needs roughly two to three parts dry browns like leaves and cardboard to one part wet greens like kitchen scraps. Keep the pile as moist as a wrung sponge and turn it once a week for oxygen. Compost is ready in about six to eight weeks when it smells earthy. Avoid cooked meat, dairy and oily food in open home piles because they attract pests; a covered aerobic bin or compost matka handles them better." },
  { id: 3, title: "E-waste handling & EPR", source: "E-Waste (Management) Rules 2022, MoEFCC", text: "The E-Waste Management Rules 2022 place Extended Producer Responsibility on brands, which must finance authorised collection and recycling. Consumers should deposit phones, laptops, cables, appliances and bulbs only with authorised e-waste recyclers, brand take-back programs or certified collection drives, never in dustbins. Wipe your data with a factory reset before disposal, because informal dismantlers can recover it. India generated about 1.6 million tonnes of e-waste in 2023, the third largest in the world." },
  { id: 4, title: "Reading plastic codes 1–7", source: "BIS plastic identification standard", text: "The number inside the chasing-arrows triangle tells recyclers the resin type. Code 1 PET bottles and code 2 HDPE containers are widely recycled. Code 3 PVC and code 6 polystyrene are hard to recycle and should be avoided. Code 4 LDPE films like milk pouches and code 5 PP containers are recyclable if rinsed and dry. Code 7 means mixed or multilayer materials, which are effectively non-recyclable. Always empty, rinse and dry plastic before putting it in the blue bin." },
  { id: 5, title: "Domestic hazardous waste", source: "SWM Rules 2016 · Schedule guidance", text: "Household hazardous waste includes batteries, CFL and tube lights containing mercury, expired medicines, syringes, paints, solvents, pesticides and cleaning acids. These must never enter the general bins, drains or landfills because they poison sanitation workers and contaminate groundwater. Store them safely in original containers, seal them, and use retail take-back boxes, pharmacy returns or municipal hazardous collection drives." },
  { id: 6, title: "Sanitary waste handling", source: "MoHUA sanitation worker safety protocol", text: "Soiled sanitary items such as diapers, pads, tampons, used masks and bandages should be wrapped securely in newspaper or the provided disposal bag and clearly marked as sanitary waste before being handed separately to collectors. This protects sanitation workers from infection and needle-stick injuries. Schools, hostels and offices should provide dedicated bins and arrange safe disposal or incineration under state rules. Never flush pads or diapers since they block sewers immediately." },
  { id: 7, title: "Preparing dry waste correctly", source: "Material Recovery Facility operations guide", text: "Dry waste only gets recycled if it reaches sorting centres clean and dry. Rinse containers to remove food residue, dry them completely, and flatten cardboard and bottles to save eighty percent of transport volume. Keep glass separate and wrap broken pieces with a sharp label. Oil-soaked paper and food-stained containers are the top reasons potentially recyclable loads are rejected and landfilled." },
  { id: 8, title: "Construction & demolition debris", source: "C&D Waste Management Rules 2016", text: "Construction and demolition waste such as rubble, broken tiles, concrete and bricks must not be mixed with household municipal waste under the 2016 rules. Generators must ensure it reaches designated C&D sites, which the local municipality designates. Processed C&D waste is recycled into kerb stones, paver blocks and road aggregates, yet India recycles under five percent of this stream, a major missed opportunity." },
  { id: 9, title: "Landfills, methane & climate", source: "IPCC AR6 mitigation pathways summary", text: "When organic waste decomposes without oxygen inside landfills it releases methane, a greenhouse gas roughly 28 to 80 times more potent than carbon dioxide depending on the time horizon. Source segregation plus composting keeps organics out of landfills and is one of the cheapest urban climate actions available. Dumpsite fires at mixed-waste landfills additionally release dioxins and fine particulate pollution across cities." },
  { id: 10, title: "Energy saved by recycling", source: "Bureau of Energy Efficiency · material facts", text: "Recycling aluminium saves about ninety five percent of the energy needed to produce virgin aluminium, saving one can powers a TV for about three hours. Recycling steel saves sixty to seventy percent of the energy, paper around forty percent, and glass roughly thirty percent. Recycling one tonne of paper saves about seventeen trees and twenty six thousand litres of process water. These savings translate directly into avoided carbon emissions." },
  { id: 11, title: "Textile & footwear reuse", source: "Circular apparel · reuse hierarchy", text: "The best pathway for old clothes and shoes is donation to NGOs or shelters while they are still wearable, since reuse extends a garment's life and displaces new production. Worn-out textiles can serve as cleaning rags, and torn synthetics can be downcycled by textile recyclers into mop yarn or insulation. A single cotton t-shirt needs about two thousand seven hundred litres of water to produce, so reuse repays that water debt many times over. Synthetic fabrics shed microplastics in washing and landfill." },
  { id: 12, title: "Cutting food waste at home", source: "UNEP Food Waste Index guidance", text: "Food waste contributes roughly eight to ten percent of global greenhouse gas emissions. The most effective household actions are planning meals before shopping, using first-in first-out rotation in the fridge, freezing leftovers, and embracing slightly imperfect produce. Weighing your discarded food for one week typically reveals two or three avoidable waste hotspots per family. Genuine leftovers that cannot be eaten should go to the green bin or compost, never mixed with packaging." },
  { id: 13, title: "Municipal collection systems", source: "Swachh Bharat Urban 2.0 framework", text: "Under Swachh Bharat Urban, cities run door-to-door collection of segregated waste and route dry waste to Material Recovery Facilities where sorters separate plastics, metals, paper and glass for sale to recyclers. Many cities charge small monthly user fees for collection and operate grievance apps such as Swachhata for missed pickups or garbage vulnerable points. Some cities run deposit-refund schemes for PET bottles via reverse vending machines." },
  { id: 14, title: "Battery take-back rules", source: "Battery Waste Management Rules 2022", text: "The Battery Waste Management Rules 2022 require producers to collect and recycle used batteries, from button cells to EV packs. Consumers should tape the terminals of lithium cells to prevent sparks, store batteries in a leak-proof container, and return them to retail take-back boxes or authorised collection points. Damaged lithium batteries cause fires in garbage trucks and sorting centres, so swollen power banks must be isolated and reported quickly." },
  { id: 15, title: "Single-use plastics ban", source: "Plastic Waste Management Amendment 2021", text: "India banned identified single-use plastic items from July 2022, including plastic straws, cutlery, plates, cups, stirrers, ear buds with plastic sticks and candy sticks. The better everyday alternatives are cloth bags, steel or glass containers, bamboo toothbrushes and refill systems. Multilayer plastic packets like chips wrappers are not banned but are non-recyclable and typically go to co-processing in cement kilns or landfill." },
  { id: 16, title: "Glass recycling & safety", source: "CPCB disposal practice notes", text: "Glass bottles and jars are infinitely recyclable without quality loss, saving about thirty percent of production energy. Rinse containers and remove metal caps, which go with metal recycling. Broken glass, mirrors, windows and ceramics cannot join bottle recycling because they have different melting points; wrap broken pieces in layered newspaper, tape them and mark clearly as broken glass sharp so waste workers stay safe." },
  { id: 17, title: "Compost quality & soil link", source: "ICAR soil health guidance", text: "Good compost is dark, crumbly and smells like forest soil. Plastic contamination is the biggest quality killer, so segregate organics carefully. Compost returns carbon and nitrogen to soil, improves water retention so fields need less irrigation, and reduces chemical fertiliser demand. A kilogram of kitchen waste diverted from landfill to compost avoids roughly 0.5 kilograms of carbon dioxide equivalent emissions." },
  { id: 18, title: "Running a household waste audit", source: "SwachhAI methodology note", text: "To audit household waste, collect all waste for one week in four labelled buckets for wet, dry, sanitary and hazardous streams, weigh each stream daily, and note the percentages. Typical urban Indian households generate 0.3 to 0.5 kilograms per person per day, of which fifty to sixty percent is usually organic. Use the audit to set monthly targets such as composting all organics and reaching ninety percent dry waste recycling, then re-weigh monthly to track progress." },
  { id: 19, title: "Dumpsite hazards & citizen action", source: "CPCB landfill fire advisories", text: "Mixed waste dumpsites catch fire when methane pockets ignite in summer heat, releasing dioxins, furans and PM2.5 across nearby neighbourhoods. Never burn leaves, plastics or mixed waste yourself; leaf burning alone spikes fine particulate pollution sharply. Citizens can report garbage vulnerable points and open burning through the Swachhata app or the municipality helpline, and push their ward for a decentralised material recovery facility." },
  { id: 20, title: "PET bottle recycling chain", source: "Plastics recycling industry walk-through", text: "A PET bottle's journey runs through collection, sorting, hot washing, flaking and then either bottle-to-bottle resin or polyester fibre for textiles. Labels and caps made of polypropylene are separated in float tanks during washing for their own recycling streams. The highest value outcome is food-grade bottle-to-bottle recycling, which India approved in 2022, but it only works if bottles arrive clean and uncrushed enough to sort by machine." },
];

/* ---------------- tokenization + tf-idf ---------------- */

const STOP = new Set("a an the is are was were it its of to in on for with and or as at by from that this these those i my we our you your how what why when where can should do does did not no yes be been being have has had into out about over under if then them they he she his her their".split(" "));

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

const docTokens: string[][] = CORPUS.map((c) => tokenize(c.title + " " + c.text));
const df = new Map<string, number>();
docTokens.forEach((toks) => {
  new Set(toks).forEach((t) => df.set(t, (df.get(t) ?? 0) + 1));
});
const N = CORPUS.length;
const idf = (t: string) => Math.log(1 + N / (1 + (df.get(t) ?? 0)));

function vector(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  tokens.forEach((t) => tf.set(t, (tf.get(t) ?? 0) + 1));
  const v = new Map<string, number>();
  tf.forEach((f, t) => v.set(t, (f / tokens.length) * idf(t)));
  return v;
}

const docVecs = docTokens.map(vector);

function cosine(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0, na = 0, nb = 0;
  a.forEach((va, t) => {
    na += va * va;
    const vb = b.get(t);
    if (vb) dot += va * vb;
  });
  b.forEach((vb) => (nb += vb * vb));
  if (!na || !nb) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

export interface Retrieved {
  chunk: Chunk;
  score: number;
}

export function retrieve(query: string, k = 3): Retrieved[] {
  const qv = vector(tokenize(query));
  const scored = CORPUS.map((chunk, i) => ({ chunk, score: cosine(qv, docVecs[i]) }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, k).filter((r) => r.score > 0.02);
}

/* ---------------- answer synthesis ---------------- */

export interface RagAnswer {
  kind: "answer" | "fallback" | "meta";
  lead: string;
  sentences: string[];
  citations: Retrieved[];
  confidence: number;
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20);
}

const META_PATTERNS: { re: RegExp; answer: string }[] = [
  {
    re: /\b(hi|hello|hey|namaste|good morning|good evening)\b/i,
    answer:
      "Namaste! I'm the SwachhAI assistant — grounded in municipal waste rules and circular-economy practices. Ask me anything: where a battery goes, how to start composting, what the plastic codes mean, or how to cut your household's footprint.",
  },
  {
    re: /\b(thank|thanks|great|awesome|nice)\b/i,
    answer:
      "You're welcome! Every correct sort moves us toward a circular economy. Try me with tricky items like a 'milk pouch', 'power bank' or 'pizza box' — or open the classifier above for image-style queries.",
  },
  {
    re: /\bwho (are|r) (you|u)\b|\byour name\b|\bwhat can (you|u) do\b/i,
    answer:
      "I'm a retrieval-augmented assistant: instead of guessing, I first search a curated corpus of Indian solid-waste rules, CPCB guidance and circular-economy facts, then compose an answer citing the exact passages I used. That's why you can trust the sources under each reply.",
  },
  {
    re: /\bsdg|sustainable development goal/i,
    answer:
      "This project primarily serves SDG 12 — Responsible Consumption & Production, by turning residents into informed sorters. It secondarily advances SDG 11 (Sustainable Cities & Communities) through cleaner collection streams, and SDG 13 (Climate Action) by making landfill-methane avoidance and recycling energy savings visible at household scale.",
  },
];

export function answer(query: string): RagAnswer {
  const q = query.trim();

  for (const m of META_PATTERNS) {
    if (m.re.test(q)) {
      return { kind: "meta", lead: m.answer, sentences: [], citations: [], confidence: 99 };
    }
  }

  const hits = retrieve(q, 3);
  if (!hits.length || hits[0].score < 0.03) {
    return {
      kind: "fallback",
      lead:
        "I couldn't ground that in my knowledge base, so I won't guess. My corpus covers waste segregation, composting, e-waste, plastics, hazardous items, and climate impacts. Try rephrasing — or ask one of the suggested questions.",
      sentences: [],
      citations: [],
      confidence: 18,
    };
  }

  const qTokens = new Set(tokenize(q));
  const top = hits[0];

  // sentence-level re-rank inside best + second chunk
  const pool = [top, ...hits.slice(1, 2)];
  const ranked: string[] = [];
  pool.forEach((h, hi) => {
    const sents = splitSentences(h.chunk.text).map((s) => {
      const st = tokenize(s);
      const overlap = st.filter((t) => qTokens.has(t)).length;
      return { s, score: overlap / Math.max(4, st.length), hi };
    });
    sents.sort((a, b) => b.score - a.score);
    const take = hi === 0 ? 3 : 1;
    sents.slice(0, take).forEach((x) => ranked.push(x.s));
  });

  const dedup = [...new Set(ranked)].slice(0, 4);
  const lead =
    "Based on the retrieved guidance, here's what matters most:";
  const confidence = Math.min(97, Math.round(48 + top.score * 210));

  return {
    kind: "answer",
    lead,
    sentences: dedup,
    citations: hits,
    confidence,
  };
}

export const SUGGESTED_PROMPTS = [
  "How do I start composting at home?",
  "Where should I throw old batteries?",
  "What do plastic recycling codes mean?",
  "Is a CFL bulb e-waste or hazardous?",
  "How much energy does recycling save?",
  "How do I run a household waste audit?",
];
