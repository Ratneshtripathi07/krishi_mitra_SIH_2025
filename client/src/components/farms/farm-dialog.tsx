import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FarmForm, FarmFormData } from "./farm-form";
import apiClient from "@/services/apiClient";
import { KeyedMutator } from "swr";

interface FarmDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    farmToEdit?: any; // Farm object
    mutate: KeyedMutator<any>; // SWR mutate function to refresh list
}

export const FarmDialog = ({ isOpen, setIsOpen, farmToEdit, mutate }: FarmDialogProps) => {
    const [formData, setFormData] = useState<FarmFormData | null>(null);

    const isEditMode = !!farmToEdit;

    const handleSubmit = async () => {
        if (!formData) return;
        try {
            if (isEditMode) {
                await apiClient.patch(`/farms/${farmToEdit.id}`, formData);
            } else {
                await apiClient.post('/farms', formData);
            }
            mutate(); // Re-fetch the list of farms
            setIsOpen(false);
        } catch (error) {
            console.error("Failed to save farm", error);
            alert("Error: Could not save farm.");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEditMode ? 'Edit Farm' : 'Add New Farm'}</DialogTitle>
                    <DialogDescription>
                        {isEditMode ? "Update the details of your farm." : "Add a new farm to your profile to get started."}
                    </DialogDescription>
                </DialogHeader>
                <FarmForm
                    initialData={farmToEdit}
                    onFormChange={setFormData}
                />
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};