/* ------------------------------------------------------------------
   SwachhAI · impact prediction model (transparent, coefficient-based)
   Baselines are deliberately conservative & documented for the
   "Transparency" requirement of the Responsible AI section.
------------------------------------------------------------------- */

export interface HouseholdInputs {
  people: number; // 1..8
  weeklyWaste: number; // kg/week total
  segregation: number; // 0..100 % currently segregated at source
  composting: number; // 0..100 % of organics currently composted
}

export interface PlanFlags {
  segregate: boolean; // adopt 95% source segregation
  compost: boolean; // compost all organics
  recycle: boolean; // recycle 85% of dry stream
}

export const COMPOSITION = {
  organic: 0.55, // share of household waste (typ. urban India 50–60%)
  dry: 0.25, // recyclable dry stream
  reject: 0.2, // rejects / sanitary
};

export const FACTORS = {
  organicKgCO2AvoidedPerKg: 0.47, // landfill methane avoided via composting
  dryKgCO2AvoidedPerKg: 1.1, // blended recycled materials vs virgin
  treeAbsorbKgPerYear: 21, // avg mature tree sequestration
  carKgPerKm: 0.192, // avg petrol passenger car
  truckloadKg: 4000, // small compactor truck
};

export interface ImpactResult {
  annual: number; // kg waste / yr
  baselineDiverted: number; // kg/yr today
  plannedDiverted: number; // kg/yr with plan
  deltaDiverted: number; // kg/yr new diversion
  deltaCO2: number; // kg CO2e/yr avoided
  landfillCutPct: number; // % reduction vs today
  trees: number;
  carKm: number;
  score: number; // 0..100 swachh score with plan adopted
  monthly: { month: string; baseline: number; plan: number }[];
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function computeImpact(inp: HouseholdInputs, plan: PlanFlags): ImpactResult {
  const annual = inp.weeklyWaste * 52;

  // --- baseline (today)
  const baseOrganicRecovered = annual * COMPOSITION.organic * (inp.composting / 100);
  const baseDryRecycled =
    annual * COMPOSITION.dry * (inp.segregation / 100) * 0.7; // 70% capture of clean dry
  const baselineDiverted = baseOrganicRecovered + baseDryRecycled;

  // --- planned (with SwachhAI-enabled behaviour)
  const seg = plan.segregate ? 0.95 : inp.segregation / 100;
  const comp = plan.compost ? 1 : inp.composting / 100;
  const dryShare = plan.recycle ? 0.85 : 0.7;

  const planOrganic = annual * COMPOSITION.organic * comp;
  const planDry = annual * COMPOSITION.dry * seg * dryShare;
  const plannedDiverted = planOrganic + planDry;

  const deltaDiverted = Math.max(0, plannedDiverted - baselineDiverted);
  const deltaCO2 =
    Math.max(0, planOrganic - baseOrganicRecovered) * FACTORS.organicKgCO2AvoidedPerKg +
    Math.max(0, planDry - baseDryRecycled) * FACTORS.dryKgCO2AvoidedPerKg;

  const landfillToday = annual - baselineDiverted;
  const landfillPlan = annual - plannedDiverted;
  const landfillCutPct = landfillToday > 0 ? (1 - landfillPlan / landfillToday) * 100 : 0;

  // behaviour-adjusted seasonal curve (trees grow / festivals spike)
  const seasonal = [0.94, 0.9, 0.96, 1.02, 1.06, 1.03, 1.0, 0.98, 1.0, 1.12, 1.08, 0.97];
  let bSum = 0, pSum = 0;
  const monthly = MONTHS.map((m, i) => {
    bSum += (baselineDiverted / 12) * seasonal[i];
    pSum += (plannedDiverted / 12) * seasonal[i];
    return { month: m, baseline: Math.round(bSum), plan: Math.round(pSum) };
  });

  const adoption = (plan.segregate ? 1 : 0) + (plan.compost ? 1 : 0) + (plan.recycle ? 1 : 0);
  const score = Math.round(
    Math.min(100, 22 + (inp.segregation / 100) * 18 + (inp.composting / 100) * 14 + adoption * 14.5)
  );

  return {
    annual,
    baselineDiverted,
    plannedDiverted,
    deltaDiverted,
    deltaCO2,
    landfillCutPct: Math.round(landfillCutPct),
    trees: Math.round(deltaCO2 / FACTORS.treeAbsorbKgPerYear),
    carKm: Math.round(deltaCO2 / FACTORS.carKgPerKm),
    score,
    monthly,
  };
}

export function fmt(n: number, decimals = 0): string {
  return n.toLocaleString("en-IN", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
}

export function fmtKg(kg: number): { value: string; unit: string } {
  if (kg >= 1000) return { value: (kg / 1000).toFixed(1), unit: "tonnes" };
  return { value: fmt(kg), unit: "kg" };
}
