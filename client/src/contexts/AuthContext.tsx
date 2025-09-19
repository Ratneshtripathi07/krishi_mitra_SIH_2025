'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '../services/apiClient';

// Define the shape of the User object, now including the role
interface User {
    id: string;
    phoneNumber: string;
    name?: string;
    languagePreference: string;
    role: 'FARMER' | 'ADMIN'; // Add role to user type
}

// Define the shape of the context value with the updated login function
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (phoneNumber: string, otp: string, role?: 'FARMER' | 'ADMIN') => Promise<void>; // Add role here
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const response = await apiClient.get('/users/me');
                    setUser(response.data);
                } catch (error) {
                    console.error('Session validation failed', error);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                }
            }
            setIsLoading(false);
        };
        initializeAuth();
    }, []);

    // Updated login function to accept and send the role
    const login = async (phoneNumber: string, otp: string, role?: 'FARMER' | 'ADMIN') => {
        try {
            // Pass the role in the request body
            const { data } = await apiClient.post('/auth/login', { phoneNumber, otp, role });
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            const userResponse = await apiClient.get('/users/me');
            const loggedInUser = userResponse.data as User;
            setUser(loggedInUser);

            // Redirect based on the user's role
            if (loggedInUser.role === 'ADMIN') {
                router.push('/admin');
            } else {
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Login failed', error);
            alert('Login failed. Please check your OTP and try again.');
        }
    };

    const logout = async () => {
        try {
            await apiClient.post('/auth/logout');
        } catch (error) {
            console.error('Logout failed on server, clearing session locally.', error);
        } finally {
            setUser(null);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            router.push('/'); // Redirect to the public landing page on logout
        }
    };

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};