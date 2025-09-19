'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';

export type Content = {
    id: string;
    title: string;
    type: 'SCHEME' | 'ADVISORY';
    isPublished: boolean;
};

export const columns: ColumnDef<Content>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
    },
    {
        accessorKey: 'type',
        header: 'Type',
    },
    {
        accessorKey: 'isPublished',
        header: 'Status',
        cell: ({ row }) => {
            const isPublished = row.getValue('isPublished');
            return (
                <Badge variant={isPublished ? 'default' : 'secondary'}>
                    {isPublished ? 'Published' : 'Draft'}
                </Badge>
            );
        },
    },
    // TODO: Add an actions column (Edit, Delete)
];