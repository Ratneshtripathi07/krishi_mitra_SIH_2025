import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { MapPin, Droplets } from 'lucide-react';

interface Farm {
    id: string;
    farmName: string;
    soilType: string;
    irrigationSource: string;
    // Add other properties as needed
}

interface FarmCardProps {
    farm: Farm;
    onEdit: (farm: Farm) => void;
    onDelete: (farmId: string) => void;
}

export const FarmCard = ({ farm, onEdit, onDelete }: FarmCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{farm.farmName}</CardTitle>
                <CardDescription>ID: {farm.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>Soil: {farm.soilType}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Droplets className="h-4 w-4" />
                    <span>Water: {farm.irrigationSource}</span>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => onEdit(farm)}>Edit</Button>
                <Button variant="destructive" onClick={() => onDelete(farm.id)}>Delete</Button>
            </CardFooter>
        </Card>
    )
}