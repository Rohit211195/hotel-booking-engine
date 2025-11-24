import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RatesPage from './pages/RatesPage';
import GuestPage from './pages/GuestPage';
import PaymentPage from './pages/PaymentPage';
import ConfirmationPage from './pages/ConfirmationPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/rates" replace />} />
                <Route path="/rates" element={<RatesPage />} />
                <Route path="/guest" element={<GuestPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
            </Routes>
        </Router>
    );
}

export default App;
