import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { Calendar, ChevronsRight } from 'lucide-react';
import Link from 'next/link';

interface CropCycle {
    id: string;
    cropName: string;
    sowingDate: string;
    status: string;
}

interface CropCycleCardProps {
    cycle: CropCycle;
}

export const CropCycleCard = ({ cycle }: CropCycleCardProps) => {
    const formattedDate = new Date(cycle.sowingDate).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>{cycle.cropName}</CardTitle>
                <CardDescription>Status: <span className="font-semibold text-green-600">{cycle.status}</span></CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>Sown on: {formattedDate}</span>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Link href={`/dashboard/cycles/${cycle.id}`} passHref>
                    <Button size="sm">
                        View Activities <ChevronsRight className="h-4 w-4 ml-2" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}