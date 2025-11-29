import React from 'react';
import { Hotel } from 'lucide-react';
import { Button } from '../ui/Button';

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
                    <Button variant="default">
                        Sign up
                    </Button>
                </div>
            </div>
        </header>
    );
}
