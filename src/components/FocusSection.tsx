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
                            <span className="text-[19px] font-black text-gray-900 leading-none tracking-tight">{metric}</span>
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

            <div className="p-4 space-y-3">
                {/* SPECIAL GRID FOR CONFORT TAB */}
                {activeTab === 'Confort' && data.confortMetrics && (
                    <div className="grid grid-cols-3 gap-1 mb-4">
                        {renderDetailedMetric('Temperatura', 'thermostat', 'blue', 'bg-blue-50/50', 'border-blue-100', 'text-blue-600', data.confortMetrics.temp)}
                        {renderDetailedMetric('Humedad', 'water_drop', 'cyan', 'bg-cyan-50/50', 'border-cyan-100', 'text-cyan-600', data.confortMetrics.humidity)}
                        {renderDetailedMetric('Ventilación', 'air', 'emerald', 'bg-emerald-50/50', 'border-emerald-100', 'text-emerald-600', data.confortMetrics.ventilation)}
                    </div>
                )}

                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <div key={item.id} className="bg-gray-50/50 p-2.5 rounded-2xl flex items-center gap-3 group hover:bg-gray-50 transition-colors cursor-pointer">
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

                <button className="w-full py-5 flex items-center justify-center gap-2 text-xs font-black text-primary uppercase tracking-widest hover:bg-gray-50 transition-colors border-t border-gray-50 mt-2">
                    Ver guía completa
                    <span className="material-icons-round text-sm">open_in_new</span>
                </button>
            </div>
        </div>
    );
};

export default FocusSection;