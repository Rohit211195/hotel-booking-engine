import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Calendar, Users, Search } from 'lucide-react';

export function SearchForm({ onSearch, initialValues }) {
    const [checkIn, setCheckIn] = useState(initialValues?.checkIn || '');
    const [checkOut, setCheckOut] = useState(initialValues?.checkOut || '');
    const [guests, setGuests] = useState(initialValues?.guests || 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ checkIn, checkOut, guests });
    };

    return (
        <Card className="mb-8">
            <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4 items-end">
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Check-in
                        </label>
                        <input
                            type="date"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Check-out
                        </label>
                        <input
                            type="date"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Guests
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            value={guests}
                            onChange={(e) => setGuests(parseInt(e.target.value))}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full gap-2">
                        <Search className="w-4 h-4" />
                        Search
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
