'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import apiClient from '@/services/apiClient';
import { useAuth } from '@/contexts/AuthContext';

export const ProfileForm = () => {
    const { user, isLoading } = useAuth();

    // TODO: Add state management for form fields and submission logic
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // const formData = new FormData(e.target as HTMLFormElement);
        // const name = formData.get('name');
        // await apiClient.patch('/users/me', { name });
        alert('Profile updated! (UI Placeholder)');
    };

    if (isLoading || !user) return <div>Loading profile...</div>;

    return (
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your personal information here.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input id="phoneNumber" defaultValue={user.phoneNumber} readOnly disabled />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" defaultValue={user.name || ''} placeholder="Your full name" />
                    </div>
                    {/* TODO: Add language preference dropdown */}
                </CardContent>
                <CardFooter>
                    <Button type="submit">Save Changes</Button>
                </CardFooter>
            </form>
        </Card>
    );
};