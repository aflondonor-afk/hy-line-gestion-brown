import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import WeekSelector from './components/WeekSelector';
import DashboardStats from './components/DashboardStats';
import FocusSection from './components/FocusSection';
import BottomNav from './components/BottomNav';
import { WeekData, FocusItem } from './types';

// --- REAL DATA TABLES (from CSVs) ---
const realWeights: Record<number, { h: number, m: number }> = {
  0: { h: 40, m: 38 },
  1: { h: 70, m: 77 },
  2: { h: 124, m: 144 },
  3: { h: 201, m: 237 },
  4: { h: 283, m: 340 },
  5: { h: 371, m: 464 },
  6: { h: 469, m: 608 },
  7: { h: 577, m: 752 },
  8: { h: 680, m: 927 },
  9: { h: 783, m: 1092 },
  10: { h: 881, m: 1257 },
  11: { h: 979, m: 1411 },
  12: { h: 1066, m: 1576 },
  13: { h: 1154, m: 1741 },
  14: { h: 1226, m: 1885 },
  15: { h: 1298, m: 2019 },
  16: { h: 1365, m: 2081 },
  17: { h: 1447, m: 2153 },
  18: { h: 1530, m: 2260 },
  19: { h: 1600, m: 2300 },
  20: { h: 1670, m: 2350 }
};

const realConsumption: Record<number, { h: number, m: number }> = {
  0: { h: 10, m: 10 },
  1: { h: 14, m: 15 },
  2: { h: 21, m: 22 },
  3: { h: 27, m: 28 },
  4: { h: 30, m: 31 },
  5: { h: 34, m: 35 },
  6: { h: 36, m: 39 },
  7: { h: 40, m: 43 },
  8: { h: 45, m: 48 },
  9: { h: 50, m: 53 },
  10: { h: 55, m: 58 },
  11: { h: 60, m: 63 },
  12: { h: 65, m: 68 },
  13: { h: 69, m: 72 },
  14: { h: 72, m: 75 },
  15: { h: 74, m: 77 },
  16: { h: 76, m: 79 },
  17: { h: 79, m: 81 },
  18: { h: 82, m: 84 },
  19: { h: 87, m: 89 },
  20: { h: 93, m: 95 },
  21: { h: 104, m: 106 }
};

const realWaterConsumption: Record<number, number> = {
  1: 19, 2: 30, 3: 40, 4: 46, 5: 52, 6: 58, 7: 64, 8: 72, 9: 80, 10: 88,
  11: 96, 12: 104, 13: 110, 14: 117, 15: 120, 16: 122, 17: 126, 18: 130
};

const realUniformity: Record<number, number> = {
  0: 83, 1: 83, 2: 83, 3: 83, 4: 83, 5: 83, 6: 83, 7: 90, 8: 90, 9: 90, 10: 90,
  11: 90, 12: 95, 13: 95, 14: 95, 15: 95, 16: 95, 17: 95, 18: 98, 19: 98, 20: 98
};

// Data for Density (Week 1 matches Week 0 for initial view)
const densityWeek1 = [
  { days: "0-2", value: "50" },
  { days: "3-4", value: "45" },
  { days: "5-7", value: "35" }
];

const realDensity: Record<number, string | { days: string, value: string }[]> = {
  0: densityWeek1,
  1: "25",
  2: "18",
  3: "12",
  4: "Toda el área"
};

const generateWeekData = (): WeekData[] => {
  const data: WeekData[] = [];
  for (let i = 0; i <= 75; i++) {
    let phase: 'Cría' | 'Levante' | 'Producción' = 'Cría';

    // Phase logic
    if (i <= 4) phase = 'Cría';
    else if (i <= 19) phase = 'Levante';
    else phase = 'Producción';

    // Get real or mock weights
    let weightH, weightM;
    if (realWeights[i]) {
      weightH = realWeights[i].h;
      weightM = realWeights[i].m;
    } else {
      const targetWeight = 1670 + ((i - 20) * 5);
      weightH = Math.floor(targetWeight + (Math.random() * 50 - 25));
      weightM = Math.floor(targetWeight * 0.95 + (Math.random() * 50 - 25));
    }

    // Get real or mock consumption
    let water, feedH, feedM;
    if (realConsumption[i]) {
      feedH = realConsumption[i].h;
      feedM = realConsumption[i].m;
    } else {
      feedH = i > 18 ? 112 + (Math.random() * 5) : 10 + (i * 5);
      feedM = i > 18 ? 115 + (Math.random() * 5) : 12 + (i * 5.2);
    }

    if (realWaterConsumption[i]) {
      water = realWaterConsumption[i];
    } else {
      water = i * 15 + (Math.random() * 10);
    }

    const uniformity = realUniformity[i] || (98 - (Math.random() * 5));

    // Density logic
    let densityInfo = realDensity[i];
    if (!densityInfo && i >= 4) {
      densityInfo = "Toda el área";
    }

    data.push({
      week: i,
      phase,
      status: Math.random() > 0.8 ? 'Revisar' : 'Óptimo',
      weightH,
      weightM,
      expectedWeightH: realWeights[i]?.h,
      expectedWeightM: realWeights[i]?.m,
      waterConsumption: water,
      feedConsumptionH: feedH,
      feedConsumptionM: feedM,
      expectedFeedH: realConsumption[i]?.h,
      expectedFeedM: realConsumption[i]?.m,
      uniformity: uniformity,
      eggMass: i >= 20 ? 62 + (Math.random() * 2) : 0,
      densityInfo
    });
  }
  return data;
};

