import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { ActivityForm, ActivityFormData } from "./activity-form";
import apiClient from "@/services/apiClient";
import { KeyedMutator } from "swr";

interface ActivityDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    cropCycleId: string;
    mutate: KeyedMutator<any>;
}

export const ActivityDialog = ({ isOpen, setIsOpen, cropCycleId, mutate }: ActivityDialogProps) => {
    const [formData, setFormData] = useState<ActivityFormData | null>(null);

    const handleSubmit = async () => {
        if (!formData || !cropCycleId) return;
        try {
            await apiClient.post(`/cycles/${cropCycleId}/activities`, formData);
            mutate(); // Re-fetch the list of activities
            setIsOpen(false);
        } catch (error) {
            console.error("Failed to log activity", error);
            alert("Error: Could not log activity.");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Log New Activity</DialogTitle>
                    <DialogDescription>
                        Record an activity for this crop cycle. This will be saved in your digital farm diary.
                    </DialogDescription>
                </DialogHeader>
                <ActivityForm
                    onFormChange={setFormData}
                />
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Log Activity</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};