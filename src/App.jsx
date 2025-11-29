import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RatesPage from './pages/RatesPage';
import GuestPage from './pages/GuestPage';
import ConfirmationPage from './pages/ConfirmationPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/rates" replace />} />
                <Route path="/rates" element={<RatesPage />} />
                <Route path="/guest" element={<GuestPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
            </Routes>
        </Router>
    );
}

export default App;
