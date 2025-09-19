'use client';

import { StatCard } from '@/components/dashboard/stat-card';
import { Users, Tractor } from 'lucide-react';
import useSWR from 'swr';
import apiClient from '@/services/apiClient';
import { BarChartCard } from '@/components/admin/charts/bar-chart-card';

const fetcher = (url: string) => apiClient.get(url).then(res => res.data);

export default function AdminDashboardPage() {
    const { data, error, isLoading } = useSWR('/admin/analytics', fetcher);

    if (isLoading) return <div>Loading analytics...</div>;
    if (error) return <div>Failed to load analytics.</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Admin Dashboard</h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Farmers"
                    value={data?.totalFarmers || '0'}
                    icon={<Users className="h-5 w-5 text-muted-foreground" />}
                />
                <StatCard
                    title="Total Farms"
                    value={data?.totalFarms || '0'}
                    icon={<Tractor className="h-5 w-5 text-muted-foreground" />}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <BarChartCard
                    title="Crop Distribution"
                    data={data?.cropDistribution || []}
                    dataKey="count"
                    xAxisKey="crop"
                />
                <BarChartCard
                    title="Regional Farmer Distribution"
                    data={data?.regionalDistribution || []}
                    dataKey="farmers"
                    xAxisKey="region"
                />
            </div>
        </div>
    );
}