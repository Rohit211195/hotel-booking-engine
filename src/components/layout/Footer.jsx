import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export function Footer() {
    const location = useLocation();
    const navigate = useNavigate();
    const isWizardPage = ['/guest', '/payment'].includes(location.pathname);

    if (isWizardPage) {
        const isPaymentPage = location.pathname === '/payment';

        const handleBack = () => {
            if (isPaymentPage) {
                navigate('/guest');
            } else {
                navigate('/rates');
            }
        };

        return (
            <footer className="border-t bg-white mt-auto sticky bottom-0 z-10 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="container mx-auto max-w-6xl flex items-center justify-between">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    <Button
                        form={isPaymentPage ? "payment-form" : "guest-form"}
                        type="submit"
                    >
                        {isPaymentPage ? "Create Booking" : "Next"}
                    </Button>
                </div>
            </footer>
        );
    }

    return (
        <footer className="border-t bg-white mt-auto">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between text-sm text-slate-500">
                <p>&copy; 2024 LuxeStay Hotels. All rights reserved.</p>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-primary">Privacy Policy</a>
                    <a href="#" className="hover:text-primary">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
