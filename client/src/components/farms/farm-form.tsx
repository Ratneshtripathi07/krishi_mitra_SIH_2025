'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';

export interface FarmFormData {
    farmName: string;
    locationLat: number;
    locationLon: number;
    soilType: string;
    irrigationSource: string;
}

interface FarmFormProps {
    initialData?: Partial<FarmFormData>;
    onFormChange: (data: FarmFormData) => void;
}

export const FarmForm = ({ initialData, onFormChange }: FarmFormProps) => {
    const [formData, setFormData] = useState<FarmFormData>({
        farmName: initialData?.farmName || '',
        locationLat: initialData?.locationLat || 0,
        locationLon: initialData?.locationLon || 0,
        soilType: initialData?.soilType || '',
        irrigationSource: initialData?.irrigationSource || '',
    });

    useEffect(() => {
        onFormChange(formData);
    }, [formData, onFormChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name.startsWith('location') ? parseFloat(value) : value }));
    };

    const handleSelectChange = (name: 'soilType' | 'irrigationSource', value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="farmName" className="text-right">Name</Label>
                <Input id="farmName" name="farmName" value={formData.farmName} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="locationLat" className="text-right">Latitude</Label>
                <Input id="locationLat" name="locationLat" type="number" value={formData.locationLat} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="locationLon" className="text-right">Longitude</Label>
                <Input id="locationLon" name="locationLon" type="number" value={formData.locationLon} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="soilType" className="text-right">Soil Type</Label>
                <Select onValueChange={(value) => handleSelectChange('soilType', value)} defaultValue={formData.soilType}>
                    <SelectTrigger className="col-span-3"><SelectValue placeholder="Select soil type" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="sandy">Sandy</SelectItem>
                        <SelectItem value="clayey">Clayey</SelectItem>
                        <SelectItem value="loamy">Loamy</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="irrigationSource" className="text-right">Water Source</Label>
                <Select onValueChange={(value) => handleSelectChange('irrigationSource', value)} defaultValue={formData.irrigationSource}>
                    <SelectTrigger className="col-span-3"><SelectValue placeholder="Select water source" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="rain-fed">Rain-fed</SelectItem>
                        <SelectItem value="canal">Canal</SelectItem>
                        <SelectItem value="borewell">Borewell</SelectItem>
                        <SelectItem value="pond">Pond</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};