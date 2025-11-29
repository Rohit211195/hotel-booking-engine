import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Check, Star } from 'lucide-react';
import { Button } from '../ui/Button';

export function SignUpCard() {
    const perks = [
        "Member Rates (10% off)",
        "Free Wi-Fi",
        "Late Checkout (2 PM)"
    ];

    return (
        <Card className="bg-slate-900 text-white border-none overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Star className="w-32 h-32" />
            </div>

            <CardHeader>
                <CardTitle className="text-xl text-white">
                    Sign up to get additional perks
                </CardTitle>
            </CardHeader>

            <CardContent>
                <ul className="space-y-3 mb-6">
                    {perks.map((perk, index) => (
                        <li key={index} className="flex items-center gap-2 text-slate-200">
                            <div className="bg-primary/20 p-1 rounded-full">
                                <Check className="w-3 h-3 text-primary" />
                            </div>
                            {perk}
                        </li>
                    ))}
                </ul>

                <Button className="w-full bg-white text-slate-900 hover:bg-slate-100">
                    Sign Up Now
                </Button>
            </CardContent>
        </Card>
    );
}
