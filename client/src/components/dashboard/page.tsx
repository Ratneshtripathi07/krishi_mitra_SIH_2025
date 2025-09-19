'use client';

import { StatCard } from '@/components/dashboard/stat-card';
import { Sun, Thermometer, Droplets, LineChart } from 'lucide-react';
// TODO: Fetch real data from the API endpoint
// import useSWR from 'swr';
// import apiClient from '@/services/apiClient';

// const fetcher = (url: string) => apiClient.get(url).then(res => res.data);

export default function DashboardPage() {
    // const { data, error, isLoading } = useSWR('/dashboard/farmer', fetcher);

    // Mock data for UI development
    const mockData = {
        weather: { temp: 28, condition: 'Sunny', humidity: 65 },
        cropStatus: { name: 'Brinjal', daysToHarvest: 45 },
        marketPrices: { price: "₹1550/qtl", trend: "up" },
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Today's Overview</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Temperature"
                    value={`${mockData.weather.temp}°C`}
                    description={mockData.weather.condition}
                    icon={<Thermometer className="h-5 w-5 text-muted-foreground" />}
                />
                <StatCard
                    title="Humidity"
                    value={`${mockData.weather.humidity}%`}
                    description="In your primary farm"
                    icon={<Droplets className="h-5 w-5 text-muted-foreground" />}
                />
                <StatCard
                    title="Market Price (Tomato)"
                    value={mockData.marketPrices.price}
                    description="Trend: Favorable"
                    icon={<LineChart className="h-5 w-5 text-muted-foreground" />}
                />
                <StatCard
                    title="Next Harvest"
                    value={`${mockData.cropStatus.daysToHarvest} days`}
                    description={mockData.cropStatus.name}
                    icon={<Sun className="h-5 w-5 text-muted-foreground" />}
                />
            </div>
            {/* TODO: Add sections for Alerts and Crop Details */}
        </div>
    );
}