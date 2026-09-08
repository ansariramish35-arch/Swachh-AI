/* ------------------------------------------------------------------
   SwachhAI · Knowledge base + classification engine (client-side demo)
   Simulates an IBM Granite-style entity-extraction + classification
   pipeline against a curated waste-taxonomy knowledge graph grounded
   in Indian SWM Rules 2016 practice (green = wet, blue = dry).
------------------------------------------------------------------- */

export type WasteCategory =
  | "wet"
  | "dry"
  | "ewaste"
  | "hazard"
  | "sanit"
  | "textil"
  | "debris"
  | "reject";

export interface CategoryInfo {
  key: WasteCategory;
  label: string;
  sub: string;
  bin: string;
  color: string;
  soft: string; // soft rgba background
  blurb: string;
}

export const CATEGORIES: Record<WasteCategory, CategoryInfo> = {
  wet: {
    key: "wet",
    label: "Wet Waste",
    sub: "Biodegradable / compostable",
    bin: "Green bin · compost",
    color: "#8bd94b",
    soft: "rgba(139,217,75,0.12)",
    blurb: "Organics that rot fast. Compost nutrients back to soil instead of leaking methane from landfills.",
  },
  dry: {
    key: "dry",
    label: "Dry Recyclables",
    sub: "Recyclable materials",
    bin: "Blue bin · dry waste",
    color: "#62c6ff",
    soft: "rgba(98,198,255,0.12)",
    blurb: "Clean, dry, saleable materials. Recycling them avoids virgin extraction and saves major energy.",
  },
  ewaste: {
    key: "ewaste",
    label: "E-Waste",
    sub: "Electronics & circuitry",
    bin: "Authorised e-waste centre",
    color: "#b79cff",
    soft: "rgba(183,156,255,0.12)",
    blurb: "Devices contain gold and copper — and toxins. Route through EPR-authorised recyclers only, never bins.",
  },
  hazard: {
    key: "hazard",
    label: "Domestic Hazard",
    sub: "Toxic / reactive household waste",
    bin: "Sealed · take-back / drive",
    color: "#ff6b6b",
    soft: "rgba(255,107,107,0.12)",
    blurb: "Mercury, solvents, acids and pharma. These poison waste workers and aquifers when dumped casually.",
  },
  sanit: {
    key: "sanit",
    label: "Sanitary Waste",
    sub: "Hygiene & bio-soiled items",
    bin: "Wrapped · marked · separate",
    color: "#ffb35c",
    soft: "rgba(255,179,92,0.12)",
    blurb: "Wrap securely and mark as sanitary waste — protects sanitation workers from infection risk.",
  },
  textil: {
    key: "textil",
    label: "Textile Reuse",
    sub: "Wearables & fabrics",
    bin: "Donate / textile recycler",
    color: "#5ce0b8",
    soft: "rgba(92,224,184,0.12)",
    blurb: "Fashion is a top-10 global polluter. Reuse first, downcycle into rags or insulation as a last resort.",
  },
  debris: {
    key: "debris",
    label: "C&D Debris",
    sub: "Construction & demolition",
    bin: "Designated C&D site",
    color: "#c9b18c",
    soft: "rgba(201,177,140,0.12)",
    blurb: "Never mixed with household waste. Recycled into kerb stones, paver blocks and road aggregates.",
  },
  reject: {
    key: "reject",
    label: "Reject / Hard-to-Recycle",
    sub: "Composite or contaminated",
    bin: "Reject stream · co-processing",
    color: "#93a39b",
    soft: "rgba(147,163,155,0.12)",
    blurb: "Multi-layer composites defeat recyclers. Best handled via co-processing in cement kilns — or avoided.",
  },
};

export interface WasteItem {
  name: string;
  aliases: string[];
  category: WasteCategory;
  guidance: string[];
  fact: string;
}

