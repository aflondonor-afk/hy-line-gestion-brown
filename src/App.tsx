import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import WeekSelector from './components/WeekSelector';
import DashboardStats from './components/DashboardStats';
import FocusSection from './components/FocusSection';
import BottomNav from './components/BottomNav';
import { WeekData, FocusItem } from './types';

// --- REAL DATA TABLES (from CSVs) ---
const realWeights: Record<number, { h: number, m: number }> = {
  0: { h: 40, m: 38 }, 1: { h: 70, m: 77 }, 2: { h: 124, m: 144 }, 3: { h: 201, m: 237 },
  4: { h: 283, m: 340 }, 5: { h: 371, m: 464 }, 6: { h: 469, m: 608 }, 7: { h: 577, m: 752 },
  8: { h: 680, m: 927 }, 9: { h: 783, m: 1092 }, 10: { h: 881, m: 1257 }, 11: { h: 979, m: 1411 },
  12: { h: 1066, m: 1576 }, 13: { h: 1154, m: 1741 }, 14: { h: 1226, m: 1885 }, 15: { h: 1298, m: 2019 },
  16: { h: 1365, m: 2081 }, 17: { h: 1447, m: 2153 }, 18: { h: 1530, m: 2260 }, 19: { h: 1600, m: 2300 },
  20: { h: 1670, m: 2350 }
};

const realConsumption: Record<number, { h: number, m: number }> = {
  0: { h: 10, m: 10 }, 1: { h: 14, m: 15 }, 2: { h: 21, m: 22 }, 3: { h: 27, m: 28 },
  4: { h: 30, m: 31 }, 5: { h: 34, m: 35 }, 6: { h: 36, m: 39 }, 7: { h: 40, m: 43 },
  8: { h: 45, m: 48 }, 9: { h: 50, m: 53 }, 10: { h: 55, m: 58 }, 11: { h: 60, m: 63 },
  12: { h: 65, m: 68 }, 13: { h: 69, m: 72 }, 14: { h: 72, m: 75 }, 15: { h: 74, m: 77 },
  16: { h: 76, m: 79 }, 17: { h: 79, m: 81 }, 18: { h: 82, m: 84 }, 19: { h: 87, m: 89 },
  20: { h: 93, m: 95 }, 21: { h: 104, m: 106 }
};

const realWaterConsumption: Record<number, number> = {
  1: 19, 2: 30, 3: 40, 4: 46, 5: 52, 6: 58, 7: 64, 8: 72, 9: 80, 10: 88,
  11: 96, 12: 104, 13: 110, 14: 117, 15: 120, 16: 122, 17: 126, 18: 130
};

const realUniformityH: Record<number, number> = {
  0: 83, 1: 83, 2: 83, 3: 83, 4: 83, 5: 83, 6: 83, 7: 85, 8: 85, 9: 85, 10: 85,
  11: 85, 12: 90, 13: 90, 14: 90, 15: 90, 16: 90, 17: 90, 18: 90, 19: 90, 20: 90
};

const realUniformityM: Record<number, number> = {
  0: 85, 1: 85, 2: 85, 3: 85, 4: 85, 5: 85, 6: 85, 7: 90, 8: 90, 9: 90, 10: 90,
  11: 90, 12: 95, 13: 95, 14: 95, 15: 95, 16: 95, 17: 95, 18: 98, 19: 98, 20: 98
};

const realVaccines: Record<number, { title: string, note?: string }[]> = {
  0: [{ title: "Salmonella", note: "Aplicar a los 3 días" }],
  1: [{ title: "New Castle + Bronquitis", note: "Días 12 a 14" }],
  2: [
    { title: "Salmonella", note: "Día 17" },
    { title: "Gumboro", note: "Día 18" }
  ],
  6: [{ title: "NC + Bronquitis MA5 + Viruela" }],
  8: [{ title: "Encefalomielitis aviar" }],
  9: [{ title: "Anemia infecciosa Circomune" }],
  11: [{ title: "NC + Bronquitis infecciosa H120" }],
  12: [{ title: "Gumboro - Reovirus", note: "Vacunar solo hembras" }],
  13: [{ title: "Encefalomielitis aviar" }],
  14: [{ title: "Anemia infecciosa Thymovac" }],
  16: [
    { title: "Salmonella + NC + Bronquitis" },
    { title: "Cuadruple oleosa", note: "Vacunar solo hembras" }
  ],
  33: [{ title: "New Castle + Bronquitis" }],
  44: [{ title: "New Castle + Bronquitis" }]
};

