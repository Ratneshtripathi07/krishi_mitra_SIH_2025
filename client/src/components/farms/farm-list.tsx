'use client';

import { FarmCard } from './farm-card';

interface Farm {
    id: string;
    farmName: string;
    soilType: string;
    irrigationSource: string;
}

interface FarmListProps {
    farms: Farm[];
    onEdit: (farm: Farm) => void;
    onDelete: (farmId: string) => void;
}

export const FarmList = ({ farms, onEdit, onDelete }: FarmListProps) => {
    if (farms.length === 0) {
        return (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <h3 className="text-xl font-semibold">No farms found</h3>
                <p className="text-muted-foreground">Add your first farm to get started!</p>
            </div>
        )
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {farms.map((farm) => (
                <FarmCard key={farm.id} farm={farm} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    )
}