export const WAGE_CONFIG = {
  defaultStartlonn: 253,
  hoursPerMonth: 162.5,

  // Yes/No additions (kr/hour)
  fagbrev: 15,
  skift: 70,
  lederFader: 15,

  // Per-item additions (kr/hour per count)
  ansvarPerItem: 10,
  kompetansePerItem: 10,

  // Department additions
  omrade: {
    Probe: 0,
    System: 5,
    Lager: 10,
    Other: 20,
  } as Record<string, number>,

  // Experience level additions
  erfaringsNiva: [
    { level: 0, label: "0 (Ny)", addition: 0 },
    { level: 1, label: "1 (1-4 år)", addition: 2 },
    { level: 2, label: "2 (5-9 år)", addition: 4 },
    { level: 3, label: "3 (10-14 år)", addition: 7 },
    { level: 4, label: "4 (15+ år)", addition: 10 },
  ],

  // Seniority additions
  ansiennitet: [
    { years: "0 år", addition: 0 },
    { years: "2 år", addition: 2 },
    { years: "5 år", addition: 5 },
    { years: "10 år", addition: 5 },
    { years: "15 år", addition: 6 },
  ],
};

export const AUTH_PASSWORD = "changeme!";
