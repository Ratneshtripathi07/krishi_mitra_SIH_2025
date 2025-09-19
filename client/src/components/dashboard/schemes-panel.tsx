import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollText } from 'lucide-react';

// Mock data for the MVP
const mockSchemes = [
    { id: 1, title: 'PM-Kisan Samman Nidhi', description: 'Financial support for small and marginal farmers.' },
    { id: 2, title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)', description: 'Crop insurance scheme.' },
    { id: 3, title: 'Soil Health Card Scheme', description: 'Assistance for soil nutrient analysis.' },
];

export const SchemesPanel = () => {
    return (
        <Card className="col-span-1 md:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ScrollText className="h-5 w-5 text-primary" />
                    <span>Government Schemes</span>
                </CardTitle>
                <CardDescription>Latest schemes and programs available for you.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {mockSchemes.map((scheme) => (
                        <li key={scheme.id}>
                            <p className="font-semibold text-sm">{scheme.title}</p>
                            <p className="text-xs text-muted-foreground">{scheme.description}</p>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};