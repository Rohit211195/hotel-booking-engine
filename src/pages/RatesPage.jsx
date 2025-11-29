import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { RoomCard } from '../components/rooms/RoomCard';
import { SearchForm } from '../components/rates/SearchForm';
import { Button } from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { SignUpCard } from '../components/rates/SignUpCard';

const ROOMS = [
    {
        id: 1,
        name: 'Deluxe King Room',
        description: 'Spacious room with a king-size bed, city view, and modern amenities.',
        price: 299,
        capacity: 2,
        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 2,
        name: 'Executive Suite',
        description: 'Luxury suite with separate living area, panoramic views, and premium service.',
        price: 499,
        capacity: 3,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 3,
        name: 'Family Garden View',
        description: 'Perfect for families, featuring two queen beds and direct garden access.',
        price: 399,
        capacity: 4,
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800'
    }
];

export default function RatesPage() {
    const navigate = useNavigate();
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [searchParams, setSearchParams] = useState(() => {
        const saved = localStorage.getItem('booking_search');
        if (saved) {
            return JSON.parse(saved);
        }

        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const formatDate = (date) => {
            return date.toISOString().split('T')[0];
        };

        return {
            checkIn: formatDate(today),
            checkOut: formatDate(tomorrow),
            guests: 1
        };
    });

    useEffect(() => {
        // Clear previous booking data when starting a new flow
        localStorage.removeItem('booking_guest');
        localStorage.removeItem('booking_reference');
        // Keep booking_search as user preference

        const savedRoom = localStorage.getItem('booking_room');
        if (savedRoom) {
            setSelectedRoom(JSON.parse(savedRoom));
        }
    }, []);

    const handleSearch = (params) => {
        setSearchParams(params);
        localStorage.setItem('booking_search', JSON.stringify(params));
    };

    const handleSelectRoom = (room) => {
        setSelectedRoom(room);
        localStorage.setItem('booking_room', JSON.stringify(room));
        // Auto-navigate to next step
        localStorage.setItem('booking_search', JSON.stringify(searchParams));
        navigate('/guest');
    };

    const handleNext = () => {
        if (selectedRoom) {
            // Ensure search params are saved even if search wasn't clicked
            localStorage.setItem('booking_search', JSON.stringify(searchParams));
            navigate('/guest');
        }
    };

    return (
        <Layout currentStep={1}>
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-900">Select Your Room</h1>
                    <p className="text-slate-600 mt-2">Choose from our collection of luxury accommodations</p>
                </div>

                <SearchForm onSearch={handleSearch} initialValues={searchParams} />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {ROOMS.map(room => (
                        <RoomCard
                            key={room.id}
                            room={room}
                            isSelected={selectedRoom?.id === room.id}
                            onSelect={handleSelectRoom}
                        />
                    ))}
                    <SignUpCard />
                </div>


            </div>
        </Layout>
    );
}
