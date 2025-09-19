'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Tractor, User, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
    const pathname = usePathname();
    // TODO: Add role-based navigation links
    const navItems = [
        { href: '/dashboard', label: 'Overview', icon: Home },
        { href: '/dashboard/farms', label: 'My Farms', icon: Tractor },
        { href: '/dashboard/profile', label: 'My Profile', icon: User },
    ];

    return (
        <aside className="w-64 flex-col border-r bg-gray-100 p-4 hidden md:flex">
            <div className="flex items-center gap-2 mb-8">
                <span className="text-2xl font-bold">🌾 Krishi Mitra</span>
            </div>
            <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-gray-200',
                            { 'bg-gray-200 font-bold': pathname === item.href }
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
};