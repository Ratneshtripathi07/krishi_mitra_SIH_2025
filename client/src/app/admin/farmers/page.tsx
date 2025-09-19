'use client';

import useSWR from 'swr';
import apiClient from '@/services/apiClient';
import { columns, Farmer } from '@/components/admin/farmers/columns';
import { DataTable } from '@/components/admin/farmers/data-table';

const fetcher = (url: string) => apiClient.get(url).then(res => res.data);

export default function FarmerManagementPage() {
    const { data: farmers, error, isLoading } = useSWR<Farmer[]>('/admin/farmers', fetcher);

    if (isLoading) return <div>Loading farmers...</div>;
    if (error) return <div>Failed to load farmers list.</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Farmer Management</h2>
            <DataTable columns={columns} data={farmers || []} />
        </div>
    );
}