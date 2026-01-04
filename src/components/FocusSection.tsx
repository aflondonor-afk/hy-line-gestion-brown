import React, { useState } from 'react';
import { FocusItem, FocusTab } from '../types';

interface FocusSectionProps {
    items: FocusItem[];
}

const FocusSection: React.FC<FocusSectionProps> = ({ items }) => {
    const [activeTab, setActiveTab] = useState<FocusTab>('Manejo');
    const tabs: FocusTab[] = ['Manejo', 'Iluminación', 'Nutrición'];

    const filteredItems = items.filter(item => item.category === activeTab);

    return (
        <div className="bg-white rounded-[32px] overflow-hidden shadow-soft border border-gray-50">
            <div className="p-1 px-4 pt-4">
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
                {filteredItems.map((item) => (
                    <div key={item.id} className="bg-gray-50/50 p-4 rounded-2xl flex items-center gap-4 group hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-primary/60 group-hover:text-primary transition-colors">
                            <span className="material-icons-round">{item.icon}</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-800">{item.title}</h4>
                            <p className="text-[11px] text-gray-400 leading-tight mt-0.5">{item.description}</p>
                        </div>
                        <span className="material-icons-round text-gray-200 text-lg group-hover:text-primary transition-colors">chevron_right</span>
                    </div>
                ))}

                <button className="w-full py-5 flex items-center justify-center gap-2 text-xs font-black text-primary uppercase tracking-widest hover:bg-gray-50 transition-colors border-t border-gray-50 mt-2">
                    Ver guía completa
                    <span className="material-icons-round text-sm">open_in_new</span>
                </button>
            </div>
        </div>
    );
};

export default FocusSection;