'use client';

import useSWR from 'swr';
import apiClient from '@/services/apiClient';
import { columns, Content } from '@/components/admin/content/content-columns';
import { DataTable } from '@/components/admin/farmers/data-table';
import { Button } from '@/components/ui/button';

const fetcher = (url: string) => apiClient.get(url).then(res => res.data);

export default function ContentManagementPage() {
    const { data: content, error, isLoading } = useSWR<Content[]>('/admin/content', fetcher);

    if (isLoading) return <div>Loading content...</div>;
    if (error) return <div>Failed to load content.</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Content Management</h2>
                {/* TODO: Wire this up to an "Add Content" dialog */}
                <Button>Add New Content</Button>
            </div>
            <DataTable columns={columns} data={content || []} />
        </div>
    );
}