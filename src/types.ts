export interface WeekData {
  week: number;
  phase: 'Cría' | 'Levante' | 'Producción';
  status: 'Óptimo' | 'Revisar';
  weightH: number;
  weightM: number;
  expectedWeightH?: number;
  expectedWeightM?: number;
  waterConsumption: number;
  feedConsumptionH: number;
  feedConsumptionM: number;
  expectedFeedH?: number;
  expectedFeedM?: number;
  uniformityH: number;
  uniformityM: number;
  mortality: number;
  mortalityGoal?: string;
  eggMass: number;
  densityInfo?: string | { days: string, value: string }[];
  confortMetrics?: {
    temp: string | { range: string, value: string }[];
    humidity: string;
    ventilation: string | { range: string, value: string }[];
  };
}

export interface FocusItem {
  id: string;
  category: 'Intervenciones' | 'Confort';
  title: string;
  description: string;
  icon: string;
}

export type FocusTab = 'Intervenciones' | 'Confort';