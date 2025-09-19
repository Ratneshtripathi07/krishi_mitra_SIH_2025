'use client';

import { useAdminAuth } from '@/hooks/useAdminAuth';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { DashboardHeader } from '@/components/dashboard/header'; // Reusing the header

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAdmin, isLoading } = useAdminAuth();

    if (isLoading) {
        return <div>Verifying access...</div>;
    }

    if (!isAdmin) {
        return null; // or a custom "Access Denied" component
    }

    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                {/* We can create a dedicated AdminHeader or reuse the DashboardHeader */}
                <DashboardHeader />
                <main className="flex-1 p-6 bg-gray-50">{children}</main>
            </div>
        </div>
    );
}