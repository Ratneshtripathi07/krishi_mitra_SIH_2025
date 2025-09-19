import { StatCard } from './stat-card';
import { LineChart } from 'lucide-react';

interface MarketPriceData {
    crop: string;
    price: number;
    trend: 'up' | 'down' | 'stable';
}

interface MarketPriceCardProps {
    marketData?: MarketPriceData;
}

export const MarketPriceCard = ({ marketData }: MarketPriceCardProps) => {
    if (!marketData) {
        return <StatCard title="Market Price" value="--" icon={<LineChart />} />;
    }

    const trendDescription = `Trend: ${marketData.trend === 'up' ? 'Favorable' : 'Stable'}`;

    return (
        <StatCard
            title={`Market Price (${marketData.crop})`}
            value={`₹${marketData.price}/qtl`}
            description={trendDescription}
            icon={<LineChart className="h-5 w-5 text-muted-foreground" />}
        />
    );
};