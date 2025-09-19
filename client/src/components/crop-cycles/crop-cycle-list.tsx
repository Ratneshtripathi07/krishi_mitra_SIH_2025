'use client';

import { CropCycleCard } from './crop-cycle-card';

interface CropCycle {
    id: string;
    cropName: string;
    sowingDate: string;
    status: string;
}

interface CropCycleListProps {
    cycles: CropCycle[];
}

export const CropCycleList = ({ cycles }: CropCycleListProps) => {
    if (cycles.length === 0) {
        return (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <h3 className="text-xl font-semibold">No crop cycles found</h3>
                <p className="text-muted-foreground">Start your first crop cycle for this farm!</p>
            </div>
        )
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cycles.map((cycle) => (
                <CropCycleCard key={cycle.id} cycle={cycle} />
            ))}
        </div>
    )
}