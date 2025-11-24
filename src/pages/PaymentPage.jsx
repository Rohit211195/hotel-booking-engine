import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { PaymentForm } from '../components/payment/PaymentForm';
import { OrderSummary } from '../components/booking/OrderSummary';

export default function PaymentPage() {
    const navigate = useNavigate();
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const savedRoom = localStorage.getItem('booking_room');
        if (!savedRoom) {
            navigate('/rates');
            return;
        }
        setSelectedRoom(JSON.parse(savedRoom));
    }, [navigate]);

    const handlePaymentSubmit = () => {
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            const bookingId = 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase();
            localStorage.setItem('booking_reference', bookingId);
            setIsProcessing(false);
            navigate('/confirmation');
        }, 1500);
    };

    if (!selectedRoom) return null;

    return (
        <Layout currentStep={3}>
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <h1 className="text-2xl font-bold mb-6">Payment Details</h1>
                        <PaymentForm onSubmit={handlePaymentSubmit} isProcessing={isProcessing} hideSubmitButton={true} />
                    </div>
                    <div className="md:col-span-1">
                        <OrderSummary room={selectedRoom} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