export const ITEMS: WasteItem[] = [
  // ---------------- WET ----------------
  { name: "banana peel", aliases: ["banana skin", "kela ka chilka", "banana peels"], category: "wet", guidance: ["Drop straight into the green (wet) bin.", "No packaging needed — it composts fast.", "For home composting, chop it small to speed breakdown."], fact: "Organics like this become compost in ~8 weeks instead of emitting methane in a landfill for years." },
  { name: "vegetable peels", aliases: ["veg peels", "vegetable scraps", "sabzi ke chilke", "potato peel", "onion peel", "kitchen scraps"], category: "wet", guidance: ["Add to the green bin daily.", "Drill-free compost: layer with dry leaves in a pot.", "Avoid mixing with plastic — it contaminates compost."], fact: "Roughly 50–55% of Indian household waste is wet waste — your single biggest climate lever." },
  { name: "tea leaves", aliases: ["used tea", "chai patti", "tea powder used", "green tea leaves"], category: "wet", guidance: ["Green bin or compost bin.", "Rinse and squeeze before discarding if possible."], fact: "Composted tea leaves add nitrogen — the 'green' fuel of a compost pile." },
  { name: "tea bag", aliases: ["used tea bag", "teabag"], category: "wet", guidance: ["Paper tea bags (no staples) → green bin.", "Silky/plastic mesh bags → cut open, compost leaves, bin the mesh in reject.", "Remove any staple or plastic tag first."], fact: "Many 'silky' tea bags are plastic mesh that shed microplastics — check the tag." },
  { name: "coffee grounds", aliases: ["used coffee", "coffee waste", "filter coffee waste"], category: "wet", guidance: ["Green bin or compost.", "Great direct soil amendment for acid-loving plants."], fact: "Coffee grounds are a free nitrogen boost for soils and even repel some garden pests." },
  { name: "eggshell", aliases: ["egg shell", "eggshells", "ande ka chilka"], category: "wet", guidance: ["Crush and add to wet bin/compost.", "Rich in calcium — great for compost quality."], fact: "Crushed eggshells decompose into free calcium that balances compost acidity." },
  { name: "leftover food", aliases: ["cooked food", "food waste", "khaana bacha hua", "stale food", "spoiled food"], category: "wet", guidance: ["Drain excess liquid, then green bin daily.", "Never mix with plastic packaging.", "For open home-compost piles, bury cooked food under browns to avoid pests."], fact: "Globally, food waste drives ~8–10% of greenhouse gas emissions — more than aviation and shipping combined." },
  { name: "flowers", aliases: ["garland", "puja flowers", "temple flowers", "marigold", "phool"], category: "wet", guidance: ["Unstring them — the thread goes to dry/reject.", "Green bin or dedicated flower-compost collection.", "Never dump in water bodies with plastic wrapping."], fact: "Temple-flower recycling startups across India turn garlands into incense, soap and compost." },
  { name: "dry leaves", aliases: ["fallen leaves", "garden leaves", "pattiyan", "leaf litter"], category: "wet", guidance: ["Ideal 'brown' for composting — mix 2–3 parts with 1 part kitchen waste.", "Bigger volumes go to municipal horticulture/leaf banks.", "Never burn — leaf burning spikes PM2.5 sharply."], fact: "Burning one tonne of dry leaves releases ~1,500 kg CO₂-equivalent smoke and soot." },
  { name: "grass clippings", aliases: ["lawn grass", "garden waste small", "hedge trimmings", "twigs small"], category: "wet", guidance: ["Compost with dry browns to avoid smells.", "Or leave clippings on the lawn as instant mulch."], fact: "Mulching grass clippings returns ~25% of your lawn's nitrogen needs for free." },
  { name: "paper napkin", aliases: ["tissue paper used", "tissue", "paper towel used", "tissue paper"], category: "wet", guidance: ["Food-soiled paper napkins can go to compost/wet bin.", "Chemical-cleaner-soiled tissue → reject bin instead.", "Never put used tissue into dry recyclables — it contaminates paper bales."], fact: "Once soiled, paper fibre can't be recycled — composting keeps it out of landfill safely." },

  // ---------------- DRY ----------------
  { name: "plastic bottle", aliases: ["pet bottle", "water bottle", "bottle plastic", "cold drink bottle", "bisleri bottle"], category: "dry", guidance: ["Empty it fully and give a quick rinse.", "Crush to save transport volume.", "Cap on or off — both are collected in dry waste.", "Blue bin or kabadiwala."], fact: "A PET bottle can be reborn as T-shirt yarn in ~6 weeks; in a landfill it outlives you by ~450 years." },
  { name: "cardboard box", aliases: ["carton", "corrugated box", "amazon box", "flipkart box", "box"], category: "dry", guidance: ["Flatten to save 80% volume.", "Remove plastic tape strips if easy.", "Keep it dry — soggy cardboard is rejected.", "Blue bin or sell to kabadiwala."], fact: "Cardboard recycles 5–7 times before fibres get too short — then it can be composted." },
  { name: "newspaper", aliases: ["paper newspaper", "akhbar", "old newspaper"], category: "dry", guidance: ["Stack or bundle with string.", "Keep dry and food-free.", "Kalabazar/kabadi fetch ~₹8–14 per kg in most cities."], fact: "Every tonne of recycled newspaper saves ~17 trees and 26,000 litres of process water." },
  { name: "office paper", aliases: ["white paper", "printouts", "a4 paper", "notebook", "books", "magazines", "copier paper"], category: "dry", guidance: ["Remove spiral binding or plastic covers if possible.", "Shredded paper: bag it separately and label 'paper'.", "Keep away from wet waste."], fact: "White office paper is premium fibre — it can be recycled up to 7 times." },
  { name: "aluminum can", aliases: ["aluminium can", "soda can", "beer can", "cold drink can", "can"], category: "dry", guidance: ["Rinse once; don't crush fully if MRF sorting.", "Blue bin or scrap dealer — aluminium has the best scrap value.", "Small foil balls ≥ golf-ball size are also accepted."], fact: "Recycling an aluminium can saves ~95% of the energy needed to make a new one — enough to run a TV for 3 hours." },
  { name: "steel container", aliases: ["tin can", "steel dabba", "food can", "tin box", "biscuit tin", "steel utensils"], category: "dry", guidance: ["Rinse off food; lid loose is fine.", "Edges sharp? tape or wrap them.", "Scrap value is good — kabadiwalas take it gladly."], fact: "Steel is the most recycled material on Earth and can be recycled infinitely without quality loss." },
  { name: "glass bottle", aliases: ["glass jar", "jam jar", "beer bottle glass", "liquor bottle", "wine bottle"], category: "dry", guidance: ["Rinse and remove caps (caps go separately).", "Handle carefully; hand over unbroken when possible.", "Keep wrapped if chipped to protect workers."], fact: "Glass is infinitely recyclable — recycling it saves ~30% of the energy of making it fresh." },
  { name: "milk pouch", aliases: ["milk packet", "amul packet", "doodh ka packet"], category: "dry", guidance: ["Cut open fully and rinse — this is non-negotiable for recycling.", "Sun-dry to stop smells.", "Bundle pouches together so sorters don't miss them.", "Blue bin."], fact: "Milk pouches are pure LDPE film — genuinely recyclable, but only when rinsed and dry." },
  { name: "plastic container", aliases: ["food container", "dabba", "tupperware", "yogurt cup", "curd container", "takeaway container"], category: "dry", guidance: ["Scrape food out and rinse.", "Check the resin code — PP (5) and HDPE (2) are widely recycled.", "Batter-dirty containers: wash first or they get rejected."], fact: "Oil and food residue is the #1 reason 'recyclable' containers end up landfilled." },
  { name: "shampoo bottle", aliases: ["detergent bottle", "conditioner bottle", "lotion bottle", "handwash bottle"], category: "dry", guidance: ["Use it up fully; a final water swish cleans it.", "Pump tops with metal springs: remove if you can.", "Blue bin — HDPE has strong recycling demand."], fact: "HDPE bottles become pipes, benches and new bottles — one of the most circular plastics." },
  { name: "plastic toys", aliases: ["old toys plastic", "broken toy", "action figure", "lego"], category: "dry", guidance: ["Working toys: donate instead — reuse beats recycling.", "Rigid plastic toys are recyclable as hard plastic.", "Battery-operated toys: remove batteries first (they're hazardous)."], fact: "90% of toys are plastic and ~80% end up in landfill — donation doubles their life instantly." },
  { name: "aluminium foil", aliases: ["silver foil", "chapati foil", "food foil clean"], category: "dry", guidance: ["Only clean foil is recyclable — food-stuck foil is reject.", "Scrunch into a ball at least golf-ball sized.", "Blue bin with metals."], fact: "Foil is the same aluminium as cans — clean foil carries the same 95% energy-saving upside." },

  // ---------------- E-WASTE ----------------
  { name: "mobile phone", aliases: ["old phone", "smartphone", "cell phone", "iphone", "android phone"], category: "ewaste", guidance: ["Back up, then factory-reset and wipe data.", "Remove SIM and memory cards.", "Deposit at brand take-back, authorised e-waste recycler, or certified drive.", "Never sell to informal dismantlers — toxins leak and data can leak too."], fact: "One tonne of phones holds more gold than 17 tonnes of gold ore — 'urban mining' is real." },
  { name: "laptop", aliases: ["computer", "old laptop", "notebook computer", "desktop", "macbook", "monitor", "screen"], category: "ewaste", guidance: ["Wipe the drive (secure erase, not just delete).", "Remove the battery if detachable — store terminals taped.", "Use producer take-back (EPR) or authorised e-waste centres."], fact: "India generated ~1.6 million tonnes of e-waste in 2023 — the world's third largest producer." },
  { name: "charger", aliases: ["charging cable", "usb cable", "adapter", "earphones", "earbuds", "headphones", "mouse", "keyboard", "wires", "cables"], category: "ewaste", guidance: ["Bundle cables so they don't tangle machinery.", "Cut plug off broken cables isn't needed — just keep dry.", "Drop with e-waste, not dry waste."], fact: "Cable copper is endlessly recyclable; a dead cable still holds ~50% recoverable metal by weight." },
  { name: "power bank", aliases: ["powerbank", "portable charger"], category: "ewaste", guidance: ["Li-ion inside — never puncture, crush, or toss in bins (fire risk).", "If swollen, isolate in sand/metal box and take to e-waste point urgently.", "Tape the output port terminals."], fact: "Damaged lithium cells are a leading cause of garbage-truck and MRF fires in cities." },
  { name: "led bulb", aliases: ["led lamp", "smart bulb"], category: "ewaste", guidance: ["LEDs contain circuit boards — e-waste, not glass waste.", "Keep unbroken; hand at e-waste collection."], fact: "LEDs are mercury-free (unlike CFLs) but still carry recoverable copper and rare earths." },
  { name: "remote control", aliases: ["tv remote", "ac remote", "calculator", "digital watch", "smartwatch", "fitbit"], category: "ewaste", guidance: ["Remove batteries first — batteries are handled separately.", "Aggregate small devices and drop together at e-waste points."], fact: "Small gadgets are the most hoarded e-waste; urban India's drawers hold millions of dormant devices." },
  { name: "home appliance", aliases: ["iron box", "mixer", "grinder", "microwave", "hair dryer", "trimmer", "toaster", "kettle", "electric iron"], category: "ewaste", guidance: ["Working? Repair or donate first.", "Dead appliances: producer take-back or authorised recycler.", "Cut cord not needed; keep intact and dry."], fact: "Under India's E-Waste Rules 2022, producers must finance end-of-life recycling — take-back is your right." },
  { name: "printer", aliases: ["router", "wifi router", "scanner", "ink cartridge", "ups"], category: "ewaste", guidance: ["Ink/toner cartridges: many brands take them back free.", "Devices go to authorised e-waste handlers.", "Reset any stored network data before disposal."], fact: "A single toner cartridge takes ~1 litre of oil to make — refill or return, don't bin." },
  { name: "tv", aliases: ["television", "old tv", "led tv", "lcd panel"], category: "ewaste", guidance: ["Don't break the panel — backlights contain hazardous materials.", "Contact brand exchange offers or e-waste centres.", "Working TVs: donate to schools/NGOs."], fact: "A single CRT TV holds 1–2 kg of lead in its glass — safe disposal is non-negotiable." },
  { name: "cd dvd", aliases: ["cds", "dvds", "compact disc", "vhs tape", "cassette"], category: "ewaste", guidance: ["Scratch data side before disposal.", "Store until an e-waste drive — don't landfill polycarbonate.", "Cases: paper booklet → dry; jewel case → hard plastic."], fact: "Discs are layered polycarbonate + aluminium; recycling recovers both when routed correctly." },

  // ---------------- HAZARD ----------------
  { name: "battery", aliases: ["batteries", "aa battery", "aaa battery", "cell batteries", "pencil battery", "alkaline battery"], category: "hazard", guidance: ["Never in any dustbin — leaches acids and heavy metals.", "Tape the terminals of lithium cells to prevent sparks.", "Return via retail take-back boxes or authorised collection (Battery Waste Rules 2022 make producers responsible)."], fact: "One button cell can contaminate ~600,000 litres of groundwater if landfilled." },
  { name: "cfl bulb", aliases: ["tube light", "tubelight", "fluorescent tube", "cfl"], category: "hazard", guidance: ["Contains mercury vapour — never crush or bin casually.", "Keep intact, wrap in original sleeve/newspaper.", "Hand to e-waste/hazardous collection; if broken, ventilate, scoop with card, seal in a bag."], fact: "Each CFL carries 3–5 mg mercury — safe in the bulb, dangerous when smashed in a landfill." },
  { name: "expired medicine", aliases: ["medicines", "tablets expired", "medicine strip", "syrup bottle", "pills", "old medicine"], category: "hazard", guidance: ["Don't flush or bin loose — active compounds pollute rivers.", "Remove from foil, mix with coffee grounds in a sealed bag (anti-misuse), and hand to pharmacy take-back where available.", "Blister packs: the foil-plastic composite is reject, not dry."], fact: "Pharma residues in Indian rivers have bred antibiotic-resistant bacteria — disposal matters at population scale." },
  { name: "syringe", aliases: ["needle", "injection needle", "insulin pen needle", "razor blade", "blade"], category: "hazard", guidance: ["These are household bio-sharps — never loose in any bag.", "Collect in a hard puncture-proof bottle labelled 'SHARPS'.", "Hand sealed to a clinic, hospital, or pharmacy."], fact: "A single uncovered needle can infect a waste worker for life — sharps protocol saves livelihoods." },
  { name: "paint", aliases: ["paint can", "old paint", "varnish", "thinner", "turpentine", "solvent", "wall paint leftover"], category: "hazard", guidance: ["Liquids: never pour into drains.", "Dry out small leftovers with sand/cat litter, then sealed disposal.", "Usable paint: donate to painters/NGOs.", "Empty dry cans can go to scrap — only when bone dry."], fact: "Paint thinners release VOCs that convert into ground-level ozone — even stored open cans degrade indoor air." },
  { name: "pesticide", aliases: ["insecticide", "roach spray", "mosquito spray refill", "rat poison", "weedicide", "herbicide", "hit spray"], category: "hazard", guidance: ["Keep in original labelled container.", "Never decant into drink bottles — a leading poison tragedy.", "Use municipal hazardous-waste drives; don't drain-pour."], fact: "Agro-chemical residues survive landfills and concentrate in groundwater for decades." },
  { name: "cleaning acid", aliases: ["toilet cleaner", "acid bottle", "bleach", "drain cleaner", "harpic", "tile cleaner"], category: "hazard", guidance: ["Use up fully if possible.", "Rinse the empty bottle 3× before dry-waste disposal.", "Never mix bleach with acids — creates chlorine gas."], fact: "Bleach + acid mixing at home is a genuine ER-level hazard — even AI says: don't experiment." },
  { name: "nail polish", aliases: ["nail paint", "nail polish remover", "acetone", "glue", "superglue", "fevibond"], category: "hazard", guidance: ["Flammable solvents — cap tightly, keep away from heat.", "Small dried-out bottles can go sealed in reject.", "Larger volumes: hazardous collection drives."], fact: "Solvent vapours from 'small' bottles add up — homes are unventilated micro-factories." },
  { name: "thermometer", aliases: ["mercury thermometer", "glass thermometer"], category: "hazard", guidance: ["If it has silver liquid (mercury): double-bag, label 'MERCURY', hazardous drive only.", "If broken: ventilate the room, never vacuum; collect beads with card into a sealed jar.", "Digital thermometers are e-waste instead."], fact: "Mercury vapour is odourless and neurotoxic — a single broken thermometer needs proper capture." },

  // ---------------- SANITARY ----------------
  { name: "diaper", aliases: ["baby diaper", "adult diaper", "pampers", "nappy"], category: "sanit", guidance: ["Flush solids into a toilet first where possible.", "Roll, tape, wrap in newspaper/its own bag, mark as sanitary.", "Hand separately to the collector — not mixed with dry or wet."], fact: "A diaper's plastic shell persists ~500 years; every wrapped, separate diaper protects the worker who handles it." },
  { name: "sanitary pad", aliases: ["sanitary napkin", "pad", "tampon", "menstrual pad", "period pad", "whisper"], category: "sanit", guidance: ["Wrap in newspaper or the disposal bag/rapper provided.", "Mark clearly as sanitary waste, hand separately.", "Schools/colleges: demand pad incinerators or pickup under SWM norms.", "Never flush — pads block sewers instantly."], fact: "India discards ~12 billion pads a year; segregation plus safe incineration is the current best pathway." },
  { name: "face mask", aliases: ["used mask", "surgical mask", "n95", "covid mask"], category: "sanit", guidance: ["Snip the loops so animals don't get entangled.", "Store used masks 72 hours before disposal if someone was ill.", "Bag and hand with sanitary waste."], fact: "Pandemic years added an estimated 8+ million tonnes of plastic mask waste globally." },
  { name: "bandage", aliases: ["gauze", "cotton soiled", "medical cotton", "patti", "dressing waste"], category: "sanit", guidance: ["Blood/fluid-soiled dressings: wrap securely, mark, hand separately.", "Large volumes from home care: use yellow-bag bio-medical collection via clinics."], fact: "Bio-soiled waste handled naked-handed is how hepatitis travels — wrapping is a kindness with a medical payoff." },

  // ---------------- TEXTILE ----------------
  { name: "old clothes", aliases: ["t-shirt old", "tshirt", "jeans old", "saree old", "kurta old", "clothes", "garments", "bedsheet", "curtain", "socks", "cap"], category: "textil", guidance: ["Wearable? Wash and donate — drives, NGOs, shelters.", "Worn-out? Cut as cleaning rags before anything.", "Torn synthetics: textile recyclers downcycle into mop yarn/insulation.", "Never dump clothes wet — mould ruins entire textile bales."], fact: "Producing one cotton T-shirt drinks ~2,700 litres of water — reuse alone repays that debt many times over." },
  { name: "shoes", aliases: ["chappal", "slippers", "sneakers", "sandals", "footwear old"], category: "textil", guidance: ["Usable pairs: donate — paired and tied together.", "Sports shoes: brand take-back programs grind soles into courts/tracks.", "Ruined pairs: reject stream."], fact: "A typical sneaker is 30+ bonded materials — which is why repair and donation beat disposal." },
  { name: "soft toy", aliases: ["teddy bear", "stuffed toy", "plush toy"], category: "textil", guidance: ["Wash and donate if intact.", "Torn stuffing: outer fabric as rag, filling to reject."], fact: "Donated toys circulate joy twice; landfilled plush is just dyed polyester for 200+ years." },

  // ---------------- DEBRIS ----------------
  { name: "construction debris", aliases: ["rubble", "debris", "malba", "concrete waste", "broken tiles", "tiles", "cement blocks", "brick pieces", "plaster waste"], category: "debris", guidance: ["Never mix with household waste — it's a separate stream by law.", "Your municipality must deposit it at designated C&D sites (call the ward office).", "Recycled C&D becomes paver blocks, kerb stones and road base."], fact: "India recycles under 5% of its C&D waste while roads get built on virgin stone — a fixable absurdity." },
  { name: "marble chips", aliases: ["marble waste", "granite pieces", "stone chips waste"], category: "debris", guidance: ["Same as C&D debris — designated sites only.", "Terrazzo and craft makers often accept clean marble offcuts."], fact: "Crushed marble substitutes virgin aggregate in concrete with minor strength loss." },

  // ---------------- REJECT ----------------
  { name: "chips packet", aliases: ["lays packet", "wafer packet", "kurkure packet", "biscuit wrapper", "chocolate wrapper", "toffee wrapper", "mlp", "multilayer plastic", "parle wrapper"], category: "reject", guidance: ["This is multi-layer plastic (MLP) — foil fused to plastic; no recycler wants it.", "Clean empties can go to dry waste only if your ULB runs co-processing tie-ups.", "Best answer: buy larger packs to cut per-unit MLP."], fact: "7 words: it can't be un-layered. MLP goes to cement-kiln co-processing or landfill — design change is the only real fix." },
  { name: "paper cup", aliases: ["disposable cup", "chai paper cup", "coffee cup disposable paper", "paper plate laminated"], category: "reject", guidance: ["Looks recyclable, isn't — a PE plastic film is fused inside.", "Rinse and mark; if your city lacks co-processing, it's reject.", "Steel/glass reusables pay for themselves in ~15 uses."], fact: "~99% of paper cups are not recycled globally — the lining makes them paper-plastic hybrids." },
  { name: "thermocol", aliases: ["styrofoam", "thermacol", "thermacol sheet", "foam packaging", "eps"], category: "reject", guidance: ["Break into large clean slabs; keep food-oiled foam out of recycling.", "Some dry-waste centres accept clean EPS for densification — ask first.", "Else: reject bin; never burn (toxic smoke)."], fact: "EPS is 95% air — transport to recyclers costs more than the material; Ask your city for a densifier." },
  { name: "oily pizza box", aliases: ["pizza box", "greasy cardboard", "food stained cardboard"], category: "reject", guidance: ["Tear it: clean lid and sides → dry waste.", "Grease-soaked base → compost if uncoated, else reject.", "Grease blocks paper fibres from re-bonding."], fact: "Grease, not cardboard, is the problem — a 30-second tear-up doubles the box's recycled share." },
  { name: "broken glass", aliases: ["glass pieces", "broken mirror", "mirror broken", "shattered glass"], category: "reject", guidance: ["Safety first: wrap in layered newspaper, tape, mark 'BROKEN GLASS — SHARP'.", "Hand over separately to the collector (most cities: dry, wrapped; check yours).", "Window/treated glass can't be bottle-recycled anyway."], fact: "Marking sharps is a 10-second act that prevents the most common injury among waste workers." },
  { name: "ceramic", aliases: ["broken cup ceramic", "crockery", "broken plate", "kulhad broken", "mug broken"], category: "reject", guidance: ["Not glass-recyclable — ceramics melt at different temperatures and poison glass batches.", "Wrap sharp pieces, label, reject stream.", "Artisans and mosaic makers sometimes take clean shards."], fact: "One ceramic mug in a glass furnace can ruin an entire 40-tonne glass batch." },
  { name: "bubble wrap", aliases: ["air bubble plastic", "packing bubble", "plastic film wrap", "cling wrap", "plastic wrap"], category: "reject", guidance: ["Clean LDPE film: some dry centres accept — compress and bundle.", "Food-stained film: reject.", "Reuse for storage/moving first; it lasts years."], fact: "Soft films jam MRF machinery — bagging films together keeps conveyors safe." },
  { name: "toothbrush", aliases: ["old toothbrush", "brush plastic"], category: "reject", guidance: ["Mixed nylon + PP too small to sort — reject stream.", "Bamboo brushes: compost the handle after plucking bristles.", "Better: brand take-back dental programs (Colgate/TerraCycle style)."], fact: "Every toothbrush you ever used still exists somewhere — a perfect argument for redesign." },
];

