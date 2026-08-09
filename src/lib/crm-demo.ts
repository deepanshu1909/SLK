export type CRMStage = "New" | "Warm" | "Hot" | "Booked";
export type CRMVertical = "Salon & Spa" | "Clinic" | "Pathology Lab";

export interface CRMDemoRecord {
  id: string;
  name: string;
  source: string;
  score: number;
  stage: CRMStage;
  value: string;
  vertical: CRMVertical;
  createdAt: string;
}

export const crmStages: CRMStage[] = ["New", "Warm", "Hot", "Booked"];
export const crmVerticals: CRMVertical[] = [
  "Salon & Spa",
  "Clinic",
  "Pathology Lab",
];

const firstNames = [
  "Aarav",
  "Amelia",
  "Aria",
  "Daniel",
  "Elena",
  "Emma",
  "Ishaan",
  "Liam",
  "Maya",
  "Noah",
  "Olivia",
  "Riya",
  "Sofia",
  "Theo",
  "Zoe",
];

const lastNames = [
  "Brown",
  "Chen",
  "Davis",
  "Garcia",
  "Gupta",
  "Johnson",
  "Kim",
  "Mehta",
  "Patel",
  "Reed",
  "Shah",
  "Singh",
  "Taylor",
  "Walker",
];

const sources = ["Google", "Website", "Instagram", "Referral", "Phone", "Walk-in"];

const randomItem = <T,>(items: readonly T[]): T =>
  items[Math.floor(Math.random() * items.length)];

export function generateCRMRecords(count = 42): CRMDemoRecord[] {
  return Array.from({ length: count }, (_, index) => {
    const stage = randomItem(crmStages);
    const score = Math.floor(Math.random() * 46) + 50;
    const daysAgo = Math.floor(Math.random() * 180);
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - daysAgo);

    return {
      id: `${Date.now()}-${index}-${Math.random().toString(36).slice(2, 8)}`,
      name: `${randomItem(firstNames)} ${randomItem(lastNames)}`,
      source: randomItem(sources),
      score,
      stage,
      value: `$${Math.floor(Math.random() * 900) + 100}`,
      vertical: crmVerticals[index % crmVerticals.length],
      createdAt: createdAt.toISOString(),
    };
  });
}

export function getStageChartData(records: CRMDemoRecord[]) {
  return crmStages.map((stage) => ({
    stage,
    records: records.filter((record) => record.stage === stage).length,
  }));
}

export function getSourceChartData(records: CRMDemoRecord[]) {
  return sources
    .map((source) => ({
      source,
      records: records.filter((record) => record.source === source).length,
    }))
    .filter((item) => item.records > 0)
    .sort((a, b) => b.records - a.records);
}

export function getTrendChartData(records: CRMDemoRecord[]) {
  const months = Array.from({ length: 6 }, (_, offset) => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() - (5 - offset));
    return {
      key: `${date.getFullYear()}-${date.getMonth()}`,
      label: date.toLocaleString("en", { month: "short" }),
      inquiries: 0,
    };
  });

  for (const record of records) {
    const date = new Date(record.createdAt);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const month = months.find((item) => item.key === key);
    if (month) month.inquiries += 1;
  }

  return months.map(({ label, inquiries }) => ({ label, inquiries }));
}
