import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ProgressSteps } from '../ui/ProgressSteps';

export function Layout({ children, currentStep }) {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
            <Header />
            <ProgressSteps currentStep={currentStep} />
            <main className="flex-1 container mx-auto px-4 py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
}
