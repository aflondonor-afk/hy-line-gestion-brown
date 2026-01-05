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
        <div className="flex gap-2 items-center justify-center min-h-[350px] w-full max-w-full px-1">
            {/* PESO SECTION - LEFT */}
            <div className="w-[145px] flex-shrink-0">
                <div className="text-center mb-4">
                    <span className="text-[14px] font-black text-primary uppercase tracking-widest">Peso</span>
                    <div className="h-0.5 w-8 bg-primary/20 mx-auto mt-1 rounded-full"></div>
                </div>

                <div className="flex flex-col gap-5">
                    {/* Hembra Weight */}
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1 opacity-60">
                            <span className="text-[9px] font-bold text-gray-500 uppercase">Hembra</span>
                            <span className="material-icons-round text-primary text-[10px]">female</span>
                        </div>
                        <div className="flex items-baseline justify-center gap-0.5">
                            <span className="text-[26px] font-black text-gray-800 leading-none">{data.weightH}</span>
                            <span className="text-[12px] font-bold text-gray-400">g</span>
                        </div>
                        {data.expectedWeightH && (
                            <span className="text-[12px] font-bold text-blue-600/50 block -mt-0.5">≈ {data.expectedWeightH}g</span>
                        )}
                    </div>

                    <div className="h-px w-12 bg-gray-100 mx-auto"></div>

                    {/* Macho Weight */}
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1 opacity-60">
                            <span className="text-[9px] font-bold text-gray-500 uppercase">Macho</span>
                            <span className="material-icons-round text-success text-[10px]">male</span>
                        </div>
                        <div className="flex items-baseline justify-center gap-0.5">
                            <span className="text-[26px] font-black text-gray-800 leading-none">{data.weightM}</span>
                            <span className="text-[12px] font-bold text-gray-400">g</span>
                        </div>
                        {data.expectedWeightM && (
                            <span className="text-[12px] font-bold text-blue-600/50 block -mt-0.5">≈ {data.expectedWeightM}g</span>
                        )}
                    </div>
                </div>
            </div>

            {/* CHICK IMAGE - CENTER */}
            <div className="flex-1 flex items-center justify-center relative min-w-[80px]">
                {chickImage ? (
                    <img
                        src={chickImage}
                        alt={`Pollito Semana ${data.week}`}
                        className="w-full h-auto object-contain transform scale-150 transition-all duration-100 drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                    />
                ) : (
                    <div className="w-full aspect-square bg-white/50 backdrop-blur-sm rounded-[32px] border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300 text-center p-4">
                        <span className="material-icons-round text-4xl mb-2">add_a_photo</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl -z-10"></div>
            </div>

            {/* CONSUMO SECTION - RIGHT */}
            <div className="w-[145px] flex-shrink-0">
                <div className="text-center mb-4">
                    <span className="text-[14px] font-black text-gray-800 uppercase tracking-widest">Consumo</span>
                    <div className="h-0.5 w-8 bg-gray-200 mx-auto mt-1 rounded-full"></div>
                </div>

                <div className="flex flex-col gap-5">
                    {/* Alimento Hembra */}
                    <div className="flex items-center justify-between px-1">
                        <img src="./pellets.png" className="w-10 h-10 object-contain drop-shadow-sm" alt="pellets" />
                        <div className="text-right">
                            <span className="text-[8px] font-bold text-gray-400 uppercase block mb-0.5">Hembra</span>
                            <div className="flex items-baseline justify-end gap-0.5">
                                <span className="text-[22px] font-black text-orange-600 leading-none">{data.feedConsumptionH.toFixed(0)}</span>
                                <span className="text-[10px] font-bold text-orange-600 opacity-40">g</span>
                            </div>
                            {data.expectedFeedH && (
                                <span className="text-[11px] font-bold text-orange-600/40 block -mt-0.5">≈ {data.expectedFeedH.toFixed(0)}g</span>
                            )}
                        </div>
                    </div>

                    {/* Alimento Macho */}
                    <div className="flex items-center justify-between px-1">
                        <img src="./pellets.png" className="w-10 h-10 object-contain drop-shadow-sm" alt="pellets" />
                        <div className="text-right">
                            <span className="text-[8px] font-bold text-gray-400 uppercase block mb-0.5">Macho</span>
                            <div className="flex items-baseline justify-end gap-0.5">
                                <span className="text-[22px] font-black text-rose-600 leading-none">{data.feedConsumptionM.toFixed(0)}</span>
                                <span className="text-[10px] font-bold text-rose-600 opacity-40">g</span>
                            </div>
                            {data.expectedFeedM && (
                                <span className="text-[11px] font-bold text-rose-600/40 block -mt-0.5">≈ {data.expectedFeedM.toFixed(0)}g</span>
                            )}
                        </div>
                    </div>

                    {/* Agua */}
                    <div className="mt-1 text-center bg-cyan-50/40 py-2.5 rounded-xl border border-cyan-100/50">
                        <div className="flex items-center justify-center gap-1.5 mb-1">
                            <span className="material-icons-round text-cyan-500 text-[12px]">water_drop</span>
                            <span className="text-[8px] font-black text-cyan-700 uppercase">Agua</span>
                        </div>
                        <div className="flex items-baseline justify-center gap-0.5">
                            <span className="text-[20px] font-black text-cyan-600 leading-none">≈ {data.waterConsumption.toFixed(0)}</span>
                            <span className="text-[10px] font-bold text-cyan-600 opacity-50">ml</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
