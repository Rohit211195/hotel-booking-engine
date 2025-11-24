import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

export function OrderSummary({ room }) {
    if (!room) return null;

    const tax = room.price * 0.1;
    const total = room.price + tax;

    return (
        <Card className="bg-slate-50">
            <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="aspect-video w-full rounded-md overflow-hidden bg-slate-200">
                    <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h4 className="font-semibold">{room.name}</h4>
                    <p className="text-sm text-slate-500">{room.description}</p>
                </div>
                <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Room Rate</span>
                        <span>${room.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Taxes & Fees (10%)</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
