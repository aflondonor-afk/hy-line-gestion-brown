import React, { useState } from 'react';
import { FocusItem, FocusTab, WeekData } from '../types';

interface FocusSectionProps {
    items: FocusItem[];
    data: WeekData;
}

const FocusSection: React.FC<FocusSectionProps> = ({ items, data }) => {
    const [activeTab, setActiveTab] = useState<FocusTab>('Intervenciones');
    const tabs: FocusTab[] = ['Intervenciones', 'Confort'];

    const filteredItems = items.filter(item => item.category === activeTab);

    const renderDetailedMetric = (label: string, icon: string, colorClass: string, bgClass: string, borderClass: string, iconColor: string, metric: any) => {
        const isArray = Array.isArray(metric);

        return (
            <div className={`${bgClass} p-2 rounded-2xl border ${borderClass} flex flex-col min-h-[70px] transition-all`}>
                <div className="flex items-center justify-center gap-1 mb-1 px-1">
                    <span className="text-[10px] font-black text-gray-800 uppercase tracking-tight">{label}</span>
                    <span className={`material-icons-round ${iconColor} text-[16px]`}>{icon}</span>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                    {isArray ? (
                        <div className="flex flex-col gap-0.5 w-full">
                            {metric.map((m: any, idx: number) => (
                                <div key={idx} className="flex justify-between items-center px-1 gap-2">
                                    <span className="text-[8px] font-bold text-gray-400 lowercase leading-none">{m.range}</span>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[13px] font-black text-gray-900 leading-none">{m.value}</span>
                                        {label === 'Ventilación' && idx === metric.length - 1 && (
                                            <span className="text-[5.5px] font-bold text-emerald-600/70 uppercase leading-none mt-0.5">Encendido</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-0.5 flex flex-col items-center">
                            <span className={`${String(metric).length > 10 ? 'text-[14px]' : 'text-[19px]'} font-black text-gray-900 leading-none tracking-tight`}>{metric}</span>
                            {label === 'Ventilación' && <span className="text-[7px] font-bold text-emerald-600/70 uppercase tracking-wider mt-0.5">Encendido</span>}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-[32px] overflow-hidden shadow-soft border border-gray-50">
            <div className="p-0 px-5 pt-0">
                <div className="flex border-b border-gray-100">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                flex-1 py-4 text-sm font-bold transition-all relative
                ${activeTab === tab ? 'text-primary' : 'text-gray-400'}
                `}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-4 space-y-4">
                {/* CONFORT TAB STRUCTURE */}
                {activeTab === 'Confort' && data.confortMetrics ? (
                    <>
                        {/* AMBIENTE SECTION */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 px-1">
                                <h3 className="text-[14px] font-black text-gray-800 uppercase tracking-wider">Ambiente</h3>
                            </div>

                            <div className="grid grid-cols-3 gap-1">
                                {renderDetailedMetric('Temperatura', 'thermostat', 'blue', 'bg-blue-50/50', 'border-blue-100', 'text-blue-600', data.confortMetrics.temp)}
                                {renderDetailedMetric('Humedad', 'water_drop', 'cyan', 'bg-cyan-50/50', 'border-cyan-100', 'text-cyan-600', data.confortMetrics.humidity)}
                                {renderDetailedMetric('Ventilación', 'air', 'emerald', 'bg-emerald-50/50', 'border-emerald-100', 'text-emerald-600', data.confortMetrics.ventilation)}
                            </div>

                            {/* Lighting Card */}
                            {data.confortMetrics.lighting && (
                                <div className="bg-amber-50/40 p-2 rounded-[24px] border border-amber-100/50 flex flex-col gap-2 group">
                                    <div className="flex items-center justify-center gap-1">
                                        <p className="text-[10px] font-black text-gray-800 uppercase tracking-tight">Iluminación</p>
                                        <span className="material-icons-round text-amber-500 text-[16px]">lightbulb</span>
                                    </div>

                                    {/* HEADER ROW */}
                                    <div className="flex items-center gap-2 px-1">
                                        {Array.isArray(data.confortMetrics.lighting) && <div className="w-14 text-[0px]">.</div>}
                                        <div className="flex-1 flex items-center">
                                            <p className="text-[10px] font-black text-amber-600/60 uppercase tracking-tighter w-[23%] text-center">Luz</p>
                                            <p className="text-[10px] font-black text-amber-600/60 uppercase tracking-tighter w-[30%] text-center">Luxes</p>
                                            <p className="text-[10px] font-black text-amber-600/60 uppercase tracking-tighter w-[47%] text-center">Periodo</p>
                                        </div>
                                    </div>

                                    {Array.isArray(data.confortMetrics.lighting) ? (
                                        <div className="space-y-1">
                                            {data.confortMetrics.lighting.map((item: any, idx: number) => (
                                                <div key={idx} className="flex items-center gap-3">
                                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter w-14">{item.range}</span>
                                                    <div className="flex-1 flex items-center bg-amber-50/30 py-2 rounded-xl border border-amber-100/20">
                                                        <p className="text-[14px] font-black text-gray-900 leading-none w-[23%] text-center">{item.hours}</p>
                                                        <div className="w-[1px] h-3 bg-amber-200/30"></div>
                                                        <p className="text-[14px] font-black text-gray-900 leading-none w-[30%] text-center">{item.intensity}</p>
                                                        <div className="w-[1px] h-3 bg-amber-200/30"></div>
                                                        <p className="text-[14px] font-black text-gray-900 leading-none w-[47%] text-center">{item.darkness}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 flex items-center bg-amber-50/30 py-0 rounded-xl border border-amber-100/20">
                                                <p className="text-[19px] font-black text-gray-900 leading-none w-[23%] text-center tracking-tight">{data.confortMetrics.lighting.hours}</p>
                                                <div className="w-[1px] h-6 bg-amber-200/30"></div>
                                                <p className="text-[19px] font-black text-gray-900 leading-none w-[30%] text-center tracking-tight">{data.confortMetrics.lighting.intensity}</p>
                                                <div className="w-[1px] h-6 bg-amber-200/30"></div>
                                                <p className="text-[19px] font-black text-gray-900 leading-none w-[47%] text-center tracking-tight">{data.confortMetrics.lighting.darkness}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* ESPACIO SECTION */}
                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-2 px-1">
                                <h3 className="text-[14px] font-black text-gray-800 uppercase tracking-wider">DENSIDAD</h3>
                            </div>

                            <div className="bg-blue-50/40 p-2 rounded-[24px] border border-blue-100/50 flex flex-col gap-2 group">
                                {data.confortMetrics?.space && (
                                    <>
                                        {/* HEADER ROW */}
                                        <div className="flex items-center gap-3 px-1">
                                            {Array.isArray(data.confortMetrics.space) && <div className="w-14 text-[0px]">.</div>}
                                            <div className="flex-1 flex items-center">
                                                <p className="text-[10px] font-black text-gray-900 uppercase tracking-tighter w-[26%] text-center whitespace-nowrap">AVES/<span className="lowercase">m²</span></p>
                                                <div className="w-[37%] flex items-center justify-center gap-0">
                                                    <p className="text-[10px] font-black text-gray-900 uppercase tracking-tighter whitespace-nowrap">AVES/BEBEDERO</p>
                                                    <img src="./bebedero_det.png" className="w-[22px] h-[22px] object-contain" alt="" />
                                                </div>
                                                <div className="w-[37%] flex items-center justify-center gap-1">
                                                    <p className="text-[10px] font-black text-gray-900 uppercase tracking-tighter whitespace-nowrap">AVES/COMEDERO</p>
                                                    <img src="./comedero_det.png" className="w-[22px] h-[22px] object-contain" alt="" />
                                                </div>
                                            </div>
                                        </div>

                                        {Array.isArray(data.confortMetrics.space) ? (
                                            <div className="space-y-0.5">
                                                {data.confortMetrics.space.map((item: any, idx: number) => (
                                                    <div key={idx} className="flex items-center gap-3">
                                                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter w-14">{item.range}</span>
                                                        <div className="flex-1 flex items-center bg-blue-50/30 py-0.5 rounded-xl border border-blue-100/20">
                                                            {/* Density - Unified if equal (centered, no label), split if different */}
                                                            <div className="w-[26%] flex flex-col justify-center px-1">
                                                                {item.densityH === item.densityM ? (
                                                                    <div className="flex justify-center items-center">
                                                                        <span className="text-[16px] font-black text-gray-900 tracking-tight leading-none">{item.densityH}</span>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex flex-col gap-0.5">
                                                                        <div className="flex justify-between items-center px-1">
                                                                            <span className="text-[7px] font-bold text-gray-400 uppercase">H</span>
                                                                            <span className="text-[13px] font-black text-gray-900 leading-none">{item.densityH}</span>
                                                                        </div>
                                                                        <div className="flex justify-between items-center px-1">
                                                                            <span className="text-[7px] font-bold text-gray-400 uppercase">M</span>
                                                                            <span className="text-[13px] font-black text-gray-900 leading-none">{item.densityM}</span>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="w-[1px] h-6 bg-blue-200/30"></div>
                                                            {/* Drinker - Single Value */}
                                                            <div className="w-[37%] flex items-center justify-center">
                                                                <span className="text-[16px] font-black text-gray-900 tracking-tight">{item.drinker}</span>
                                                            </div>
                                                            <div className="w-[1px] h-6 bg-blue-200/30"></div>
                                                            {/* Feeder - Single Value */}
                                                            <div className="w-[37%] flex items-center justify-center">
                                                                <span className="text-[16px] font-black text-gray-900 tracking-tight">{item.feeder}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 flex items-center bg-blue-50/30 py-0.5 rounded-xl border border-blue-100/20">
                                                    {/* Density (Single View) - Unified if equal, split if different */}
                                                    <div className="w-[26%] flex flex-col justify-center px-2">
                                                        {data.confortMetrics.space.densityH === data.confortMetrics.space.densityM ? (
                                                            <div className="flex justify-center items-center">
                                                                <span className="text-[20px] font-black text-gray-900 tracking-tight leading-none">{data.confortMetrics.space.densityH}</span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col gap-1">
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-[8px] font-bold text-gray-400 uppercase">H</span>
                                                                    <span className="text-[16px] font-black text-gray-900 leading-none">{data.confortMetrics.space.densityH}</span>
                                                                </div>
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-[8px] font-bold text-gray-400 uppercase">M</span>
                                                                    <span className="text-[16px] font-black text-gray-900 leading-none">{data.confortMetrics.space.densityM}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="w-[1px] h-8 bg-blue-200/30"></div>
                                                    {/* Drinker - Single Value (Single View) */}
                                                    <div className="w-[37%] flex items-center justify-center">
                                                        <span className="text-[20px] font-black text-gray-900 tracking-tight">{data.confortMetrics.space.drinker}</span>
                                                    </div>
                                                    <div className="w-[1px] h-8 bg-blue-200/30"></div>
                                                    {/* Feeder - Single Value (Single View) */}
                                                    <div className="w-[37%] flex items-center justify-center">
                                                        <span className="text-[20px] font-black text-gray-900 tracking-tight">{data.confortMetrics.space.feeder}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Legacy Items (Vacunas, etc) if any are left in Confort category */}
                            <div className="space-y-2 mt-4">
                                {filteredItems.filter(i => i.id !== 'dens-m2' && i.id !== 'dens-com' && i.id !== 'dens-beb').map((item) => (
                                    <div key={item.id} className="bg-gray-50/50 p-2.5 rounded-2xl flex items-center gap-3 group hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                                        <div className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-primary/60 group-hover:text-primary transition-colors">
                                            <span className="material-icons-round text-[18px]">{item.icon}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-[13px] font-bold text-gray-800 truncate">{item.title}</h4>
                                            <p className="text-[11px] text-gray-400 leading-tight mt-0.5">{item.description}</p>
                                        </div>
                                        <span className="material-icons-round text-gray-200 text-lg group-hover:text-primary transition-colors">chevron_right</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    /* INTERVENCIONES TAB OR NO DATA */
                    <div className="space-y-2">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <div key={item.id} className="bg-gray-50/50 p-2.5 rounded-2xl flex items-center gap-3 group hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                                    <div className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-primary/60 group-hover:text-primary transition-colors">
                                        <span className="material-icons-round text-[18px]">{item.icon}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-[13px] font-bold text-gray-800 truncate">{item.title}</h4>
                                        <p className="text-[11px] text-gray-400 leading-tight mt-0.5">{item.description}</p>
                                    </div>
                                    <span className="material-icons-round text-gray-200 text-lg group-hover:text-primary transition-colors">chevron_right</span>
                                </div>
                            ))
                        ) : (
                            <div className="py-10 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                                Sin tareas pendientes
                            </div>
                        )}
                    </div>
                )}

                <button className="w-full py-5 flex items-center justify-center gap-2 text-xs font-black text-primary uppercase tracking-widest hover:bg-gray-50 transition-colors border-t border-gray-50 mt-2">
                    Ver guía completa
                    <span className="material-icons-round text-sm">open_in_new</span>
                </button>
            </div>
        </div >
    );
};

export default FocusSection;