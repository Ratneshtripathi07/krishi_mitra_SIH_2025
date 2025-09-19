'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '../services/apiClient';

// Define the shape of the User object
interface User {
    id: string;
    phoneNumber: string;
    name?: string;
    languagePreference: string;
}

// Define the shape of the context value
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (phoneNumber: string, otp: string) => Promise<void>;
    logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component that will wrap our application
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // On initial app load, check for an existing session
        const initializeAuth = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    // If token exists, fetch user profile to validate the session
                    const response = await apiClient.get('/users/me');
                    setUser(response.data);
                } catch (error) {
                    // If token is invalid, clear it
                    console.error('Session validation failed', error);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                }
            }
            setIsLoading(false);
        };
        initializeAuth();
    }, []);

    const login = async (phoneNumber: string, otp: string) => {
        try {
            const { data } = await apiClient.post('/auth/login', { phoneNumber, otp });
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            // After successful login, fetch the user profile
            const userResponse = await apiClient.get('/users/me');
            setUser(userResponse.data);
            router.push('/dashboard'); // Redirect to the dashboard
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
            router.push('/login');
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

// Custom hook to easily use the auth context in any component
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};