/* ------------------------------------------------------------------ */
/*  Matching engine — fuzzy, typo tolerant                             */
/* ------------------------------------------------------------------ */

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = new Array(n + 1).fill(0).map((_, j) => j);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return dp[n];
}

export interface MatchResult {
  item: WasteItem;
  score: number; // 0..1 match quality
  confidence: number; // calibrated percent 55..98
  alternatives: WasteItem[];
}

export function classifyItem(rawQuery: string): MatchResult | null {
  const q = normalize(rawQuery);
  if (!q) return null;
  const qTokens = q.split(" ");
  const scored: { item: WasteItem; score: number }[] = [];

  for (const item of ITEMS) {
    const targets = [normalize(item.name), ...item.aliases.map(normalize)];
    let best = 0;
    for (const t of targets) {
      if (!t) continue;
      if (t === q) best = Math.max(best, 1);
      else if (q.includes(t) || t.includes(q)) best = Math.max(best, 0.9);
      else {
        const tTokens = t.split(" ");
        const overlap = qTokens.filter((x) => tTokens.includes(x)).length;
        const r = overlap / Math.max(qTokens.length, tTokens.length);
        if (r >= 0.5) best = Math.max(best, 0.55 + r * 0.3);
      }
      // typo tolerance on single word query
      if (q.length > 3) {
        for (const tTok of t.split(" ")) {
          if (Math.abs(tTok.length - q.length) <= 2 && tTok.length > 3) {
            const d = levenshtein(q, tTok);
            const sim = 1 - d / Math.max(q.length, tTok.length);
            if (sim >= 0.72) best = Math.max(best, 0.62 + sim * 0.25);
          }
        }
      }
    }
    if (best > 0) scored.push({ item, score: best });
  }

  scored.sort((a, b) => b.score - a.score);
  if (!scored.length || scored[0].score < 0.5) return null;

  const top = scored[0];
  const confidence = Math.min(98, Math.round(72 + top.score * 26 - (scored[1] && scored[1].score > 0.8 ? 6 : 0)));
  return {
    item: top.item,
    score: top.score,
    confidence,
    alternatives: scored.slice(1, 4).map((s) => s.item),
  };
}

export const QUICK_CHIPS = [
  "banana peel",
  "plastic bottle",
  "old phone",
  "battery",
  "diaper",
  "cardboard box",
  "CFL bulb",
  "chips packet",
  "glass jar",
  "expired medicine",
  "charger",
];

export const SAMPLE_SEARCHES = [
  "milk pouch",
  "power bank",
  "pizza box",
  "temple flowers",
  "paint can",
];
