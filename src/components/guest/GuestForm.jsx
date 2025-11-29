import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { CreditCard, Lock } from 'lucide-react';

const VisaIcon = () => (
    <svg viewBox="0 0 32 20" className="w-10 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.12 13.92H14.16L15.48 5.56H13.44L12.12 13.92ZM20.64 5.68C20.24 5.56 19.36 5.44 18.24 5.44C15.84 5.44 14.16 6.72 14.12 8.6C14.08 10.2 15.52 11.12 16.64 11.68C17.76 12.24 18.16 12.6 18.16 13.16C18.16 14.04 17.08 14.44 16.08 14.44C15.04 14.44 14.44 14.28 13.48 13.84L13.08 13.68L12.72 15.96C13.4 16.28 14.68 16.56 16 16.56C18.52 16.56 20.2 15.28 20.24 13.28C20.24 11.8 19.32 10.96 17.88 10.24C17.12 9.84 16.64 9.6 16.64 9.04C16.64 8.56 17.2 8.04 18.32 8.04C19.16 8.04 19.76 8.2 20.16 8.4L20.64 5.68ZM24.32 13.92H22.24C21.6 13.92 21.08 13.72 20.84 12.56L18 5.56H20.6L21.88 12.16C21.92 12.28 21.92 12.44 21.96 12.6C22.08 11.84 23.44 5.56 23.44 5.56H26L24.32 13.92ZM10.24 5.56L8.24 13.92H5.84L7.84 5.56H10.24ZM7.8 5.56L6.24 13.04L6.08 12.2C5.64 10.64 3.32 7.88 1.92 7.12L2.36 5.56H7.8Z" fill="#1A1F71" />
    </svg>
);

const MastercardIcon = () => (
    <svg viewBox="0 0 32 20" className="w-10 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="20" rx="2" fill="#252525" />
        <circle cx="11" cy="10" r="6" fill="#EB001B" fillOpacity="0.8" />
        <circle cx="21" cy="10" r="6" fill="#F79E1B" fillOpacity="0.8" />
    </svg>
);

const AmexIcon = () => (
    <svg viewBox="0 0 32 20" className="w-10 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 2C2 0.89543 2.89543 0 4 0H28C29.1046 0 30 0.89543 30 2V18C30 19.1046 29.1046 20 28 20H4C2.89543 20 2 19.1046 2 18V2Z" fill="#006FCF" />
        <path d="M6 13L4.5 13L6 6.5L9.5 6.5L9 8L7.5 8L7 9.5L8.5 9.5L8 11L6.5 11L6 13ZM13 13L10.5 13L11 10L12 6.5L13.5 6.5L14 10L15 6.5L16.5 6.5L15 13L13.5 13L13 10L13 13ZM21 13L17 13L17.5 11L20 11L20.5 9.5L18 9.5L18.5 8L21 8L21.5 6.5L17 6.5L15.5 13L22.5 13L21 13Z" fill="white" />
    </svg>
);

const DiscoverIcon = () => (
    <svg viewBox="0 0 32 20" className="w-10 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="20" rx="2" fill="#FF6000" />
        <path d="M5 10C5 5.02944 9.02944 1 14 1C18.9706 1 23 5.02944 23 10C23 14.9706 18.9706 19 14 19C9.02944 19 5 14.9706 5 10Z" stroke="white" strokeWidth="2" />
        <path d="M14 5V15M9 10H19" stroke="white" strokeWidth="2" />
    </svg>
);

