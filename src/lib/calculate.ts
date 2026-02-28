import { WAGE_CONFIG } from "./config";

export interface WageInput {
  startlonn: number;
  erfaringsNiva: number;
  omrade: string;
  fagbrev: boolean;
  skift: boolean;
  lederFader: boolean;
  ansvarCount: number;
  kompetanseCount: number;
  ansiennitetIndex: number;
}

export interface BreakdownItem {
  label: string;
  value: number;
}

export interface WageResult {
  breakdown: BreakdownItem[];
  total: number;
  monthlyEstimate: number;
  yearlyEstimate: number;
}

export function calculateWage(input: WageInput): WageResult {
  const breakdown: BreakdownItem[] = [];

  breakdown.push({ label: "Startlønn", value: input.startlonn });

  const erfaring =
    WAGE_CONFIG.erfaringsNiva.find((e) => e.level === input.erfaringsNiva)
      ?.addition ?? 0;
  if (erfaring > 0) {
    const erfaringLabel =
      WAGE_CONFIG.erfaringsNiva.find((e) => e.level === input.erfaringsNiva)
        ?.label ?? "";
    breakdown.push({ label: `Erfaring (${erfaringLabel})`, value: erfaring });
  }

  const omrade = WAGE_CONFIG.omrade[input.omrade] ?? 0;
  if (omrade > 0) {
    breakdown.push({ label: `Område (${input.omrade})`, value: omrade });
  }

  if (input.fagbrev) {
    breakdown.push({ label: "Fagbrev", value: WAGE_CONFIG.fagbrev });
  }

  if (input.skift) {
    breakdown.push({ label: "Skift", value: WAGE_CONFIG.skift });
  }

  if (input.lederFader) {
    breakdown.push({ label: "Leder/Fader", value: WAGE_CONFIG.lederFader });
  }

  const ansvar = input.ansvarCount * WAGE_CONFIG.ansvarPerItem;
  if (ansvar > 0) {
    breakdown.push({
      label: `Ansvar (${input.ansvarCount} stk)`,
      value: ansvar,
    });
  }

  const kompetanse = input.kompetanseCount * WAGE_CONFIG.kompetansePerItem;
  if (kompetanse > 0) {
    breakdown.push({
      label: `Kompetanse (${input.kompetanseCount} stk)`,
      value: kompetanse,
    });
  }

  const ansiennitet = WAGE_CONFIG.ansiennitet
    .slice(0, input.ansiennitetIndex + 1)
    .reduce((sum, a) => sum + a.addition, 0);
  if (ansiennitet > 0) {
    const ansiennitetLabel =
      WAGE_CONFIG.ansiennitet[input.ansiennitetIndex]?.years ?? "";
    breakdown.push({
      label: `Ansiennitet (${ansiennitetLabel})`,
      value: ansiennitet,
    });
  }

  const total = breakdown.reduce((sum, item) => sum + item.value, 0);
  const monthlyEstimate = total * WAGE_CONFIG.hoursPerMonth;

  const yearlyEstimate = monthlyEstimate * 12;

  return { breakdown, total, monthlyEstimate, yearlyEstimate };
}
