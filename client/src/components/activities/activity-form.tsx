'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';

export interface ActivityFormData {
    activityType: string;
    date: string;
    notes?: string;
}

interface ActivityFormProps {
    onFormChange: (data: ActivityFormData) => void;
}

export const ActivityForm = ({ onFormChange }: ActivityFormProps) => {
    const [formData, setFormData] = useState<ActivityFormData>({
        activityType: '',
        date: new Date().toISOString().split('T')[0], // Default to today
        notes: '',
    });

    useEffect(() => {
        onFormChange({
            ...formData,
            date: new Date(formData.date).toISOString(),
        });
    }, [formData, onFormChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({ ...prev, activityType: value }));
    };

    return (
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="activityType" className="text-right">Activity</Label>
                <Select onValueChange={handleSelectChange} defaultValue={formData.activityType}>
                    <SelectTrigger className="col-span-3"><SelectValue placeholder="Select an activity type" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="IRRIGATION">Irrigation</SelectItem>
                        <SelectItem value="FERTILIZER">Fertilizer</SelectItem>
                        <SelectItem value="PEST_CONTROL">Pest Control</SelectItem>
                        <SelectItem value="SOWING">Sowing</SelectItem>
                        <SelectItem value="HARVEST">Harvest</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">Date</Label>
                <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">Notes</Label>
                <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} className="col-span-3" placeholder="Optional notes..." />
            </div>
        </div>
    );
};