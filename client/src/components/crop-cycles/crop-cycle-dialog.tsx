import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { CropCycleForm, CropCycleFormData } from "./crop-cycle-form";
import apiClient from "@/services/apiClient";
import { KeyedMutator } from "swr";

interface CropCycleDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    farmId: string;
    cropCycleToEdit?: any;
    mutate: KeyedMutator<any>;
}

export const CropCycleDialog = ({ isOpen, setIsOpen, farmId, cropCycleToEdit, mutate }: CropCycleDialogProps) => {
    const [formData, setFormData] = useState<CropCycleFormData | null>(null);

    const isEditMode = !!cropCycleToEdit;

    const handleSubmit = async () => {
        if (!formData || !farmId) return;
        try {
            if (isEditMode) {
                // TODO: Implement PATCH endpoint for crop cycles
                // await apiClient.patch(`/cycles/${cropCycleToEdit.id}`, formData);
                alert('Update functionality is not yet implemented.');
            } else {
                await apiClient.post(`/farms/${farmId}/cycles`, formData);
            }
            mutate();
            setIsOpen(false);
        } catch (error) {
            console.error("Failed to save crop cycle", error);
            alert("Error: Could not save crop cycle.");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEditMode ? 'Edit Crop Cycle' : 'Start New Crop Cycle'}</DialogTitle>
                    <DialogDescription>
                        {isEditMode ? "Update the details of this crop cycle." : "Log a new crop for this farm."}
                    </DialogDescription>
                </DialogHeader>
                <CropCycleForm
                    initialData={cropCycleToEdit}
                    onFormChange={setFormData}
                />
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};