const realGrading: Record<number, { level: number, scale: string }> = {
  1: { level: 1, scale: "1g" },
  5: { level: 2, scale: "10g" },
  10: { level: 3, scale: "10g" }
};

const generateWeekData = (): WeekData[] => {
  const data: WeekData[] = [];
  for (let i = 0; i <= 75; i++) {
    let phase: 'Cría' | 'Levante' | 'Producción' = i <= 4 ? 'Cría' : (i <= 19 ? 'Levante' : 'Producción');

    let weightH = realWeights[i]?.h || Math.floor(1670 + ((i - 20) * 5));
    let weightM = realWeights[i]?.m || Math.floor(1670 * 0.95 + ((i - 20) * 5));
    let feedH = realConsumption[i]?.h || (i > 18 ? 112 : 10 + (i * 5));
    let feedM = realConsumption[i]?.m || (i > 18 ? 115 : 12 + (i * 5.2));
    let water = realWaterConsumption[i] || (i * 15);

    // Confort Metrics based on User logic (Percentage of ON time)
    let temp: string | { range: string, value: string }[] = "24-26°C";
    let humidity = "Ambiente";
    let ventilation: string | { range: string, value: string }[] = "72.2%";

    // Real Lighting Data from CSV
    let lighting: any = { hours: "12h", intensity: "10-15 lux", darkness: "6 pm – 6 am" };

    if (i === 0) {
      temp = [
        { range: "0-2 días", value: "34-35°" },
        { range: "3-7 días", value: "32-34°" }
      ];
      ventilation = [
        { range: "0-2 días", value: "44.4%" },
        { range: "3-7 días", value: "50.0%" }
      ];
      humidity = "55-65%"; // According to Humedad.csv (0-7 días)
      lighting = [
        { range: "0-3 días", hours: "22h", intensity: "30-50 lux", darkness: "10 pm – 0 am" },
        { range: "4-7 días", hours: "21h", intensity: "30-50 lux", darkness: "10 pm – 1 am" }
      ];
    }
    else if (i === 1) {
      temp = "30-32°C"; ventilation = "50.0%";
      lighting = { hours: "20h", intensity: "25 lux", darkness: "10 pm – 2 am" };
    }
    else if (i === 2) {
      temp = "28-30°C"; ventilation = "61.1%";
      lighting = { hours: "19h", intensity: "10-15 lux", darkness: "9 pm – 2 am" };
    }
    else if (i === 3) {
      temp = "26-28°C"; ventilation = "61.1%";
      lighting = { hours: "18.5h", intensity: "10-15 lux", darkness: "9 pm – 2:30 am" };
    }
    else if (i === 4 || i === 5) {
      temp = "24-26°C"; ventilation = "72.2%";
      lighting = { hours: "18h", intensity: "10-15 lux", darkness: "9 pm – 3 am" };
    }
    else if (i === 6) { lighting = { hours: "17.5h", intensity: "10-15 lux", darkness: "9 pm – 3:30 am" }; }
    else if (i === 7) { lighting = { hours: "17h", intensity: "10-15 lux", darkness: "9 pm – 4 am" }; }
    else if (i === 8) { lighting = { hours: "16.5h", intensity: "10-15 lux", darkness: "9 pm – 4:30 am" }; }
    else if (i === 9) { lighting = { hours: "16h", intensity: "10-15 lux", darkness: "9 pm – 5 am" }; }
    else if (i === 10) { lighting = { hours: "15.5h", intensity: "10-15 lux", darkness: "9 pm – 5:30 am" }; }
    else if (i === 11) { lighting = { hours: "15h", intensity: "10-15 lux", darkness: "9 pm – 6 am" }; }
    else if (i === 12) { lighting = { hours: "14.5h", intensity: "10-15 lux", darkness: "8:30 pm – 6 am" }; }
    else if (i === 13) { lighting = { hours: "14h", intensity: "10-15 lux", darkness: "8 pm – 6 am" }; }
    else if (i === 14) { lighting = { hours: "13.5h", intensity: "10-15 lux", darkness: "7:30 pm – 6 am" }; }
    else if (i === 15) { lighting = { hours: "13h", intensity: "10-15 lux", darkness: "7 pm – 6 am" }; }
    else if (i === 16) { lighting = { hours: "12.5h", intensity: "10-15 lux", darkness: "6:30 pm – 6 am" }; }
    else { lighting = { hours: "12h", intensity: "10-15 lux", darkness: "6 pm – 6 am" }; }

    data.push({
      week: i,
      phase,
      status: 'Óptimo',
      weightH, weightM,
      expectedWeightH: realWeights[i]?.h,
      expectedWeightM: realWeights[i]?.m,
      waterConsumption: water,
      feedConsumptionH: feedH,
      feedConsumptionM: feedM,
      expectedFeedH: realConsumption[i]?.h,
      expectedFeedM: realConsumption[i]?.m,
      uniformityH: realUniformityH[i] || (i > 20 ? 90 : 83),
      uniformityM: realUniformityM[i] || (i > 20 ? 98 : 85),
      mortality: i === 0 ? 0.8 : (i === 1 ? 0.4 : 0.05),
      mortalityGoal: i <= 2 ? "<2" : "≤0.1",
      eggMass: i >= 20 ? 62 : 0,
      confortMetrics: { temp, humidity, ventilation, lighting }
    });
  }
  return data;
};

