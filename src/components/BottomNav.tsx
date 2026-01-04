import React from 'react';

const BottomNav: React.FC = () => {
    const navItems = [
        { icon: 'grid_view', label: 'Resumen', active: true },
        { icon: 'show_chart', label: 'Gráficos', active: false },
        { icon: 'inventory_2', label: 'Lotes', active: false },
        { icon: 'settings', label: 'Ajustes', active: false },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50">
            {/* Floating Action Button */}
            <div className="absolute left-1/2 -top-8 -translate-x-1/2">
                <button className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,72,132,0.4)] border-4 border-white hover:scale-110 transition-transform active:scale-95">
                    <span className="material-icons-round text-3xl">add</span>
                </button>
            </div>

            <nav className="bg-white border-t border-gray-100 flex items-center justify-between px-8 py-3 pb-6">
                <div className="flex items-center justify-between w-full max-w-lg mx-auto">
                    {navItems.slice(0, 2).map((item, idx) => (
                        <button key={idx} className={`flex flex-col items-center gap-1 ${item.active ? 'text-primary' : 'text-gray-300'}`}>
                            <span className="material-icons-round text-2xl">{item.icon}</span>
                            <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
                        </button>
                    ))}

                    <div className="w-16"></div> {/* Spacer for FAB */}

                    {navItems.slice(2, 4).map((item, idx) => (
                        <button key={idx} className={`flex flex-col items-center gap-1 ${item.active ? 'text-primary' : 'text-gray-300'}`}>
                            <span className="material-icons-round text-2xl">{item.icon}</span>
                            <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default BottomNav;
