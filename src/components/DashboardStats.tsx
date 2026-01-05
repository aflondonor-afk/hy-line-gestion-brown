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
        <div className="relative w-full max-w-md mx-auto min-h-[380px] mt-2 px-2">
            {/* Headers Row */}
            <div className="flex justify-between items-start mb-8 px-4">
                <div className="text-left w-32">
                    <h3 className="text-[15px] font-black text-primary tracking-widest uppercase">Peso</h3>
                    <div className="h-0.5 w-6 bg-gray-200 mt-1"></div>
                </div>
                <div className="text-right w-32">
                    <h3 className="text-[15px] font-black text-primary tracking-widest uppercase">Consumo</h3>
                    <div className="h-0.5 w-6 bg-gray-200 mt-1 ml-auto"></div>
                </div>
            </div>

            {/* Main Stats Area */}
            <div className="flex items-center justify-between relative">

                {/* LEFT COLUMN: PESO */}
                <div className="flex flex-col gap-10 w-24">
                    {/* Hembra Peso */}
                    <div className="text-left">
                        <div className="flex items-center gap-1 mb-1">
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Hembra</span>
                            <span className="material-icons-round text-primary text-[10px]">female</span>
                        </div>
                        <div className="flex items-baseline gap-0.5">
                            <span className="text-[28px] font-black text-gray-800 leading-none">{data.weightH}</span>
                            <span className="text-[12px] font-bold text-gray-400">g</span>
                        </div>
                        {data.expectedWeightH && (
                            <span className="text-[12px] font-bold text-blue-400 block mt-0.5">≈ {data.expectedWeightH}g</span>
                        )}
                    </div>

                    {/* Macho Peso */}
                    <div className="text-left">
                        <div className="flex items-center gap-1 mb-1">
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Macho</span>
                            <span className="material-icons-round text-success text-[10px]">male</span>
                        </div>
                        <div className="flex items-baseline gap-0.5">
                            <span className="text-[28px] font-black text-gray-800 leading-none">{data.weightM}</span>
                            <span className="text-[12px] font-bold text-gray-400">g</span>
                        </div>
                        {data.expectedWeightM && (
                            <span className="text-[12px] font-bold text-blue-400 block mt-1">≈ {data.expectedWeightM}g</span>
                        )}
                    </div>
                </div>

                {/* CENTER: CHICK IMAGE */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-full max-w-[220px] pointer-events-none">
                    <div className="relative">
                        {chickImage && (
                            <img
                                src={chickImage}
                                alt="Chick"
                                className="w-full h-auto object-contain transform scale-125 z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                            />
                        )}
                        {/* Shadow decoration inside */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl -z-10"></div>

                        {/* Feed Icons Decoration (Floating near consumption) */}
                        <div className="absolute right-[-20px] top-1/4">
                            <img src="./pellets.png" className="w-8 h-8 object-contain drop-shadow-sm opacity-90" alt="" />
                        </div>
                        <div className="absolute right-[-20px] bottom-1/4">
                            <img src="./pellets.png" className="w-8 h-8 object-contain drop-shadow-sm opacity-90" alt="" />
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: CONSUMO ALIMENTO */}
                <div className="flex flex-col gap-10 w-24 text-right">
                    {/* Hembra Consumo */}
                    <div>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter block mb-1">Hembra</span>
                        <div className="flex items-baseline justify-end gap-0.5">
                            <span className="text-[26px] font-black text-orange-600 leading-none">{data.feedConsumptionH.toFixed(0)}</span>
                            <span className="text-[12px] font-bold text-orange-600 opacity-40">g</span>
                        </div>
                        {data.expectedFeedH && (
                            <span className="text-[12px] font-bold text-orange-400/60 block mt-0.5">≈ {data.expectedFeedH.toFixed(0)}g</span>
                        )}
                    </div>

                    {/* Macho Consumo */}
                    <div>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter block mb-1">Macho</span>
                        <div className="flex items-baseline justify-end gap-0.5">
                            <span className="text-[26px] font-black text-rose-600 leading-none">{data.feedConsumptionM.toFixed(0)}</span>
                            <span className="text-[12px] font-bold text-rose-600 opacity-40">g</span>
                        </div>
                        {data.expectedFeedM && (
                            <span className="text-[12px] font-bold text-rose-500/60 block mt-0.5">≈ {data.expectedFeedM.toFixed(0)}g</span>
                        )}
                    </div>
                </div>
            </div>

            {/* WATER BOX: LOWER RIGHT */}
            <div className="absolute bottom-[-20px] right-2">
                <div className="bg-cyan-50/40 border border-cyan-100/50 rounded-2xl py-2 px-5 flex flex-col items-center">
                    <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="material-icons-round text-cyan-500 text-[14px]">water_drop</span>
                        <span className="text-[10px] font-black text-cyan-700 uppercase">Agua</span>
                    </div>
                    <div className="flex items-baseline gap-0.5">
                        <span className="text-[22px] font-black text-cyan-600 leading-none">≈ {data.waterConsumption.toFixed(0)}</span>
                        <span className="text-[11px] font-bold text-cyan-600 opacity-50 ml-0.5">ml</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
