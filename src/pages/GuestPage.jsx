import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { GuestForm } from '../components/guest/GuestForm';
import { OrderSummary } from '../components/booking/OrderSummary';

export default function GuestPage() {
    const navigate = useNavigate();
    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
        const savedRoom = localStorage.getItem('booking_room');
        if (!savedRoom) {
            navigate('/rates');
            return;
        }
        setSelectedRoom(JSON.parse(savedRoom));
    }, [navigate]);

    const handleGuestSubmit = (data) => {
        localStorage.setItem('booking_guest', JSON.stringify(data));
        navigate('/payment');
    };

    if (!selectedRoom) return null;

    return (
        <Layout currentStep={2}>
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <h1 className="text-2xl font-bold mb-6">Guest Information</h1>
                        <GuestForm onSubmit={handleGuestSubmit} hideSubmitButton={true} />
                    </div>
                    <div className="md:col-span-1">
                        <OrderSummary room={selectedRoom} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
