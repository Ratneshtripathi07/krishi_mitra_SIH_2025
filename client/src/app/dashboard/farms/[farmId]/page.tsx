'use client';

import { Button } from "@/components/ui/button";
import { CropCycleDialog } from "@/components/crop-cycles/crop-cycle-dialog";
import { CropCycleList } from "@/components/crop-cycles/crop-cycle-list";
import apiClient from "@/services/apiClient";
import { useState } from "react";
import useSWR from "swr";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const fetcher = (url: string) => apiClient.get(url).then(res => res.data);

export default function FarmDetailPage({ params }: { params: { farmId: string } }) {
    const { farmId } = params;

    // Fetch farm details
    const { data: farm, error: farmError } = useSWR(`/farms/${farmId}`, fetcher);
    // Fetch crop cycles for this farm
    const { data: cycles, error: cyclesError, isLoading, mutate } = useSWR(`/farms/${farmId}/cycles`, fetcher);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    if (farmError || cyclesError) return <div>Failed to load data for this farm.</div>;
    if (!farm || isLoading) return <div>Loading farm details...</div>;

    return (
        <div className="space-y-6">
            <div>
                <Link href="/dashboard/farms" className="flex items-center gap-2 text-sm text-muted-foreground hover:underline mb-2">
                    <ArrowLeft className="h-4 w-4" /> Back to All Farms
                </Link>
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold">Cycles for: <span className="text-primary">{farm.farmName}</span></h2>
                    <Button onClick={() => setIsDialogOpen(true)}>Start New Crop Cycle</Button>
                </div>
            </div>

            <CropCycleList cycles={cycles || []} />

            {isDialogOpen && (
                <CropCycleDialog
                    isOpen={isDialogOpen}
                    setIsOpen={setIsDialogOpen}
                    farmId={farmId}
                    mutate={mutate}
                />
            )}
        </div>
    );
}