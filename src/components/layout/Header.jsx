import React from 'react';
import { User, Hotel } from 'lucide-react';

export function Header() {
    return (
        <header className="border-b bg-white">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-primary p-2 rounded-lg">
                        <Hotel className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-primary">LuxeStay</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary cursor-pointer">
                        <div className="bg-slate-100 p-2 rounded-full">
                            <User className="h-5 w-5" />
                        </div>
                        <span>John Doe</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
