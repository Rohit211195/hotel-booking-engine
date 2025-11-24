import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Wifi, Tv, Coffee, Users } from 'lucide-react';

export function RoomCard({ room, onSelect, isSelected }) {
    return (
        <Card className={`overflow-hidden transition-all hover:shadow-lg ${isSelected ? 'ring-2 ring-primary' : ''}`}>
            <div className="aspect-video w-full bg-slate-200 relative">
                <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-primary">
                    ${room.price} / night
                </div>
            </div>
            <CardHeader>
                <CardTitle className="flex justify-between items-start">
                    <span>{room.name}</span>
                </CardTitle>
                <p className="text-slate-500 text-sm mt-2">{room.description}</p>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4 text-slate-600">
                    <div className="flex items-center gap-1 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{room.capacity} Guests</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                        <Wifi className="w-4 h-4" />
                        <span>Free Wifi</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                        <Tv className="w-4 h-4" />
                        <span>TV</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full"
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => onSelect(room)}
                >
                    {isSelected ? 'Selected' : 'Select Room'}
                </Button>
            </CardFooter>
        </Card>
    );
}
