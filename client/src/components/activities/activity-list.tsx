'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface Activity {
    id: string;
    activityType: string;
    date: string;
    notes?: string;
}

interface ActivityListProps {
    activities: Activity[];
}

export const ActivityList = ({ activities }: ActivityListProps) => {
    if (activities.length === 0) {
        return (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <h3 className="text-xl font-semibold">No Activities Logged</h3>
                <p className="text-muted-foreground">Log your first activity to start your farm diary!</p>
            </div>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity) => {
                        const formattedDate = new Date(activity.date).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'long', year: 'numeric'
                        });
                        return (
                            <div key={activity.id} className="flex gap-4">
                                <div className="font-semibold w-32 text-right text-sm text-muted-foreground">{formattedDate}</div>
                                <div className="relative w-full">
                                    <div className="absolute top-2 -left-[22px] h-3 w-3 rounded-full bg-primary ring-4 ring-background"></div>
                                    <div className="pl-4 border-l-2 border-gray-200">
                                        <p className="font-semibold">{activity.activityType.replace('_', ' ')}</p>
                                        {activity.notes && <p className="text-sm text-muted-foreground">{activity.notes}</p>}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}