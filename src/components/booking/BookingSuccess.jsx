import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { CheckCircle, Calendar, MapPin, User, Users } from 'lucide-react';

export function BookingSuccess({ booking, onHome }) {
    return (
        <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900">Congratulations!</h1>
                <p className="text-slate-600">
                    Your room is booked. We've sent a confirmation email to {booking.guest.email}.
                </p>
                <div className="bg-slate-100 px-6 py-3 rounded-lg">
                    <span className="text-sm text-slate-500 block">Booking Reference</span>
                    <span className="text-xl font-mono font-bold text-slate-900">{booking.reference}</span>
                </div>
            </div>

            <Card className="text-left">
                <CardHeader>
                    <CardTitle>Reservation Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex gap-4 items-start pb-6 border-b">
                        <div className="w-24 h-16 bg-slate-200 rounded-md overflow-hidden flex-shrink-0">
                            <img src={booking.room.image} alt={booking.room.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">{booking.room.name}</h3>
                            <p className="text-slate-500 text-sm">{booking.room.description}</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                <User className="w-4 h-4" />
                                Guest Name
                            </div>
                            <p className="font-medium">{booking.guest.firstName} {booking.guest.lastName}</p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                <Calendar className="w-4 h-4" />
                                Dates
                            </div>
                            <p className="font-medium">
                                {booking.search?.checkIn || 'Not selected'} - {booking.search?.checkOut || 'Not selected'}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                <Users className="w-4 h-4" />
                                Guests
                            </div>
                            <p className="font-medium">{booking.search?.guests || 1} Guests</p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                <MapPin className="w-4 h-4" />
                                Location
                            </div>
                            <p className="font-medium">LuxeStay Hotel, New York</p>
                        </div>
                    </div>

                    <div className="pt-6 border-t flex justify-between items-center">
                        <span className="font-semibold">Total Paid</span>
                        <span className="text-xl font-bold text-primary">
                            ${(booking.room.price * 1.1).toFixed(2)}
                        </span>
                    </div>
                </CardContent>
            </Card>

            <Button onClick={onHome} size="lg" className="min-w-[200px]">
                Back to Home
            </Button>
        </div>
    );
}
