'use client';

import { Button } from "@/components/ui/button";
import { FarmDialog } from "@/components/farms/farm-dialog";
import { FarmList } from "@/components/farms/farm-list";
import apiClient from "@/services/apiClient";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => apiClient.get(url).then(res => res.data);

export default function FarmsPage() {
    const { data: farms, error, isLoading, mutate } = useSWR('/farms', fetcher);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [farmToEdit, setFarmToEdit] = useState(null);

    const handleAddNew = () => {
        setFarmToEdit(null);
        setIsDialogOpen(true);
    };

    const handleEdit = (farm: any) => {
        setFarmToEdit(farm);
        setIsDialogOpen(true);
    };

    const handleDelete = async (farmId: string) => {
        if (window.confirm("Are you sure you want to delete this farm?")) {
            try {
                await apiClient.delete(`/farms/${farmId}`);
                mutate(); // Re-fetch the list
            } catch (error) {
                console.error("Failed to delete farm", error);
                alert("Error: Could not delete farm.");
            }
        }
    };

    if (isLoading) return <div>Loading farms...</div>;
    if (error) return <div>Failed to load farms.</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">My Farms</h2>
                <Button onClick={handleAddNew}>Add New Farm</Button>
            </div>

            <FarmList farms={farms || []} onEdit={handleEdit} onDelete={handleDelete} />

            {isDialogOpen && (
                <FarmDialog
                    isOpen={isDialogOpen}
                    setIsOpen={setIsDialogOpen}
                    farmToEdit={farmToEdit}
                    mutate={mutate}
                />
            )}
        </div>
    );
}