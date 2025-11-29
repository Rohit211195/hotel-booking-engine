import React from 'react';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';

const steps = [
    { id: 1, name: 'Rates & Rooms' },
    { id: 2, name: 'Check Out' },
    { id: 3, name: 'Confirmation' },
];

export function ProgressSteps({ currentStep }) {
    return (
        <div className="w-full py-6 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center">
                    {steps.map((step, index) => {
                        const isCompleted = currentStep > step.id;
                        const isCurrent = currentStep === step.id;

                        return (
                            <div key={step.id} className="flex items-center">
                                <div className="flex flex-col items-center relative">
                                    <div
                                        className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 z-10",
                                            isCompleted ? "bg-green-600 text-white" :
                                                isCurrent ? "bg-primary text-white" : "bg-slate-200 text-slate-500"
                                        )}
                                    >
                                        {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                                    </div>
                                    <span
                                        className={cn(
                                            "absolute top-10 text-xs font-medium whitespace-nowrap",
                                            isCurrent ? "text-primary" : "text-slate-500"
                                        )}
                                    >
                                        {step.name}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={cn(
                                            "w-12 h-[2px] mx-2",
                                            currentStep > step.id ? "bg-green-600" : "bg-slate-200"
                                        )}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
