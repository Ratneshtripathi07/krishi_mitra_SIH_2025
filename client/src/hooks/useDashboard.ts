import useSWR from 'swr';
import apiClient from '@/services/apiClient';

// The fetcher function for SWR, which uses our configured apiClient
const fetcher = (url: string) => apiClient.get(url).then(res => res.data);

export const useDashboard = () => {
    const { data, error, isLoading } = useSWR('/dashboard/farmer', fetcher, {
        // Optional: Re-fetch data every 30 seconds
        refreshInterval: 30000,
    });

    return {
        dashboardData: data,
        isLoading,
        isError: error,
    };
};