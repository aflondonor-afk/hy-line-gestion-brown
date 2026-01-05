import React from 'react';
import { WeekData } from '../types';

interface DashboardStatsProps {
    data: WeekData;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ data }) => {
    const getChickImage = (week: number) => {
        if (week === 0) return "Sem 1.png";
        if (week === 1) return "Sem 2.png";
        if (week === 2) return "Sem 3.png";
        if (week === 3) return "Sem 4.png";
        if (week === 4) return "Sem 5.png";
        if (week === 5) return "Sem 6.png";
        return null;
    };

    const chickImage = getChickImage(data.week);

    return (
        <div className="flex flex-col gap-6 items-center w-full max-w-md mx-auto px-1">
            {/* PESO CARD - Unified as per user image */}
            <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
                <div className="py-3 border-b border-gray-50 text-center">
                    <span className="text-[14px] font-black text-primary uppercase tracking-widest">Peso</span>
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-50">
                    {/* Hembra Column */}
                    <div className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 mb-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Hembra</span>
                            <span className="material-icons-round text-primary text-[14px]">female</span>
                        </div>
                        <div className="flex items-baseline justify-center gap-0.5">
                            <span className="text-[32px] font-black text-primary leading-none">{data.weightH}</span>
                            <span className="text-[14px] font-bold text-primary opacity-40">g</span>
                        </div>
                        {data.expectedWeightH && (
                            <div className="mt-1 text-[12px] font-bold text-blue-400">
                                ≈ {data.expectedWeightH}g
                            </div>
                        )}
                    </div>
                    {/* Macho Column */}
                    <div className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 mb-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Macho</span>
                            <span className="material-icons-round text-success text-[14px]">male</span>
                        </div>
                        <div className="flex items-baseline justify-center gap-0.5">
                            <span className="text-[32px] font-black text-primary leading-none">{data.weightM}</span>
                            <span className="text-[14px] font-bold text-primary opacity-40">g</span>
                        </div>
                        {data.expectedWeightM && (
                            <div className="mt-1 text-[12px] font-bold text-blue-400">
                                ≈ {data.expectedWeightM}g
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* CHICK IMAGE - Center - Now below the Peso card but still centered */}
            <div className="w-full flex items-center justify-center py-4 relative">
                <div className="w-full max-w-[200px] aspect-square relative flex items-center justify-center">
                    {chickImage ? (
                        <img
                            src={chickImage}
                            alt={`Pollito Semana ${data.week}`}
                            className="w-full h-full object-contain transform scale-150 drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-transform duration-700"
                        />
                    ) : (
                        <div className="w-full h-full bg-white/50 backdrop-blur-sm rounded-[32px] border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300">
                            <span className="material-icons-round text-4xl mb-2">add_a_photo</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl -z-10"></div>
                </div>
            </div>

            {/* CONSUMO CARD - Similar style for consistency */}
            <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
                <div className="py-3 border-b border-gray-50 text-center">
                    <span className="text-[14px] font-black text-gray-800 uppercase tracking-widest">Consumo Alimento</span>
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-50">
                    {/* Alimento Hembra */}
                    <div className="p-4 text-center">
                        <div className="flex flex-col items-center gap-2">
                            <img src="./pellets.png" className="w-10 h-10 object-contain drop-shadow-sm" alt="pellets" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Hembra</span>
                            <div className="flex items-baseline justify-center gap-0.5">
                                <span className="text-[28px] font-black text-orange-600 leading-none">{data.feedConsumptionH.toFixed(0)}</span>
                                <span className="text-[12px] font-bold text-orange-600 opacity-40">g</span>
                            </div>
                            {data.expectedFeedH && (
                                <span className="text-[11px] font-bold text-orange-400">≈ {data.expectedFeedH.toFixed(0)}g</span>
                            )}
                        </div>
                    </div>
                    {/* Alimento Macho */}
                    <div className="p-4 text-center">
                        <div className="flex flex-col items-center gap-2">
                            <img src="./pellets.png" className="w-10 h-10 object-contain drop-shadow-sm" alt="pellets" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Macho</span>
                            <div className="flex items-baseline justify-center gap-0.5">
                                <span className="text-[28px] font-black text-rose-600 leading-none">{data.feedConsumptionM.toFixed(0)}</span>
                                <span className="text-[12px] font-bold text-rose-600 opacity-40">g</span>
                            </div>
                            {data.expectedFeedM && (
                                <span className="text-[11px] font-bold text-rose-400">≈ {data.expectedFeedM.toFixed(0)}g</span>
                            )}
                        </div>
                    </div>
                </div>
                {/* Agua section - Footer of the Consumo card */}
                <div className="bg-cyan-50/20 p-3 border-t border-gray-50 flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="material-icons-round text-cyan-500 text-[18px]">water_drop</span>
                        <span className="text-[10px] font-black text-cyan-700 uppercase tracking-tight">Agua</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-[22px] font-black text-cyan-600 leading-none">≈ {data.waterConsumption.toFixed(0)}</span>
                        <span className="text-[12px] font-bold text-cyan-600 opacity-50">ml</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
