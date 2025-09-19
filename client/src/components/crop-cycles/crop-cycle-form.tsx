'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';

export interface CropCycleFormData {
    cropName: string;
    sowingDate: string;
}

interface CropCycleFormProps {
    initialData?: Partial<CropCycleFormData>;
    onFormChange: (data: CropCycleFormData) => void;
}

export const CropCycleForm = ({ initialData, onFormChange }: CropCycleFormProps) => {
    const [formData, setFormData] = useState<CropCycleFormData>({
        cropName: initialData?.cropName || '',
        sowingDate: initialData?.sowingDate ? new Date(initialData.sowingDate).toISOString().split('T')[0] : '',
    });

    useEffect(() => {
        // Convert date to full ISO string on change for the backend
        onFormChange({
            ...formData,
            sowingDate: new Date(formData.sowingDate).toISOString(),
        });
    }, [formData, onFormChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cropName" className="text-right">Crop Name</Label>
                <Input id="cropName" name="cropName" value={formData.cropName} onChange={handleChange} className="col-span-3" placeholder="e.g., Tomato, Brinjal" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sowingDate" className="text-right">Sowing Date</Label>
                <Input id="sowingDate" name="sowingDate" type="date" value={formData.sowingDate} onChange={handleChange} className="col-span-3" />
            </div>
        </div>
    );
};