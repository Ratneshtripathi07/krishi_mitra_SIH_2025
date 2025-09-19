import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface Alert {
    id: number;
    message: string;
    type: string;
}

interface AlertsPanelProps {
    alerts?: Alert[];
}

export const AlertsPanel = ({ alerts }: AlertsPanelProps) => {
    if (!alerts || alerts.length === 0) {
        return null; // Don't render the panel if there are no alerts
    }

    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-4">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <span>Important Alerts</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {alerts.map((alert) => (
                        <li key={alert.id} className="text-sm p-2 bg-red-50 border border-red-200 rounded-md">
                            {alert.message}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};