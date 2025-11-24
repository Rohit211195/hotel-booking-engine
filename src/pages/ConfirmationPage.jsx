import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { BookingSuccess } from '../components/booking/BookingSuccess';

export default function ConfirmationPage() {
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        const room = JSON.parse(localStorage.getItem('booking_room'));
        const guest = JSON.parse(localStorage.getItem('booking_guest'));
        const search = JSON.parse(localStorage.getItem('booking_search'));
        const reference = localStorage.getItem('booking_reference');

        if (!room || !guest || !reference) {
            navigate('/rates');
            return;
        }

        setBooking({ room, guest, search, reference });
    }, [navigate]);

    const handleHome = () => {
        navigate('/rates');
    };

    if (!booking) return null;

    return (
        <Layout currentStep={4}>
            <BookingSuccess booking={booking} onHome={handleHome} />
        </Layout>
    );
}