export function GuestForm({ onSubmit, initialData, isProcessing }) {
    const [formData, setFormData] = React.useState(initialData || {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialRequests: ''
    });

    const [phoneCode, setPhoneCode] = React.useState('+91');
    const [phoneNumber, setPhoneNumber] = React.useState('');

    // Payment State
    const [paymentData, setPaymentData] = React.useState({
        cardNumber: '',
        expiry: '',
        cvc: '',
        cardName: ''
    });

    const [errors, setErrors] = React.useState({});
    const [cardType, setCardType] = React.useState('');

    const detectCardType = (number) => {
        const patterns = {
            visa: /^4/,
            mastercard: /^5[1-5]/,
            amex: /^3[47]/,
            discover: /^6/
        };
        for (const [type, pattern] of Object.entries(patterns)) {
            if (pattern.test(number)) return type;
        }
        return '';
    };

    const renderCardIcon = () => {
        switch (cardType) {
            case 'visa': return <VisaIcon />;
            case 'mastercard': return <MastercardIcon />;
            case 'amex': return <AmexIcon />;
            case 'discover': return <DiscoverIcon />;
            default: return <CreditCard className="h-4 w-4 text-slate-400" />;
        }
    };

    const validateExpiry = (expiry) => {
        if (expiry.length !== 5) return "Invalid format";
        const [month, year] = expiry.split('/').map(Number);
        if (!month || !year || month < 1 || month > 12) return "Invalid month";

        const now = new Date();
        const currentYear = now.getFullYear() % 100;
        const currentMonth = now.getMonth() + 1;

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            return "Card has expired";
        }
        return "";
    };

    // Initialize phone state if initialData exists
    React.useEffect(() => {
        if (initialData?.phone) {
            // Simple check to see if it starts with a known code, otherwise default
            // For now, we'll just set the number and keep default code if not parsing
            setPhoneNumber(initialData.phone.replace(/^\+91\s*/, ''));
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;
        let newErrors = { ...errors };

        if (name === 'cardNumber') {
            // Only numbers, max 16 digits
            newValue = value.replace(/\D/g, '').slice(0, 16);
            setCardType(detectCardType(newValue));
        } else if (name === 'expiry') {
            // Numbers only, auto-slash, max 5 chars (MM/YY)
            const numbers = value.replace(/\D/g, '');
            if (numbers.length >= 2) {
                newValue = `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
            } else {
                newValue = numbers;
            }

            if (newValue.length === 5) {
                const error = validateExpiry(newValue);
                if (error) newErrors.expiry = error;
                else delete newErrors.expiry;
            }
        } else if (name === 'cvc') {
            // Only numbers, max 3 digits
            newValue = value.replace(/\D/g, '').slice(0, 3);
        }

        setPaymentData(prev => ({ ...prev, [name]: newValue }));
        setErrors(newErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullPhone = `${phoneCode} ${phoneNumber}`;
        onSubmit({
            ...formData,
            phone: fullPhone,
            payment: paymentData
        });
    };

    return (
        <form id="guest-form" onSubmit={handleSubmit} className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Guest Details</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="text-sm font-bold">First Name</label>
                            <input
                                id="firstName"
                                name="firstName"
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-bold placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="lastName" className="text-sm font-bold">Last Name</label>
                            <input
                                id="lastName"
                                name="lastName"
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-bold placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-bold">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-bold placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-bold">Phone Number</label>
                            <div className="flex gap-2">
                                <select
                                    className="flex h-10 w-24 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    value={phoneCode}
                                    onChange={(e) => setPhoneCode(e.target.value)}
                                >
                                    <option value="+91">IN +91</option>
                                    <option value="+1">US +1</option>
                                    <option value="+44">UK +44</option>
                                    <option value="+61">AU +61</option>
                                    <option value="+81">JP +81</option>
                                </select>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-bold placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="98765 43210"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 mt-4">
                        <label htmlFor="specialRequests" className="text-sm font-bold">Special Requests (Optional)</label>
                        <textarea
                            id="specialRequests"
                            name="specialRequests"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={formData.specialRequests}
                            onChange={handleChange}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Payment Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-6">
                                <label className="text-sm font-bold block mb-2">Card Number</label>
                                <div className="relative">
                                    <input
                                        name="cardNumber"
                                        type="text"
                                        placeholder="0000 0000 0000 0000"
                                        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${cardType ? 'pl-14' : 'pl-10'}`}
                                        required
                                        value={paymentData.cardNumber}
                                        onChange={handlePaymentChange}
                                    />
                                    <div className="absolute left-3 top-2.5 flex items-center gap-2">
                                        {renderCardIcon()}
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-3">
                                <label className="text-sm font-bold block mb-2">Expiry</label>
                                <input
                                    name="expiry"
                                    type="text"
                                    placeholder="MM/YY"
                                    className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.expiry ? 'border-red-500' : 'border-input'}`}
                                    required
                                    value={paymentData.expiry}
                                    onChange={handlePaymentChange}
                                />
                                {errors.expiry && <span className="text-[10px] text-red-500 absolute">{errors.expiry}</span>}
                            </div>

                            <div className="col-span-3">
                                <label className="text-sm font-bold block mb-2">CVC</label>
                                <div className="relative">
                                    <input
                                        name="cvc"
                                        type="text"
                                        placeholder="123"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                                        required
                                        value={paymentData.cvc}
                                        onChange={handlePaymentChange}
                                    />
                                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Button type="submit" className="w-full" disabled={isProcessing}>
                            {isProcessing ? 'Processing...' : 'Complete Booking'}
                        </Button>

                        <p className="text-xs text-center text-slate-500 flex items-center justify-center gap-1 mt-4">
                            <Lock className="w-3 h-3" />
                            Payments are secure and encrypted
                        </p>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}