const mockFocusItems: FocusItem[] = [
  { id: '1', category: 'Manejo', title: 'Densidad', description: 'Verificar espacio de comederos (10 cm/ave).', icon: 'groups' },
  { id: '2', category: 'Manejo', title: 'Ventilación', description: 'Ajustar mínima para control de humedad.', icon: 'air' },
  { id: '3', category: 'Iluminación', title: 'Estímulo', description: 'Incrementar 15 min esta semana.', icon: 'wb_sunny' },
  { id: '4', category: 'Nutrición', title: 'Calcio', description: 'Aumentar partícula gruesa al 65%.', icon: 'restaurant_menu' },
  { id: '5', category: 'Nutrición', title: 'Agua', description: 'Purgar líneas antes de la vacunación.', icon: 'water_drop' },
  { id: '6', category: 'Manejo', title: 'Pesaje', description: 'Muestra individual de 100 aves.', icon: 'scale' },
];

const App: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState<number>(0);
  const allWeeks = useMemo(() => generateWeekData(), []);

  // Preload images for instant transitions
  React.useEffect(() => {
    const imagesToPreload = [
      'Sem 1.png', 'Sem 2.png', 'Sem 3.png',
      'Sem 4.png', 'Sem 5.png', 'Sem 6.png',
      './pellets.png'
    ];
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const currentData = allWeeks.find(w => w.week === currentWeek) || allWeeks[0];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <main className="flex-1 max-w-md mx-auto w-full px-5 pt-4">

        <WeekSelector
          currentWeek={currentWeek}
          onChange={setCurrentWeek}
          phase={currentData.phase}
        />

        <div className="mt-8 mb-4 flex items-baseline justify-between px-1">
          <h2 className="text-[22px] font-black text-gray-800">Métricas</h2>
        </div>

        <DashboardStats data={currentData} />

        <div className="mt-10 mb-5 px-1">
          <h2 className="text-[22px] font-black text-gray-800">Enfoque Semanal</h2>
        </div>

        {/* UNIFORMITY SECTION - ONLY UP TO WEEK 20 */}
        {currentWeek <= 20 && (
          <div className="mb-4 px-1">
            <div className="bg-white p-4 rounded-2xl shadow-soft border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <span className="material-icons-round text-[22px]">donut_large</span>
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight">Uniformidad</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Hembra</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[24px] font-black text-gray-900 leading-none">{currentData.uniformity.toFixed(0)}%</span>
              </div>
            </div>
          </div>
        )}

        {/* DENSITY SECTION */}
        {currentData.densityInfo && (
          <div className="mb-6 px-1">
            <div className="bg-white p-4 rounded-2xl shadow-soft border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <span className="material-icons-round text-[22px]">zoom_out_map</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight">Densidad</h3>
                    <p className="text-[10px] font-bold text-gray-400 lowercase tracking-wider">Aves / m²</p>
                  </div>
                </div>

                {!Array.isArray(currentData.densityInfo) && (
                  <div className="text-right">
                    <span className={`font-black text-gray-900 leading-none uppercase ${currentData.densityInfo === "Toda el área" ? 'text-[18px] tracking-tight' : 'text-[24px]'
                      }`}>
                      {currentData.densityInfo}
                    </span>
                  </div>
                )}
              </div>

              {/* Array case - Breakdown below */}
              {Array.isArray(currentData.densityInfo) && (
                <div className="mt-4 flex flex-col gap-1 border-t border-gray-50 pt-2">
                  {currentData.densityInfo.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                      <span className="text-xs font-bold text-gray-500">Días {item.days}</span>
                      <span className="text-[20px] font-black text-gray-900 leading-none">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <FocusSection items={mockFocusItems} />
      </main>

      <BottomNav />
    </div>
  );
};

export default App;