const App: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState<number>(0);
  const allWeeks = useMemo(() => generateWeekData(), []);

  const currentData = allWeeks.find(w => w.week === currentWeek) || allWeeks[0];

  const currentFocusItems = useMemo(() => {
    const items: FocusItem[] = [];

    // --- INTERVENCIONES ---
    if (realVaccines[currentWeek]) {
      realVaccines[currentWeek].forEach((v, idx) => {
        items.push({
          id: `vac-${idx}`,
          category: 'Intervenciones',
          title: `Vacunación: ${v.title}`,
          description: v.note || 'Según plan vacunal Hy-Line.',
          icon: 'vaccines'
        });
      });
    }

    if (realGrading[currentWeek]) {
      const g = realGrading[currentWeek];
      items.push({
        id: 'grading',
        category: 'Intervenciones',
        title: `Grading ${g.level}`,
        description: `Selección por peso. Usar báscula gramera (${g.scale}).`,
        icon: 'scale'
      });
    }

    if (items.filter(i => i.category === 'Intervenciones').length === 0) {
      items.push({
        id: 'manejo-std',
        category: 'Intervenciones',
        title: 'Pesaje Semanal',
        description: 'Muestra individual de 100 aves para control de peso.',
        icon: 'straighten'
      });
    }

    // --- CONFORT ---
    const getDensityByWeek = (week: number) => {
      if (week === 0) return "Días 0-2: 50 aves. Días 3-7: 35 aves.";
      if (week === 1) return "25 aves/m².";
      if (week === 2) return "18 aves/m².";
      if (week === 3) return "12 aves/m².";
      return "Toda el área disponible.";
    };

    const getFeederByWeek = (week: number) => {
      if (week === 0) return "0-3d (Comebaby): 70 aves. 4-7d: 60 aves.";
      if (week === 1) return "Día 8-14 (Comebaby): 50 aves.";
      if (week === 2) return "Tolva: 40 aves por unidad.";
      if (week === 3) return "Tolva: 35 aves por unidad.";
      return "Tolva: 26 aves por unidad.";
    };

    const getDrinkerByWeek = (week: number) => {
      if (week === 0) return "0-3d: 70 aves. 4-7d: 60 aves.";
      if (week === 1) return "8-14d: 50 aves por bebedero.";
      if (week === 2) return "15-21d: 22 aves por bebedero.";
      if (week === 3) return "22-28d: 15 aves por bebedero.";
      return ">29d: 10 aves por bebedero.";
    };

    items.push({
      id: 'dens-m2',
      category: 'Confort',
      title: 'Densidad Aves/m²',
      description: getDensityByWeek(currentWeek),
      icon: 'zoom_out_map'
    });

    items.push({
      id: 'dens-com',
      category: 'Confort',
      title: 'Aves / Comedero',
      description: getFeederByWeek(currentWeek),
      icon: 'restaurant'
    });

    items.push({
      id: 'dens-beb',
      category: 'Confort',
      title: 'Aves / Bebedero',
      description: getDrinkerByWeek(currentWeek),
      icon: 'water_drop'
    });

    return items;
  }, [currentWeek]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <main className="flex-1 max-w-md mx-auto w-full px-5 pt-4">
        <WeekSelector
          currentWeek={currentWeek}
          onChange={setCurrentWeek}
          phase={currentData.phase}
        />
        <div className="mt-4 mb-2 px-1">
          <h2 className="text-[20px] font-black text-gray-800">Biometría Semanal</h2>
        </div>
        <DashboardStats data={currentData} />
        <div className="mt-10 mb-5 px-1">
          <h2 className="text-[22px] font-black text-gray-800">Enfoque</h2>
        </div>
        <FocusSection
          items={currentFocusItems}
          data={currentData}
        />
      </main>
      <BottomNav />
    </div>
  );
};

export default App;