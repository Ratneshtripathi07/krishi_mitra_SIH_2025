import { StatCard } from './stat-card';
import { Thermometer, Droplets } from 'lucide-react';

interface WeatherData {
    temp: number;
    condition: string;
    humidity: number;
}

interface WeatherCardProps {
    weatherData?: WeatherData;
}

export const WeatherCard = ({ weatherData }: WeatherCardProps) => {
    if (!weatherData) {
        return <StatCard title="Temperature" value="--" icon={<Thermometer />} />;
    }

    return (
        <>
            <StatCard
                title="Temperature"
                value={`${weatherData.temp}°C`}
                description={weatherData.condition}
                icon={<Thermometer className="h-5 w-5 text-muted-foreground" />}
            />
            <StatCard
                title="Humidity"
                value={`${weatherData.humidity}%`}
                description="In your primary farm"
                icon={<Droplets className="h-5 w-5 text-muted-foreground" />}
            />
        </>
    );
};