'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

// Basic styling for components to ensure usability
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'sans-serif',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        width: '300px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    header: {
        marginBottom: '20px',
    },
};

export default function LoginPage() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const { login } = useAuth();

    const handleRequestOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (phoneNumber.length === 10) {
            console.log(`OTP requested for ${phoneNumber}. For MVP, use '123456'`);
            setOtpSent(true);
        } else {
            alert('Please enter a valid 10-digit phone number.');
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Assuming the login function in AuthContext is updated to handle the role
        // For now, we'll just pass a default or null role.
        login(phoneNumber, otp, 'FARMER');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Welcome to Krishi Mitra</h1>
            {!otpSent ? (
                <form onSubmit={handleRequestOtp} style={styles.form}>
                    <h2>Enter Phone Number</h2>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="10-digit mobile number"
                        style={styles.input}
                        maxLength={10}
                    />
                    <button type="submit" style={styles.button}>
                        Send OTP
                    </button>
                </form>
            ) : (
                <form onSubmit={handleLogin} style={styles.form}>
                    <h2>Enter OTP</h2>
                    {/* FIX: Replaced "sent" with &quot;sent&quot; */}
                    <p>An OTP was &quot;sent&quot; to {phoneNumber}</p>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="6-digit OTP"
                        style={styles.input}
                        maxLength={6}
                    />
                    <button type="submit" style={styles.button}>
                        Login
                    </button>
                </form>
            )}
        </div>
    );
}