'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useAdminAuth = () => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return; // Wait until auth state is loaded

        if (!isAuthenticated) {
            router.push('/login'); // Not logged in, redirect to login
            return;
        }

        if (user?.role !== 'ADMIN') {
            router.push('/dashboard'); // Logged in, but not an admin, redirect to farmer dashboard
        }
    }, [user, isAuthenticated, isLoading, router]);

    // Return a loading state until the check is complete
    return {
        isAdmin: user?.role === 'ADMIN',
        isLoading: isLoading || (isAuthenticated && user?.role !== 'ADMIN'),
    };
};