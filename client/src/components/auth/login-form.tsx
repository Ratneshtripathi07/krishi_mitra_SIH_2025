'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input'; // Assuming shadcn/ui Input
import { User, Building } from 'lucide-react';

export const LoginForm = () => {
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [role, setRole] = useState<'FARMER' | 'ADMIN'>('FARMER');
    const { login } = useAuth();

    const handleRequestOtp = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add API call to backend to actually send OTP
        setStep('otp');
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        login(phoneNumber, otp, role); // Pass role to login function
    };

    return (
        <div className="p-6">
            {step === 'phone' && (
                <form onSubmit={handleRequestOtp} className="space-y-4">
                    <h3 className="font-semibold text-2xl">Sign In / Sign Up</h3>
                    <p className="text-sm text-muted-foreground">Enter your phone number to receive an OTP.</p>
                    <Input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                    />
                    <Button type="submit" className="w-full">Send OTP</Button>
                </form>
            )}

            {step === 'otp' && (
                <form onSubmit={handleLogin} className="space-y-4">
                    <h3 className="font-semibold text-2xl">Verify OTP</h3>
                    <p className="text-sm text-muted-foreground">Enter the OTP sent to {phoneNumber}.</p>
                    <Input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="6-digit OTP"
                        maxLength={6}
                    />

                    <div>
                        <p className="text-sm font-medium mb-2">First time here? Choose your role:</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div
                                onClick={() => setRole('FARMER')}
                                className={`p-4 border rounded-lg text-center cursor-pointer ${role === 'FARMER' ? 'border-primary ring-2 ring-primary' : ''}`}
                            >
                                <User className="mx-auto h-8 w-8 mb-2" />
                                <span className="font-medium">Farmer</span>
                            </div>
                            <div
                                onClick={() => setRole('ADMIN')}
                                className={`p-4 border rounded-lg text-center cursor-pointer ${role === 'ADMIN' ? 'border-primary ring-2 ring-primary' : ''}`}
                            >
                                <Building className="mx-auto h-8 w-8 mb-2" />
                                <span className="font-medium">Agri Officer</span>
                            </div>
                        </div>
                    </div>

                    <Button type="submit" className="w-full">Verify & Login</Button>
                </form>
            )}
        </div>
    );
};