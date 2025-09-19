'use client';

import { Button } from "@/components/ui/button";
import { ActivityDialog } from "@/components/activities/activity-dialog";
import { ActivityList } from "@/components/activities/activity-list";
import apiClient from "@/services/apiClient";
import { useState } from "react";
import useSWR from "swr";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const fetcher = (url: string) => apiClient.get(url).then(res => res.data);

export default function CycleDetailPage({ params }: { params: { cycleId: string } }) {
    const { cycleId } = params;

    const { data: activities, error, isLoading, mutate } = useSWR(`/cycles/${cycleId}/activities`, fetcher);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    if (error) return <div>Failed to load activities.</div>;
    if (isLoading) return <div>Loading activity log...</div>;

    return (
        <div className="space-y-6">
            <div>
                {/* TODO: Add a breadcrumb back to the farm detail page */}
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold">Activity Diary</h2>
                    <Button onClick={() => setIsDialogOpen(true)}>Log New Activity</Button>
                </div>
            </div>

            <ActivityList activities={activities || []} />

            {isDialogOpen && (
                <ActivityDialog
                    isOpen={isDialogOpen}
                    setIsOpen={setIsDialogOpen}
                    cropCycleId={cycleId}
                    mutate={mutate}
                />
            )}
        </div>
    );
}