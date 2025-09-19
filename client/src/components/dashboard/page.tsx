'use client';

import { WeatherCard } from '@/components/dashboard/weather-card';
import { MarketPriceCard } from '@/components/dashboard/market-price-card';
import { StatCard } from '@/components/dashboard/stat-card';
import { Sun } from 'lucide-react';
import { AlertsPanel } from '@/components/dashboard/alerts-panel';
import { useDashboard } from '@/hooks/useDashboard';

export default function DashboardPage() {
    const { dashboardData, isLoading, isError } = useDashboard();

    if (isLoading) return <div>Loading dashboard...</div>;
    if (isError) return <div>Failed to load dashboard data.</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Today's Overview</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Weather Cards */}
                <WeatherCard weatherData={dashboardData?.weather} />

                {/* Market Price Card */}
                <MarketPriceCard marketData={dashboardData?.marketPrices} />

                {/* Crop Status Card */}
                <StatCard
                    title="Next Harvest"
                    value={`${dashboardData?.cropStatus?.daysToHarvest || '--'} days`}
                    description={dashboardData?.cropStatus?.name || 'No active crop'}
                    icon={<Sun className="h-5 w-5 text-muted-foreground" />}
                />

                {/* Alerts Panel */}
                <AlertsPanel alerts={dashboardData?.alerts} />
            </div>
            {/* TODO: Add sections for Detailed Crop Cycle view */}
        </div>
    );
}