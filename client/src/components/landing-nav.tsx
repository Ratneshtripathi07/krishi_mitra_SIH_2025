'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'; // shadcn/ui Dialog
import { LoginForm } from './auth/login-form';

export const LandingNav = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <header className="py-4 px-8 border-b">
            <nav className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">🌾 Krishi Mitra</span>
                </div>

                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button>Sign In / Sign Up</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <LoginForm />
                    </DialogContent>
                </Dialog>

            </nav>
        </header>
    );
};