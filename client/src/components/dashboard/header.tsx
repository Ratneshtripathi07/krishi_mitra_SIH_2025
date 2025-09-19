'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '../ui/button';
import { User } from 'lucide-react';

export const DashboardHeader = () => {
    const { user, logout } = useAuth();

    return (
        <header className="flex items-center justify-between p-4 border-b bg-white">
            <div>
                <h1 className="text-2xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">{user?.name || user?.phoneNumber}</span>
                </div>
                <Button variant="outline" onClick={logout}>
                    Logout
                </Button>
            </div>
        </header>
    );
};