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
        <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center justify-center min-h-[250px]">
                {/* Peso Column - Left (Unified Card) */}
                <div className="w-[70px] flex-shrink-0">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-soft overflow-hidden">
                        <div className="bg-white py-0.3 border-b border-gray-20 text-center">
                            <span className="text-[12px] font-black text-gray-900 uppercase tracking-widest">Peso</span>
                        </div>
                        <div className="flex flex-col">
                            {/* Hembra Row */}
                            <div className="p-1 border-b border-gray-50">
                                <div className="flex items-center justify-center mb-0.1">
                                    <span className="text-[8px] font-bold text-gray-500 uppercase">Hembra</span>
                                </div>
                                <div className="flex items-baseline justify-center gap-0.5">
                                    <span className="text-[18px] font-black text-gray-900 leading-none">{data.weightH}</span>
                                    <span className="text-[10px] font-bold text-gray-400">g</span>
                                </div>
                            </div>
                            {/* Macho Row */}
                            <div className="p-1">
                                <div className="flex items-center justify-center mb-0.5">
                                    <span className="text-[8px] font-bold text-gray-500 uppercase">Macho</span>
                                </div>
                                <div className="flex items-baseline justify-center gap-0.5">
                                    <span className="text-[18px] font-black text-gray-900 leading-none">{data.weightM}</span>
                                    <span className="text-[10px] font-bold text-gray-400">g</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chick Image - Center */}
                <div className="flex-1 self-center flex items-center justify-center relative group max-h-[300px]">
                    {chickImage ? (
                        <img
                            src={chickImage}
                            alt={`Pollito Semana ${data.week}`}
                            className="w-full h-full object-contain transform scale-125 transition-transform duration-100 drop-shadow-[0_15px_30px_rgba(0,0,0,0.1)]"
                        />
                    ) : (
                        <div className="w-full aspect-square bg-white/50 backdrop-blur-sm rounded-[32px] border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300 text-center p-4">
                            <span className="material-icons-round text-5xl mb-2">add_a_photo</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl -z-10"></div>
                </div>

                {/* Consumptions Column - Right (Unified Card) */}
                <div className="flex flex-col gap-1 w-[118px] flex-shrink-0">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-soft overflow-hidden">
                        {/* Header with Pellet Icon */}
                        <div className="bg-white py-0.2 border-b border-gray-30 flex items-center justify-center gap-0,5">
                            <span className="text-[12px] font-black text-gray-900 uppercase tracking-widest">Consumo</span>
                            <img src="./pellets.png" className="w-8 h-8 object-contain" alt="" />
                        </div>

                        <div className="flex flex-col">
                            {/* Hembra Alimento */}
                            <div className="p-1 border-b border-gray-50 text-center">
                                <span className="text-[8px] font-bold text-gray-500 uppercase block mb-0.5">Hembra</span>
                                <div className="flex items-baseline justify-center gap-0.5">
                                    <span className="text-[18px] font-black text-gray-900 leading-none">{data.feedConsumptionH.toFixed(0)}</span>
                                    <span className="text-[10px] font-bold text-gray-400">g</span>
                                </div>
                            </div>
                            {/* Macho Alimento */}
                            <div className="p-1 text-center">
                                <span className="text-[8px] font-bold text-gray-500 uppercase block mb-0.5">Macho</span>
                                <div className="flex items-baseline justify-center gap-0.5">
                                    <span className="text-[18px] font-black text-gray-900 leading-none">{data.feedConsumptionM.toFixed(0)}</span>
                                    <span className="text-[10px] font-bold text-gray-400">g</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Agua - Keep as separate clean card below */}
                    <div className="bg-white p-1 rounded-lg shadow-soft border border-gray-50 flex flex-col items-center justify-center transition-transform active:scale-95">
                        <div className="rounded flex items-center justify-center mb-0.5 text-cyan-500">
                            <span className="material-icons-round text-[20px]">water_drop</span>
                        </div>
                        <div className="text-center">
                            <div className="flex items-baseline justify-center gap-0.5">
                                <p className="text-[14px] font-black text-gray-900">≈ {data.waterConsumption.toFixed(0)}</p>
                                <p className="text-[10px] font-bold text-gray-400">ml</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Extra Biometry Cards: Uniformity & Mortality */}
            <div className="flex gap-2 px-1 justify-center">
                {/* Uniformity Card - Now with Hembra and Macho support */}
                <div className="w-[135px] bg-white p-2 rounded-xl border border-gray-100 shadow-soft">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-1 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <span className="material-icons-round text-[20px]">donut_large</span>
                        </div>
                        <p className="text-[12px] font-black text-gray-800 uppercase tracking-tight">Uniformidad</p>
                    </div>
                    <div className="flex flex-col gap-1.5 pt-1 border-t border-gray-50">
                        <div className="flex justify-between items-baseline">
                            <span className="text-[12px] font-bold text-gray-400 uppercase">H</span>
                            <span className="text-[16px] font-black text-gray-900 leading-none">{data.uniformityH}%</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                            <span className="text-[12px] font-bold text-gray-400 uppercase">M</span>
                            <span className="text-[16px] font-black text-gray-900 leading-none">{data.uniformityM}%</span>
                        </div>
                    </div>
                </div>

                {/* Mortality Card */}
                <div className="w-[124px] bg-white p-2 rounded-xl border border-gray-100 shadow-soft flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
                            <span className="material-icons-round text-[16px]">analytics</span>
                        </div>
                        <p className="text-[12px] font-black text-gray-800 uppercase tracking-tight">Mortalidad</p>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1">
                        <span className="text-[20px] font-black text-gray-900 leading-none">{data.mortalityGoal}%</span>
                        <p className="text-[8px] font-bold text-gray-300 uppercase mt-1">Meta Semanal</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
