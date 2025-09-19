'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

// This type is manually created based on the API response from our admin service
export type Farmer = {
    id: string;
    name: string | null;
    phoneNumber: string;
    createdAt: string;
};

export const columns: ColumnDef<Farmer>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Registration Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue('createdAt'));
            return new Intl.DateTimeFormat('en-IN').format(date);
        }
    },
    // TODO: Add an actions column (e.g., View, Suspend)
];